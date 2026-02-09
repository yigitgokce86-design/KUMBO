import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client'
import { Badge, MOCK_BADGES } from '@/lib/content-data'

export interface Goal {
    id: string
    title: string
    targetAmount: number
    currentAmount: number
    imageUrl: string
    status: 'active' | 'completed' | 'archived'
}

interface User {
    id: string
    name: string
    role: 'parent' | 'child'
    email?: string
}

interface StoreState {
    user: User | null
    goals: Goal[]
    isLoading: boolean

    // Learning Progress
    xp: number
    completedLessons: string[] // List of lesson IDs
    badges: Badge[]

    // Actions
    fetchGoals: () => Promise<void>
    fetchUser: () => Promise<void>
    fetchBadges: () => Promise<void>
    addMoney: (goalId: string, amount: number, description?: string) => Promise<void>
    setUser: (user: User | null) => void
    logout: () => Promise<void>
    completeLesson: (lessonId: string, xpReward: number) => Promise<void>
    checkBadges: () => Promise<void>
}

export const useStore = create<StoreState>((set, get) => ({
    user: null,
    goals: [],
    isLoading: false,

    xp: 0,
    completedLessons: [],
    badges: MOCK_BADGES,

    setUser: (user) => set({ user }),

    fetchUser: async () => {
        const supabase = createClient()
        const { data: { user: authUser } } = await supabase.auth.getUser()

        if (authUser) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', authUser.id)
                .single()

            if (profile) {
                set({
                    user: {
                        id: profile.id,
                        name: profile.display_name,
                        role: profile.role,
                        email: authUser.email
                    },
                    xp: profile.xp || 0
                })
                get().fetchBadges()
            }
        }
    },

    fetchBadges: async () => {
        const supabase = createClient()
        const { user, badges } = get()
        if (!user) return

        const { data: earnedBadges } = await supabase
            .from('user_badges')
            .select('badge_id')
            .eq('user_id', user.id)

        if (earnedBadges) {
            const earnedIds = earnedBadges.map(b => b.badge_id)
            const updatedBadges = badges.map(b => ({
                ...b,
                isEarned: earnedIds.includes(b.id)
            }))
            set({ badges: updatedBadges })
        }
    },

    checkBadges: async () => {
        const { user, goals, completedLessons, badges } = get()
        if (!user) return

        const supabase = createClient()
        const newEarnedBadges: string[] = []

        const checks = [
            { id: 'first-step', condition: goals.length > 0 },
            { id: 'saver', condition: goals.some(g => g.currentAmount > 0) },
            { id: 'bookworm', condition: completedLessons.length >= 5 },
            { id: 'champion', condition: goals.some(g => g.status === 'completed') }
        ]

        for (const check of checks) {
            const badge = badges.find(b => b.id === check.id)
            // Only award if not already earned
            if (badge && !badge.isEarned && check.condition) {
                newEarnedBadges.push(check.id)

                // Award in DB
                await supabase.from('user_badges').insert({
                    user_id: user.id,
                    badge_id: check.id
                })

                // Award XP
                await supabase.rpc('increment_xp', { x: badge.xpReward })

                // Optimistic XP update
                set(state => ({ xp: state.xp + badge.xpReward }))
            }
        }

        if (newEarnedBadges.length > 0) {
            get().fetchBadges()
        }
    },

    completeLesson: async (lessonId, xpReward) => {
        const { completedLessons, xp, user } = get()
        if (!user) return

        if (completedLessons.includes(lessonId)) return

        set({
            completedLessons: [...completedLessons, lessonId],
            xp: xp + xpReward
        })

        const supabase = createClient()
        await supabase.from('user_lesson_progress').insert({
            user_id: user.id,
            lesson_id: lessonId,
            status: 'completed'
        })

        await supabase.rpc('increment_xp', { x: xpReward })
        get().checkBadges()
    },

    fetchGoals: async () => {
        set({ isLoading: true })
        const supabase = createClient()

        try {
            const { data, error } = await supabase
                .from('goals')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error

            const mappedGoals: Goal[] = (data || []).map(g => ({
                id: g.id,
                title: g.title,
                targetAmount: Number(g.target_amount),
                currentAmount: Number(g.current_amount),
                imageUrl: g.image_url || '/assets/placeholder.png',
                status: g.status
            }))

            set({ goals: mappedGoals })
            get().checkBadges()
        } catch (error) {
            console.error('Error fetching goals:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    addMoney: async (goalId, amount, description = 'Hızlı Ekleme') => {
        const supabase = createClient()
        const user = get().user
        if (!user) return

        set(state => ({
            goals: state.goals.map(g =>
                g.id === goalId
                    ? { ...g, currentAmount: g.currentAmount + amount }
                    : g
            ),
            xp: state.xp + 10
        }))

        try {
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    goal_id: goalId,
                    amount: amount,
                    type: 'deposit',
                    description: description
                })

            if (txError) throw txError

            await supabase.rpc('update_goal_amount', {
                goal_id: goalId,
                amount_to_add: amount
            })

            await supabase.rpc('increment_xp', { x: 10 })
            get().checkBadges()

        } catch (error) {
            console.error("Error adding money:", error)
            get().fetchGoals()
        }
    },

    logout: async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        set({ user: null, goals: [] })
    }
}))
