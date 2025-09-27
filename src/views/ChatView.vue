<template>
  <div class="h-full flex flex-col">
    <!-- Header -->
    <div class="flex justify-between items-center p-4 border-b border-gray-700">
      <h1 class="text-2xl font-bold text-text-light">{{ $t('ai_chatbot') }}</h1>
      <LanguageDropdown />
    </div>

    <!-- Message Display -->
    <div ref="messageContainer" class="flex-1 p-4 overflow-y-auto">
      <div class="space-y-4">
        <div v-for="message in chatStore.messages" :key="message.id" class="flex items-start" :class="{'justify-end': message.sender === 'user'}">
          
          <!-- Bot Message -->
          <div v-if="message.sender === 'bot'" class="flex items-start space-x-3">
            <div class="w-10 h-10 rounded-full bg-card flex items-center justify-center flex-shrink-0">
              <font-awesome-icon icon="user-doctor" class="text-primary" />
            </div>
            <div class="bg-card p-3 rounded-lg max-w-lg">
              <p class="text-text-light">{{ message.text }}</p>
            </div>
          </div>

          <!-- User Message -->
          <div v-if="message.sender === 'user'" class="flex items-start justify-end space-x-3">
            <div class="bg-primary p-3 rounded-lg max-w-lg">
              <p class="text-white">{{ message.text }}</p>
            </div>
            <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0 ring-2 ring-white/20 shadow-lg">
              <font-awesome-icon icon="user" class="text-white" />
            </div>
          </div>

        </div>
        
        <!-- Typing Indicator -->
          <div v-if="chatStore.isTyping" class="flex items-start space-x-3">
          <div class="w-10 h-10 rounded-full bg-card flex items-center justify-center flex-shrink-0">
            <font-awesome-icon icon="user-doctor" class="text-primary" />
          </div>
          <div class="bg-card p-3 rounded-lg">
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>

      </div>
    </div>

    <!-- Message Input -->
    <div class="p-4 border-t border-gray-700 bg-background">
      <form @submit.prevent="handleSendMessage" class="flex items-center space-x-3">
        <input
          type="text"
          v-model="newMessage"
          :placeholder="$t('type_message')"
          class="flex-1 bg-card border-none rounded-lg px-4 py-3 text-text-light focus:ring-2 focus:ring-primary"
        />
        <button type="submit" class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-primary/80 transition-colors flex-shrink-0">
          <font-awesome-icon icon="paper-plane" class="text-xl"/>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted } from 'vue'
import LanguageDropdown from '@/components/common/LanguageDropdown.vue'
import { useChatStore } from '@/stores/chat'
import { getBotResponse } from '@/services/gemini'
import { useI18n } from 'vue-i18n'

const chatStore = useChatStore()
const newMessage = ref('')
const messageContainer = ref(null)
const { t, locale } = useI18n()

const scrollToBottom = () => {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

watch(() => chatStore.messages, scrollToBottom, { deep: true })

onMounted(() => {
  if (chatStore.messages.length === 0) {
    chatStore.addMessage({
      text: t('greeting'),
      sender: 'bot',
    })
  }
})

const handleSendMessage = async () => {
  if (newMessage.value.trim() === '') return
  
  const userMessage = newMessage.value
  newMessage.value = ''

  chatStore.addMessage({
    text: userMessage,
    sender: 'user',
  })
  
  chatStore.setTyping(true)

  const botResponse = await getBotResponse(chatStore.messages, locale.value)
  
  chatStore.addMessage({
    text: botResponse,
    sender: 'bot',
  })

  chatStore.setTyping(false)
}
</script>

<style scoped>
.typing-indicator span {
  height: 8px;
  width: 8px;
  background-color: #94A3B8; /* text-dark */
  border-radius: 50%;
  display: inline-block;
  animation: wave 1.3s infinite;
}

.typing-indicator span:nth-of-type(2) {
  animation-delay: -1.1s;
}

.typing-indicator span:nth-of-type(3) {
  animation-delay: -0.9s;
}

@keyframes wave {
  0%, 60%, 100% {
    transform: initial;
  }
  30% {
    transform: translateY(-10px);
  }
}
</style>
