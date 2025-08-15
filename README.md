# FreshGlobal - Premium Fruit Import & Export Website

A modern, interactive website for a fruit import-export business featuring a 3D rotating globe, product catalog, company journey, and contact forms. Built with pure vanilla JavaScript, HTML5, and CSS3.

## 🌟 Features

- **Interactive 3D Globe**: Rotating globe with trade location markers and shipping routes
- **Product Catalog**: Searchable and filterable fruit products with detailed specifications
- **Smooth Animations**: GSAP-powered scroll animations and transitions
- **Responsive Design**: Mobile-first design that works on all devices
- **Contact Integration**: Email and WhatsApp contact options
- **Modern UI**: Clean, professional design with hover effects and micro-interactions

## 🚀 Quick Start

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- A local web server (recommended for best performance)

### Installation & Setup

1. **Download the project files**
   \`\`\`bash
   # If you have the ZIP file, extract it
   unzip fruit-export-website.zip
   cd fruit-export-website
   \`\`\`

2. **Serve the website locally**
   
   **Option A: Using Python (if installed)**
   \`\`\`bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   \`\`\`
   
   **Option B: Using Node.js (if installed)**
   \`\`\`bash
   # Install a simple server globally
   npm install -g http-server
   
   # Run the server
   http-server -p 8000
   \`\`\`
   
   **Option C: Using PHP (if installed)**
   \`\`\`bash
   php -S localhost:8000
   \`\`\`
   
   **Option D: Using Live Server (VS Code Extension)**
   - Install the "Live Server" extension in VS Code
   - Right-click on `index.html` and select "Open with Live Server"

3. **Open in browser**
   - Navigate to `http://localhost:8000`
   - The website should load with the interactive 3D globe

## 📁 Project Structure

\`\`\`
fruit-export-website/
├── index.html              # Main HTML file
├── styles/
│   └── main.css            # All CSS styles
├── js/
│   ├── main.js             # Core functionality
│   ├── products.js         # Product catalog logic
│   ├── globe.js            # 3D globe implementation
│   └── animations.js       # GSAP animations
└── README.md               # This file
\`\`\`

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox/Grid, animations, and responsive design
- **Vanilla JavaScript**: Core functionality and DOM manipulation
- **Three.js**: 3D globe visualization and WebGL rendering
- **GSAP**: Professional animations and scroll triggers
- **Google Fonts**: Inter font family for typography

## 🎨 Customization

### Colors
The website uses a green-based color scheme. To change colors, modify the CSS custom properties in `styles/main.css`:

\`\`\`css
:root {
  --primary-color: #059669;
  --primary-dark: #047857;
  --primary-light: #ecfdf5;
  --accent-color: #ff6b35;
}
\`\`\`

### Products
To add or modify products, edit the `products` array in `js/products.js`:

\`\`\`javascript
const products = [
  {
    id: 1,
    name: "Your Fruit Name",
    country: "Country of Origin",
    season: "Season",
    pricePerKg: "$X.XX",
    pricePerCarton: "$XX.XX",
    // ... other properties
  }
];
\`\`\`

### Contact Information
Update contact details in `js/main.js` and the HTML:

\`\`\`javascript
// WhatsApp number
const phoneNumber = 'your-whatsapp-number';

// Email address
const email = 'your-email@domain.com';
\`\`\`

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔧 Troubleshooting

### 3D Globe Not Loading
- Ensure you're serving the site from a web server (not opening the HTML file directly)
- Check browser console for JavaScript errors
- Verify Three.js CDN is accessible

### Animations Not Working
- Check that GSAP CDN links are loading properly
- Ensure JavaScript is enabled in the browser
- Verify ScrollTrigger plugin is loaded

### Images Not Displaying
- The website uses placeholder images from placeholder.svg
- Replace with actual product images by updating the `image` property in the products array

## 🚀 Deployment Options

### 1. Static Hosting (Recommended)
- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Push to a GitHub repo and enable Pages

### 2. Traditional Web Hosting
- Upload all files to your web server's public directory
- Ensure the directory structure is maintained

### 3. CDN Deployment
- Upload to any CDN service
- Update any absolute paths if necessary

## 📧 Contact Integration

The website includes two contact methods:

1. **Email Forms**: Opens the user's default email client with pre-filled content
2. **WhatsApp**: Opens WhatsApp Web/App with pre-filled message

To customize:
- Update email addresses in the JavaScript files
- Modify WhatsApp number in `js/main.js`
- Customize message templates as needed

## 🎯 Performance Tips

- **Images**: Optimize product images for web (WebP format recommended)
- **CDN**: Consider using CDN for Three.js and GSAP for better performance
- **Caching**: Implement browser caching headers on your server
- **Minification**: Minify CSS and JavaScript for production

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Support

For support or questions:
- Check the browser console for error messages
- Ensure all CDN resources are loading
- Verify you're running the site from a web server

---

**Built with ❤️ for the global fruit trade industry**
# 3dwebsite
