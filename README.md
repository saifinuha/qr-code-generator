# 🎨 QR Studio — Professional QR Code Generator

![QR Studio App Icon](build/icon.png)

**QR Studio** adalah aplikasi pembuat QR Code premium yang tersedia untuk Desktop (**macOS, Windows, Linux**) dan **Web**. Dibangun dengan estetika *Glassmorphism* modern, aplikasi ini memungkinkan Anda membuat QR Code yang cantik dan profesional dalam hitungan detik.

### 🌐 Live Demo
Aplikasi ini dapat diakses langsung via browser di:
**[https://saifinuha.github.io/qr-code-generator/](https://saifinuha.github.io/qr-code-generator/)**

---

## ✨ Fitur Utama

- 🔗 **Multiple Data Types**: Dukungan untuk Link (URL), Plain Text, WiFi Network, dan vCard (Contact).
- 🎨 **Deep Customization**: 
  - **Pattern Style**: Ubah gaya pola utama (Square, Rounded, Dot).
  - **Advanced Corners**: Atur gaya bingkai luar (*Outer*) dan titik dalam (*Inner*) secara terpisah.
  - **Dual Color System**: Kustomisasi warna pola utama dan warna pojok secara independen.
- 🖼️ **Logo Integration**: Unggah logo kustom Anda ke tengah QR Code untuk branding yang kuat.
- 📱 **Fully Responsive**: Antarmuka adaptif untuk Desktop, Tablet, dan Mobile.
- 🌓 **Adaptive Themes**: Sinkronisasi tema Dark/Light Mode yang cerdas.
- 🚀 **Platform Optimized**: Fitur eksklusif tambahan saat dijalankan di versi Desktop (Electron).

---

## 🚀 Cara Menjalankan (Development)

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).

1. **Clone & Install**:
   ```bash
   git clone https://github.com/saifinuha/qr-studio.git
   cd qr-studio
   npm install
   ```

2. **Jalankan via Desktop (Electron)**:
   ```bash
   npm start
   ```

3. **Jalankan via Browser (Web)**:
   ```bash
   npm run web
   ```

---

## 📦 Build & Distribusi

Aplikasi ini mendukung build multi-arsitektur (**Intel x64** & **Apple Silicon/ARM64**) untuk semua platform:

### 🍎 macOS
```bash
npm run build:mac
```

### 🪟 Windows
```bash
npm run build:win
```

### 🐧 Linux
```bash
npm run build:linux
```

Hasil kompilasi akan tersedia di folder `/dist`.

---

## 🛠️ Teknologi yang Digunakan

- **Electron**: Untuk pengalaman desktop native lintas platform.
- **qr-code-styling**: Library inti generator QR Code berkualitas tinggi.
- **Remix Icon**: Set ikon yang elegan dan konsisten.
- **CSS3 & HTML5**: Desain kustom premium dengan Glassmorphism dan sistem tema dinamis.

---

## ☕ Author

Made with ❤️ by **saifinuha**

---
*Note: Aplikasi ini bersifat open-source. Jangan ragu untuk melakukan fork dan berkontribusi!*
