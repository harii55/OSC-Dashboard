# Contributing to OSC Leaderboard

Thank you for your interest in contributing to the Open Source Club! 🎉 Your contributions help us build better software and a stronger community.

---

## 📋 Getting Started

1. **Find an Issue**: Check the issue tab on this repository for something you'd like to work on. Look for issues labeled `help wanted` or `good first issue` if you're new.

2. **Get It Assigned**: Comment on the issue that you'd like to work on, or reach out to a core member to get it assigned to you.

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git
- GitHub account

## Setup Instructions

### 1. Fork & Clone

**First, fork this repository to your GitHub account, then:**

```bash
git clone https://github.com/YOUR_USERNAME/OSC-Dashboard.git
cd OSC-Dashboard
npm install
```

### 2. Install Missing Dependencies

The project uses Lucide React icons. Install it:

```bash
npm install lucide-react
```

### 3. Supabase Setup

#### Create Supabase Project

1. Go to [Supabase Console](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details
4. Wait for database setup (2-3 minutes)

#### Enable GitHub Authentication

1. In your Supabase project, go to **Authentication** > **Providers**
2. Enable **GitHub** provider
3. Add OAuth credentials:
   - **Client ID**: Get from GitHub OAuth App
   - **Client Secret**: Get from GitHub OAuth App

#### Create GitHub OAuth App

1. Go to GitHub **Settings** > **Developer settings** > **OAuth Apps**
2. Click **New OAuth App**
3. Fill in details:
   - **Application name**: OSC Dashboard
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**:
     ```
     https://<your-project-ref>.supabase.co/auth/v1/callback
     ```
4. Copy **Client ID** and **Client Secret** to Supabase

#### Configure Supabase URLs

1. Go to **Authentication** > **URL Configuration**
2. **Site URL**: `http://localhost:5173`

### 4. Database Setup

Create the users table:

1. Go to **SQL Editor** in Supabase
2. Execute the content from `supabase_users_table.sql`:

```sql
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text,
  full_name text,
  email text unique,
  is_active boolean default false,
  created_at timestamp with time zone default timezone('utc', now()),
  updated_at timestamp with time zone default timezone('utc', now())
);
```

### 5. Environment Configuration

Create `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

**Get these values from:**

- Supabase Project Settings > DATA API > Project URL
- Supabase Project Settings > API KEYS > Legacy API keys > anon public

### 6. Start Development Server

```bash
npm run dev
```

Navigate to `http://localhost:5173`

---

## Development Guidelines

### Code Standards

- Use functional components with hooks
- Follow existing CSS naming conventions
- Keep components small and focused
- Add comments for complex logic

### Testing Your Changes

1. Test GitHub login functionality
2. Verify user data is saved to database
3. Check responsive design on mobile
4. Test all navigation and interactions
5. Test toast notification system

## 📝 Issue & PR Titles

To keep things organized, we follow a specific format:

- **Issue Titles**: `[OSC] #<issue-number>: Brief issue description`
- **PR Titles**: `[OSC] #<issue-number>: Brief PR description`

Replace `OSC` with the project acronym, and `#<issue-number>` with the actual issue number. This helps us link PRs directly to issues.

**Example**:

- **Issue**: `[OSC] #42: Add user authentication`
- **PR**: `[OSC] #42: Implement OAuth2 for login`

Always include the issue number in your PR description so that the relevant issue can be automatically closed once the PR is merged.

---

## 🧩 Creating Issues

When you create a new issue, follow this structure to make it easier for everyone:

1. **Overview**: A brief summary of the issue.
2. **Tasks**: Break down the issue into smaller tasks or steps using bullet points or a checklist (preferred).
3. **Resources/Examples**: Provide any links, screenshots, or code snippets that can help clarify the issue.

This way, anyone picking up the issue has a clear roadmap to follow.

---

## 🔄 PR Descriptions

For Pull Requests, use a similar structure:

1. **Overview**: Briefly explain what the PR does.
2. **Changes Made**: List out the key changes, ideally linking them to the tasks from the issue.
3. **Testing**: Mention if you've tested the changes and how (e.g., "Tested locally on my machine", "Added unit tests").
4. **Related Issues**: Reference the issue number(s) this PR addresses.

This makes it easy for core members to review and merge PRs efficiently.

---

## Troubleshooting

### Authentication Issues

- Verify GitHub OAuth app configuration
- Check Supabase provider settings
- Ensure callback URLs match exactly
- Check browser console for auth errors

### Database Issues

- Ensure users table exists (run SQL script)
- Check Supabase connection in browser dev tools
- Verify environment variables are loaded

### Build Issues

- Install missing dependencies: `npm install lucide-react`
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for linting errors: `npm run lint`

### Common Errors

- **Icons not displaying**: Install `lucide-react` package
- **Supabase connection failed**: Check `.env` file configuration
- **GitHub login not working**: Verify OAuth app callback URL

---

## 📜 Code of Conduct

Please note that we have a Code of Conduct, checkout [README.md](https://github.com/OSCxSST/.github/blob/main/profile/README.md) to ensure a welcoming environment for everyone. Please read it before contributing.

---

## ❓ Questions

If you have any questions or need any help, don't hesitate to ask. You can:

- Comment on the issue you're working on
- Join our community chat on [WhatsApp](https://chat.whatsapp.com/Kr1b8wXAMsWDLwDXgZnTiH)
- Direct message a core member

---

We're excited to see what you'll build with us! Let's create something amazing together. ✨
