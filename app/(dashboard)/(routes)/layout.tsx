"use client"

import Navbar from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import {Toaster} from "react-hot-toast"
import { useEffect, useState } from "react"

import {limit, incrementLimit} from "@/lib/limit"

const DashboardLayout = ({children}:{children:React.ReactNode}) => {
    const [lim, setLim] = useState(0);
    
    useEffect(() => {
        setLim(limit());
    }, [])

    return (
        <div className="h-full relative ">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z[80] bg-gray-900">
                <Sidebar limitCount={lim}/>
            </div>
            <main className="md:pl-72">
                <Toaster />
                <Navbar />
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;