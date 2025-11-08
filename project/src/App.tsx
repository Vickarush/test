import { useState, useEffect, useMemo } from 'react';
import { Plus, Download, Database, UserCircle } from 'lucide-react';
import { Member, getAllMembers, addMember, updateMember, deleteMember } from './lib/database';
import { MemberForm } from './components/MemberForm';
import { MemberTable } from './components/MemberTable';
import { FilterBar } from './components/FilterBar';
import { Statistics } from './components/Statistics';
import { MemberLookup } from './components/MemberLookup';
import { MemberSelfUpdate } from './components/MemberSelfUpdate';
import { exportToCSV } from './utils/exportToCSV';

function App() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [graduationYearFilter, setGraduationYearFilter] = useState('');
  const [houseColorFilter, setHouseColorFilter] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [showMemberLookup, setShowMemberLookup] = useState(false);
  const [selfUpdateMember, setSelfUpdateMember] = useState<Member | null>(null);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllMembers();
      setMembers(data);
    } catch (error: any) {
      console.error('Error loading members:', error);
      setError(error.message || 'Failed to load members.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveMember(data: Partial<Member>) {
    try {
      if (editingMember) {
        await updateMember(editingMember.id, data);
      } else {
        await addMember(data as Omit<Member, 'id' | 'created_at' | 'updated_at'>);
      }

      await loadMembers();
      setShowForm(false);
      setEditingMember(null);
    } catch (error: any) {
      console.error('Error saving member:', error);
      alert(error.message || 'Failed to save member. Please try again.');
    }
  }

  async function handleDeleteMember(id: string) {
    try {
      await deleteMember(id);
      await loadMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
      alert('Failed to delete member. Please try again.');
    }
  }

  function handleEdit(member: Member) {
    setEditingMember(member);
    setShowForm(true);
  }

  function handleCloseForm() {
    setShowForm(false);
    setEditingMember(null);
  }

  const availableYears = useMemo(() => {
    const years = members
      .map(m => m.graduation_year)
      .filter((year): year is number => year !== null);
    return Array.from(new Set(years)).sort((a, b) => b - a);
  }, [members]);

  const availableColors = useMemo(() => {
    const colors = members
      .map(m => m.house_color)
      .filter(color => color && color.trim() !== '');
    return Array.from(new Set(colors)).sort();
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const matchesSearch =
        searchTerm === '' ||
        member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.current_occupation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && member.is_active) ||
        (statusFilter === 'inactive' && !member.is_active);

      const matchesYear =
        graduationYearFilter === '' ||
        member.graduation_year?.toString() === graduationYearFilter;

      const matchesColor =
        houseColorFilter === '' ||
        member.house_color === houseColorFilter;

      return matchesSearch && matchesStatus && matchesYear && matchesColor;
    });
  }, [members, searchTerm, statusFilter, graduationYearFilter, houseColorFilter]);

  function handleExport() {
    if (!isAuthorized) {
      const password = prompt('Enter password to export data:');
      if (password === 'GOSA2025') {
        setIsAuthorized(true);
      } else {
        alert('Incorrect password. Access denied.');
        return;
      }
    }
    const timestamp = new Date().toISOString().split('T')[0];
    exportToCSV(filteredMembers, `association-members-${timestamp}.csv`);
  }

  function handleMemberLookup(email: string, phoneNumber: string) {
    const foundMember = members.find(
      (m) => m.email.toLowerCase() === email.toLowerCase() && m.phone_number === phoneNumber
    );

    if (foundMember) {
      setSelfUpdateMember(foundMember);
      setShowMemberLookup(false);
    } else {
      alert('No member found with the provided email and phone number. Please check your details and try again.');
    }
  }

  async function handleSelfUpdate(updates: Partial<Member>) {
    if (!selfUpdateMember) return;

    try {
      await updateMember(selfUpdateMember.id, updates);
      await loadMembers();
      setSelfUpdateMember(null);
      alert('Your information has been updated successfully!');
    } catch (error) {
      alert('Failed to update your information. Please try again.');
      console.error('Error updating member:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <Database className="animate-pulse mx-auto mb-4 text-green-600" size={48} />
          <p className="text-gray-600">Loading members...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <Database className="mx-auto mb-4 text-red-600" size={48} />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Database Connection Issue</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={loadMembers}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Retry Connection
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-yellow-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              AG
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Abuja GOSA Association Member Directory</h1>
              <p className="text-gray-600">Managing and updating Abuja branch directory</p>
            </div>
          </div>
        </div>

        <Statistics members={members} />

        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm"
            >
              <Plus size={20} />
              Add Members
            </button>
            <button
              onClick={() => setShowMemberLookup(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-sm"
            >
              <UserCircle size={20} />
              Update My Info
            </button>
          </div>
          <div className="text-sm text-gray-600">
            Showing {filteredMembers.length} of {members.length} members
          </div>
        </div>

        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          graduationYearFilter={graduationYearFilter}
          onGraduationYearFilterChange={setGraduationYearFilter}
          houseColorFilter={houseColorFilter}
          onHouseColorFilterChange={setHouseColorFilter}
          availableYears={availableYears}
          availableColors={availableColors}
        />

        <div className="mt-6">
          <MemberTable
            members={filteredMembers}
            onEdit={handleEdit}
            onDelete={handleDeleteMember}
          />
        </div>

        {showForm && (
          <MemberForm
            member={editingMember}
            onClose={handleCloseForm}
            onSave={handleSaveMember}
          />
        )}

        {showMemberLookup && (
          <MemberLookup
            onLookup={handleMemberLookup}
          />
        )}

        {selfUpdateMember && (
          <MemberSelfUpdate
            member={selfUpdateMember}
            onClose={() => setSelfUpdateMember(null)}
            onSave={handleSelfUpdate}
          />
        )}

        <footer className="mt-12 pb-6 border-t border-gray-200 pt-6">
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleExport}
              disabled={members.length === 0}
              className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <Download size={20} />
              Export to CSV
            </button>
            <p className="text-sm text-gray-600">
              Created by{' '}
              <a
                href="https://www.matrixdeemedia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                Matrixdee Media
              </a>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
