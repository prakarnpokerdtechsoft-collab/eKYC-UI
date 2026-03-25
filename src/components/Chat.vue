<script setup>
import { ref } from 'vue'
import { langState } from '../store/lang.js'

const emit = defineEmits(['back'])

const message = ref('')
const chatHistory = ref([
  {
    id: 1,
    sender: 'bot',
    text: 'Hello, how can i help you?'
  }
])

const sendMessage = () => {
  if (message.value.trim()) {
    chatHistory.value.push({
      id: Date.now(),
      sender: 'user',
      text: message.value
    })
    message.value = ''
  }
}
</script>

<template>
  <div class="chat-absolute-wrapper">
    <div class="chat-content">
      <!-- Navbar -->
      <header class="navbar">
        <button class="icon-btn back-btn" @click="$emit('back')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#0f172a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <div class="greeting">
          <span class="greeting-main">{{ langState.t('ติดต่อเรา', 'Contact Us') }}</span>
        </div>
        <div class="empty-space"></div>
      </header>

      <div class="page-body">
        <div class="glass-card chat-glass-card">
          <div class="chat-body" ref="chatBody">
            <div v-for="msg in chatHistory" :key="msg.id" class="message-row" :class="msg.sender">
              <div v-if="msg.sender === 'bot'" class="bot-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
                  <circle cx="12" cy="5" r="2"></circle>
                  <path d="M12 7v4"></path>
                  <line x1="8" y1="16" x2="8" y2="16"></line>
                  <line x1="16" y1="16" x2="16" y2="16"></line>
                </svg>
              </div>
              <div class="message-bubble">
                {{ msg.text }}
              </div>
            </div>
          </div>

          <div class="chat-input-area">
            <div class="input-pill">
              <input 
                type="text" 
                v-model="message" 
                class="chat-input"
                :placeholder="langState.t('พิมพ์ข้อความของคุณ...', 'Write your message')" 
                @keyup.enter="sendMessage"
              />
              <button class="icon-action-btn mic-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
              </button>
              <button class="icon-action-btn send-btn" @click="sendMessage">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2" fill="#ffffff" stroke="none"></polygon>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.chat-absolute-wrapper {
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

.chat-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 32px 80px 32px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Navbar */
.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 0;
  margin-bottom: 8px;
  flex-shrink: 0;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  min-height: 0;
}

.chat-glass-card {
  background: #ffffff;
  border-radius: 32px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.04);
  border: 1px solid rgba(226, 232, 240, 0.8);
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-body {
  flex: 1;
  padding: 32px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #f8fafc;
}

.message-row {
  display: flex;
  align-items: flex-end;
  gap: 12px;
}

.message-row.user {
  flex-direction: row-reverse;
}

.bot-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f97316 0%, #ea580c 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

.message-bubble {
  padding: 16px 20px;
  font-size: 15px;
  line-height: 1.5;
  max-width: 75%;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
}

.bot .message-bubble {
  background-color: #ffffff;
  color: #1e293b;
  border-radius: 20px 20px 20px 4px;
  border: 1px solid #e2e8f0;
}

.user .message-bubble {
  background-color: #0f172a;
  color: #ffffff;
  border-radius: 20px 20px 4px 20px;
}

.chat-input-area {
  padding: 24px 32px;
  background-color: #ffffff;
  border-top: 1px solid #f1f5f9;
}

.input-pill {
  display: flex;
  align-items: center;
  background-color: #f8fafc;
  border-radius: 99px;
  padding: 8px 8px 8px 24px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s ease;
}

.input-pill:focus-within {
  background-color: #ffffff;
  border-color: #cbd5e1;
  box-shadow: 0 4px 16px rgba(0,0,0,0.04);
}

.chat-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 15px;
  font-weight: 500;
  padding: 12px 0;
  background: transparent;
  color: #0f172a;
}

.chat-input::placeholder {
  color: #94a3b8;
}

.icon-action-btn {
  background: none;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mic-btn {
  margin-right: 8px;
}

@media (hover: hover) {
  .mic-btn:hover {
    background-color: #e2e8f0;
  }
}

.send-btn {
  background-color: #f97316;
  box-shadow: 0 4px 12px rgba(249, 115, 22, 0.2);
}

@media (hover: hover) {
  .send-btn:hover {
    background-color: #ea580c;
    transform: scale(1.05);
  }
}

/* Responsive constraints */
@media (max-width: 768px) {
  .chat-absolute-wrapper {
    position: absolute;
    width: 100vw;
  }
  
  .chat-content {
    padding: 0 16px 24px 16px;
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

  .chat-glass-card {
    border-radius: 24px;
  }
  
  .chat-body {
    padding: 20px 16px;
    gap: 20px;
  }
  
  .bot-icon {
    width: 32px;
    height: 32px;
  }
  
  .bot-icon svg {
    width: 16px;
    height: 16px;
  }
  
  .message-bubble {
    padding: 14px 16px;
    font-size: 14px;
    max-width: 85%;
  }

  .chat-input-area {
    padding: 16px;
  }
  
  .input-pill {
    padding: 6px 6px 6px 16px;
  }
  
  .chat-input {
    font-size: 14px;
  }
  
  .icon-action-btn {
    width: 36px;
    height: 36px;
  }
  
  .mic-btn {
    margin-right: 4px;
  }
}
</style>
