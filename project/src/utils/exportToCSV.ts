import { Member } from '../lib/database';

export function exportToCSV(members: Member[], filename: string = 'members.csv') {
  const headers = [
    'First Name',
    'Last Name',
    'Email',
    'Phone Number',
    'Address',
    'Graduation Year',
    'House Color',
    'Current Occupation',
    'Status',
    'Created At',
    'Updated At'
  ];

  const rows = members.map(member => [
    member.first_name,
    member.last_name,
    member.email,
    member.phone_number,
    member.address,
    member.graduation_year?.toString() || '',
    member.house_color,
    member.current_occupation,
    member.is_active ? 'Active' : 'Inactive',
    new Date(member.created_at).toLocaleDateString(),
    new Date(member.updated_at).toLocaleDateString()
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      row.map(cell => {
        const cellStr = cell?.toString() || '';
        return cellStr.includes(',') || cellStr.includes('"') || cellStr.includes('\n')
          ? `"${cellStr.replace(/"/g, '""')}"`
          : cellStr;
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
