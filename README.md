# BEGIN | the work

A modern React-based website for Begin the Work, a digital strategy and product management consulting firm led by Sam DuRegger.

## 🚀 Features

- **Modern React Architecture**: Built with Vite for fast development and optimized builds
- **Responsive Design**: Mobile-first approach with Bootstrap integration
- **Dynamic Content**: JSON-driven content management for projects and speaking topics
- **SEO Optimized**: Comprehensive SEO implementation with structured data
- **Analytics Integration**: Google Analytics 4 with cross-domain tracking
- **Firebase Integration**: Firestore database for podcast episodes and admin functionality
- **Interactive Elements**: Typed.js animations, image galleries, and dynamic forms

## 📁 Project Structure

```
beginthework/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── Header.jsx     # Navigation and sidebar
│   │   ├── Footer.jsx     # Site footer
│   │   ├── SEOHead.jsx    # SEO meta tags
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── About.jsx      # About page
│   │   ├── Speaking.jsx   # Speaking topics
│   │   └── ...
│   ├── data/              # JSON data files
│   │   ├── projects.json  # Project information
│   │   └── speaking.json  # Speaking topics
│   ├── assets/            # Images, CSS, JS
│   ├── firebase/          # Firebase configuration
│   └── utils/             # Utility functions
├── scripts/               # Build and utility scripts
└── docs/                  # Documentation
```

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router
- **Styling**: CSS3, Bootstrap 5, Custom CSS
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Analytics**: Google Analytics 4
- **Build Tool**: Vite
- **Deployment**: Firebase Hosting

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/beginthework.git
cd beginthework
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with your Firebase config
cp .env.example .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run generate-sitemap` - Generate XML sitemap
- `npm run deploy` - Deploy to Firebase

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project
2. Enable Firestore Database
3. Enable Firebase Storage
4. Add your Firebase config to `src/firebase/config.js`

### Environment Variables

Create a `.env` file with:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_GA4_MEASUREMENT_ID=your_ga4_measurement_id
```

## 📊 Content Management

### Projects
Projects are managed in `src/data/projects.json` with categories:
- Our Brands & Products
- Fractional Consulting
- Published Works

### Speaking Topics
Speaking topics are managed in `src/data/speaking.json` with sections:
- Talks & Keynotes
- Guest Lectures & Dialogues
- Workshops & Facilitation

### Podcast Episodes
Podcast episodes are managed through the Firebase admin dashboard at `/admin`.

## 🎨 Customization

### Colors
Update CSS custom properties in `src/assets/css/style.css`:
```css
:root {
  --primary-color: #2a4799;
  --secondary-color: #ff3d4f;
  --accent-color: #f6f5ff;
}
```

### Typography
Font families and sizes can be customized in the CSS variables section.

## 🚀 Deployment

### Firebase Hosting

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```

2. Login to Firebase:
```bash
firebase login
```

3. Initialize Firebase:
```bash
firebase init hosting
```

4. Deploy:
```bash
npm run build
firebase deploy
```

## 📈 SEO Features

- Dynamic meta tags for each page
- Open Graph images for social sharing
- Structured data (JSON-LD) for search engines
- XML sitemap generation
- Robots.txt configuration
- AI crawler optimization

## 📊 Analytics

- Google Analytics 4 integration
- Cross-domain tracking for multiple sites
- Custom event tracking for user interactions
- Conversion tracking for CTAs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Contact

**Sam DuRegger** - [@samduregger](https://twitter.com/samduregger) - [sam@beginthework.com](mailto:sam@beginthework.com)

Project Link: [https://github.com/yourusername/beginthework](https://github.com/yourusername/beginthework)

## 🙏 Acknowledgments

- Built with React and Vite
- Styled with Bootstrap and custom CSS
- Icons by Font Awesome
- Analytics by Google Analytics 4
- Hosting by Firebase

