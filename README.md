# Monower Hossen - AI/ML Engineer Portfolio

## Project Overview

Premium, professional, modern, fully responsive AI/ML Engineer portfolio website for **Monower Hossen**. Built with HTML5, CSS3, and Vanilla JavaScript (ES6+). The website is designed to impress technical recruiters, hiring managers, AI companies, and software companies.

## Features

- **11 Complete Sections**: Navigation, Hero, About Me, Technical Skills, Featured Projects, Education, Certifications & Learning, Professional Profiles, Resume, Contact, and Footer
- **Dark AI Professional Design**: Premium dark navy background, electric blue and cyan accents, subtle purple gradients, modern typography
- **Responsive Design**: Mobile-first approach, fully responsive from 320px to 1400px+
- **Smooth Interactions**: Mobile menu, smooth scrolling, active navigation highlighting, scroll reveal animations, back to top button
- **Contact Form**: With input validation, email validation, loading state, and success/error feedback
- **SEO Optimized**: Meta tags, Open Graph metadata, sitemap.xml, robots.txt, semantic HTML5
- **Performance**: Lightweight, no JavaScript frameworks (only Google Fonts and Font Awesome from CDNs), optimized CSS and JavaScript
- **Accessibility**: prefers-reduced-motion support, keyboard navigation, ARIA labels, screen reader friendly
- **No fake content**: Sections with no data yet (e.g. Certifications) are hidden instead of showing placeholder text

## Technology Stack

- **HTML5**: Semantic markup with accessible structure
- **CSS3**: CSS Grid, Flexbox, variables, animations, media queries
- **Vanilla JavaScript (ES6+)**: Modular code, event listeners, form validation
- **Google Fonts**: Inter, Manrope
- **Font Awesome**: Icon library
- No React, Next.js, Vue, Angular, TypeScript, Tailwind CSS, or Bootstrap

## Folder Structure

```
monower-ai-portfolio/
├── index.html          # Main HTML file with all sections
├── robots.txt          # Search engine robots file
├── sitemap.xml         # XML sitemap
├── assets/
│   ├── favicon.svg     # Favicon
│   ├── images/
│   │   ├── hero-visual.svg
│   │   ├── og-image.png   # Social sharing preview (1200x630)
│   │   └── profile.jpg    # (add your own photo; an icon is shown until then)
│   └── resume/
│       └── Monower_Hossen_Resume.pdf
├── css/
│   ├── style.css      # Main styles (variables, layout, components)
│   ├── responsive.css # Responsive design adjustments
│   └── animations.css # Scroll reveal and hover animations
└── js/
    ├── main.js        # Initialization (back to top, theme toggle, lazy loading)
    ├── navigation.js  # Mobile menu, smooth scrolling, active nav links
    ├── animations.js  # Scroll reveal, particle effects
    ├── projects.js    # Project cards generation
    └── contact.js     # Form validation and submission feedback
```

## Installation & Local Development

1. **Clone the repository** or download the project files
2. **Install Python** (if you want to run a local server)
3. **Start the development server**:

```bash
cd monower-ai-portfolio
python -m http.server 8080
```

4. **Open your browser** and visit `http://localhost:8080`

### Without a Server

You can also open `index.html` directly in any modern browser. Some features may work without a server, but a local server is recommended for the best experience.

## Customization Guide

### Personal Information

Edit the following sections in `index.html` to add your personal information:

- **Hero Section**: Name, title, headline, description, social links
- **About Me**: Personal introduction text and highlight card content
- **Skills**: Add/remove technologies in the skill categories
- **Projects**: Update project details, technologies, status, and URLs
- **Education**: Edit the `entries` array in `js/main.js`
- **Certifications**: Add verified entries to the `certificates` array in `js/main.js` (the section stays hidden until you do)
- **Profiles**: Update GitHub, LinkedIn, Kaggle, and Hugging Face URLs
- **Resume**: Replace `assets/resume/Monower_Hossen_Resume.pdf` with your latest resume (keep the file name)
- **Profile photo**: Add `assets/images/profile.jpg`
- **Contact**: Update email address and profile URLs

### Contact Form

GitHub Pages cannot run server code, so the form needs a delivery service:

1. Create a free form at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Paste its endpoint URL into `FORM_ENDPOINT` at the top of `js/contact.js`.

Until an endpoint is set, the form opens the visitor's email app with the message pre-filled.

### Color Scheme

The design uses CSS variables in `style.css`. Main colors:

- `--bg-primary`: `#080B14` - Primary background
- `--bg-secondary`: `#101827` - Secondary background
- `--accent-primary`: `#38BDF8` - Primary accent (electric blue)
- `--accent-secondary`: `#6366F1` - Secondary accent (indigo)
- `--accent-purple`: `#8B5CF6` - Purple accent
- `--accent-cyan`: `#06D6A0` - Cyan accent
- `--text-primary`: `#F8FAFC` - Primary text
- `--text-secondary`: `#94A3B8` - Secondary text

To change the color scheme, modify the `:root` variables in `style.css`.

### Adding New Projects

1. Open `js/projects.js`
2. Add a new project object to the `projects` array
3. The project card will be automatically generated

### Adding New Skills

1. Open `index.html` and find the `.skill-list` sections
2. Add new `<li>` items to the appropriate category
3. Or add new `.skill-category` divs for additional categories

### Deployment on GitHub Pages

1. Push this repository to GitHub
2. Go to repository Settings > Pages
3. Select source branch (usually `main` or `root`)
4. The site will be published at `https://<username>.github.io/<repo-name>/`

## SEO Metadata

The website includes:

- **Page Title**: `Monower Hossen - AI/ML Engineer Portfolio`
- **Meta Description**: `Monower Hossen - AI/ML Engineer portfolio featuring Machine Learning, Deep Learning, and Generative AI projects.`
- **Keywords**: `AI, ML, Machine Learning, Deep Learning, Generative AI, Python, TensorFlow, PyTorch, LangChain, portfolio`
- **Open Graph**: `og:title`, `og:description`, `og:type`, `og:url`, `og:image`, `og:site_name`, `twitter:card`
- **Twitter Card**: `summary_large_image`
- **Favicon**: `assets/favicon.svg`
- **Sitemap**: `sitemap.xml`
- **Robots**: `robots.txt` (allows indexing)

## Accessibility

- **prefers-reduced-motion**: Media query supports reduced motion preference
- **Keyboard navigation**: All interactive elements are focusable
- **ARIA labels**: Hamburger menu has `aria-expanded` state
- **Semantic HTML**: Proper heading structure, landmark regions
- **Color contrast**: Sufficient contrast between text and background
- **Form labels**: All form inputs have associated labels
- **Image alt**: Descriptive alt attributes on informative images

## Contact

- **Email**: aiwithmonower@gmail.com
- **GitHub**: github.com/Monower-Hossen
- **LinkedIn**: linkedin.com/in/monower-hossen1

Feel free to reach out if you have any questions or need help customizing the portfolio!# My-Portfolio