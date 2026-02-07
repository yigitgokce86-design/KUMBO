import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const body = await request.json()
    const { code } = body

    const VALID_CODE = process.env.BETA_ACCESS_CODE || "KUMBO2024"

    if (code === VALID_CODE) {
        // Set cookie
        const cookieStore = await cookies()
        // Using 'p_beta_access' (private beta access)
        cookieStore.set('p_beta_access', 'true', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: 60 * 60 * 24 * 30 // 30 days
        })

        return NextResponse.json({ success: true })
    }

    return NextResponse.json({ success: false }, { status: 401 })
}
