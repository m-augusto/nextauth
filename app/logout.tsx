'use client'
import { signOut } from "next-auth/react"

export function Logout(){
    return (
        <span onClick={() => {
            signOut()
        }}>Logout</span>
    )
}