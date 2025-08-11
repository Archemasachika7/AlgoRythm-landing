# DSA/CP Platform - Competitive Programming Hub

A modern, glassmorphic landing page for a Data Structures & Algorithms / Competitive Programming platform built with Next.js 15, TypeScript, and Tailwind CSS.

## ✨ Features

- **Modern UI/UX**: Glassmorphic design with animated elements
- **Interactive Components**: Flip cards, 3D gallery, animated stats
- **Competitive Leaderboard**: Real-time rankings with detailed user profiles
- **Responsive Design**: Mobile-first approach with dark theme
- **Performance Optimized**: Built with Next.js 15 and Server Components

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Vercel Ready

## 🛠 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or  
   pnpm dev
   # or
   bun dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the result.

## 📁 Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── globals.css     # Global styles with Tailwind
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Homepage
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components
│   ├── heros/         # Hero sections
│   ├── navbars/       # Navigation components
│   ├── feature/       # Feature sections
│   ├── stats/         # Statistics components
│   ├── gallery/       # Gallery sections
│   ├── leaderboard/   # Ranking components
│   ├── testimonials/  # User testimonials
│   ├── pricing/       # Pricing sections
│   ├── cta/           # Call-to-action sections
│   └── footers/       # Footer components
├── hooks/             # Custom React hooks
└── lib/               # Utility functions
```

## 🎨 Components

- **FloatingNavbar**: Glassmorphic navigation with blur effects
- **EnhancedGlassmorphicHero**: Animated hero with 3D elements
- **OverlayImageCards**: Interactive feature cards
- **InteractiveGraphStats**: Animated statistics counters  
- **Coverflow3DGallery**: 3D rotating image gallery
- **CompetitiveLeaderboard**: Flip cards with user rankings
- **ScrollingCarouselTestimonials**: Smooth testimonial carousel
- **DualThemePricing**: Clean pricing tiers (INR currency)
- **GradientOverlayCta**: Final conversion section
- **GradientBackgroundFooter**: Comprehensive footer

## 💫 Key Features

### Glassmorphic Design
- Backdrop blur effects throughout
- Orange/yellow glow matching brand colors
- Semi-transparent overlays and surfaces

### Interactive Elements
- 3D hover effects on cards
- Animated counters and statistics
- Smooth scroll animations
- Flip card interactions

### Performance
- Server Components for optimal loading
- Optimized images and assets
- Minimal client-side JavaScript
- SEO-friendly structure

## 🚀 Deployment

The easiest way to deploy is using [Vercel](https://vercel.com/new):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/your-repo-name)

## 📝 Environment Variables

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first styling
- Framer Motion for smooth animations
- Lucide for beautiful icons
