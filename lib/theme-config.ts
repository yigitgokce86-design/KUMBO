export type ThemeType = 'nature' | 'sports' | 'space'

export interface ThemeConfig {
    id: ThemeType
    name: string
    colors: {
        // Backgrounds
        background: string
        cardBg: string

        // Primary Actions (Buttons, Progress Bars)
        primary: string
        primaryFg: string
        primaryBg: string // Light bg for variants

        // Secondary/Accents
        secondary: string
        secondaryFg: string

        // Text
        textMain: string
        textMuted: string
    }
    characters: {
        guide: { name: string; role: string; assetPath: string }
        logic: { name: string; role: string; assetPath: string }
        compassion: { name: string; role: string; assetPath: string }
    }
    rewards: {
        milestone1: string
        milestone2: string
        completion: string
    }
}

export const THEMES: Record<ThemeType, ThemeConfig> = {
    nature: {
        id: 'nature',
        name: 'Doğa ve İzci',
        colors: {
            background: 'bg-emerald-50',
            cardBg: 'bg-white/80',
            primary: 'bg-emerald-600',
            primaryFg: 'text-white',
            primaryBg: 'bg-emerald-100',
            secondary: 'bg-amber-400',
            secondaryFg: 'text-amber-950',
            textMain: 'text-emerald-950',
            textMuted: 'text-emerald-700/70',
        },
        characters: {
            guide: { name: 'İzci Fiko', role: 'Rehber', assetPath: '/assets/nature/fiko.png' },
            logic: { name: 'Kumbo', role: 'Pusula', assetPath: '/assets/nature/kumbo.png' },
            compassion: { name: 'Arı Vizo', role: 'Yancı', assetPath: '/assets/nature/vizo.png' }
        },
        rewards: {
            milestone1: 'Kamp Rozeti',
            milestone2: 'Orman Rozeti',
            completion: 'Usta İzci Rozeti'
        }
    },
    sports: {
        id: 'sports',
        name: 'Spor ve Koç',
        colors: {
            background: 'bg-blue-50',
            cardBg: 'bg-white/90',
            primary: 'bg-blue-600',
            primaryFg: 'text-white',
            primaryBg: 'bg-blue-100',
            secondary: 'bg-orange-500',
            secondaryFg: 'text-white',
            textMain: 'text-blue-950',
            textMuted: 'text-blue-700/70',
        },
        characters: {
            guide: { name: 'Koç Fiko', role: 'Motivatör', assetPath: '/assets/sports/fiko.png' },
            logic: { name: 'Kumbo', role: 'Analist', assetPath: '/assets/sports/kumbo.png' },
            compassion: { name: 'Köpek Bobo', role: 'Takım Arkadaşı', assetPath: '/assets/sports/bobo.png' }
        },
        rewards: {
            milestone1: 'Isınma Madalyası',
            milestone2: 'Yarı Final Madalyası',
            completion: 'Şampiyonluk Madalyası'
        }
    },
    space: {
        id: 'space',
        name: 'Uzay ve Merak',
        colors: {
            background: 'bg-slate-950', // Dark mode for space
            cardBg: 'bg-slate-900/80',
            primary: 'bg-indigo-500',
            primaryFg: 'text-white',
            primaryBg: 'bg-indigo-900/50',
            secondary: 'bg-cyan-400',
            secondaryFg: 'text-cyan-950',
            textMain: 'text-slate-50',
            textMuted: 'text-slate-400',
        },
        characters: {
            guide: { name: 'Astronot Fiko', role: 'Kaptan', assetPath: '/assets/space/fiko.png' },
            logic: { name: 'Kumbo', role: 'Bilgisayar', assetPath: '/assets/space/kumbo.png' },
            compassion: { name: 'Şempanze Çimpo', role: 'Keşifçi', assetPath: '/assets/space/cimpo.png' }
        },
        rewards: {
            milestone1: 'Fırlatma Rozeti',
            milestone2: 'Yörünge Rozeti',
            completion: 'Gezegen Keşfi Rozeti'
        }
    }
}

export const MICROCOPY = {
    onboarding: {
        nature: "Doğayı keşfetmeye hazır mısın? İlk hedefini seç.",
        sports: "Antrenmana başlayalım mı? Hedefini belirle.",
        space: "Roket kalkışa hazırlanıyor. Rotanı çiz."
    },
    success: {
        nature: "Harika! Bir adım daha ilerledik.",
        sports: "Gol! Tam isabet.",
        space: "Motorlar tam güç çalışıyor!"
    },
    nudge: {
        nature: "Küçük bir adım bile bizi zirveye yaklaştırır.",
        sports: "Takım seni bekliyor, sahaya dönelim mi?",
        space: "Yörüngeden sapmamak için küçük bir ayar yapalım."
    }
}
