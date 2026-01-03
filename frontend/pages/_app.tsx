import type { AppProps } from 'next/app';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import { ToastProvider } from '../components/ToastProvider';
import '../styles/globals.css'; // Import Tailwind CSS

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </ThemeProvider>
  );
}