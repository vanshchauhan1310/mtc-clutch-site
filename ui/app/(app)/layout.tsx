import { AppSidebar } from "@/components/app-sidebar"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

interface AppLayoutProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="border-grid flex min-h-screen flex-1 flex-col">
            <div className="hidden fixed w-full md:block z-50">
                <SiteHeader />
            </div>
            <SidebarProvider>
                <main className="flex flex-1 flex-col items-center justify-center md:mt-16">
                    <div className="block md:hidden">
                        <AppSidebar />
                    </div>
                    <div className="fixed top-4 right-4 z-50 block md:hidden">
                        <SidebarTrigger />
                    </div>
                    {children}
                </main>
            </SidebarProvider>
            <SiteFooter />
        </div>
    )
}