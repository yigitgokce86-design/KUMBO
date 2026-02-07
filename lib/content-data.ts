export type Question = {
    id: string
    text: string
    options: string[]
    correctIndex: number
}

export type Quiz = {
    questions: Question[]
}

export type Lesson = {
    id: string
    slug: string
    title: string
    description: string
    thumbnail: string
    videoUrl: string // Could be YouTube ID or local path
    duration: string
    quiz: Quiz
    xpReward: number
}

export type Module = {
    id: string
    title: string
    description: string
    level: number
    lessons: Lesson[]
    theme: 'nature' | 'sports' | 'space' // To style the card
}

export const CONTENT_DATA: Module[] = [
    {
        id: 'm1',
        title: 'Para Kaşifi',
        description: 'Paranın ne olduğunu ve nasıl çalıştığını keşfet.',
        level: 1,
        theme: 'nature',
        lessons: [
            {
                id: 'l1',
                slug: 'para-nedir',
                title: 'Para Nedir?',
                description: 'Eskiden insanlar alışverişi nasıl yapardı?',
                thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&auto=format&fit=crop&q=60',
                videoUrl: 'https://www.youtube.com/embed/1Bw9y7hSkgU', // Nedir? - Para
                duration: '3 dk',
                xpReward: 100,
                quiz: {
                    questions: [
                        {
                            id: 'q1',
                            text: 'Eskiden insanlar para yerine ne yapardı?',
                            options: ['Takas yaparlardı', 'Taş toplarlardı', 'Hiçbir şey yapmazlardı'],
                            correctIndex: 0
                        },
                        {
                            id: 'q2',
                            text: 'Para bize ne sağlar?',
                            options: ['Sadece oyuncak', 'İhtiyaçlarımızı almamızı', 'Uçmamızı'],
                            correctIndex: 1
                        }
                    ]
                }
            },
            {
                id: 'l2',
                slug: 'istek-mi-ihtiyac-mi',
                title: 'İstek mi İhtiyaç mı?',
                description: 'Gerçekten buna ihtiyacın var mı?',
                thumbnail: 'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=500&auto=format&fit=crop&q=60',
                videoUrl: 'https://www.youtube.com/embed/q6Y8y-0x4jA', // EBA TV - İstek ve İhtiyaçlarımız
                duration: '4 dk',
                xpReward: 150,
                quiz: {
                    questions: [
                        {
                            id: 'q1',
                            text: 'Su içmek bir _____.',
                            options: ['İstektir', 'İhtiyaçtır', 'Oyundur'],
                            correctIndex: 1
                        },
                        {
                            id: 'q2',
                            text: 'Yeni bir video oyunu almak bir _____.',
                            options: ['İstektir', 'İhtiyaçtır', 'Kuraldır'],
                            correctIndex: 0
                        }
                    ]
                }
            }
        ]
    },
    {
        id: 'm2',
        title: 'Birikim Ustası',
        description: 'Küçük paralar nasıl büyür?',
        level: 2,
        theme: 'sports',
        lessons: [
            {
                id: 'l3',
                slug: 'kumbaranin-gucu',
                title: 'Kumbaranın Gücü',
                description: 'Damlaya damlaya göl olur.',
                thumbnail: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=500&auto=format&fit=crop&q=60',
                videoUrl: 'https://www.youtube.com/embed/HwO1dD9hN2F4', // Özlem Denizmen - 3 Kumbara
                duration: '5 dk',
                xpReward: 200,
                quiz: {
                    questions: [
                        {
                            id: 'q1',
                            text: 'Her gün 1 lira atarsan ne olur?',
                            options: ['Paran biter', 'Paran birikir', 'Kumbaran kırılır'],
                            correctIndex: 1
                        }
                    ]
                }
            }
        ]
    }
]
