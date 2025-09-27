## **App Concept**

Build **LinguaCare**, a **multilingual PWA mental health chatbot** with a **SaaS-inspired aesthetic** that feels **native on mobile** while being **responsive and professional on desktop**.

The app must:

* Be **installable as a PWA** on Android, iOS, Windows, and macOS.
* Support **offline-first strategies** (caching UI shell + recent chatbot messages).
* Provide **native-like interactions** → smooth transitions, push notifications, responsive layouts.

---

## **Core Features**

### **1. Multilingual Chatbot**

* **Language dropdown** at top of chatbot screen: **English, Kinyarwanda, Arabic, French**.
* Dropdown is **always visible** and styled in **modern SaaS dropdown UI**.
* Switching language must **instantly update conversation UI** (translations handled via Gemini API + i18n).
* Global language toggle available in **Settings** (persisted).

---

### **2. AI-Powered Mental Health Assistant**

* Powered by **Google Gemini API**.
* Bot functions:

  * Greets user in **selected language**.
  * Conducts **structured mental health self-assessments**.
  * Provides **supportive, non-diagnostic guidance**.
  * Suggests therapist contact if needed.
* **Chat UI** mimics modern SaaS messaging apps:

  * Bot messages: left-aligned, **soft teal/gray bubble**, AI avatar.
  * User messages: right-aligned, **bright teal bubble**, user avatar.
  * **Typing indicators & smooth scrolling animations**.

---

### **3. Hospital Listings**

* Integrate **Google Maps API** (current location = Rwanda).
* **Hybrid layout**: Map view (top) + scrollable SaaS-style hospital cards (below).
* Each card: hospital **name, image, rating, status badge, contact**.
* Sort by **distance**.
* Tapping a card → opens **Google Maps app** (native-like deep linking).

---

### **4. Settings**

* SaaS-style settings panel:

  * **2x2 Language grid** → active language highlighted with accent color.
  * **Logout button** in red, bottom-aligned.
* Preferences must **persist across sessions** (local storage + IndexedDB/Service Worker caching).

---

## **Design Guidelines (SaaS-Inspired PWA UI)**

### **Overall Look & Feel**

* **Professional SaaS dashboard aesthetic** → cards, whitespace, grids.
* **Responsive design**:

  * **Mobile-first**: full-width stacked layouts.
  * **Tablet/desktop**: adaptive grid layouts, sidebar navigation.
* **Fluid transitions & smooth animations** → screen fades, slide-ins, button ripple effects.

### **Color Palette**

* Background: **Dark charcoal / deep teal**.
* Accent: **Bright teal/cyan (#38C1B3)**.
* Text: **White / light gray**.
* Status colors: **Green (open hospitals), Red (logout/danger)**.

### **Typography**

* **Sans-serif SaaS fonts** (Roboto / Inter).
* Bold headers, medium subtitles, subtle gray details.

### **Components**

* **Dropdown (Chatbot)** → modern SaaS dropdown w/ icons.
* **Cards (Hospitals)** → elevated, shadowed, rounded corners, generous spacing.
* **Navigation** → responsive bottom nav on mobile, sidebar/grid on desktop.
* **Chat Window** → wide margins, clean bubbles, animated messages.

---

## **UX Flows**

1. **Home Screen**

   * **2x2 SaaS dashboard grid** (chatbot, hospitals, settings, language toggle).
   * Large icons + labels.

2. **Chatbot**

   * Always-visible **language dropdown**.
   * Chat interface with **AI assistant flow**.
   * Typing animation + smooth scroll.

3. **Hospitals**

   * **Map on top**, cards below.
   * Tap → redirect to Google Maps (native feel).

4. **Settings**

   * **2x2 language grid**. (EN, RW, AR, FR). with contry flag 

---

## **Technical Requirements**

* **Framework**: Vue.js 3 + Vite.
* **PWA Enhancements**:

  * Installable via **Web App Manifest**.
  * **Service Worker** for offline caching of shell + messages.
  * Push notifications for **therapist reminders / wellness tips**.
* **APIs**:

  * Gemini API → chatbot + translations.
  * Google Maps API → hospitals.
* **Data persistence**: IndexedDB or Vuex-persist for conversations/settings.
* **Routing**: Vue Router w/ smooth transitions.
* **UI**: TailwindCSS (SaaS-inspired, responsive utilities).

---

## **Acceptance Criteria**

✅ App is **installable as a PWA** on mobile & desktop.
✅ Works **offline** (UI + cached chatbot history).
✅ **Native-like animations & layouts** across devices.
✅ **Responsive SaaS UI** (mobile-first, desktop-friendly).
✅ **Multilingual chatbot** with instant switching (EN, RW, AR, FR).
✅ **Hospital listings** in SaaS card + map hybrid layout.
✅ **Persistent settings & session data** across installs.

---

- Gemini_API_KEY and GOOGLE_MAP_API_KEY are in .env file
- care about UI UX
- use modren and nice ui elements and icons from fontawomse 
