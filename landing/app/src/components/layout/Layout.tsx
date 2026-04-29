import React from 'react';
import { Header } from './Header';
import { SubHeader } from './SubHeader';
import { Footer } from './Footer';
import { SearchOverlay } from '@/components/overlays/SearchOverlay';
import { CartDrawer } from '@/components/overlays/CartDrawer';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <SubHeader />
      <main className="flex-1 pt-[100px]">{children}</main>
      <Footer />
      <SearchOverlay />
      <CartDrawer />
    </div>
  );
};
