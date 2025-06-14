'use client';

import { useState } from 'react';
import { Head } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { CreateBranchModal } from '@/components/dashboard/superadmin/modals/create-branch-modal'; // pastikan path ini sesuai

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard/superadmin' },
];

export default function SuperadminDashboard() {
  const [showModal, setShowModal] = useState(false);

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Superadmin" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard Superadmin</h1>
          <Button onClick={() => setShowModal(true)}>+ Tambah Cabang</Button>
        </div>

        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <CardPlaceholder />
          <CardPlaceholder />
          <CardPlaceholder />
        </div>

        <SectionPlaceholder />
      </div>

      {/* Modal Tambah Cabang */}
      <CreateBranchModal open={showModal} onClose={() => setShowModal(false)} />
    </AppLayout>
  );
}

function CardPlaceholder() {
  return (
    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
        Placeholder Card
      </div>
    </div>
  );
}

function SectionPlaceholder() {
  return (
    <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
        Placeholder Section
      </div>
    </div>
  );
}
