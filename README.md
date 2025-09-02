# Elite Basketball Training Website

A premium, minimalist, corporate-inspired website for a basketball trainer built with React and Tailwind CSS.

## 🏀 Features

### Core Sections
- **Hero Section**: Full-width video background with compelling CTAs
- **About Section**: Split-screen layout showcasing trainer credentials
- **Services**: Card-based grid with 4 training options
- **Media Gallery**: Photo/video showcase with lightbox functionality
- **Booking System**: Multi-step booking form with payment integration placeholder
- **Testimonials**: Auto-playing carousel with player testimonials
- **Footer**: Contact information and social links

### Design System
- **Colors**: Black (#000), White (#fff), Grays (#f8f8f8, #e5e5e5, #666), Basketball Orange (#E65C2A)
- **Typography**: Inter (headlines), Lato (body text)
- **Layout**: Systematic grid with balanced spacing
- **Animations**: Smooth scroll animations, hover effects, and micro-interactions

### Technical Features
- **Responsive Design**: Mobile-first approach with breakpoints
- **Accessibility**: WCAG 2.1 AA compliant
- **Performance**: Optimized for fast loading
- **SEO**: Semantic HTML and meta tags

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd agency2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx              # Video hero with CTAs
│   ├── Navigation.tsx        # Responsive navigation
│   ├── About.tsx             # Trainer information
│   ├── Services.tsx          # Training services grid
│   ├── MediaGallery.tsx      # Photo/video gallery
│   ├── Booking.tsx           # Booking form
│   ├── Testimonials.tsx      # Player testimonials
│   └── Footer.tsx            # Contact and social links
├── App.tsx                   # Main application component
├── index.css                 # Global styles and Tailwind imports
└── index.tsx                 # Application entry point
```

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.js`:
```javascript
colors: {
  'basketball-orange': '#E65C2A',
  'light-gray': '#f8f8f8',
  'medium-gray': '#e5e5e5',
  'dark-gray': '#666',
}
```

### Content
- Replace placeholder images in components with actual photos
- Update trainer information in `About.tsx`
- Modify service offerings in `Services.tsx`
- Add real testimonials in `Testimonials.tsx`

### Booking Integration
The booking form is ready for integration with:
- Calendar APIs (Google Calendar, Calendly)
- Payment processors (Stripe, PayPal)
- Email services (SendGrid, Mailgun)

## 📱 Mobile Responsiveness

The website is fully responsive with:
- Mobile-first design approach
- Touch-friendly navigation
- Optimized media gallery for mobile
- Stacked booking form layout
- Responsive typography scaling

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please contact:
- Email: coach@elitetraining.com
- Phone: (555) 123-4567

---

Built with ❤️ for basketball players chasing excellence.# basketball
