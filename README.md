# OSC Leaderboard

A premium dark-themed leaderboard for tracking Open Source Club (OSC) member contributions. Built with React, Supabase, and modern web technologies.

## Features

🔐 **GitHub Authentication**: Simple and secure GitHub OAuth login  
🎨 **Premium Dark Theme**: Elegant glassmorphism design with smooth animations  
📊 **Real-time Stats**: Track total members, PRs, and active contributors  
🏆 **Leaderboard**: Beautiful ranking system with trophy icons for top performers  
📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices  
⚡ **Fast & Modern**: Built with React 19, Vite, and Supabase  
🔔 **Toast Notifications**: Interactive notification system for user feedback

## Tech Stack

- **Frontend**: React 19, CSS3 with custom properties, Vite
- **Authentication**: Supabase GitHub OAuth
- **Database**: Supabase (PostgreSQL)
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Styling**: Custom CSS with glassmorphism effects

## Project Structure

```
src/
├── api/
│   └── supabaseClient.js      # Supabase configuration
├── components/
│   └── ToastContainer.jsx     # Toast notifications
├── hooks/
│   ├── useAuth.js             # GitHub authentication logic
│   ├── useToast.js            # Toast notification hook
│   └── useUpsertUser.js       # User database operations
├── pages/
│   ├── Home.jsx               # Main dashboard with leaderboard
│   └── Login.jsx              # GitHub login page
└── utils/                     # Utility functions (empty)
```

## Key Components

- **Dashboard**: Real-time stats, user management, leaderboard table
- **Authentication**: GitHub OAuth with session management
- **User Management**: Automatic user data sync to database
- **Responsive UI**: Mobile-first design with smooth animations

## Contributing

Want to contribute? Check out our [CONTRIBUTING.md](CONTRIBUTING.md) for setup instructions and development guidelines.

## License

This project is licensed under the MIT License.

## Support

For support, create an issue in the repository or contact the OSC team.

---

**Built with ❤️ for the Open Source Club**
