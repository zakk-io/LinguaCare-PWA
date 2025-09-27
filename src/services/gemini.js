const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Formats the chat history for the Gemini API.
 * The API requires a specific structure where user and model roles alternate.
 * @param {Array<Object>} messages - The chat messages from the store.
 * @returns {Array<Object>} The formatted contents for the API.
 */
const formatHistoryForAPI = (messages) => {
  return messages.map(message => ({
    role: message.sender === 'bot' ? 'model' : 'user',
    parts: [{ text: message.text }],
  }));
};

/**
 * Gets a response from the Gemini API.
 * @param {Array<Object>} history - The chat history.
 * @param {string} language - Current UI language (en, fr, rw, ar).
 * @returns {Promise<String>} The bot's response text.
 */
export const getBotResponse = async (history, language = 'en') => {
  try {
    const contents = formatHistoryForAPI(history);

    // System-style instruction: respond strictly in the selected language.
    const systemInstruction = {
      role: 'user',
      parts: [{
        text: `You are Lingua, a supportive mental-health assistant. Reply ONLY in the user's UI language: ${language}. Keep a warm, concise, professional tone. If the user writes in a different language, still respond in ${language}.`
      }]
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': API_KEY,
      },
      body: JSON.stringify({ contents: [systemInstruction, ...contents] }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Basic safety check for response structure
    if (data.candidates && data.candidates.length > 0 && data.candidates[0].content) {
      return data.candidates[0].content.parts[0].text;
    } else {
      // Handle cases where the API returns no candidates (e.g., safety blocks)
      return "I'm sorry, I can't respond to that right now.";
    }

  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};
