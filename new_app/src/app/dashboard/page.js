import { auth } from "@clerk/nextjs/server";

export default async function AdminDashboardPage() {
    const { userId } = await auth();
    return (
        <div>
        <h1> Dashboard</h1>
        <p>Welcome to the dashboard! Your user ID is {userId}</p>
        {/* Add more admin-specific content here */}
        </div>
    );
    }