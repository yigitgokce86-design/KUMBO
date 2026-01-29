# ⚙️ KUMBO - Backend Development SOP (Standart Operasyon Prosedürü)

## 1. Teknoloji Yığını (Tech Stack)
- **Runtime:** Node.js 18+
- **Dil:** TypeScript
- **Framework:** Firebase Cloud Functions / Express
- **Database:** Firestore (NoSQL)
- **Auth:** Firebase Auth
- **Validation:** Zod
- **API Documentation:** Swagger / OpenApi (veya README içi dökümantasyon)

## 2. Proje Yapısı (Directory Structure)
```
functions/
├── src/
│   ├── api/            # Route tanımlamaları
│   ├── controllers/    # İş mantığı (Request/Response handling)
│   ├── services/       # Harici servisler (Scraper, LLM, Firebase Admin)
│   ├── models/         # TypeScript interface ve Zod şemaları
│   ├── middlewares/    # Auth, Validation, Error Handling
│   └── utils/          # Helper fonksiyonlar ve logger
├── test/               # Unit ve integration testleri
└── index.ts            # Entry point
```

## 3. Geliştirme Kuralları
- **RESTful:** Standart HTTP metodları (GET, POST, PUT, DELETE) kullanılmalıdır.
- **Error Handling:** Merkezi bir error handler middleware kullanılmalıdır.
- **Logging:** `firebase-functions/logger` ile tüm kritik işlemler (para ekleme, hedef tamamlama) loglanmalıdır.
- **Type Safety:** `any` kullanımı yasaktır. Her veri giriş/çıkışı tip korumalı olmalıdır.

## 4. Servis Entegrasyonları
- **Scraper Service:** Amazon ve Trendyol için `puppeteer` veya hızlı bir fetching kütüphanesi kullanılacaktır.
- **Motivasyon Motoru:** Google Vertex AI (Gemini 1.5 Flash) entegrasyonu ile karakter bazlı mesajlar üretilecektir.
- **Security:** Tüm endpointler Firebase Auth token doğrulaması yapmalıdır.

## 5. Veritabanı (Firestore) Kuralları
- NoSQL mantığına göre "read-optimized" döküman yapıları kurulmalıdır.
- `updatedAt` ve `createdAt` alanları her dökümanda bulunmalıdır.
- Firestore Security Rules ile yetkisiz erişimler engellenmelidir.

## 6. PR ve Deployment Süreci
- **Lints:** `eslint` ve `prettier` kurallarına uymayan kodlar commit edilemez.
- **Deployment:** Firebase CLI (`firebase deploy --only functions`) kullanılmalıdır.
- **Version Control:** Git Flow (feature -> develop -> main) kullanılmalıdır.
