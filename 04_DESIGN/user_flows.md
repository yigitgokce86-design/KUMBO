# 🌊 KUMBO - Kullanıcı Akışları (User Flows)

## 1. Onboarding Akışı (Fiko ile Tanışma)
1. **Giriş:** Splash screen'de Fiko el sallar. (Animasyon)
2. **İsim:** "Merhaba, senin adın ne?" (Input: İsim)
3. **Hedef:** "Peki, ne için biriktirmek istersin? Linkini buraya ekle!" (Input: URL)
4. **Onay (Robot):** Robot veriyi çeker: "Bu LEGO City mi? Fiyatı 1.250 TL. Başlayalım mı?" (Button: Evet!)
5. **Kurulum Tamam:** "Harika! Dashboard'una hoş geldin."

## 2. Para Ekleme Akışı (Fındık Kumbarası)
1. **Buton:** Ana ekrandaki turuncu zıplayan fındık butonuna basılır.
2. **Miktar:** "Bugün ne kadar fındık ekledin?" (Input: Tutar + Not)
3. **Animasyon:** Fındıklar bir tıkırtı sesiyle kumbaraya düşer.
4. **Geri Bildirim:** Fiko: "Biraz daha yaklaştın! Harika gidiyorsun."
5. **Milestone (Opsiyonel):** Eğer %25/%50 vb. geçildiyse konfeti animasyonu ve rozet kazanımı.

## 3. Hatırlatıcı Akışı (Bobo Devrede)
1. **Trigger:** Kullanıcı 3 gün boyunca uygulama açmaz.
2. **Push Bildirim:** Bobo: "Hazırım, sen de hazır mısın? Seni bekliyoruz."
3. **Geri Dönüş:** Kullanıcı uygulamayı açtığında Bobo kuyruk sallar: "Buradasın! Devam edelim."

## 4. Ebeveyn Kapısı (Parental Gate)
1. **Giriş:** Ayarlar veya Satın Al butonuna basılır.
2. **Bariyer:** Ekranda bir matematik sorusu belirir: "12 + 15 = ?"
3. **Sonuç:** Doğru cevap verilirse ebeveyn paneline geçilir, yanlışsa geri dönülür.

## 5. Başarı Akışı (Hedefe Ulaşma)
1. **Son Adım:** Son para eklendiğinde %100 olur.
2. **Kutlama:** Tüm karakterler ekrana gelir. (Fiko, Robot, Bobo bir arada)
3. **Satın Alma:** Robot: "Paran hazır! Satın almak için tıkla."
4. **Dönüşüm:** Linke yönlendirilir ve süreç başarıyla tamamlanır.
