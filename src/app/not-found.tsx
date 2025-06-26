import { Metadata } from 'next';
import NotFoundContent from '@/components/NotFoundContent';

export const metadata: Metadata = {
  title: '404 - Page Not Found | Kundan Pawar',
  description:
    'The page you are looking for could not be found. Return to the home page to explore my portfolio.',
  robots: 'noindex, nofollow',
};

export default function NotFound() {
  return <NotFoundContent />;
}
