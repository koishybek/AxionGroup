import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { CartProvider } from '@/context/CartContext'
import { WishlistProvider } from '@/context/WishlistContext'
import { UIProvider } from '@/context/UIContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <CartProvider>
        <WishlistProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </WishlistProvider>
      </CartProvider>
    </HashRouter>
  </StrictMode>,
)
