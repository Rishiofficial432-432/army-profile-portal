

# Army-Themed Frontend Website

## Overview
A modern, military-inspired website with authentication, user profiles, and polished UI/UX. All data will be stored locally in the browser (localStorage) — no backend required.

## Design System
- **Color palette**: Army greens (olive, forest, khaki), dark browns, sand/tan accents, with crisp white text
- **Typography**: Bold, structured fonts with a commanding feel
- **Visual elements**: Camouflage-inspired patterns, military star/chevron accents, sharp borders and clean geometric layouts
- **Dark mode support** as the "Smart UI Feature" (theme switcher between Light, Dark, and Camo themes)

## Pages & Features

### 1. Home Page
- Hero section with a striking Army-themed banner, tagline, and call-to-action buttons (Join / Sign In)
- Feature highlights section showcasing the site's capabilities
- Motivational quotes or Army values section (Duty, Honor, Country)
- Footer with navigation links and military-style branding

### 2. Sign Up Page
- Registration form: Name, Email, Password, Confirm Password
- Client-side validation with clear error messages
- Army-themed styling with rank/role selection (Cadet, Soldier, Officer, Commander)
- Stores user data in localStorage

### 3. Sign In / Login Page
- Email and password login form
- "Remember me" toggle
- Validates against localStorage-stored credentials
- Redirects to profile on success

### 4. About Page
- Mission statement and values section
- Team/unit showcase with cards
- Timeline or history section with Army-inspired content
- Visually rich with icons and imagery

### 5. Contact Us Page
- Contact form: Name, Email, Subject, Message
- Form validation and success toast notification
- Location/base info display with contact details
- FAQ accordion section

### 6. User Profile Section
- **Profile Card**: Avatar image, display name, rank/role badge, short bio
- **Social Links**: LinkedIn, Instagram, Facebook, X (Twitter) with icons
- **Profile Customization**:
  - Editable bio with save functionality
  - Profile theme selector (Light / Dark / Camo)
  - Social link manager — add, edit, remove links
- All profile data persisted in localStorage

### 7. Smart UI Feature — Theme Switcher
- Toggle between Light, Dark, and Camo visual themes
- Accessible from the navigation bar
- Persists user preference across sessions
- Each theme has distinct Army-inspired color schemes

## Navigation
- Responsive top navbar with military-style logo/branding
- Links: Home, About, Contact, Sign In/Sign Up (when logged out), Profile (when logged in)
- Mobile hamburger menu
- Active route highlighting

## UX Polish
- Smooth page transitions
- Toast notifications for actions (login success, profile saved, etc.)
- Fully responsive across desktop, tablet, and mobile
- Consistent spacing, typography, and color usage throughout

