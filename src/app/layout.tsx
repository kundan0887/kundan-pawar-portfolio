import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

// Font configuration
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

// SEO and metadata configuration
export const metadata: Metadata = {
  title: {
    default: 'Kundan Pawar - Senior Frontend Developer',
    template: '%s | Kundan Pawar',
  },
  description:
    'Professional portfolio of Kundan Pawar, a Senior Frontend Developer with 12+ years of experience specializing in React, TypeScript, Next.js, and modern web technologies.',
  keywords: [
    'Kundan Pawar',
    'Senior Frontend Developer',
    'React Developer',
    'TypeScript',
    'Next.js',
    'Frontend Development',
    'Web Development',
    'JavaScript',
    'UI/UX',
    'Full Stack Developer',
  ],
  authors: [{ name: 'Kundan Pawar' }],
  creator: 'Kundan Pawar',
  publisher: 'Kundan Pawar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://kundanpawar.dev'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Open Graph metadata for social sharing
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://kundanpawar.dev', // Replace with your actual domain
    title: 'Kundan Pawar - Senior Frontend Developer',
    description:
      'Professional portfolio of Kundan Pawar, a Senior Frontend Developer with 12+ years of experience specializing in React, TypeScript, Next.js, and modern web technologies.',
    siteName: 'Kundan Pawar Portfolio',
    images: [
      {
        url: '/og-image.jpg', // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Kundan Pawar - Senior Frontend Developer',
      },
    ],
  },
  // Twitter metadata
  twitter: {
    card: 'summary_large_image',
    title: 'Kundan Pawar - Senior Frontend Developer',
    description:
      'Professional portfolio of Kundan Pawar, a Senior Frontend Developer with 12+ years of experience specializing in React, TypeScript, Next.js, and modern web technologies.',
    images: ['/og-image.jpg'], // Add your Twitter image
    creator: '@kundanpawar', // Replace with your Twitter handle
  },
  // Additional meta tags
  other: {
    'theme-color': '#3b82f6',
    'color-scheme': 'light dark',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Kundan Pawar',
    'application-name': 'Kundan Pawar Portfolio',
    'msapplication-TileColor': '#3b82f6',
    'msapplication-config': '/browserconfig.xml',
  },
};

// Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
};

// Theme provider component
function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-background text-foreground transition-colors duration-300'>
      {children}
    </div>
  );
}

// Analytics component placeholder
function Analytics() {
  return (
    <>
      {/* Google Analytics */}
      <script
        async
        src='https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID'
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `,
        }}
      />

      {/* Google Tag Manager */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-XXXXXXX');
          `,
        }}
      />

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src='https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX'
          height='0'
          width='0'
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='en'
      className={`${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external domains for performance */}
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link rel='preconnect' href='https://www.googletagmanager.com' />

        {/* Favicon and app icons */}
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.svg' type='image/svg+xml' />
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/manifest.json' />

        {/* DNS prefetch for performance */}
        <link rel='dns-prefetch' href='//fonts.googleapis.com' />
        <link rel='dns-prefetch' href='//www.googletagmanager.com' />
      </head>
      <body
        className={`${inter.className} antialiased bg-background text-foreground`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src='https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX'
            height='0'
            width='0'
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <ThemeProvider>{children}</ThemeProvider>

        {/* Analytics */}
        <Analytics />
      </body>
    </html>
  );
}
