"use client"

import { useAtom } from "jotai";
import { useEffect } from "react";

import { limitAtom } from "@/store";
import { limit } from "@/lib/limit";

const LimitWrapper = ({children}:{children:React.ReactNode}) => {
    const [current_limit, setLimit] = useAtom(limitAtom);

    useEffect(() => {
        setLimit(limit())
    })

    return ( 
        <>
            {children}
        </>
    );
}

export default LimitWrapper;