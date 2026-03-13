import React from 'react';
import { Edit, Trash2, ShieldCheck, User } from 'lucide-react';
import { UserEntity } from '@/src/domain/entity/user.entity';
import Image from 'next/image';

interface UserTableProps {
  users: UserEntity[];
  onEdit: (user: UserEntity) => void;
  onDelete: (id: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
  return (
    <div className="overflow-hidden bg-white border border-slate-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">User</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Role</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Contact</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Location</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase">Joined</th>
            <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 bg-white">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-slate-50 transition-colors">
              {/* Profile & Name */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    {user.avatar ? (
                      <Image className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt={user.name} width={40} height={40} />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                        <User size={20} />
                      </div>
                    )}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-slate-900">{user.name}</div>
                    <div className="text-sm text-slate-500">{user.email}</div>
                  </div>
                </div>
              </td>

              {/* Role */}
              <td className="px-6 py-4 whitespace-nowrap">
                {user.isAdmin ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    <ShieldCheck size={12} className="mr-1" /> Admin
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                    User
                  </span>
                )}
              </td>

              {/* Contact */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                {user.phone || 'No phone'}
              </td>

              {/* Location */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                {user.city ? `${user.city}` : 'Not set'}
              </td>

              {/* Date Joined */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </td>

              {/* Actions */}
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  onClick={() => onEdit(user)}
                  className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
                >
                  <Edit size={18} />
                </button>
                <button 
                  onClick={() => onDelete(user.id!)}
                  className="text-red-600 hover:text-red-900 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
