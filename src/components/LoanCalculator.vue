<script setup>
import { ref } from 'vue'
import { langState } from '../store/lang.js'

const emit = defineEmits(['back'])

const activeTab = ref('Standard')
const carPrice = ref('')
const downPayment = ref('')
const interestRate = ref('')
const loanTerm = ref('')
const serviceFee = ref('')
const otherServiceFee = ref('')

const results = ref(null)

const calculate = () => {
  const price = parseFloat(carPrice.value) || 0
  const down = parseFloat(downPayment.value) || 0
  const rate = parseFloat(interestRate.value) || 0
  const term = parseInt(loanTerm.value) || 0
  const sFee = parseFloat(serviceFee.value) || 0
  const oFee = parseFloat(otherServiceFee.value) || 0

  if (price <= 0 || term <= 0) {
    results.value = null
    return
  }

  // Formula:
  // Loan Amount = Price - (Price * Down / 100)
  // Total Interest = Loan Amount * (Rate / 100) * (Term / 12)
  // Total Payment = Loan Amount + Total Interest + Fees
  
  const downAmount = (price * down) / 100
  const loanAmount = price - downAmount
  const totalInterest = loanAmount * (rate / 100) * (term / 12)
  const totalPayment = loanAmount + totalInterest + sFee + oFee
  const monthlyInstallment = Math.round(totalPayment / term)

  if (activeTab.value === 'Standard') {
    results.value = {
      loanAmount: loanAmount,
      totalPayment: totalPayment,
      monthlyInstallment: monthlyInstallment
    }
  } else {
    results.value = {
      carAmount: price,
      downPayment: down,
      loanTerm: term,
      interestRate: rate,
      serviceFee: sFee,
      otherServiceFee: oFee,
      totalPayment: totalPayment
    }
  }
}

// Watch for any changes to trigger "Analysis" (Calculations) in AI mode
import { watch } from 'vue'
watch([carPrice, downPayment, interestRate, loanTerm, serviceFee, otherServiceFee, activeTab], () => {
  if (activeTab.value === 'AI') {
    calculate()
  } else if (activeTab.value === 'Standard' && !carPrice.value) {
    results.value = null
  }
})

const clear = () => {
  carPrice.value = ''
  downPayment.value = ''
  interestRate.value = ''
  loanTerm.value = ''
  serviceFee.value = 0
  otherServiceFee.value = 0
  results.value = null
}

const formatNumber = (num) => {
  return new Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)
}
</script>

<template>
  <div class="calculator-absolute-wrapper">
    <div class="calculator-content">
      <!-- Navbar -->
      <header class="navbar">
        <button class="icon-btn back-btn" @click="$emit('back')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="greeting">
          <span class="greeting-main">{{ langState.t('เครื่องคำนวณสินเชื่อ', 'Loan Calculator') }}</span>
        </div>
        <div class="empty-space"></div>
      </header>

      <div class="page-body">
        <!-- Tabs -->
        <div class="tabs-container">
          <div class="tabs-bg">
            <button 
              :class="['tab-btn', activeTab === 'Standard' ? 'active-tab' : 'inactive-tab']" 
              @click="activeTab = 'Standard'"
            >
              {{ langState.t('Standard', 'Standard') }}
            </button>
            <button 
              :class="['tab-btn', activeTab === 'AI' ? 'active-tab' : 'inactive-tab']" 
              @click="activeTab = 'AI'"
            >
              {{ langState.t('AI Calculator', 'AI Calculator') }}
            </button>
          </div>
        </div>

        <div class="main-grid">
          <!-- Form Section -->
          <div class="form-section">
            <div class="glass-card">
              <h3 class="card-heading">{{ langState.t('ข้อมูลสินเชื่อ', 'Loan Details') }}</h3>
              
              <div class="form-group">
                <label class="label">{{ langState.t('ราคารถ', 'Car Price') }}</label>
                <input type="number" v-model="carPrice" class="custom-input" placeholder="0" />
              </div>

              <div class="form-group">
                <label class="label">{{ langState.t('เงินดาวน์ (%)', 'Down Payment (%)') }}</label>
                <input type="number" v-model="downPayment" class="custom-input" placeholder="0" />
              </div>

              <div class="form-group">
                <label class="label">{{ langState.t('ระยะเวลาผ่อน (เดือน)', 'Loan Term (Months)') }}</label>
                <div class="select-wrapper">
                  <select v-model="loanTerm" class="custom-select">
                    <option value="" disabled selected>{{ langState.t('เลือกระยะเวลาผ่อน', 'Select Term') }}</option>
                    <option :value="12">12</option>
                    <option :value="24">24</option>
                    <option :value="36">36</option>
                    <option :value="48">48</option>
                    <option :value="60">60</option>
                    <option :value="72">72</option>
                    <option :value="84">84</option>
                  </select>
                  <div class="select-arrows">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </div>
                </div>
              </div>

              <div class="form-group">
                <label class="label">{{ langState.t('อัตราดอกเบี้ย (%)', 'Interest Rate (%)') }}</label>
                <input type="number" v-model="interestRate" step="0.1" class="custom-input" placeholder="0.0" />
              </div>

              <template v-if="activeTab === 'AI'">
                <div class="form-group">
                  <label class="label">{{ langState.t('ค่าบริการ', 'Service Fee') }}</label>
                  <input type="number" v-model="serviceFee" class="custom-input" placeholder="0" />
                </div>
                <div class="form-group">
                  <label class="label">{{ langState.t('ค่าบริการอื่นๆ', 'Other Service Fee') }}</label>
                  <input type="number" v-model="otherServiceFee" class="custom-input" placeholder="0" />
                </div>
              </template>

              <div class="action-buttons">
                <button class="btn-clear" @click="clear">{{ langState.t('ล้างข้อมูล', 'Clear') }}</button>
                <button class="btn-submit" @click="calculate">{{ langState.t('คำนวณ', 'Calculate') }}</button>
              </div>
            </div>
          </div>

          <!-- Result Section -->
          <div class="result-section">
            <div class="result-card" :class="{ 'has-results': results }">
              <h3 class="card-heading">{{ langState.t('สรุปผลการประเมิน', 'Estimation Summary') }}</h3>
              
              <div v-if="!results" class="empty-state">
                <div class="empty-icon-wrapper">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#cbd5e1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                    <line x1="8" y1="6" x2="16" y2="6"></line>
                    <line x1="16" y1="14" x2="16" y2="14.01"></line>
                    <line x1="16" y1="10" x2="16" y2="10.01"></line>
                    <line x1="12" y1="14" x2="12" y2="14.01"></line>
                    <line x1="12" y1="10" x2="12" y2="10.01"></line>
                    <line x1="8" y1="14" x2="8" y2="14.01"></line>
                    <line x1="8" y1="10" x2="8" y2="10.01"></line>
                  </svg>
                </div>
                <p>{{ langState.t('กรอกข้อมูลเพื่อดูผลการคำนวณ', 'Enter details to see the calculation') }}</p>
              </div>

              <!-- Standard Result -->
              <div v-if="results && activeTab === 'Standard'" class="result-content">
                <div class="result-item">
                  <span class="result-label">{{ langState.t('ยอดจัดสินเชื่อ', 'Loan Amount') }}</span>
                  <span class="result-value">{{ formatNumber(results.loanAmount) }} <span>THB</span></span>
                </div>
                <div class="result-item">
                  <span class="result-label">{{ langState.t('ยอดชำระรวม', 'Total Payment') }}</span>
                  <span class="result-value">{{ formatNumber(results.totalPayment) }} <span>THB</span></span>
                </div>
                
                <div class="hero-result-item">
                  <span class="hero-label">{{ langState.t('ค่างวดต่อเดือน', 'Monthly Installment') }}</span>
                  <span class="hero-value">{{ formatNumber(results.monthlyInstallment) }} <span class="hero-currency">THB</span></span>
                </div>
              </div>

              <!-- AI Result -->
              <div v-if="results && activeTab === 'AI'" class="result-content ai-results">
                <div class="result-item">
                  <span class="result-label">Car Amount</span>
                  <span class="result-value">{{ formatNumber(results.carAmount) }} <span>Baht</span></span>
                </div>
                <div class="result-item">
                  <span class="result-label">Loan Term</span>
                  <span class="result-value">{{ results.loanTerm }} <span>Month</span></span>
                </div>
                <div class="result-item">
                  <span class="result-label">Interest rate</span>
                  <span class="result-value highlight">{{ results.interestRate }} <span>%</span></span>
                </div>
                <div class="result-item">
                  <span class="result-label">Service Fee</span>
                  <span class="result-value">{{ formatNumber(results.serviceFee) }} <span>Baht</span></span>
                </div>
                <div class="result-item">
                  <span class="result-label">Other Service Fee</span>
                  <span class="result-value">{{ formatNumber(results.otherServiceFee) }} <span>Baht</span></span>
                </div>
                
                <div class="hero-result-item">
                  <span class="hero-label">Total Payment</span>
                  <span class="hero-value">{{ formatNumber(results.totalPayment) }} <span class="hero-currency">Baht</span></span>
                </div>
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

.calculator-absolute-wrapper {
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

.calculator-content {
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
  margin-bottom: 8px;
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

/* Tabs */
.tabs-container {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
}

.tabs-bg {
  display: flex;
  background-color: #e2e8f0;
  border-radius: 99px;
  padding: 6px;
  width: 100%;
  max-width: 500px;
}

.tab-btn {
  flex: 1;
  padding: 14px 24px;
  border-radius: 99px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.active-tab {
  background-color: #ffffff;
  color: #f97316;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.inactive-tab {
  background-color: transparent;
  color: #64748b;
}

/* Main Grid */
.main-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

/* Form Section */
.glass-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid rgba(226, 232, 240, 0.8);
}

.card-heading {
  font-size: 24px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 32px 0;
}

.form-group {
  margin-bottom: 24px;
}

.label {
  display: block;
  font-size: 15px;
  font-weight: 700;
  color: #475569;
  margin-bottom: 12px;
}

.custom-input,
.custom-select {
  width: 100%;
  padding: 16px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  background-color: #f8fafc;
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  transition: all 0.2s ease;
  font-family: 'Inter', sans-serif;
  outline: none;
}

.custom-select {
  appearance: none;
  padding-right: 48px;
  cursor: pointer;
}

.custom-input:focus,
.custom-select:focus {
  border-color: #f97316;
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
}

.custom-input::placeholder {
  color: #94a3b8;
  font-weight: 500;
}

.select-wrapper {
  position: relative;
}

.select-arrows {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #94a3b8;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 16px;
  margin-top: 40px;
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

/* Result Section */
.result-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid rgba(226, 232, 240, 0.8);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
}

.result-card.has-results {
  background: linear-gradient(180deg, #ffffff 0%, #fffaf5 100%);
  border-color: rgba(249, 115, 22, 0.2);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #94a3b8;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  margin-top: 40px;
}

.empty-icon-wrapper {
  background-color: #f8fafc;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
}

.result-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #f8fafc;
  border-radius: 16px;
}

.result-label {
  font-size: 15px;
  font-weight: 600;
  color: #64748b;
}

.result-value {
  font-size: 18px;
  font-weight: 800;
  color: #0f172a;
}

.result-value span {
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  margin-left: 4px;
}

.result-value.highlight {
  color: #f97316;
}

.hero-result-item {
  margin-top: 24px;
  padding: 32px 24px;
  background-color: #f97316;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #ffffff;
  box-shadow: 0 12px 24px rgba(249, 115, 22, 0.25);
}

.hero-label {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
  opacity: 0.9;
}

.hero-value {
  font-size: 40px;
  font-weight: 800;
  line-height: 1;
}

.hero-currency {
  font-size: 18px;
  font-weight: 600;
  opacity: 0.8;
  margin-left: 4px;
}

/* Responsive constraints */
@media (max-width: 992px) {
  .main-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 768px) {
  .calculator-absolute-wrapper {
    position: absolute;
    width: 100vw;
  }
  
  .calculator-content {
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
  
  .tabs-container {
    margin-bottom: 24px;
  }
  
  .tab-btn {
    padding: 12px 16px;
    font-size: 14px;
  }
  
  .glass-card {
    padding: 24px 20px;
    border-radius: 20px;
  }
  
  .card-heading {
    font-size: 20px;
    margin-bottom: 24px;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .label {
    font-size: 14px;
    margin-bottom: 8px;
  }
  
  .custom-input, .custom-select {
    padding: 14px 16px;
    font-size: 15px;
    border-radius: 14px;
  }
  
  .action-buttons {
    flex-direction: column-reverse;
    gap: 12px;
    margin-top: 32px;
  }
  
  .btn-submit, .btn-clear {
    padding: 16px;
    font-size: 16px;
    width: 100%;
  }
  
  .result-card {
    padding: 24px 20px;
    border-radius: 20px;
  }
  
  .hero-result-item {
    padding: 24px 20px;
  }
  
  .hero-value {
    font-size: 32px;
  }
}
</style>
