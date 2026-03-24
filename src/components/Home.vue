<script setup>
import { langState } from '../store/lang.js'

const emit = defineEmits(['apply-loan', 'view-news', 'contact-us', 'find-dream-car', 'track-status'])

const handleViewNews = () => {
  console.log('Promotion And News clicked!')
  emit('view-news')
}

const handleContactUs = () => {
  console.log('Contact Us clicked!')
  emit('contact-us')
}
</script>


<template>
  <div class="home-container">
    <header class="home-header">
      <div class="profile-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 6C13.93 6 15.5 7.57 15.5 9.5C15.5 11.43 13.93 13 12 13C10.07 13 8.5 11.43 8.5 9.5C8.5 7.57 10.07 6 12 6ZM12 20C9.97 20 7.57 19.18 5.86 17.12C7.55 15.8 9.68 15 12 15C14.32 15 16.45 15.8 18.14 17.12C16.43 19.18 14.03 20 12 20Z"
            fill="black" />
        </svg>
      </div>
      <div class="welcome-text">
        <span class="welcome-en">{{ langState.t('ยินดีต้อนรับ', 'Welcome') }}</span>
      </div>
    </header>

    <div class="banner">
      <div class="banner-content">
        <h2 class="banner-title">{{ langState.t('สินเชื่อรถยนต์มือสอง', 'Used Car Hire-Purchase') }}</h2>
      </div>
    </div>

    <div class="menu-grid">
      <!-- 1: Apply for Auto Loan -->
      <button class="menu-item" @click="$emit('apply-loan')">
        <div class="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-orange, #f97316)"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </div>
        <span class="menu-text" v-html="langState.t('สมัคร<br>สินเชื่อรถยนต์', 'Apply for<br>Auto Loan')"></span>
      </button>

      <!-- 2: Track Status -->
      <button class="menu-item" @click="$emit('track-status')">
        <div class="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-orange, #f97316)"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
            <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            <path d="M9 14h6"></path>
            <path d="M9 10h6"></path>
            <path d="M9 18h6"></path>
          </svg>
        </div>
        <span class="menu-text">{{ langState.t('ติดตามสถานะ', 'Track Status') }}</span>
      </button>

      <!-- 3: Find Dream Car -->
      <button class="menu-item" @click="$emit('find-dream-car')">
        <div class="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-orange, #f97316)"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <!-- Car abstract inside magnifying glass -->
            <path d="M8 12h6M9 9l4 0" stroke-width="1.5"></path>
          </svg>
        </div>
        <span class="menu-text">{{ langState.t('ค้นหารถในฝัน', 'Find Dream Car') }}</span>
      </button>

      <!-- 4: Calculate -->
      <button class="menu-item">
        <div class="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-orange, #f97316)"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
            <line x1="8" y1="6" x2="16" y2="6"></line>
            <line x1="16" y1="14" x2="16" y2="14.01"></line>
            <line x1="16" y1="10" x2="16" y2="10.01"></line>
            <line x1="12" y1="14" x2="12" y2="14.01"></line>
            <line x1="12" y1="10" x2="12" y2="10.01"></line>
            <line x1="8" y1="14" x2="8" y2="14.01"></line>
            <line x1="8" y1="10" x2="8" y2="10.01"></line>
            <line x1="8" y1="18" x2="16" y2="18"></line>
          </svg>
        </div>
        <span class="menu-text">{{ langState.t('คำนวณค่างวด', 'Calculate') }}</span>
      </button>

      <!-- 5: Contact us -->
      <button class="menu-item" @click="handleContactUs">
        <div class="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-orange, #f97316)"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">
            </path>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <span class="menu-text">{{ langState.t('ติดต่อเรา', 'Contact us') }}</span>
      </button>

      <!-- 6: Promotion And News -->
      <button class="menu-item" @click="handleViewNews">
        <div class="icon-wrapper">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--primary-orange, #f97316)"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 11l18-5v12L3 14v-3z"></path>
            <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>
          </svg>
        </div>
        <span class="menu-text" v-html="langState.t('โปรโมชั่น<br>& ข่าวสาร', 'Promotion And<br>News')"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  padding: 24px;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #fff;
}

.home-header {
  display: flex;
  align-items: center;
  margin-bottom: 24px;
}

.profile-icon {
  width: 48px;
  height: 48px;
  margin-right: 12px;
}

.profile-icon svg {
  width: 100%;
  height: 100%;
}

.welcome-text {
  display: flex;
  flex-direction: column;
}

.welcome-en {
  font-size: 14px;
  color: #6b7280;
  line-height: 1.2;
}

.welcome-th {
  font-size: 18px;
  font-weight: 700;
  color: #111;
  line-height: 1.2;
}

.banner {
  width: 100%;
  height: 140px;
  border-radius: 12px;
  margin-bottom: 32px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80');
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.banner-content {
  text-align: center;
  z-index: 2;
  width: 100%;
  padding: 0 16px;
}

.banner-title {
  color: #ffffff;
  font-size: 22px;
  font-weight: 800;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.menu-item {
  background-color: #f3f4f6;
  border: none;
  border-radius: 16px;
  padding: 20px 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.menu-item:hover,
.menu-item:active {
  transform: translateY(-2px);
  background-color: #e5e7eb;
}

.icon-wrapper {
  margin-bottom: 12px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-text {
  font-size: 11px;
  font-weight: 600;
  color: #4b5563;
  text-align: center;
  line-height: 1.3;
}
</style>
