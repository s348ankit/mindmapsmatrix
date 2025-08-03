# MindMatrix AIML Academy Website

## Overview

MindMatrix AIML Academy is a static educational website showcasing AI and Machine Learning courses offered by an academy in the Bhopal area. The website serves as a comprehensive platform providing information about course offerings, syllabi, learning outcomes, corporate training, and educational content through a blog section. The academy targets both technical professionals (coders) and non-technical individuals interested in AI/ML education.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
The website follows a traditional multi-page static website architecture using HTML5, CSS3, and vanilla JavaScript. Key architectural decisions include:

- **Static Site Structure**: Uses individual HTML files for each page (index.html, about.html, courses.html, etc.) for simplicity and fast loading
- **CSS Framework**: Implements Tailwind CSS via CDN for rapid UI development and consistent styling
- **Custom CSS**: Maintains a separate styles.css file for academy-specific animations and component styles
- **Responsive Design**: Mobile-first approach with responsive navigation and layouts

### Styling System
- **Tailwind CSS Configuration**: Custom color palette with primary (#2563eb), secondary (#059669), and accent (#10b981) colors
- **Component-based CSS**: Reusable classes for navigation links, buttons, and cards
- **Animation System**: Custom CSS animations for fade-in and slide-in effects to enhance user experience

### JavaScript Architecture
The application uses a modular vanilla JavaScript approach:

- **main.js**: Core functionality including navigation, contact forms, FAQ interactions, and scroll animations
- **blog.js**: Dedicated module for blog functionality including post loading, filtering, and pagination
- **Event-driven Programming**: Uses DOMContentLoaded events and event delegation patterns

### Content Management
- **JSON-based Blog System**: Blog posts stored in JSON format (blog-posts.json) for easy content management
- **Dynamic Content Loading**: JavaScript fetches and renders blog content dynamically
- **Template-based Rendering**: Uses JavaScript to populate HTML templates with blog data

### SEO and Performance Optimization
- **Meta Tags**: Comprehensive SEO meta tags including Open Graph tags for social sharing
- **Semantic HTML**: Proper heading hierarchy and semantic elements for better accessibility
- **Asset Organization**: Structured asset folders (css/, js/, images/, data/) for maintainability

### Navigation System
- **Sticky Navigation**: Fixed header navigation with active state management
- **Mobile-responsive Menu**: Hamburger menu for mobile devices with smooth transitions
- **Multi-page Navigation**: Traditional anchor-based navigation between HTML pages

## External Dependencies

### CDN Dependencies
- **Tailwind CSS**: Frontend CSS framework loaded via CDN for rapid styling
- **Font Awesome**: Icon library (v6.4.0) for consistent iconography throughout the site
- **Google Fonts**: Web fonts for enhanced typography (referenced in HTML head sections)

### Third-party Integrations
- **WhatsApp Widget**: Contact integration for direct communication with the academy (restored with improved functionality)
- **Google Maps Integration**: Clickable link on contact page that opens location in Google Maps
- **Social Media Integration**: Links to social platforms for broader engagement
- **Email Integration**: Contact forms configured for email submission (implementation pending)

### Content Delivery
- **Static Asset Hosting**: All images, CSS, and JavaScript files served as static assets
- **Blog Content API**: JSON-based content system for blog posts with local file serving

### SEO and Analytics
- **Search Engine Optimization**: Meta tags, robots.txt, and sitemap.xml for search engine visibility
- **Structured Data**: Open Graph tags for social media sharing optimization