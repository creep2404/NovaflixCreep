import React, { useState } from 'react';
import { MoreVertical, Filter, Download } from 'lucide-react';
import { useSimulatedData } from '../../hooks/useData';
import { Skeleton, SkeletonTable } from '../../components/ui/Skeleton';
import { ErrorState, EmptyState } from '../../components/ui/StateViews';

const MOCK_USERS = [
  { id: 1, name: 'Alara Mitchell', email: 'alara.m@nebula.com', role: 'Admin', status: 'Active', date: 'Oct 12, 2023', avatar: 'https://i.pravatar.cc/150?u=1' },
  { id: 2, name: 'Julian De Luca', email: 'j.deluca@nova.net', role: 'User', status: 'Active', date: 'Nov 04, 2023', avatar: 'https://i.pravatar.cc/150?u=2' },
  { id: 3, name: 'Elias Thorne', email: 'ethorne@flux.io', role: 'User', status: 'Banned', date: 'Dec 22, 2023', avatar: 'https://i.pravatar.cc/150?u=3' },
  { id: 4, name: 'Sloane Weaver', email: 'sweaver@proton.me', role: 'User', status: 'Active', date: 'Jan 15, 2024', avatar: 'https://i.pravatar.cc/150?u=4' },
];

export const AdminUsers = () => {
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  const { data: users, isLoading, error, refetch } = useSimulatedData(MOCK_USERS, {
    delay: 1200,
    simulateError,
    simulateEmpty
  });

  if (isLoading) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-8 w-16" />
            </div>
          ))}
        </div>
        <SkeletonTable rows={5} cols={5} />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState 
        title="Failed to load users" 
        message="There was an error communicating with the server. Please try again."
        action={{ label: "Retry", onClick: refetch }}
      />
    );
  }

  if (!users || users.length === 0) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <EmptyState 
          title="No users found" 
          message="There are currently no users registered in the system."
          action={{ label: "Clear Filters", onClick: () => setSimulateEmpty(false) }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-1">
          <span className="text-on-surface-variant text-[10px] font-label uppercase tracking-widest">Total Curators</span>
          <span className="text-3xl font-headline font-bold text-primary">12,482</span>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-1">
          <span className="text-on-surface-variant text-[10px] font-label uppercase tracking-widest">Active Now</span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-3xl font-headline font-bold text-primary">843</span>
          </div>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-1">
          <span className="text-on-surface-variant text-[10px] font-label uppercase tracking-widest">Banned</span>
          <span className="text-3xl font-headline font-bold text-primary">42</span>
        </div>
        <div className="bg-surface-container-low p-6 rounded-2xl flex flex-col gap-1">
          <span className="text-on-surface-variant text-[10px] font-label uppercase tracking-widest">Premium Tier</span>
          <span className="text-3xl font-headline font-bold text-primary">3,120</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search members..." 
            className="bg-surface-container-high border-none rounded-full py-2.5 pl-4 pr-6 text-sm focus:ring-1 focus:ring-outline-variant w-64 transition-all duration-300 outline-none text-white placeholder-on-surface-variant"
          />
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setSimulateError(true)} className="text-xs text-red-500 hover:underline">Test Error</button>
          <button onClick={() => setSimulateEmpty(true)} className="text-xs text-on-surface-variant hover:underline">Test Empty</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-high hover:bg-surface-container-highest transition-colors text-sm font-medium rounded-full text-on-surface">
            <Filter size={18} /> Filter
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-primary-container text-black hover:brightness-110 transition-all font-semibold rounded-full text-sm active:scale-95">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-surface-container-low rounded-3xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/50">
                <th className="px-8 py-5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.15em]">User Identity</th>
                <th className="px-6 py-5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.15em]">Role</th>
                <th className="px-6 py-5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.15em]">System Status</th>
                <th className="px-6 py-5 text-[10px] font-label font-semibold text-on-surface-variant uppercase tracking-[0.15em]">Enrolled Date</th>
                <th className="px-8 py-5 text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors cursor-default">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface text-sm">{user.name}</span>
                        <span className="text-xs text-on-surface-variant">{user.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full ${
                      user.role === 'Admin' ? 'bg-primary-container/10 text-primary-container' : 'bg-surface-container-highest text-on-surface-variant'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                      <span className={`text-xs font-medium ${user.status === 'Active' ? 'text-emerald-500' : 'text-red-500'}`}>{user.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-on-surface-variant font-medium">{user.date}</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-highest transition-colors ml-auto text-on-surface-variant hover:text-white">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
