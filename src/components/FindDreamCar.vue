<script setup>
import { ref } from 'vue'
import { langState } from '../store/lang.js'

const emit = defineEmits(['back'])

const selectedCar = ref('BMW M3 Touring LCI')
const selectedDealer = ref(null)

const dealers = [
  { id: 1, name: 'ธนโชค อัครมหาศาล', code: '#3-1014-80392-23-9', phone: '099-555-4444' },
  { id: 2, name: 'พีรวัส ทรัพย์ไพศาล', code: '#3-1012-38475-11-8', phone: '098-846-3333' },
  { id: 3, name: 'ธนไพศาล ดีลเลอร์', code: '#3-1019-23764-76-9', phone: '099-284-2255' },
  { id: 4, name: 'ชัยชนะ กิจเจริญรุ่ง', code: '#3-1019-23764-76-9', phone: '099-284-2255' }
]

const handleClear = () => {
  selectedDealer.value = null
  selectedCar.value = 'BMW M3 Touring LCI'
}

const handleSubmit = () => {
  if (!selectedDealer.value) {
    alert('Please select a dealer')
    return
  }
  alert(`Submitted for dealer ID: ${selectedDealer.value}`)
}
</script>

<template>
  <div class="find-car-absolute-wrapper">
    <div class="find-car-content">
      <!-- Navbar -->
      <header class="navbar">
        <button class="icon-btn back-btn" @click="$emit('back')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="greeting">
          <span class="greeting-main">{{ langState.t('ค้นหารถในฝัน', 'Find Dream Car') }}</span>
        </div>
        <div class="empty-space"></div>
      </header>

      <div class="page-body">
        <div class="main-grid">
          <!-- Car Preview Section -->
          <div class="car-preview-section">
            <div class="car-image-box">
              <img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Car" class="car-image" />
              <div class="car-overlay">
                <h2 class="car-name">2015 BMW 528i 2.0 f10 (ปี10-16) Luxury Sedan</h2>
                <p class="car-tags">#BMW #528i #luxury</p>
              </div>
            </div>
          </div>

          <!-- Form Section -->
          <div class="form-section">
            <div class="glass-card">
              <h3 class="card-heading">{{ langState.t('รายละเอียดการจอง', 'Booking Details') }}</h3>
              
              <div class="form-group">
                <label class="label">{{ langState.t('เลือกรถยนต์', 'Select Car') }}</label>
                <div class="select-wrapper">
                  <select v-model="selectedCar" class="custom-select">
                    <option value="BMW M3 Touring LCI">BMW M3 Touring LCI</option>
                    <option value="Honda Civic RS">Honda Civic RS</option>
                  </select>
                  <div class="select-arrows">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="dealer-section">
                <label class="label">{{ langState.t('รายชื่อดีลเลอร์', 'Dealer list') }}</label>
                <div class="dealer-list-grid">
                  <div 
                    v-for="dealer in dealers" 
                    :key="dealer.id"
                    class="dealer-item"
                    :class="{ 'selected': selectedDealer === dealer.id }"
                    @click="selectedDealer = dealer.id"
                  >
                    <div class="radio-outer">
                      <div class="radio-inner" v-if="selectedDealer === dealer.id"></div>
                    </div>
                    <div class="dealer-info">
                      <div class="dealer-name">{{ dealer.name }}</div>
                      <div class="dealer-code">{{ dealer.code }} • {{ dealer.phone }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="action-buttons">
              <button class="btn-clear" @click="handleClear">{{ langState.t('ล้างข้อมูล', 'Clear') }}</button>
              <button class="btn-submit" @click="handleSubmit">{{ langState.t('ยืนยัน', 'Submit') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.find-car-absolute-wrapper {
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

.find-car-content {
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
  margin-bottom: 24px;
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

.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

/* Car Preview */
.car-image-box {
  width: 100%;
  height: 480px;
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.car-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.car-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 40px 32px 32px;
  background: linear-gradient(to top, rgba(15, 23, 42, 0.95) 0%, transparent 100%);
  color: white;
}

.car-name {
  font-size: 24px;
  font-weight: 800;
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.car-tags {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* Form Section */
.glass-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid rgba(226, 232, 240, 0.8);
  margin-bottom: 24px;
}

.card-heading {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 32px 0;
}

.form-group {
  margin-bottom: 32px;
}

.label {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 12px;
}

.select-wrapper {
  position: relative;
}

.custom-select {
  width: 100%;
  padding: 16px 48px 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  appearance: none;
  background-color: #f8fafc;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  transition: all 0.2s ease;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
}

.custom-select:focus {
  outline: none;
  border-color: #f97316;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

.select-arrows {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #94a3b8;
}

/* Dealer List */
.dealer-section {
  margin-bottom: 8px;
}

.dealer-list-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.dealer-item {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  background-color: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
}

@media (hover: hover) {
  .dealer-item:hover {
    border-color: #cbd5e1;
    background-color: #f8fafc;
  }
}

.dealer-item.selected {
  background-color: #fffaf5;
  border-color: #f97316;
}

.radio-outer {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid #cbd5e1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  flex-shrink: 0;
  transition: all 0.2s;
  background-color: #ffffff;
}

.dealer-item.selected .radio-outer {
  border-color: #f97316;
  background-color: #f97316;
}

.radio-inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
}

.dealer-info {
  display: flex;
  flex-direction: column;
}

.dealer-name {
  font-size: 16px;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 6px;
}

.dealer-code {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 16px;
}

.btn-submit, .btn-clear {
  flex: 1;
  padding: 18px;
  border: none;
  border-radius: 99px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit {
  background-color: #f97316;
  color: #ffffff;
  box-shadow: 0 8px 16px rgba(249, 115, 22, 0.25);
}

.btn-clear {
  background-color: #e2e8f0;
  color: #475569;
}

@media (hover: hover) {
  .btn-submit:hover {
    background-color: #ea580c;
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(249, 115, 22, 0.35);
  }
  
  .btn-clear:hover {
    background-color: #cbd5e1;
    color: #0f172a;
  }
}

/* Responsive constraints */
@media (max-width: 992px) {
  .main-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .car-image-box {
    height: 360px;
  }
}

@media (max-width: 768px) {
  .find-car-absolute-wrapper {
    position: absolute;
    width: 100vw;
  }
  
  .find-car-content {
    padding: 0 16px 32px 16px;
  }

  .navbar {
    padding: 16px 0;
    margin-bottom: 12px;
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
  
  .car-image-box {
    height: 260px;
    border-radius: 20px;
    margin-bottom: 8px;
  }
  
  .car-overlay {
    padding: 32px 24px 24px;
  }
  
  .car-name {
    font-size: 20px;
    margin-bottom: 8px;
  }
  
  .car-tags {
    font-size: 13px;
  }
  
  .glass-card {
    padding: 24px 20px;
    border-radius: 20px;
    margin-bottom: 20px;
  }
  
  .card-heading {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  .form-group {
    margin-bottom: 24px;
  }
  
  .label {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .custom-select {
    padding: 14px 40px 14px 16px;
    font-size: 15px;
    border-radius: 14px;
  }
  
  .dealer-list-grid {
    gap: 12px;
  }
  
  .dealer-item {
    padding: 16px 16px;
    border-radius: 16px;
  }
  
  .radio-outer {
    width: 20px;
    height: 20px;
    margin-right: 16px;
  }
  
  .dealer-name {
    font-size: 15px;
    margin-bottom: 4px;
  }
  
  .dealer-code {
    font-size: 12px;
  }
  
  .action-buttons {
    flex-direction: column-reverse;
    gap: 12px;
  }
  
  .btn-submit, .btn-clear {
    padding: 16px;
    font-size: 16px;
    width: 100%;
  }
}
</style>
