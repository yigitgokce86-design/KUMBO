"use client"

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeType, THEMES, ThemeConfig } from '../theme-config'

interface ThemeState {
    currentTheme: ThemeType
    config: ThemeConfig
    setTheme: (theme: ThemeType) => void
}

export const useTheme = create<ThemeState>()(
    persist(
        (set) => ({
            currentTheme: 'nature',
            config: THEMES['nature'],
            setTheme: (theme) => set({
                currentTheme: theme,
                config: THEMES[theme]
            }),
        }),
        {
            name: 'kumbo-theme-storage',
        }
    )
)
