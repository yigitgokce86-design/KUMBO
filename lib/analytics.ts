type EventName = 'task_created' | 'task_completed' | 'task_approved' | 'goal_created' | 'goal_approved' | 'goal_reached' | 'user_login' | 'allowance_paid';

export const logEvent = (eventName: EventName, userId: string, metadata?: Record<string, unknown>) => {
    // In a real app, this would send data to Supabase 'analytics_events' table or PostHog/Mixpanel.
    // For now, we log to console for development visibility.
    console.log(`[Analytics] ${eventName} - User: ${userId}`, metadata);

    // TODO: Implement actual Supabase insert when 'analytics' table is ready
    /*
    supabase.from('analytics_events').insert({
        event: eventName,
        user_id: userId,
        metadata: metadata,
        timestamp: new Date().toISOString()
    });
    */
};
