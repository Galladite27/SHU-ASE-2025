'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useUser();

  // Ensure user is logged in
  if (!user) return null;

  // Read the role from Clerk (and force lowercase)
  const role = String(user.publicMetadata.role || '').toLowerCase();

  // Menu items by lowercase role
  const menuItems = {
    donor: [
      { href: '/dashboard/donor', label: 'Dashboard' },
      { href: '/dashboard/donor/impact/impactReportPage', label: 'Your Impact' },
      { href: '/dashboard/donor/impact/donationPage', label: 'New Donation' },
    ],
    charity: [
      { href: '/dashboard/charity', label: 'Dashboard' },
      { href: '/dashboard/charity/donations', label: 'Donations' },
      { href: '/dashboard/charity/inventory', label: 'Inventory' },
    ],
    admin: [
      { href: '/dashboard/admin/', label: 'Admin Dashboard' },
      { href: '/dashboard/admin/activity', label: 'Recent Activity' },
      { href: '/dashboard/admin/users', label: 'User Management' },
      { href: '/dashboard/admin/impactReport', label: 'Impact Report' },
    ],
  };

  // Select the links matching the user's role
  const linksToShow = menuItems[role] || [];

  return (
    <aside className="w-full sm:w-64 bg-gray-100 p-4 sm:h-full sm:min-h-screen border-r">
      <nav>
        <h3 className="font-bold text-gray-400 uppercase tracking-wide mb-4 text-sm cursor-default select-none">
          {role.charAt(0).toUpperCase() + role.slice(1)} Menu
        </h3>

        {linksToShow.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block py-2 px-3 rounded-md transition ${
                isActive
                  ? 'bg-blue-100 text-blue-700 font-semibold cursor-default'
                  : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
