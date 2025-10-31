import { useSession } from "next-auth/react";
import AuthButton from "./AuthButton";
import Link from "next/link";

export default function Header() {
    const { status } = useSession();
    const { data : session } = useSession();
    
    const homeHref = session ? "/dashboard" : "/";
    

    if (status == "loading") {
        return <div className="flex justify-center items-center min-h-screen">
            <p>loading...</p>
        </div>
    }
    return <div className="flex justify-between items-center py-4 px-4 lg:px-8 bg-gray-900 border-b-2 border-gray-800 dark:bg-gray-200 dark:border-gray-300 text-gray-200 dark:text-gray-800 max-w-screen">
        <Link href={homeHref} className="flex text-xl lg:text-4xl font-extrabold tracking-wide">
            <p className="tracking-tight">Dev</p> <p className="text-blue-500">Crate</p>
        </Link>
        <AuthButton />
    </div>
}