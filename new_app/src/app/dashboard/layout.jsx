'use server'
import DashboardSidebar from './(components)/DashboardSidebar';
// if no auth session found, redirect to sign-in page


export default async function DashboardLayout({ children }) {
  
  return (
    <div className="flex">
      <DashboardSidebar />
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
}
