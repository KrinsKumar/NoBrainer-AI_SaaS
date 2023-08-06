import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'

import LimitWrapper from '@/components/LimitWrapper'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
    title: 'No Brainer',
    description: 'AI Platform',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <LimitWrapper>
                <html lang="en">
                    <body className={inter.className}>{children}</body>
                </html>
            </LimitWrapper>
        </ClerkProvider>
    )
}
