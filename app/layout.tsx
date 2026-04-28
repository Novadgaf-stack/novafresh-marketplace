import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/context/user-context';
import { CartProvider } from '@/context/cart-context';
import { ToastProvider } from '@/context/toast-context';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'NovaFresh Marketplace',
  description: 'Professional multi-sided marketplace architecture.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-nova-darker text-nova-text antialiased min-h-screen flex flex-col" suppressHydrationWarning>
        <UserProvider>
          <CartProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
