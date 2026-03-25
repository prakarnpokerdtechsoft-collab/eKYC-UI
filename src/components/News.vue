<script setup>
import { ref } from 'vue'
import { langState } from '../store/lang.js'

const emit = defineEmits(['back'])

const newsItems = ref([
  {
    id: 1,
    tag: 'บทความ',
    title: 'มารู้จักรถแลกเงิน',
    author: 'ltoalt',
    date: 'May 11, 2020',
    snippet: 'มารู้จักรถแลกเงิน ว่ารถแลกเงินคืออะไร รถแลกเงินคือ การนำรถไปเป็นหลักทรัพย์ค้ำประกันเพื่อแลกรับเงินสด...',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=400&h=200&q=80'
  },
  {
    id: 2,
    tag: 'บทความ',
    title: 'เลือกซื้อรถยนต์มือสองอย่างไร ถึงจะไม่โดนย้อมแมว',
    author: 'ltoalt',
    date: 'May 9, 2020',
    snippet: 'อย่างที่เราได้เกริ่นไปในตอนแรกว่า การเลือกซื้อรถมือสองนั้นต้องทำการศึกษาข้อมูลกันพอสมควรเลยทีเดียว...',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=400&h=200&q=80'
  },
  {
    id: 3,
    tag: 'บทความ',
    title: 'รีไฟแนนซ์รถอย่างไร ถึงจะคุ้มค่าที่สุด?',
    author: 'ltoalt',
    date: 'May 9, 2020',
    snippet: 'การรีไฟแนนซ์รถถือเป็นอีกช่องทางสำหรับคนที่ต้องการหาเงินก้อนมาใช้จ่ายในเรื่องจำเป็น แต่ประเด็นของหลาย ๆ...',
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=400&h=200&q=80'
  }
])
</script>

<template>
  <div class="news-absolute-wrapper">
    <div class="news-content">
      <!-- Navbar -->
      <header class="navbar">
        <button class="icon-btn back-btn" @click="$emit('back')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="greeting">
          <span class="greeting-main">{{ langState.t('ข่าวสารและโปรโมชั่น', 'News & Promotions') }}</span>
        </div>
        <div class="empty-space"></div>
      </header>

      <!-- Hero Banner -->
      <section class="news-hero">
        <div class="hero-content-inner">
          <h1 class="hero-title">{{ langState.t('โปรเด็ด ข่าวโดน', 'Special Offers & Updates') }}</h1>
          <p class="hero-subtitle">{{ langState.t('อัปเดตสิทธิพิเศษและข่าวสารก่อนใคร ไม่พลาดทุกกิจกรรมดีๆ', 'Stay updated with exclusive offers and the latest news') }}</p>
        </div>
      </section>

      <!-- News Grid -->
      <section class="news-section">
        <h2 class="section-title">{{ langState.t('บทความล่าสุด', 'Latest Articles') }}</h2>
        <div class="news-grid">
          <article v-for="item in newsItems" :key="item.id" class="service-card news-card-custom">
            <div class="card-image-wrapper">
              <span class="tag">{{ item.tag }}</span>
              <img :src="item.image" :alt="item.title" class="news-image" />
            </div>
            <div class="card-info news-info">
              <div class="news-meta">
                <span class="author">{{ item.author }}</span>
                <span class="dot">•</span>
                <span class="date">{{ item.date }}</span>
              </div>
              <h3 class="card-title news-title-card">{{ item.title }}</h3>
              <p class="card-desc news-snippet-card">{{ item.snippet }}</p>
              
              <div class="read-more">
                <span>{{ langState.t('อ่านเพิ่มเติม', 'Read More') }}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.news-absolute-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #f4f7fc;
  z-index: 50;
  overflow-y: auto;
  overflow-x: hidden;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

.news-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px 80px 32px;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;
}

.icon-btn {
  width: 52px;
  height: 52px;
  background-color: #ffffff;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s ease;
}

@media (hover: hover) {
  .icon-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  }
}

.empty-space {
  width: 52px;
}

.greeting-main {
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
}

/* Hero Banner */
.news-hero {
  margin-top: 8px;
  width: 100%;
  min-height: 240px;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(234, 88, 12, 0.9) 0%, rgba(249, 115, 22, 0.8) 100%), 
              url('https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?auto=format&fit=crop&w=1200&q=80') center/cover no-repeat;
  display: flex;
  align-items: center;
  padding: 48px 56px;
  box-shadow: 0 20px 40px rgba(249, 115, 22, 0.2);
  position: relative;
  overflow: hidden;
}

.news-hero::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15));
  pointer-events: none;
}

.hero-content-inner {
  max-width: 600px;
  z-index: 2;
}

.hero-title {
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 16px 0;
  line-height: 1.2;
  text-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.hero-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.95);
  margin: 0;
  line-height: 1.6;
  font-weight: 400;
}

/* News Section */
.news-section {
  margin-top: 56px;
}

.section-title {
  font-size: 26px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 28px 0;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 28px;
}

.service-card {
  background: #ffffff;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px -1px rgba(0, 0, 0, 0.02);
  border: 1px solid rgba(226, 232, 240, 0.6);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

@media (hover: hover) {
  .service-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
    border-color: rgba(249, 115, 22, 0.3);
  }
}

.card-image-wrapper {
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.news-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

@media (hover: hover) {
  .service-card:hover .news-image {
    transform: scale(1.05);
  }
}

.tag {
  position: absolute;
  top: 16px;
  left: 16px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  color: #f97316;
  font-size: 13px;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 99px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 2;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.news-info {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.news-meta {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #64748b;
  margin-bottom: 12px;
  font-weight: 500;
}

.dot {
  margin: 0 8px;
  color: #cbd5e1;
}

.news-title-card {
  font-size: 20px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.news-snippet-card {
  font-size: 15px;
  color: #475569;
  margin: 0 0 24px 0;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.read-more {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #f97316;
  font-weight: 600;
  font-size: 15px;
  margin-top: auto;
  transition: opacity 0.3s ease;
}

@media (hover: hover) {
  .service-card:hover .read-more {
    opacity: 0.8;
  }
  
  .service-card:hover .read-more svg {
    transform: translateX(4px);
  }
}

.read-more svg {
  transition: transform 0.3s ease;
}

/* Responsive constraints for smaller screens */
@media (max-width: 768px) {
  .news-absolute-wrapper {
    position: absolute;
    width: 100vw;
  }
  
  .news-content {
    padding: 0 16px 32px 16px;
  }

  .navbar {
    padding: 16px 0;
  }

  .icon-btn {
    width: 44px;
    height: 44px;
  }
  
  .empty-space {
    width: 44px;
  }

  .greeting-main {
    font-size: 18px;
  }
  
  .news-hero {
    padding: 32px 24px;
    min-height: 160px;
    border-radius: 20px;
  }
  
  .hero-title {
    font-size: 24px;
    margin-bottom: 12px;
  }
  
  .hero-subtitle {
    font-size: 14px;
  }

  .news-section {
    margin-top: 32px;
  }
  
  .section-title {
    font-size: 22px;
    margin-bottom: 20px;
  }
  
  .news-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .service-card {
    border-radius: 16px;
  }
  
  .card-image-wrapper {
    height: 180px;
  }
  
  .news-info {
    padding: 20px 16px;
  }
  
  .news-title-card {
    font-size: 18px;
  }
  
  .news-snippet-card {
    font-size: 14px;
    margin-bottom: 20px;
  }
}
</style>
