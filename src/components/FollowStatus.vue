<script setup>
import { langState } from '../store/lang.js'

const emit = defineEmits(['back'])

const steps = [
  { id: 1, label: { th: 'Draft', en: 'Draft' }, completed: true },
  { id: 2, label: { th: 'In Process', en: 'In Process' }, completed: true },
  { id: 3, label: { th: 'Pre-Approved', en: 'Pre-Approved' }, completed: true },
  { id: 4, label: { th: 'Matching', en: 'Matching' }, completed: false },
  { id: 5, label: { th: 'Approved', en: 'Approved' }, completed: false }
]
</script>

<template>
  <div class="status-absolute-wrapper">
    <div class="status-content">
      <!-- Navbar -->
      <header class="navbar">
        <button class="icon-btn back-btn" @click="$emit('back')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="greeting">
          <span class="greeting-main">{{ langState.t('ติดตามสถานะ', 'Follow Status') }}</span>
        </div>
        <div class="empty-space"></div>
      </header>

      <div class="page-body">
        <div class="glass-card">
          <div class="card-header">
            <div class="status-icon-wrapper">
               <div class="status-circle"></div>
            </div>
            <div class="application-info">
              <h3 class="app-id">#250212000002</h3>
              <p class="app-status">On the way • 24 June</p>
            </div>
            <button class="chevron-wrapper">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <div class="progress-section">
            <div class="progress-line-container">
              <div class="progress-line-bg"></div>
              <!-- Current hardcoded 50% width since Pre-Approved is step 3 of 5 -->
              <div class="progress-line-fill" style="width: 50%;"></div>
            </div>
            
            <div class="steps-wrapper">
              <div v-for="(step, index) in steps" :key="step.id" class="step-item" :class="{ 'is-completed': step.completed, 'is-active': index === 2 }">
                <div class="step-circle-wrapper">
                  <div class="step-circle">
                    <svg v-if="step.completed" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
                <span class="step-label">
                  {{ langState.t(step.label.th, step.label.en) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.status-absolute-wrapper {
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

.status-content {
  max-width: 800px; /* Status page doesn't need to be 1200px wide */
  margin: 0 auto;
  padding: 0 32px 80px 32px;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;
  margin-bottom: 16px;
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

/* Page Body */
.page-body {
  width: 100%;
}

.glass-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid #f1f5f9;
}

.status-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #f8fafc;
  border: 2px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 4px solid #334155;
}

.application-info {
  flex: 1;
}

.app-id {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 4px 0;
}

.app-status {
  font-size: 15px;
  color: #64748b;
  font-weight: 500;
  margin: 0;
}

.chevron-wrapper {
  background: none;
  border: none;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

@media (hover: hover) {
  .chevron-wrapper:hover {
    background-color: #f1f5f9;
  }
}

.progress-section {
  position: relative;
  padding: 24px 0;
}

.progress-line-container {
  position: absolute;
  top: 48px;
  left: 10%;
  right: 10%;
  height: 4px;
  z-index: 1;
}

.progress-line-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e2e8f0;
  border-radius: 4px;
}

.progress-line-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #f97316;
  border-radius: 4px;
  transition: width 0.5s ease;
}

.steps-wrapper {
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  gap: 12px;
}

.step-circle-wrapper {
  background-color: #ffffff;
  padding: 6px;
  border-radius: 50%;
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 0 0 4px #ffffff;
}

.step-item.is-completed .step-circle {
  background-color: #f97316;
}

.step-item.is-active .step-circle {
  background-color: #ffffff;
  border: 3px solid #f97316;
  width: 26px;
  height: 26px;
  margin: 3px;
}

.step-label {
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  text-align: center;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.step-item.is-completed .step-label {
  color: #475569;
}

.step-item.is-active .step-label {
  color: #f97316;
  font-weight: 800;
}

/* Responsive constraints */
@media (max-width: 768px) {
  .status-absolute-wrapper {
    position: absolute;
    width: 100vw;
  }
  
  .status-content {
    padding: 0 16px 32px 16px;
  }

  .navbar {
    padding: 16px 0;
    margin-bottom: 8px;
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

  .glass-card {
    padding: 24px 20px;
    border-radius: 20px;
  }
  
  .card-header {
    margin-bottom: 32px;
    padding-bottom: 24px;
    gap: 16px;
  }
  
  .status-icon-wrapper {
    width: 48px;
    height: 48px;
  }
  
  .status-circle {
    width: 24px;
    height: 24px;
    border-width: 3px;
  }
  
  .app-id {
    font-size: 18px;
  }
  
  .app-status {
    font-size: 13px;
  }

  .progress-section {
    padding: 16px 0;
  }
  
  .progress-line-container {
    top: 40px;
    left: 10%;
    right: 10%;
  }

  .step-circle {
    width: 24px;
    height: 24px;
  }
  
  .step-item.is-active .step-circle {
    width: 20px;
    height: 20px;
    margin: 2px;
  }

  .step-circle svg {
    width: 12px;
    height: 12px;
  }

  .step-label {
    font-size: 11px;
    max-width: 60px;
  }
}
</style>
