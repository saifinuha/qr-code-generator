// Load library safely
let QRCodeStyling;
try {
    QRCodeStyling = require('qr-code-styling');
} catch (e) {
    QRCodeStyling = window.QRCodeStyling;
}

// Global state
let currentType = 'url';
let qrCode;

// Configuration
const typeConfig = {
    url: {
        title: 'LINK',
        subtitle: 'Generate QR for URL',
        fields: [{ label: 'Enter URL to generate QR Code', id: 'url-input', type: 'text', placeholder: 'https://www.google.com', value: 'https://google.com' }],
        format: (data) => data['url-input']
    },
    text: {
        title: 'TEXT',
        subtitle: 'Generate QR for Plain Text',
        fields: [{ label: 'Enter text to generate QR Code', id: 'text-input', type: 'textarea', placeholder: 'Enter your message...', value: 'Hello World!' }],
        format: (data) => data['text-input']
    },
    wifi: {
        title: 'WIFI',
        subtitle: 'Generate QR for WiFi Network',
        fields: [
            { label: 'SSID (Network Name)', id: 'wifi-ssid', type: 'text', placeholder: 'MyWiFi', value: '' },
            { label: 'Password', id: 'wifi-pass', type: 'password', placeholder: 'Password', value: '' }
        ],
        format: (data) => `WIFI:T:WPA;S:${data['wifi-ssid']};P:${data['wifi-pass']};;`
    },
    vcard: {
        title: 'VCARD',
        subtitle: 'Generate QR for Contact Card',
        fields: [
            { label: 'Full Name', id: 'vcard-name', type: 'text', placeholder: 'John Doe', value: '' },
            { label: 'Phone', id: 'vcard-phone', type: 'text', placeholder: '+1 234 567 890', value: '' }
        ],
        format: (data) => `BEGIN:VCARD\nVERSION:3.0\nFN:${data['vcard-name']}\nTEL:${data['vcard-phone']}\nEND:VCARD`
    }
};

// Main function to update QR
function updateQR() {
    try {
        if (!qrCode) return;

        const data = {};
        const config = typeConfig[currentType];
        config.fields.forEach(field => {
            const el = document.getElementById(field.id);
            if (el) {
                data[field.id] = el.value;
                field.value = el.value; // Store the value back in config for persistence
            }
        });

        const formattedData = config.format(data);
        const dotsColorEl = document.getElementById('dots-color');
        const dotsColor = dotsColorEl?.value || "#ffffff";
        
        // Update Color Picker UI
        const colorPreview = document.querySelector('.color-preview-gradient');
        const colorWrapper = document.querySelector('.color-picker-wrapper');
        if (colorPreview && colorWrapper) {
            colorWrapper.style.background = dotsColor;
            colorPreview.innerText = dotsColor.toUpperCase();
            
            // Contrast check
            const r = parseInt(dotsColor.slice(1,3), 16) || 0;
            const g = parseInt(dotsColor.slice(3,5), 16) || 0;
            const b = parseInt(dotsColor.slice(5,7), 16) || 0;
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            colorPreview.style.color = brightness > 128 ? '#000000' : '#ffffff';
        }
        const activeSegment = document.querySelector('.segment.active');
        const dotType = activeSegment?.getAttribute('data-value') || "square";
        const cornerRadius = document.getElementById('corner-radius-slider')?.value || 75;

        qrCode.update({
            data: formattedData || " ",
            dotsOptions: { color: dotsColor, type: dotType },
            cornersSquareOptions: {
                type: cornerRadius > 50 ? "extra-rounded" : (cornerRadius > 10 ? "rounded" : "square"),
                color: dotsColor
            },
            cornersDotOptions: { color: dotsColor }
        });

        const radiusValEl = document.getElementById('corner-radius-val');
        if (radiusValEl) radiusValEl.innerText = cornerRadius + '%';
    } catch (err) {
        console.error("QR Update Error:", err);
    }
}

// Function to render input fields
function renderFields(type) {
    const config = typeConfig[type];
    const titleEl = document.getElementById('current-type-title');
    const subEl = document.getElementById('current-type-subtitle');
    const container = document.getElementById('input-fields');
    
    if (titleEl) titleEl.innerText = config.title;
    if (subEl) subEl.innerText = config.subtitle;
    if (container) {
        container.innerHTML = '';
        config.fields.forEach(field => {
            const group = document.createElement('div');
            group.className = 'input-container';
            const label = document.createElement('label');
            label.innerText = field.label;
            group.appendChild(label);

            let input;
            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.rows = 3;
            } else {
                input = document.createElement('input');
                input.type = field.type;
            }
            input.id = field.id;
            input.placeholder = field.placeholder;
            input.value = field.value || '';
            input.addEventListener('input', updateQR);
            group.appendChild(input);
            container.appendChild(group);
        });
    }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize QR Object
    qrCode = new QRCodeStyling({
        width: 600,
        height: 600,
        type: "canvas",
        data: "https://google.com",
        dotsOptions: { color: "#ffffff", type: "square" },
        backgroundOptions: { color: "transparent" },
        cornersSquareOptions: { type: "extra-rounded", color: "#ffffff" },
        cornersDotOptions: { type: "dot", color: "#ffffff" },
        imageOptions: { crossOrigin: "anonymous", margin: 10, imageSize: 0.4 }
    });

    const previewElement = document.getElementById("qr-preview");
    if (previewElement) qrCode.append(previewElement);

    // 2. Setup Nav
    document.querySelectorAll('.nav-item[data-type]').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
            item.classList.add('active');
            currentType = item.getAttribute('data-type');
            renderFields(currentType);
            updateQR();
        });
    });

    // 3. Setup Style Controls
    document.getElementById('dot-style-selector')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('segment')) {
            document.querySelectorAll('.segment').forEach(s => s.classList.remove('active'));
            e.target.classList.add('active');
            updateQR();
        }
    });

    document.getElementById('dots-color')?.addEventListener('input', updateQR);
    document.getElementById('corner-radius-slider')?.addEventListener('input', updateQR);

    // 4. Setup Logo
    const logoInput = document.getElementById('logo-input');
    const logoTrigger = document.getElementById('logo-trigger');
    const logoPreview = document.getElementById('logo-preview');
    const logoReset = document.getElementById('logo-reset');

    logoTrigger?.addEventListener('click', () => logoInput?.click());
    logoInput?.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                qrCode.update({ image: event.target.result });
                if (logoPreview) logoPreview.innerHTML = `<img src="${event.target.result}" alt="Logo">`;
            };
            reader.readAsDataURL(file);
        }
    });

    logoReset?.addEventListener('click', () => {
        qrCode.update({ image: "" });
        if (logoPreview) logoPreview.innerHTML = ``;
        if (logoInput) logoInput.value = "";
    });

    // 5. Setup Export
    document.getElementById('btn-export-png')?.addEventListener('click', () => {
        qrCode.download({ 
            name: "qr-studio-code", 
            extension: "png",
            width: 1000,
            height: 1000
        });
    });

    // 6. Setup Theme
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle?.addEventListener('click', () => {
        const body = document.body;
        const isDark = body.getAttribute('data-theme') === 'dark';
        const newTheme = isDark ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'ri-moon-line' : 'ri-sun-line';
        }

        const dotsColorInput = document.getElementById('dots-color');
        if (dotsColorInput && (dotsColorInput.value === '#ffffff' || dotsColorInput.value === '#000000')) {
            dotsColorInput.value = isDark ? '#000000' : '#ffffff';
            updateQR();
        }
    });

    // 7. Initial Render
    renderFields('url');
    updateQR();
});
