<template>
  <div class="chat-page">
    <!-- Header -->
    <header class="page-header">
      <button class="back-btn" @click="emit('back')">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <h1 class="header-title">{{ langState.t('ติดต่อเรา', 'Contact Us') }}</h1>
      <div class="header-spacer"></div>
    </header>

    <!-- Main Chat Card -->
    <div class="chat-card">
      <div class="chat-messages" ref="chatBody">
        <div 
          v-for="msg in chatHistory" 
          :key="msg.id" 
          :class="['message-row', msg.sender]"
        >
          <div v-if="msg.sender === 'bot'" class="bot-avatar">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2"></rect>
              <circle cx="12" cy="5" r="2"></circle>
              <path d="M12 7v4"></path>
              <line x1="8" y1="16" x2="8" y2="16"></line>
              <line x1="16" y1="16" x2="16" y2="16"></line>
            </svg>
          </div>
          <div class="message-bubble">{{ msg.text }}</div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="chat-input-wrapper">
        <div class="input-box">
          <input 
            v-model="message" 
            @keyup.enter="sendMessage"
            :placeholder="langState.t('พิมพ์ข้อความของคุณ...', 'Type your message...')" 
            class="chat-input"
            autocomplete="off"
          />
          <button class="icon-btn mic-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
              <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
              <line x1="12" y1="19" x2="12" y2="23"></line>
              <line x1="8" y1="23" x2="16" y2="23"></line>
            </svg>
          </button>
        </div>
        <button class="send-btn" @click="sendMessage" :disabled="!message.trim()">
          <svg style="margin-left: -2px; margin-top: 2px" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import { langState } from '../store/lang.js'

const emit = defineEmits(['back'])

const message = ref('')
const chatBody = ref(null)

const chatHistory = ref([
  {
    id: 'init-msg',
    sender: 'bot',
    text: langState.t('Hello, how can i help you?', 'Hello, how can i help you?')
  }
])

const generateId = () => Date.now().toString() + Math.random().toString(36).substring(2)

const getBotReply = (msg) => {
  const text = msg.toLowerCase()

  if (text.includes('สินเชื่อ') || text.includes('loan')) {
    return langState.t('คุณสามารถสมัครสินเชื่อได้ที่เมนู "สมัครสินเชื่อรถยนต์" ครับ', 'You can apply for a loan via the "Apply for Auto Loan" menu.')
  }

  if (text.includes('ดอกเบี้ย') || text.includes('interest')) {
    return langState.t('ดอกเบี้ยเริ่มต้นอยู่ที่ประมาณ 2.5% ต่อปีครับ', 'The starting interest rate is around 2.5% per year.')
  }

  if (text.includes('ติดต่อ') || text.includes('contact')) {
    return langState.t('เจ้าหน้าที่จะติดต่อกลับภายใน 24 ชั่วโมงครับ', 'Our agent will contact you back within 24 working hours.')
  }

  if (text.includes('สวัสดี') || text.includes('hello') || text.includes('hi')) {
    return langState.t('สวัสดีครับ 👋 มีอะไรให้ผมช่วยไหมครับ', 'Hello 👋 How can I help you today?')
  }

  return langState.t('ระบบได้รับข้อความของคุณแล้ว 🙏', 'We have received your message. 🙏')
}

// auto scroll
const scrollToBottom = async () => {
  await nextTick()
  if (chatBody.value) {
    chatBody.value.scrollTop = chatBody.value.scrollHeight
  }
}

// send message
const sendMessage = async () => {
  if (!message.value.trim()) return

  const userMsg = message.value

  chatHistory.value.push({
    id: generateId(),
    sender: 'user',
    text: userMsg
  })

  message.value = ''
  await scrollToBottom()

  const loadingId = generateId()
  chatHistory.value.push({
    id: loadingId,
    sender: 'bot',
    text: langState.t('กำลังพิมพ์...', 'typing...')
  })

  await scrollToBottom()

  setTimeout(async () => {
    const reply = getBotReply(userMsg)
    const index = chatHistory.value.findIndex(m => m.id === loadingId)
    if (index !== -1) {
      chatHistory.value[index].text = reply
    }
    await scrollToBottom()
  }, 700)
}

onMounted(() => {
  scrollToBottom()
})
</script>

<style scoped>
.chat-page {
  min-height: 100vh;
  background-color: #f4f6f9;
  font-family: 'Inter', -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;
}

/* Header */
.page-header {
  width: 100%;
  max-width: 800px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.back-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
}

.back-btn:active {
  transform: scale(0.95);
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  margin: 0;
}

.header-spacer {
  width: 48px; /* For flex centering balance */
}

/* Chat Card */
.chat-card {
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 24px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 140px);
  overflow: hidden;
}

/* Messages */
.chat-messages {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.message-row {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  width: 100%;
}

.message-row.user {
  justify-content: flex-end;
}

.bot-avatar {
  background-color: #f96300; /* Distinct orange from image */
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 10px rgba(249, 99, 0, 0.2);
}

.bot .message-bubble {
  background-color: #ffffff;
  border: 1px solid #eef0f4;
  border-radius: 12px 12px 12px 12px;
  padding: 16px 20px;
  font-size: 15px;
  color: #333;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.02);
  line-height: 1.5;
  max-width: 80%;
}

.user .message-bubble {
  background-color: #f4f6f9;
  border-radius: 12px 12px 12px 12px;
  padding: 16px 20px;
  font-size: 15px;
  color: #333;
  line-height: 1.5;
  max-width: 80%;
}

/* Input Area */
.chat-input-wrapper {
  padding: 24px 30px;
  border-top: 1px solid #f4f6f9;
  display: flex;
  align-items: center;
  gap: 16px;
  background-color: white;
}

.input-box {
  flex: 1;
  display: flex;
  align-items: center;
  background-color: #f4f6f9; /* Matching image grayish fill */
  border-radius: 30px;
  padding: 6px 16px 6px 24px;
  border: 1px solid transparent;
  transition: border-color 0.2s;
}

.input-box:focus-within {
  border-color: #e0e0e0;
}

.chat-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 12px 0;
  font-size: 15px;
  outline: none;
  color: #333;
}

.chat-input::placeholder {
  color: #a0aab2;
}

.icon-btn {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 8px;
}

.send-btn {
  background-color: #f96300;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(249, 99, 0, 0.25);
  flex-shrink: 0;
  transition: transform 0.2s, background-color 0.2s;
}

.send-btn:hover:not(:disabled) {
  background-color: #e55a00;
  transform: scale(1.05);
}

.send-btn:active:not(:disabled) {
  transform: scale(0.95);
}

.send-btn:disabled {
  background-color: #e0e0e0;
  box-shadow: none;
  cursor: not-allowed;
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .chat-page {
    padding: 16px;
  }
  .page-header {
    margin-bottom: 16px;
  }
  .chat-card {
    height: calc(100vh - 100px);
    border-radius: 20px;
  }
  .chat-messages {
    padding: 20px;
  }
  .chat-input-wrapper {
    padding: 16px 20px;
  }
}
</style>