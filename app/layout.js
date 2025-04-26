import Layout from '@/components/Layout';
import '@/styles/globals.css';
import { AppContextProvider } from '@/context/AppContext';
import {Analytics} from '@vercel/analytics';

export const metadata = {
  metadataBase: new URL('https://pratyumjagan.in'),
  title: {
    template: '%s | Pratyum Jagannath - Full Stack Developer',
    default: 'Pratyum Jagannath - Full Stack Developer & Web3 Enthusiast',
  },
  description: 'Pratyum Jagannath is a Full Stack Developer specialized in React, Node.js, Python, and Web3 technologies with experience in building innovative applications.',
  keywords: ['Full Stack Developer', 'Web3', 'React', 'Next.js', 'Pratyum Jagannath', 'PJ', 'Frontend Developer', 'Software Engineer'],
  authors: [{ name: 'Pratyum Jagannath' }],
  creator: 'Pratyum Jagannath',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pratyumjagan.in',
    siteName: 'Pratyum Jagannath Portfolio',
    title: 'Pratyum Jagannath - Full Stack Developer & Web3 Enthusiast',
    description: 'Pratyum Jagannath is a Full Stack Developer specialized in React, Node.js, Python, and Web3 technologies with experience in building innovative applications.',
    images: [
      {
        url: '/images/logo.webp', // Create this image based on your branding
        width: 1200,
        height: 630,
        alt: 'Pratyum Jagannath',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pratyum Jagannath - Full Stack Developer & Web3 Enthusiast',
    description: 'Pratyum Jagannath is a Full Stack Developer specialized in React, Node.js, Python, and Web3 technologies with experience in building innovative applications.',
    images: ['/images/logo.webp'],
    creator: '@pratyumjagan', // Update with your Twitter handle
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
  verification: {
    google: 'your-google-verification-code', // Add your Google verification code
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }) {
  const isDev = process.env.NODE_ENV === 'development';
  return (
    <html lang="en">
      <body>
        <AppContextProvider>
          <Layout>
            {children}
          </Layout>
        </AppContextProvider>
        <Analytics debug={isDev} mode={isDev ? 'development': 'production'} />
      </body>
    </html>
  );
}