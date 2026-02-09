export interface Question {
    id: string
    text: string
    options: string[]
    correctIndex: number
}

export interface Lesson {
    id: string
    title: string
    description: string
    duration: string // e.g. "3 dk"
    xp: number
    isLocked: boolean
    isCompleted: boolean
    thumbnail: string // emoji or url
    category: "basics" | "saving" | "spending"
    videoUrl: string
    quiz?: Question[]
}

export const MOCK_LESSONS: Lesson[] = [
    {
        id: "1",
        title: "Para Nedir?",
        description: "Paranın tarihini ve ne işe yaradığını öğren.",
        duration: "2 dk",
        xp: 50,
        isLocked: false,
        isCompleted: false,
        thumbnail: "💰",
        category: "basics",
        videoUrl: "https://www.youtube.com/embed/J7cRjD0u3qA?si=bJz2g7q_iN1q_1q_", // Placeholder
        quiz: [
            {
                id: "q1",
                text: "Para ne işe yarar?",
                options: ["Sadece oyun oynamaya", "İhtiyaçlarımızı almaya", "Duvar boyamaya"],
                correctIndex: 1
            },
            {
                id: "q2",
                text: "Eskiden para yerine ne kullanılırdı?",
                options: ["Taşlar ve takas", "Kredi kartı", "Bitcoin"],
                correctIndex: 0
            }
        ]
    },
    {
        id: "2",
        title: "İstek mi, İhtiyaç mı?",
        description: "Harcama yaparken doğru kararı nasıl verirsin?",
        duration: "3 dk",
        xp: 75,
        isLocked: true,
        isCompleted: false,
        thumbnail: "🤔",
        category: "spending",
        videoUrl: "https://www.youtube.com/embed/J7cRjD0u3qA",
        quiz: [
            {
                id: "q1",
                text: "Hangisi bir ihtiyaçtır?",
                options: ["Yeni oyuncak", "Su ve Yemek", "Video oyunu"],
                correctIndex: 1
            }
        ]
    },
    {
        id: "3",
        title: "Sabır Gücü",
        description: "Bekleyerek daha büyük ödüller kazanabilirsin.",
        duration: "4 dk",
        xp: 100,
        isLocked: true,
        isCompleted: false,
        thumbnail: "⏳",
        category: "saving",
        videoUrl: "https://www.youtube.com/embed/J7cRjD0u3qA"
    }
]

export interface Badge {
    id: string
    title: string
    description: string
    imageUrl: string // emoji for now
    isEarned: boolean
    xpReward: number
}

export const MOCK_BADGES: Badge[] = [
    {
        id: "first-step",
        title: "İlk Adım",
        description: "İlk hedefini oluşturdun!",
        imageUrl: "🌱",
        isEarned: true,
        xpReward: 50
    },
    {
        id: "saver",
        title: "Tutumlu",
        description: "Kumbarana 3 kez para attın.",
        imageUrl: "🐷",
        isEarned: true,
        xpReward: 100
    },
    {
        id: "bookworm",
        title: "Kitap Kurdu",
        description: "5 ders tamamladın.",
        imageUrl: "📚",
        isEarned: false,
        xpReward: 150
    },
    {
        id: "astronaut",
        title: "Astronot",
        description: "Uzay temasını açtın.",
        imageUrl: "🚀",
        isEarned: false,
        xpReward: 200
    },
    {
        id: "champion",
        title: "Şampiyon",
        description: "Tüm hedeflerini tamamladın.",
        imageUrl: "🏆",
        isEarned: false,
        xpReward: 500
    }
]
