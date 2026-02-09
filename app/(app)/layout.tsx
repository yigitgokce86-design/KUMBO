import { Shell } from "@/components/layout/shell"
import { MobileNav } from "@/components/layout/mobile-nav"

export default function AppLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <Shell>
                {children}
            </Shell>
            <MobileNav />
        </div>
    )
}
