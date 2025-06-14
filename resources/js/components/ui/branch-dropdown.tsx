'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { type Branch } from '@/types';
import { CreateBranchModal } from '@/components/dashboard/superadmin/modals/create-branch-modal';

export function BranchDropdown({ branches }: { branches: Branch[] }) {
  const [showCreateModal, setShowCreateModal] = useState(false);

const goToBranchPage = (branchId: number) => {
  router.visit(route('dashboard.superadmin.branches.show', branchId));
};

  return (
    <div className="px-3 mt-4">
      <div className="flex items-center justify-between mb-2 text-sm font-medium text-muted-foreground">
        <span>Cabang</span>
        <button
          onClick={() => setShowCreateModal(true)}
          className="text-primary hover:text-primary/80"
          title="Tambah Cabang"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <ul className="space-y-1">
        {branches.map((branch) => (
          <li key={branch.id}>
            <button
              onClick={() => goToBranchPage(branch.id)}
              className="w-full text-left block px-2 py-1.5 text-sm rounded-md hover:bg-muted transition"
            >
              {branch.name}
            </button>
          </li>
        ))}
      </ul>

      {/* Modal Tambah Cabang */}
      <CreateBranchModal open={showCreateModal} onClose={() => setShowCreateModal(false)} />
    </div>
  );
}
