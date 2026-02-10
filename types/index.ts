export type UserRole = 'parent' | 'child' | 'admin';

export interface User {
    id: string;
    name?: string;
    role: UserRole;
    email?: string;
    pin_hash?: string;
    avatar_url?: string;
    parent_id?: string;
    allowance_amount?: number;
    allowance_day?: string;
    last_allowance_paid?: string;
    created_at: string;
}

export interface Goal {
    id: string;
    child_id: string;
    title: string;
    target_amount: number;
    current_amount: number;
    status: 'active' | 'completed' | 'pending_approval';
    image_url?: string;
}

export interface Task {
    id: string;
    child_id: string;
    title: string;
    reward_amount: number; // Stored as decimal
    frequency: 'one_time' | 'daily' | 'weekly';
    status: 'available' | 'pending_approval' | 'approved' | 'rejected';
    image_url?: string;
    created_at: string;
}

export interface Transaction {
    id: string;
    user_id: string;
    amount: number;
    type: 'allowance' | 'task_earning' | 'goal_saving' | 'withdrawal';
    description: string;
    timestamp: string;
}
