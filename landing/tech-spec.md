# TAKUMA — Technical Specification

## Project Architecture

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS 3.4 (inline utility classes)
- **Routing**: `react-router-dom` (hash router for static deployment)
- **Icons**: `lucide-react`
- **State**: React Context + `useReducer` (Cart, Wishlist, UI state)
- **No animation libraries required** — all transitions are CSS-based fades, slides, and hovers.

## Directory Structure

```
src/
  components/
    layout/
      Header.tsx
      SubHeader.tsx
      Footer.tsx
      Layout.tsx
    ui/
      Button.tsx
      Input.tsx
      Checkbox.tsx
      RadioGroup.tsx
      QuantityStepper.tsx
      StarRating.tsx
      Breadcrumbs.tsx
      ProductCard.tsx
      CategoryCard.tsx
      ArticleCard.tsx
      FilterBlock.tsx
    overlays/
      SearchOverlay.tsx
      CartDrawer.tsx
  pages/
    Home.tsx
    Catalog.tsx
    CategoryPage.tsx
    ProductPage.tsx
    CartPage.tsx
    CheckoutPage.tsx
    AboutPage.tsx
    BlogPage.tsx
    ContactsPage.tsx
  context/
    CartContext.tsx
    WishlistContext.tsx
    UIContext.tsx
  hooks/
    useScrollTop.ts
  data/
    products.ts
    categories.ts
    articles.ts
    filters.ts
  types/
    index.ts
  App.tsx
  main.tsx
```

## Routing Table

| Route | Page Component | Description |
|-------|---------------|-------------|
| `/` | `Home` | Landing page |
| `/catalog` | `Catalog` | Full product catalog with filters |
| `/category/:slug` | `CategoryPage` | Filtered by category, same layout as Catalog |
| `/product/:id` | `ProductPage` | Product detail with gallery/tabs |
| `/cart` | `CartPage` | Shopping cart |
| `/checkout` | `CheckoutPage` | Multi-step checkout form |
| `/about` | `AboutPage` | Company story |
| `/blog` | `BlogPage` | Articles grid |
| `/contacts` | `ContactsPage` | Contact info + form |

## Component Inventory

### Layout Components

| Component | Source | Notes |
|-----------|--------|-------|
| `Header` | Custom | Fixed 60px, logo + nav + icons |
| `SubHeader` | Custom | 40px strip with phone + car selector |
| `Footer` | Custom | 4-column dark footer |
| `Layout` | Custom | Wraps all pages with Header/Footer |

### UI Components

| Component | Source | Props Interface |
|-----------|--------|-----------------|
| `Button` | Custom | `variant: 'primary' \| 'secondary' \| 'danger'`, `size`, `children`, `onClick`, `fullWidth` |
| `Input` | Custom | `label`, `placeholder`, `type`, `value`, `onChange`, `error` |
| `Checkbox` | Custom | `label`, `checked`, `onChange`, `count` (for filter counts) |
| `RadioGroup` | Custom | `options`, `value`, `onChange` |
| `QuantityStepper` | Custom | `value`, `onChange`, `min`, `max` |
| `StarRating` | Custom | `rating`, `reviewCount`, `size` |
| `Breadcrumbs` | Custom | `items: {label, path?}[]` |
| `ProductCard` | Custom | `product: Product`, `showAction?: boolean` |
| `CategoryCard` | Custom | `category: Category` |
| `ArticleCard` | Custom | `article: Article` |
| `FilterBlock` | Custom | `title`, `children`, `defaultOpen?: boolean` |

### Overlay Components

| Component | Source | Behavior |
|-----------|--------|----------|
| `SearchOverlay` | Custom | Dimmed backdrop, top-down search bar, ESC/click-out to close |
| `CartDrawer` | Custom | Right-side slide-in panel, 300ms ease-out |

## State Management Plan

### CartContext
```typescript
interface CartItem {
  productId: string;
  quantity: number;
}
interface CartState {
  items: CartItem[];
}
// Actions: ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART
```
- `addToCart(productId, quantity)`
- `removeFromCart(productId)`
- `updateQuantity(productId, quantity)`
- `cartTotal`, `cartCount` (computed)

### WishlistContext
```typescript
interface WishlistState {
  items: string[]; // product IDs
}
// Actions: TOGGLE_WISHLIST
```
- `toggleWishlist(productId)`
- `isInWishlist(productId)`

### UIContext
```typescript
interface UIState {
  searchOpen: boolean;
  cartOpen: boolean;
}
```

## Animation Implementation

| Interaction | Tech | Implementation |
|-------------|------|----------------|
| Page transitions | CSS | `opacity` transition on route change wrapper, `150ms ease` |
| Product card hover | Tailwind | `hover:border-[#E60012] hover:shadow-lg transition-all duration-250` |
| Search overlay | CSS | Backdrop `fadeIn 300ms`; Search bar `transform: scaleY(0→1)` with `transform-origin: top` |
| Cart drawer | CSS | `translateX(100%→0)` `300ms cubic-bezier(0.4, 0, 0.2, 1)` |
| Cart item removal | CSS | `max-height → 0`, `opacity → 0`, `300ms ease` |
| Button hover | Tailwind | `hover:-translate-y-px hover:shadow-md transition-all duration-200` |
| Image hover (blog) | CSS | `transform: scale(1.05)` with `overflow: hidden` on parent |
| Tab content switch | CSS | `opacity` crossfade, `150ms` |
| Heart icon toggle | CSS | `scale(1→1.2→1)` bounce on click |
| Add-to-cart feedback | CSS | Button briefly shows checkmark, `200ms` |

## Data Layer

### Static Data Files
All data lives in `src/data/` as TypeScript exports (no API calls):

- `products.ts`: ~12-16 product objects with full specs
- `categories.ts`: 4 category objects (air, oil, cabin, fuel)
- `articles.ts`: 6 blog article objects
- `filters.ts`: Car makes/models/years for filter dropdowns; brand filter options

### Type Definitions (`src/types/index.ts`)
```typescript
interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  image: string;
  images: string[];
  sku: string;
  specs: Record<string, string>;
  description: string;
  compatibility: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  productCount: number;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}
```

## Filtering & Sorting Logic

### Car Selection Filter (Cascade)
1. Brand dropdown populated from `filters.ts`
2. Selecting brand → filter models array
3. Selecting model → filter years array
4. "Подобрать" → filter products by compatibility string matching

### Sidebar Filters
- Category checkboxes: OR logic within group
- Brand checkboxes: OR logic within group
- Price range: min/max numeric comparison
- All filters combined with AND logic across groups

### Sorting
- "По умолчанию" → original order
- "Цена ↑" → price ascending
- "Цена ↓" → price descending
- "По популярности" → reviewCount descending

## Key Decisions

1. **No shadcn/ui components used** — The design is highly bespoke with sharp corners, specific red theming, and custom interaction patterns. Building from scratch with Tailwind is cleaner.
2. **Hash Router** — For static deployment without server-side routing configuration.
3. **CSS-only animations** — No library needed; all motion is simple fades, slides, and hovers.
4. **Inline data** — All product/category/article data is static TS exports. No fetch logic needed.
5. **Desktop-only** — No responsive breakpoints. Fixed `1200px` max-width container.
6. **Cart drawer vs page** — Cart is both a drawer (for quick view) and a full page at `/cart`. Drawer is for add-to-cart feedback.

## Implementation Order

1. Project init + Tailwind config with custom colors
2. Types + Static data
3. Context providers (Cart, Wishlist, UI)
4. Layout components (Header, Footer, SubHeader)
5. UI primitives (Button, Input, Checkbox, etc.)
6. Page: Home (all sections)
7. Page: Catalog (filters + grid)
8. Page: Product Detail (gallery + tabs)
9. Page: Cart + Checkout
10. Pages: About, Blog, Contacts
11. Overlays: Search, CartDrawer
12. Polish: animations, hover states, empty states