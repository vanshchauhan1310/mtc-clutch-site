"use client"

import Link from "next/link"

export function MainNav() {
    return (
        <div className="mr-4 hidden md:flex">
            <nav className="flex items-center gap-4 text-sm xl:gap-6">
                <Link href="/">
                    Home
                </Link>
                <Link href="/contact">
                    Contact Us
                </Link>
                <Link href="/gallery">
                    Gallery
                </Link>
                <Link href="/team">
                    Our Team
                </Link>
            </nav>
        </div>
    )
}