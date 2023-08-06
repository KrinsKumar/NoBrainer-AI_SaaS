"use client"

import { useEffect, useState } from "react";
import { useAtom  } from "jotai";

import { Card, CardContent } from "./ui/card";
import { Progress } from "@/components/ui/progress";
import { limitAtom } from "@/store";

const Counter = () => {
    const [mounted, setMounted] = useState(false);
    const [limit, setLimit] = useAtom(limitAtom);
    
    useEffect(() => {
        setMounted(true);
    }, [mounted])

    if (!mounted) return null;

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p>
                            {limit} / 5 Free Generations
                        </p>
                        <Progress 
                            className="h-3"
                            value={(limit/5) * 100}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Counter;