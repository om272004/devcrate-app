/* eslint-disable @next/next/no-img-element */
"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from "@/lib/ThemeContext";

export default function AuthButton() {
    const { data: session, status } = useSession();
    const { theme, toggleTheme } = useTheme();


    if (status === "authenticated") {
        return <div className="flex gap-x-4 items-center font-bold">
            <button onClick={toggleTheme} aria-label="Toggle Dark and Light theme">
                {theme === 'dark' ? <Moon size={25} /> : <Sun size={25} />}
            </button>
            {session.user?.image ? (
                <img src={session.user?.image}
                    alt="profile"
                    className="rounded-full w-8 h-8"
                />
            ) : (
                <img src={`https://ui-avatars.com/api/?name=${session.user.name || session.user.email}&background=0D8ABC&color=fff`}
                    alt="profile"
                    className="w-8 h-8 rounded-full"
                />
            )}
            <p className="">Hi, {session.user?.name || session.user?.email}</p>
            <button className="hover:text-blue-500 hover:underline"
                onClick={() => signOut({ callbackUrl: "/" })}
                aria-label="Sign Out">
                Sign Out
            </button>
        </div>
    }


    return <div className="flex gap-x-2 lg:gap-x-4 font-bold items-center lg:text-lg">
        <button onClick={toggleTheme} aria-label="Toggle Dark and Light theme">
                {theme === 'dark' ? <Moon size={25} /> : <Sun size={25} />}
            </button>
        <Link href="/signin">
            <button className="hover:text-blue-500 hover:underline text-sm">Sign In</button>
        </Link>
        <Link href="/register">
            <button className="hover:text-blue-500 hover:underline text-sm">Register</button>
        </Link>
    </div>
}