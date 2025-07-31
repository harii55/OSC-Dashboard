# OSC Leaderboard

A beautiful, premium dark-themed leaderboard for tracking Open Source Club (OSC) member contributions. Built with React, Firebase, and modern web technologies.

## Features

- 🔐 **Secure Authentication**: Google Auth with domain restriction to `@sst.scaler.com` emails
- 🎨 **Premium Dark Theme**: Elegant glassmorphism design with smooth animations
- 📊 **Real-time Stats**: Track total members, PRs, average scores, and active contributors
- 🏆 **Leaderboard**: Beautiful ranking system with trophy icons for top performers
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Fast & Modern**: Built with React 19, Framer Motion, and Lucide React icons

## Screenshots

The application features:
- Sticky header with user authentication
- Welcome section with gradient text
- Statistics cards with hover effects
- Interactive leaderboard table
- Smooth animations and transitions
- Premium dark theme with glassmorphism effects

## Tech Stack

- **Frontend**: React 19, CSS3 with custom properties
- **Authentication**: Firebase Google Auth
- **Database**: Firebase Firestore (for future data storage)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Styling**: Custom CSS with glassmorphism effects

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project with Google Auth enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd osc-leaderboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Google Authentication
   - Create a web app and get your configuration
   - Update the Firebase config in `src/firebase.js`

4. **Configure Firebase**
   Replace the placeholder config in `src/firebase.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## Firebase Setup

### 1. Create Firebase Project
- Go to [Firebase Console](https://console.firebase.google.com/)
- Click "Add project"
- Follow the setup wizard

### 2. Enable Authentication
- In your Firebase project, go to "Authentication"
- Click "Get started"
- Go to "Sign-in method" tab
- Enable "Google" provider
- Add your domain to authorized domains

### 3. Get Configuration
- Go to Project Settings (gear icon)
- Scroll down to "Your apps"
- Click the web app icon
- Copy the configuration object

### 4. Security Rules
The app automatically restricts access to `@sst.scaler.com` email addresses. Users with other domains will be signed out automatically.

## Project Structure

```
src/
├── App.js              # Main application component
├── App.css             # Premium dark theme styles
├── firebase.js         # Firebase configuration and auth functions
├── index.js            # React entry point
└── index.css           # Global styles
```

## Customization

### Colors and Theme
The theme uses CSS custom properties defined in `src/App.css`. You can easily customize:

- Primary colors: `--accent-primary`, `--accent-secondary`
- Background colors: `--primary-bg`, `--secondary-bg`
- Text colors: `--text-primary`, `--text-secondary`
- Gradients: `--gradient-primary`, `--gradient-secondary`

### Adding Real Data
Replace the mock data in `App.js` with real data from your backend:

```javascript
// Replace this with real API calls
const [leaderboardData] = useState([...]);
const stats = {...};
```

## Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Deploy: `firebase deploy`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-email] or create an issue in the repository.

---

**Built with ❤️ for the Open Source Club**
