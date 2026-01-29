# 🏗️ KUMBO - Veritabanı Şeması (Database Schema)

## 📂 Koleksiyonlar (Firebase Cloud Firestore)

### 1. `users` (Kullanıcılar)
```json
{
  "uid": "string",
  "name": "string",
  "email": "string",
  "parentUid": "string", // Ebeveyn bağlantısı
  "role": "child | parent",
  "createdAt": "timestamp",
  "avatar": "string", // Fiko/Robot/Bobo avatar seçimi
  "settings": {
    "notifications": "boolean",
    "currency": "string" // Varsayılan: TRY
  }
}
```

### 2. `goals` (Hedefler)
```json
{
  "goalId": "string",
  "userId": "string",
  "title": "string", // Ürün Adı
  "productUrl": "string", // Amazon/Trendyol Linki
  "targetPrice": "number",
  "currentAmount": "number",
  "currency": "string",
  "status": "active | completed | paused",
  "imageUrl": "string", // Ürün görseli
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "etaDays": "number" // Robot tarafından hesaplanan tahmini gün
}
```

### 3. `transactions` (Fındık Kumbarası İşlemleri)
```json
{
  "transactionId": "string",
  "goalId": "string",
  "userId": "string",
  "amount": "number",
  "type": "add | reward | manual_adjust",
  "note": "string",
  "timestamp": "timestamp"
}
```

### 4. `badges` (Rozetler)
```json
{
  "badgeId": "string",
  "userId": "string",
  "badgeType": "first_step | weekly_hero | seed | growing",
  "awardedAt": "timestamp"
}
```

### 5. `messages` (Karakter Mesajları - Log)
```json
{
  "messageId": "string",
  "userId": "string",
  "character": "fiko | robot | bobo",
  "content": "string",
  "trigger": "onboarding | streak | milestone",
  "timestamp": "timestamp"
}
```

## 🔒 Güvenlik Kuralları (Firestore Safety)
- Kullanıcılar sadece kendi verilerine erişebilir.
- `parent` rolündeki kullanıcılar `parentUid` eşleşen çocukların verilerini okuyabilir/yazabilir.
- Kritik fiyat güncellemeleri sadece sistem (Cloud Functions) tarafından yapılabilir.
