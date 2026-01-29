# 🔌 KUMBO - API Spesifikasyonu

## 🛠️ Temel Endpoint'ler (Node.js/Firebase Functions)

### 1. Ürün Analiz Servisi (The Robot)
- **Endpoint:** `POST /api/analyze-product`
- **Görev:** Verilen linkten (Amazon/Trendyol) ürün adı, fiyat ve görseli çeker.
- **Payload:** `{ "url": "string" }`
- **Response:** `{ "title": "LEGO City", "price": 1250, "image": "url", "currency": "TRY" }`

### 2. İlerleme Hesaplama (The Robot Logic)
- **Endpoint:** `GET /api/goals/:id/stats`
- **Görev:** Birikim hızına göre tahmini tamamlama süresini (ETA) hesaplar.
- **Response:** `{ "percentage": 45, "remainingAmount": 680, "etaDays": 12, "dailyAverage": 15.5 }`

### 3. Motivasyon Motoru (The Fiko/Bobo Engine)
- **Endpoint:** `POST /api/generate-message`
- **Görev:** Kullanıcının mevcut durumuna göre karakter mesajı üretir.
- **Payload:** `{ "userId": "string", "trigger": "milestone_50" }`
- **Response:** `{ "character": "fiko", "text": "Yolun yarısına geldin! Harika gidiyorsun!" }`

### 4. Ebeveyn Onay Mekanizması
- **Endpoint:** `POST /api/parent/approve-transaction`
- **Görev:** Çocuk tarafından girilen manüel birikimi ebeveynin onayına sunar.

## 🏗️ Mimari Katmanlar
1. **Frontend:** React + Tailwind (Mobile First PWA).
2. **Backend:** Firebase Cloud Functions (TypeScript).
3. **Database:** Firestore (NoSQL).
4. **Auth:** Firebase Auth (Email/Google).
5. **Storage:** Firebase Storage (Profil fotoğrafları ve makbuzlar).

## 🛡️ Güvenlik ve Rate Limiting
- Tüm request'lerde `Authorization: Bearer <ID_TOKEN>` zorunludur.
- Ürün scraping işlemi için Proxy-rotator kullanılacaktır (IP ban riskine karşı).
- Dakikada maksimum 10 mesaj üretimi (LLM maliyeti kontrolü).
