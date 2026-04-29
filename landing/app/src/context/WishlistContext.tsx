import React, { createContext, useContext, useReducer, useCallback } from 'react';

interface WishlistState {
  items: string[];
}

type WishlistAction = { type: 'TOGGLE'; productId: string };

const initialState: WishlistState = { items: [] };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'TOGGLE': {
      const exists = state.items.includes(action.productId);
      if (exists) {
        return { ...state, items: state.items.filter((id) => id !== action.productId) };
      }
      return { ...state, items: [...state.items, action.productId] };
    }
    default:
      return state;
  }
}

interface WishlistContextValue {
  items: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  const toggleWishlist = useCallback((productId: string) => {
    dispatch({ type: 'TOGGLE', productId });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => state.items.includes(productId),
    [state.items]
  );

  return (
    <WishlistContext.Provider value={{ items: state.items, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
