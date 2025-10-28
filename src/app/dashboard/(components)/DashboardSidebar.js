'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      role: 'Donor',
      links: [
        { href: '/dashboard/donor', label: 'Donation History' },
        { href: '/dashboard/donor/impactReport', label: 'Impact Report' }
      ]
    },
    {
      role: 'Charity',
      links: [
        { href: '/dashboard/charity', label: 'Donations' },
        { href: '/dashboard/charity/inventory', label: 'Inventory' }
      ]
    },
    {
      role: 'Admin',
      links: [
        { href: '/dashboard/admin', label: 'Dashboard' },
        { href: '/dashboard/admin/users', label: 'User Management' }
      ]
    }
  ];

  return (
    <aside className="w-64 bg-gray-100 p-4">
      <nav>
        {menuItems.map((menu) => (
          <div key={menu.role} className="text-gray-400 mb-4">
            <h3 className="font-bold">{menu.role}</h3>
            {menu.links.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                className={`block py-2 ${
                  pathname === link.href ? 'text-blue-500' : 'text-gray-700'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
