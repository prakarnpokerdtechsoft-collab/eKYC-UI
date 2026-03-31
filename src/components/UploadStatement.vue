<script setup>
import { ref } from 'vue'
import { langState } from '../store/lang.js'

const emit = defineEmits(['back'])

const selectedFile = ref(null)
const uploadStatus = ref('')
const isUploading = ref(false)

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    selectedFile.value = file
  }
}

const handleUpload = async () => {
  if (!selectedFile.value) return
  
  isUploading.value = true
  uploadStatus.value = ''

  try {
    console.log('Uploading:', selectedFile.value.name)
    const formData = new FormData()
    formData.append('file', selectedFile.value)
    
    const response = await fetch('https://ekyc-j7lp.onrender.com/api/Customer/create_document', {
      method: 'POST',
      body: formData
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    console.log('Upload result:', result)
    uploadStatus.value = 'Success: Statement uploaded successfully!'
  } catch (error) {
    console.error('Upload failed:', error)
    uploadStatus.value = 'Error: Failed to upload statement.'
  } finally {
    isUploading.value = false
  }
}
</script>

<template>
  <div class="upload-absolute-wrapper">
    <div class="upload-content">
      <!-- Navbar -->
      <header class="navbar">
        <button class="icon-btn back-btn" @click="$emit('back')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="greeting">
          <span class="greeting-main">{{ langState.t('อัพโหลด Statement', 'Uploaded Statement') }}</span>
        </div>
        <div class="empty-space"></div>
      </header>

      <div class="page-body">
        <div class="glass-card">
          <div class="upload-area" :class="{ 'has-file': selectedFile }" @click="$refs.fileInput.click()">
            <input type="file" ref="fileInput" class="hidden-input" @change="handleFileSelect" accept=".pdf,.jpeg,.jpg,.png" />
            <div v-if="!selectedFile" class="upload-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" class="upload-icon">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <polyline points="17 8 12 3 7 8" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <line x1="12" y1="3" x2="12" y2="15" stroke="#f97316" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p class="upload-text">{{ langState.t('คลิกเพื่อเลือกไฟล์', 'Click to browse file') }}</p>
              <p class="upload-hint">PDF, JPEG, PNG</p>
            </div>
            <div v-else class="file-info">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              <span class="file-name">{{ selectedFile.name }}</span>
            </div>
          </div>

          <button class="primary-btn mt-6" :disabled="!selectedFile || isUploading" @click="handleUpload">
            <span v-if="isUploading">{{ langState.t('กำลังอัพโหลด...', 'Uploading...') }}</span>
            <span v-else>{{ langState.t('อัพโหลดไฟล์เข้าสู่ระบบ', 'Upload File') }}</span>
          </button>

          <p v-if="uploadStatus" class="status-msg" :class="{ 'success': uploadStatus.startsWith('Success'), 'error': uploadStatus.startsWith('Error') }">
            {{ uploadStatus }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.upload-absolute-wrapper {
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

.upload-content {
  max-width: 800px;
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

.page-body {
  width: 100%;
}

.glass-card {
  background: #ffffff;
  border-radius: 28px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.03);
  border: 1px solid rgba(226, 232, 240, 0.8);
  display: flex;
  flex-direction: column;
}

.hidden-input {
  display: none;
}

.upload-area {
  border: 2px dashed #cbd5e1;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

@media (hover: hover) {
  .upload-area:hover {
    border-color: #f97316;
    background-color: #fffaf5;
  }
}

.upload-area.has-file {
  border-color: #22c55e;
  background-color: #f0fdf4;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.upload-icon {
  margin-bottom: 8px;
}

.upload-text {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
  margin: 0;
}

.upload-hint {
  font-size: 14px;
  color: #94a3b8;
  margin: 0;
}

.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.file-name {
  font-size: 16px;
  font-weight: 600;
  color: #0f172a;
  word-break: break-all;
}

.primary-btn {
  background-color: #f97316;
  color: #fff;
  border: none;
  padding: 16px;
  font-size: 16px;
  font-weight: 700;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 16px rgba(249, 115, 22, 0.2);
  width: 100%;
}

.primary-btn:disabled {
  background-color: #cbd5e1;
  box-shadow: none;
  cursor: not-allowed;
}

@media (hover: hover) {
  .primary-btn:not(:disabled):hover {
    background-color: #ea580c;
    transform: translateY(-2px);
    box-shadow: 0 12px 20px rgba(249, 115, 22, 0.3);
  }
}

.mt-6 {
  margin-top: 24px;
}

.status-msg {
  margin-top: 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}

.success {
  color: #16a34a;
}
.error {
  color: #dc2626;
}

@media (max-width: 768px) {
  .upload-absolute-wrapper {
    position: absolute;
    width: 100vw;
  }
  
  .upload-content {
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
  
  .upload-area {
    padding: 32px 16px;
    min-height: 160px;
  }
}
</style>
