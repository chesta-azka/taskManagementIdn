import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Dashboard', href: '/dashboard/monitor' },
];

export default function MonitorDashboard() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Dashboard Monitor" />
      <div className="p-4 rounded-xl border border-dashed">
        <PlaceholderPattern className="size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
      </div>
    </AppLayout>
  );
}
