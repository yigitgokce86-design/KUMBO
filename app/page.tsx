import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { ArrowRight, Sparkles, Rocket, ShieldCheck, Target, ListChecks, TrendingUp } from 'lucide-react';
import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Background Decor */}
      <div className={styles.blob1}></div>
      <div className={styles.blob2}></div>

      {/* Stick Navigation / Header */}
      <nav className={styles.navbar}>
        <div className={styles.navLogo}>
          <h1 className="text-2xl font-bold tracking-tight text-indigo-600">Kumbo</h1>
        </div>
        <div className={styles.navLinks}>
          <a href="#nasil-calisir">Nasıl Çalışır?</a>
          <a href="#karakterler">Karakterler</a>
          <a href="#temalar">Temalar</a>
        </div>
        <Link href="/parent/login">
          <Button size="sm" variant="primary">Başla</Button>
        </Link>
      </nav>

      <div className={styles.container}>
        {/* HERO SECTION */}
        <section className={styles.heroSection}>
          <h1 className={styles.heroTitle}>
            Kumbo ile <span className={styles.highlightGreen}>hedefine</span> <span className={styles.highlightYellow}>ulaş!</span>
          </h1>
          <p className={styles.heroSubtitle}>
            İstediğin şeye adım adım yaklaşmayı eğlenceli ve güvenli hale getirir. <br />
            Çocuklar için tasarruf, ebeveynler için güven.
          </p>

          <div className={styles.heroActions}>
            <Link href="/child/login">
              <Button size="lg" variant="primary" rightIcon={<Rocket size={20} />}>Hadi Başlayalım</Button>
            </Link>
            <Link href="#nasil-calisir">
              <Button size="lg" variant="secondary">Nasıl Çalışır?</Button>
            </Link>
          </div>

          {/* Role Cards (Mini) */}
          <div className={styles.roleGrid}>
            <Link href="/child/login" className="flex-1 min-w-[200px] no-underline">
              <GlassCard hoverEffect className={styles.roleCardMini}>
                <div className={styles.miniIcon}>
                  <img src="/branding/character-child.png" alt="Child" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Ben Çocuğum</h3>
                  <p className="text-xs text-slate-500">Giriş yap ve biriktir</p>
                </div>
              </GlassCard>
            </Link>

            <Link href="/parent/login" className="flex-1 min-w-[200px] no-underline">
              <GlassCard hoverEffect className={styles.roleCardMini}>
                <div className={styles.miniIcon}>
                  <img src="/branding/character-parent.png" alt="Parent" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Ben Ebeveynim</h3>
                  <p className="text-xs text-slate-500">Yardım et ve takip et</p>
                </div>
              </GlassCard>
            </Link>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="nasil-calisir" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Nasıl Çalışır?</span>
            <h2 className={styles.sectionTitle}>Beş adımda <span className={styles.highlightGreen}>hedefe ulaş</span></h2>
            <p className={styles.sectionDesc}>Her adım çocuğun kontrolünde, her karar ebeveynin güven sınırları içinde.</p>
          </div>

          <div className={styles.timelineSection}>
            <div className={styles.timelineLine}></div>

            {/* Step 1 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>1</div>
              <div className={styles.timelineContentWrapper}>
                <GlassCard className={styles.timelineCard}>
                  <div className={`${styles.timelineIconBox} bg-orange-100 text-orange-600`}>
                    <span style={{ fontSize: '1.5rem' }}>🎯</span>
                  </div>
                  <div>
                    <h3 className={styles.timelineTitle}>Hedef Belirlenir</h3>
                    <p className={styles.timelineDesc}>Çocuk istediği bir şeyi hedef olarak seçer.</p>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Step 2 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>2</div>
              <div className={styles.timelineContentWrapper}>
                <GlassCard className={styles.timelineCard}>
                  <div className={`${styles.timelineIconBox} bg-blue-100 text-blue-600`}>
                    <span style={{ fontSize: '1.5rem' }}>📝</span>
                  </div>
                  <div>
                    <h3 className={styles.timelineTitle}>Plan Oluşturulur</h3>
                    <p className={styles.timelineDesc}>Basit bir birikim planı yapılır.</p>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Step 3 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>3</div>
              <div className={styles.timelineContentWrapper}>
                <GlassCard className={styles.timelineCard}>
                  <div className={`${styles.timelineIconBox} bg-green-100 text-green-600`}>
                    <span style={{ fontSize: '1.5rem' }}>🚀</span>
                  </div>
                  <div>
                    <h3 className={styles.timelineTitle}>İlerleme Görünür</h3>
                    <p className={styles.timelineDesc}>Para eklendikçe hedefe yaklaşma görselleşir.</p>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Step 4 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>4</div>
              <div className={styles.timelineContentWrapper}>
                <GlassCard className={styles.timelineCard}>
                  <div className={`${styles.timelineIconBox} bg-yellow-100 text-yellow-600`}>
                    <span style={{ fontSize: '1.5rem' }}>🎉</span>
                  </div>
                  <div>
                    <h3 className={styles.timelineTitle}>Başarılar Kutlanır</h3>
                    <p className={styles.timelineDesc}>Küçük başarılar rozetlerle ödüllendirilir.</p>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Step 5 */}
            <div className={styles.timelineItem}>
              <div className={styles.timelineNumber}>5</div>
              <div className={styles.timelineContentWrapper}>
                <GlassCard className={styles.timelineCard}>
                  <div className={`${styles.timelineIconBox} bg-purple-100 text-purple-600`}>
                    <span style={{ fontSize: '1.5rem' }}>⭐</span>
                  </div>
                  <div>
                    <h3 className={styles.timelineTitle}>Hedef Tamamlanır</h3>
                    <p className={styles.timelineDesc}>"Kutlarız! Gerçekten çok iyi başardın."</p>
                  </div>
                </GlassCard>
              </div>
            </div>

          </div>
        </section>

        {/* CHARACTERS SECTION */}
        <section id="karakterler" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Karakterler</span>
            <h2 className={styles.sectionTitle}>Üç arkadaş, <span className={styles.highlightPurple}>bir yolculuk</span></h2>
            <p className={styles.sectionDesc}>Karakterler maskot değil, fonksiyonel persona. Her biri farklı bir görevi üstlenir.</p>
          </div>

          <div className={styles.charGrid}>
            {/* Fiko */}
            <div className={styles.charCard}>
              <img src="/branding/character-fiko.png" alt="Fiko" className={styles.charImage} />
              <h3 className={styles.charName}>Fiko</h3>
              <span className={styles.charRole}>ANA KOÇ</span>
              <p className={styles.charDesc}>Aksiyon başlatır, kutlar, rehberlik eder. Markanın sesi.</p>
              <div className={styles.quoteBox}>"Hadi ilk hedefini seçelim!"</div>
            </div>

            {/* Kumbo */}
            <div className={styles.charCard}>
              <img src="/branding/character-kumbo.png" alt="Kumbo" className={styles.charImage} />
              <h3 className={styles.charName}>Kumbo</h3>
              <span className={styles.charRole}>ROBOT</span>
              <p className={styles.charDesc}>Hesaplar, planlar, netlik sağlar. Markanın aklı.</p>
              <div className={styles.quoteBox}>"Bu hızla hedefe 18 gün kaldı."</div>
            </div>

            {/* Bobo */}
            <div className={styles.charCard}>
              <img src="/branding/character-bobo.png" alt="Bobo" className={styles.charImage} />
              <h3 className={styles.charName}>Bobo</h3>
              <span className={styles.charRole}>DUYGUSAL DESTEK</span>
              <p className={styles.charDesc}>Empati kurar, nazikçe hatırlatır. Markanın kalbi.</p>
              <div className={styles.quoteBox}>"Küçük adımlar da önemli."</div>
            </div>
          </div>
        </section>

        {/* THEMES SECTION */}
        <section id="temalar" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Temalar</span>
            <h2 className={styles.sectionTitle}>Her çocuk için <span className={styles.highlightYellow}>ayrı bir dünya</span></h2>
            <p className={styles.sectionDesc}>Tema, çocuğun birikimi nasıl anlamlandıracağını belirleyen bir deneyim çerçevesidir.</p>
          </div>

          <div className={styles.themesGrid}>
            <GlassCard className={`${styles.themeCard} bg-emerald-50`}>
              <div className={styles.themeIcon}>🌳</div>
              <h3 className={styles.themeTitle}>Doğa ve İzci</h3>
              <p className={styles.themeDesc}>Birikimi bir keşif ve emek yolculuğu olarak ele alır.</p>
            </GlassCard>
            <GlassCard className={`${styles.themeCard} bg-orange-50`}>
              <div className={styles.themeIcon}>🏆</div>
              <h3 className={styles.themeTitle}>Spor ve Koç</h3>
              <p className={styles.themeDesc}>Birikimi bir antrenman ve müsabaka süreci gibi kurgular.</p>
            </GlassCard>
            <GlassCard className={`${styles.themeCard} bg-indigo-50`}>
              <div className={styles.themeIcon}>🚀</div>
              <h3 className={styles.themeTitle}>Uzay ve Merak</h3>
              <p className={styles.themeDesc}>Birikimi bir uzay yolculuğu olarak ele alır.</p>
            </GlassCard>
          </div>
        </section>

        {/* VALUES SECTION (Kumbo neden farklı?) */}
        <section id="degerlerimiz" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Değerlerimiz</span>
            <h2 className={styles.sectionTitle}>Kumbo <span className={styles.highlightGreen}>neden farklı?</span></h2>
          </div>

          <div className={styles.valuesGrid}>
            <GlassCard className={styles.valueCard}>
              <div className={`${styles.valueIcon} bg-emerald-100 text-emerald-600`}>
                <span style={{ fontSize: '1.25rem' }}>🛡️</span>
              </div>
              <div>
                <h3 className={styles.valueTitle}>Etik Sınırlar</h3>
                <p className={styles.valueDesc}>Korku dili, geri sayım veya satın alma baskısı kullanmaz.</p>
              </div>
            </GlassCard>

            <GlassCard className={styles.valueCard}>
              <div className={`${styles.valueIcon} bg-teal-100 text-teal-600`}>
                <span style={{ fontSize: '1.25rem' }}>🤐</span>
              </div>
              <div>
                <h3 className={styles.valueTitle}>Bilinçli Sessizlik</h3>
                <p className={styles.valueDesc}>Her yerde konuşmaz. Sessizlik = güven.</p>
              </div>
            </GlassCard>

            <GlassCard className={styles.valueCard}>
              <div className={`${styles.valueIcon} bg-orange-100 text-orange-600`}>
                <span style={{ fontSize: '1.25rem' }}>😊</span>
              </div>
              <div>
                <h3 className={styles.valueTitle}>Oyunbaz, Sakin</h3>
                <p className={styles.valueDesc}>Abartılı değil, manipülatif değil. Cesaret verici.</p>
              </div>
            </GlassCard>

            <GlassCard className={styles.valueCard}>
              <div className={`${styles.valueIcon} bg-indigo-100 text-indigo-600`}>
                <span style={{ fontSize: '1.25rem' }}>🧠</span>
              </div>
              <div>
                <h3 className={styles.valueTitle}>Alışkanlık &gt; Dürtü</h3>
                <p className={styles.valueDesc}>Dopamin bağımlılık için değil, sağlıklı alışkanlık için.</p>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* SAFETY SECTION (Güvenle tasarlandı) */}
        <section id="guvenlik" className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Ebeveynler İçin</span>
            <h2 className={styles.sectionTitle}>Güvenle <span className={styles.highlightGreen}>tasarlandı</span></h2>
            <p className={styles.sectionDesc}>Kumbo, çocuğunuzun dijital deneyimini güvenli ve kontrollü tutar.</p>
          </div>

          <div className={styles.safetyGrid}>
            <GlassCard className={styles.safetyCard}>
              <div className={`${styles.safetyIcon} bg-emerald-500 text-white`}>
                <span style={{ fontSize: '1.5rem' }}>🔒</span>
              </div>
              <div>
                <h3 className={styles.safetyTitle}>Veri güvenliği</h3>
                <p className={styles.safetyDesc}>Çocuğunuzun verileri şifrelenir ve üçüncü taraflarla paylaşılmaz.</p>
              </div>
            </GlassCard>

            <GlassCard className={styles.safetyCard}>
              <div className={`${styles.safetyIcon} bg-orange-500 text-white`}>
                <span style={{ fontSize: '1.5rem' }}>👁️</span>
              </div>
              <div>
                <h3 className={styles.safetyTitle}>Çocuğunuz için güvenli bir deneyim</h3>
                <p className={styles.safetyDesc}>Dış bağlantı ve satın alma baskısı yok.</p>
              </div>
            </GlassCard>

            <GlassCard className={styles.safetyCard}>
              <div className={`${styles.safetyIcon} bg-purple-500 text-white`}>
                <span style={{ fontSize: '1.5rem' }}>🚫</span>
              </div>
              <div>
                <h3 className={styles.safetyTitle}>Reklamsız ortam</h3>
                <p className={styles.safetyDesc}>Kumbo'da çocuklarınıza hiçbir reklam, sponsorlu içerik veya gizli promosyon sunulmaz.</p>
              </div>
            </GlassCard>

            <GlassCard className={styles.safetyCard}>
              <div className={`${styles.safetyIcon} bg-blue-500 text-white`}>
                <span style={{ fontSize: '1.5rem' }}>⚙️</span>
              </div>
              <div>
                <h3 className={styles.safetyTitle}>Tam kontrol sizde</h3>
                <p className={styles.safetyDesc}>Hedefleri, katkı miktarlarını ve bildirimleri istediğiniz gibi ayarlayın.</p>
              </div>
            </GlassCard>
          </div>
        </section>

        <footer className={styles.footer}>
          <p>© 2026 Kumbo. All rights reserved.</p>
        </footer>

      </div >
    </main >
  );
}
