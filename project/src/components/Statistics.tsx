import { Users, UserCheck, UserX, GraduationCap } from 'lucide-react';
import { Member } from '../lib/database';

interface StatisticsProps {
  members: Member[];
}

export function Statistics({ members }: StatisticsProps) {
  const totalMembers = members.length;
  const activeMembers = members.filter(m => m.is_active).length;
  const inactiveMembers = members.filter(m => !m.is_active).length;

  const graduationYears = members
    .filter(m => m.graduation_year)
    .reduce((acc, m) => {
      const year = m.graduation_year!;
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);

  const mostCommonYear = Object.entries(graduationYears)
    .sort(([, a], [, b]) => b - a)[0];

  const houseColors = members
    .filter(m => m.house_color)
    .reduce((acc, m) => {
      const color = m.house_color;
      acc[color] = (acc[color] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const stats = [
    {
      label: 'Total Members',
      value: totalMembers,
      icon: Users,
      color: 'bg-green-600',
    },
    {
      label: 'Active Members',
      value: activeMembers,
      icon: UserCheck,
      color: 'bg-green-500',
    },
    {
      label: 'Inactive Members',
      value: inactiveMembers,
      icon: UserX,
      color: 'bg-gray-500',
    },
    {
      label: 'Most Common Year',
      value: mostCommonYear ? `${mostCommonYear[0]} (${mostCommonYear[1]})` : '-',
      icon: GraduationCap,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div key={stat.label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        );
      })}

      {Object.keys(houseColors).length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 md:col-span-2 lg:col-span-4">
          <h3 className="text-sm font-medium text-gray-600 mb-4">Members by House Color</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Object.entries(houseColors)
              .sort(([, a], [, b]) => b - a)
              .map(([color, count]) => (
                <div key={color} className="text-center">
                  <div className="text-2xl font-bold text-gray-900">{count}</div>
                  <div className="text-sm text-gray-600">{color}</div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
