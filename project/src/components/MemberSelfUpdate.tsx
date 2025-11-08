import { useState } from 'react';
import { X, Save } from 'lucide-react';
import { Member } from '../lib/database';

interface MemberSelfUpdateProps {
  member: Member;
  onClose: () => void;
  onSave: (updates: Partial<Member>) => void;
}

export function MemberSelfUpdate({ member, onClose, onSave }: MemberSelfUpdateProps) {
  const [formData, setFormData] = useState({
    phone_number: member.phone_number,
    address: member.address,
    current_occupation: member.current_occupation,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Update Your Profile</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-gray-900">Your Information</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Name:</span> {member.title && `${member.title} `}{member.first_name} {member.last_name}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Email:</span> {member.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Graduation Year:</span> {member.graduation_year}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">House Color:</span> {member.house_color}
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              You can update the following information:
            </p>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone_number"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="current_occupation" className="block text-sm font-medium text-gray-700 mb-1">
                Current Occupation <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="current_occupation"
                value={formData.current_occupation}
                onChange={(e) => setFormData({ ...formData, current_occupation: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-sm"
            >
              <Save size={20} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
