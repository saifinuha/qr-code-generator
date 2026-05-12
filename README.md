# 🎨 QR Studio - macOS QR Code Generator

![QR Studio App Icon](build/icon.png)

**QR Studio** adalah aplikasi macOS native yang elegan dan minimalis untuk membuat serta mengkustomisasi QR Code dengan gaya *glassmorphism* yang premium. Dibangun menggunakan Electron dan Vanilla JS untuk performa yang ringan dan tampilan yang selaras dengan macOS.

## ✨ Fitur Utama

- 🔗 **Multiple Data Types**: Dukungan untuk Link (URL), Plain Text, WiFi Network, dan vCard (Contact).
- 🎨 **Deep Customization**: 
  - Ubah gaya titik (Classic, Rounded, Dot).
  - Kustomisasi warna QR Code secara real-time.
  - Atur kelengkungan sudut (*corner radius*) dengan slider.
- 🖼️ **Logo Integration**: Unggah logo kustom Anda ke tengah QR Code.
- 🌓 **Adaptive Themes**: Dukungan penuh untuk Dark Mode dan Light Mode.
- 💾 **High-Quality Export**: Simpan hasil akhir dalam format PNG berkualitas tinggi.
-  **Native macOS Feel**: Efek *vibrancy* jendela, kontrol jendela tersembunyi, dan ikon aplikasi premium.

## 🚀 Cara Menjalankan (Development)

Jika Anda ingin menjalankan proyek ini secara lokal, pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).

1. Clone repositori ini:
   ```bash
   git clone https://github.com/saifinuha/qr-studio.git
   cd qr-studio
   ```

2. Instal dependensi:
   ```bash
   npm install
   ```

3. Jalankan aplikasi:
   ```bash
   npm start
   ```

## 📦 Cara Build (Produksi)

Untuk membuat file `.dmg` atau `.app` secara native di macOS:

```bash
npm run build
```
Hasil build akan tersedia di folder `/dist`.

## 🛠️ Teknologi yang Digunakan

- **Electron**: Framework utama aplikasi desktop.
- **qr-code-styling**: Library inti generator QR Code.
- **Remix Icon**: Set ikon yang elegan dan konsisten.
- **CSS Vanilla**: Desain kustom dengan efek Glassmorphism.

## ☕ Author

Made with ❤️ by **saifinuha**

---
*Note: Aplikasi ini bersifat open-source. Jangan ragu untuk melakukan fork dan berkontribusi!*
