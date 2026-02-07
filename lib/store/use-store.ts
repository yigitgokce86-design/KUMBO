import { create } from 'zustand'
import { createClient } from '@/lib/supabase/client' // Use the client-side client

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

    // Actions
    fetchGoals: () => Promise<void>
    addMoney: (goalId: string, amount: number) => Promise<void>
    setUser: (user: User | null) => void
    logout: () => Promise<void>
    completeLesson: (lessonId: string, xpReward: number) => Promise<void>
}

export const useStore = create<StoreState>((set, get) => ({
    user: null, // Initial state is null, will be populated by AuthProvider or manual fetch
    goals: [],
    isLoading: false,

    xp: 0,
    completedLessons: [],

    setUser: (user) => set({ user }),

    completeLesson: async (lessonId, xpReward) => {
        const { completedLessons, xp } = get()

        // Prevent double reward
        if (completedLessons.includes(lessonId)) return

        // Optimistic Update
        set({
            completedLessons: [...completedLessons, lessonId],
            xp: xp + xpReward
        })

        // TODO: Sync with Supabase 'progress' table in Phase 7
        // const supabase = createClient()
        // await supabase.from('progress').insert(...)
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

            // Map database snake_case to typescript camelCase if needed, 
            // but for now let's assume we align or map manually.
            // valid way:
            const mappedGoals: Goal[] = (data || []).map(g => ({
                id: g.id,
                title: g.title,
                targetAmount: Number(g.target_amount), // Numeric returns as string sometimes
                currentAmount: Number(g.current_amount),
                imageUrl: g.image_url || '/assets/placeholder.png', // Fallback
                status: g.status
            }))

            set({ goals: mappedGoals })
        } catch (error) {
            console.error('Error fetching goals:', error)
        } finally {
            set({ isLoading: false })
        }
    },

    addMoney: async (goalId, amount) => {
        const supabase = createClient()
        const user = get().user
        if (!user) return

        // Optimistic Update
        set(state => ({
            goals: state.goals.map(g =>
                g.id === goalId
                    ? { ...g, currentAmount: g.currentAmount + amount }
                    : g
            )
        }))

        try {
            // 1. Insert Transaction
            const { error: txError } = await supabase
                .from('transactions')
                .insert({
                    user_id: user.id,
                    goal_id: goalId,
                    amount: amount,
                    type: 'deposit',
                    description: 'Hızlı Ekleme (Kumbaraya At)'
                })

            if (txError) throw txError

            // 2. Update Goal Amount
            // We use a clean RPC or just simple update if simpler:
            // Let's do a simple get-then-update or database trigger ideally.
            // For now, client-side calculation is risky but okay for OLP.
            // Better: use the current value from the DB.

            // Re-fetch specific goal to be safe or just increment
            // Supabase doesn't have a simple "increment" atomic operator in JS client without RPC.
            // So we will rely on the optimistic update + background re-fetch or use a simple update query.

            // Let's fetch the latest to ensure consistency
            const { data: goalData } = await supabase
                .from('goals')
                .select('current_amount')
                .eq('id', goalId)
                .single()

            if (goalData) {
                const newAmount = Number(goalData.current_amount) + amount
                await supabase
                    .from('goals')
                    .update({ current_amount: newAmount })
                    .eq('id', goalId)
            }

        } catch (error) {
            console.error("Error adding money:", error)
            // Rollback on error could go here
            get().fetchGoals() // Re-sync
        }
    },

    logout: async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        set({ user: null, goals: [] })
    }
}))
