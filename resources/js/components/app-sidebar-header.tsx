import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell } from 'lucide-react';
import { NavUser } from '@/components/nav-user'; // Pastikan file ini ada

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            {/* Kiri: SidebarTrigger + Breadcrumbs */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Kanan: Icon Notifikasi + NavUser */}
            <div className="flex items-center gap-4">
                <button
                    className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" />
                    {/* Notif Badge (opsional) */}
                    <span className="absolute -top-1 -right-1 inline-flex h-2 w-2 rounded-full bg-red-500" />
                </button>

                <NavUser />
            </div>
        </header>
    );
}
