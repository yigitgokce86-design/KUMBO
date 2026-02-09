"use client"

// Simple Analytics Wrapper
// In the future, replace console.log with PostHog or Supabase calls.

type EventName =
    | "page_view"
    | "login"
    | "signup"
    | "goal_created"
    | "money_added"
    | "lesson_started"
    | "lesson_completed"
    | "quiz_completed"

interface EventProperties {
    [key: string]: any
}

export const Analytics = {
    track: (name: EventName, properties?: EventProperties) => {
        // In production, sending to real backend
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] ${name}`, properties)
        }

        // Example PostHog integration:
        // posthog.capture(name, properties)
    },

    identify: (userId: string, traits?: EventProperties) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Analytics] Identify ${userId}`, traits)
        }
    }
}
