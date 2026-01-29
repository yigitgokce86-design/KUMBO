# 💻 KUMBO - Frontend Development SOP (Standart Operasyon Prosedürü)

## 1. Teknoloji Yığını (Tech Stack)
- **Framework:** React 18+ (Vite ile)
- **Dil:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** TanStack Query (Server State) + Zustand (Client State)
- **Routing:** React Router v6
- **Form Management:** React Hook Form + Zod (Validation)
- **Komponent Kütüphanesi:** Shadcn/UI (Özelleştirilmiş)

## 2. Proje Yapısı (Directory Structure)
```
src/
├── assets/          # Görseller, ikonlar, fontlar
├── components/      # Atomik komponentler (Button, Input, Card)
│   ├── ui/          # Shadcn/UI bileşenleri
│   └── shared/      # Projeye özel ortak bileşenler
├── features/        # Feature-based yapı (auth, goals, dashboard)
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types.ts
├── hooks/           # Global hooklar
├── layouts/         # Sayfa düzenleri (MainLayout, AuthLayout)
├── pages/           # Sayfa bileşenleri
├── services/        # API istemcileri (Axios/Fetch config)
├── store/           # Zustand store'ları
├── types/           # Global TypeScript tipleri
└── utils/           # Helper fonksiyonlar
```

## 3. Kodlama Standartları
- **Bileşenler:** Fonksiyonel bileşenler ve `const` tanımlamaları kullanılmalıdır.
- **Naming:** 
  - Bileşenler: PascalCase (`GoalCard.tsx`)
  - Fonksiyonlar/Hooklar: camelCase (`useGoalData.ts`)
  - CSS Sınıfları: Tailwind utility class'ları.
- **Props:** Her bileşen için mutlaka `interface` tanımlanmalıdır.
- **İletişim Dili:** Marka rehberine uygun olarak emojisiz ve "Biraz daha yaklaş" felsefesiyle uyumlu hata mesajları/uyarılar.

## 4. UI/UX Kuralları
- **Border Radius:** Tüm buton ve kartlarda `rounded-2xl` veya `rounded-3xl` (Bubble-style) kullanılmalıdır.
- **Animasyonlar:** `framer-motion` ile hafif zıplama (bounce) ve geçiş efektleri eklenmelidir.
- **Responsive:** Tasarım öncelikle mobil (`375px`) odaklı olmalıdır.

## 5. Hata Yönetimi
- Global bir `ErrorBoundary` kullanılmalıdır.
- API hataları için kullanıcıyı korkutmayan, "Bobo" karakteriyle desteklenen yumuşak uyarı popup'ları gösterilmelidir.

## 6. Deployment
- **Ortam:** Vercel veya Firebase Hosting.
- **CI/CD:** GitHub Actions üzerinden her PR için "Preview" linki oluşturulmalıdır.
