"use client"

import { useUser } from "@clerk/nextjs"

export default function UserRole() {

    const { user } = useUser()
    const role = user?.publicMetadata?.role || "No Role"
    
    return (
        <div className="text-sm font-medium">
            Role: {role}
        </div>
    )
}