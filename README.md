# Bluetooth Chat Web (React + Vite + PWA)

A secure, lightweight Bluetooth messaging web app built with React, Vite, and optional AES encryption. Supports Progressive Web App (PWA) features and can run on mobile devices with Web Bluetooth API.

---

## 🚀 Features

- 📡 Bluetooth messaging via Web Bluetooth API
- 🔐 Optional AES encryption for secure communication
- 📱 PWA-ready (installable on mobile)
- 🌐 HTTPS support (required for Bluetooth + PWA)
- 💬 Real-time chat interface
- 📦 Built with Vite + React

---

## 📂 Project Structure

```
bluetooth-chat-web/
├── public/
├── src/
│   ├── components/
│   ├── utils/
│   └── App.tsx
├── cert/ (for local SSL certs)
├── vite.config.ts
└── README.md
```

---

## 🧪 Local Development

1. Clone the repo and install dependencies:

```bash
npm install
```

2. (Optional) Generate SSL certs for HTTPS:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout key.pem -out cert.pem -days 365
mkdir cert && mv key.pem cert/ && mv cert.pem cert/
```

3. Run locally:

```bash
npm run dev
```

---

## ⚙️ Configuration

Update `vite.config.ts` for:

```ts
VitePWA({
  registerType: 'autoUpdate',
  /* other PWA options */
})
```

---

## ☁️ Deployment

### Vercel / Netlify

1. Run build:

```bash
npm run build
```

2. Upload `dist/` folder to Vercel, Netlify, or GitHub Pages.

Make sure you are using **HTTPS** for production to enable Bluetooth + PWA.

---

## 📱 Testing on Mobile

- Test with Chrome or Edge on Android (iOS doesn't fully support Web Bluetooth)
- Make sure to serve over HTTPS
  
  <div style={{ textAlign: 'center' }}>
  <p><strong> Use the browser's install prompt to save as an app (as shown in the below image is the install icon in the browser to install the web app)</strong></p>
  <img
    src="https://github.com/user-attachments/assets/1e413e73-2f49-4792-b0c2-84cb4e3461d9"
    alt="Install prompt illustration"
    width="72"
    height="67"
  />
</div>

---
