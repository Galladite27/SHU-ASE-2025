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
    <aside className="w-64 bg-gray-100 p-4">
      <nav>
        <h3 className="font-bold text-gray-500 mb-4">
          {role.charAt(0).toUpperCase() + role.slice(1)} Menu
        </h3>

        {linksToShow.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block py-2 ${
              pathname === link.href
                ? 'text-blue-600 font-semibold'
                : 'text-gray-700'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

