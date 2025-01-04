import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="border-grid flex min-h-screen flex-1 flex-col">
            <SiteHeader />
            <main className="flex flex-1 flex-col items-center justify-center">{children}</main>
            <SiteFooter />
        </div>
    )
}