# Analiza projektu Filtum Automotive

## Struktura projektu

### Główne katalogi:
- `client/` - aplikacja frontendowa React + TypeScript
- `server/` - backend Express + tRPC
- `drizzle/` - migracje bazy danych
- `shared/` - współdzielony kod między klientem a serwerem

### Komponenty główne (client/src/components):
- About.tsx / AboutPremium.tsx
- Gallery.tsx / GalleryPremium.tsx  
- Hero.tsx / HeroPremium.tsx
- Services.tsx / ServicesPremium.tsx
- Map.tsx / MapComponent.tsx
- Booking.tsx
- Contact.tsx
- Reviews.tsx
- Navigation.tsx
- Footer.tsx
- AIChatBox.tsx
- ThemeSwitcher.tsx
- AnimatedBackground.tsx
- AnimatedDivider.tsx
- ScrollProgress.tsx
- ErrorBoundary.tsx
- DashboardLayout.tsx / DashboardLayoutSkeleton.tsx
- ManusDialog.tsx

### Komponenty UI (77 plików w client/src/components/ui/)

## Potencjalne duplikaty do zbadania:
1. About.tsx vs AboutPremium.tsx
2. Gallery.tsx vs GalleryPremium.tsx
3. Hero.tsx vs HeroPremium.tsx
4. Services.tsx vs ServicesPremium.tsx
5. Map.tsx vs MapComponent.tsx
6. DashboardLayout.tsx vs DashboardLayoutSkeleton.tsx

## Pliki konfiguracyjne:
- vite.config.ts
- vite.config.ts.bak (backup - do usunięcia?)
- tsconfig.json
- vitest.config.ts
- components.json
- package.json
- pnpm-lock.yaml
- package-lock.json (niepotrzebny przy użyciu pnpm)

## Pliki do przeanalizowania:
- CHANGES_SUMMARY.md
- todo.md
