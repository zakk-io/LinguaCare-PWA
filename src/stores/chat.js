import { defineStore } from 'pinia'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [],
    isTyping: false,
  }),
  actions: {
    addMessage(message) {
      this.messages.push({
        id: Date.now(),
        ...message,
        timestamp: new Date(),
      })
    },
    setTyping(status) {
      this.isTyping = status
    }
  },
})
