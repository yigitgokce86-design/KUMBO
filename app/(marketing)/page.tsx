import { Shell } from "@/components/layout/shell"
import { LoginForm } from "@/components/features/auth/login-form"
import { Character } from "@/components/ui/character"

export default function Home() {
  return (
    <Shell>
      <div className="flex flex-col items-center justify-center min-h-[80vh] gap-8 relative">

        {/* Warm/Playful Background Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-yellow-300/20 rounded-full blur-[100px] animate-float" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-300/20 rounded-full blur-[100px] animate-float opacity-70" style={{ animationDelay: '2s' }} />
        </div>

        <div className="text-center space-y-4 max-w-2xl relative z-10">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-gradient">
            Finansal Özgürlük, <br /> Küçük Adımlarla Başlar.
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
            Kumbo ile birikim yapmayı, hedef koymayı ve sabretmeyi öğrenin.
          </p>
        </div>

        {/* Hero Character - Dynamically changes based on Theme */}
        <div className="animate-float">
          <Character variant="guide" size="xl" speaking />
        </div>

        <LoginForm />

        <div className="text-xs text-muted-foreground mt-8">
          v0.2.1 • OLP Build • Kumbo Mint Theme
        </div>
      </div>
    </Shell>
  )
}
