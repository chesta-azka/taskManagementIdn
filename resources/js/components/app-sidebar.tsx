import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Folder, Users } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import { NavMain } from '@/components/nav-main';
import { NavFooter } from '@/components/nav-footer';
import AppLogo from './app-logo';
import { BranchDropdown } from './ui/branch-dropdown';

import type { NavItem, Branch } from '@/types';

export function AppSidebar() {
  const { props } = usePage();
  const role = props.auth?.user?.role || 'user';
  const branches = (props.branches || []) as Branch[];

  const navItems: Record<string, NavItem[]> = {
    superadmin: [
      { title: 'Home', href: '/dashboard/superadmin', icon: LayoutGrid },
      { title: 'My Task', href: '/dashboard/superadmin/tasks', icon: Folder },
      { title: 'Team Member', href: '/dashboard/superadmin/team', icon: Users },
    ],
    admin: [
      { title: 'Dashboard', href: '/dashboard/admin', icon: LayoutGrid },
      { title: 'Kelola Tugas', href: '/dashboard/admin/tasks', icon: Folder },
      { title: 'Karyawan', href: '/dashboard/admin/employees', icon: Users },
    ],
    user: [
      { title: 'Dashboard', href: '/dashboard/user', icon: LayoutGrid },
      { title: 'Tugas Saya', href: '/dashboard/user/tasks', icon: Folder },
    ],
    monitor: [
      { title: 'Dashboard', href: '/dashboard/monitor', icon: LayoutGrid },
      { title: 'Monitoring Kehadiran', href: '/dashboard/monitor/attendance', icon: Folder },
    ],
  };

  const footerNavItems: NavItem[] = [
    {
      title: 'Repository',
      href: 'https://github.com/laravel/react-starter-kit',
      icon: Folder,
    },
  ];

  return (
    <Sidebar collapsible="icon" variant="inset">
      {/* Header Sidebar */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={`/dashboard/${role}`} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Menu Utama */}
      <SidebarContent>
        <NavMain items={navItems[role] ?? navItems.user} />

        {/* Dropdown Cabang untuk Superadmin */}
        {role === 'superadmin' && branches.length > 0 && (
          <div className="mt-4 px-2">
            <BranchDropdown branches={branches} />
          </div>
        )}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
      </SidebarFooter>
    </Sidebar>
  );
}
