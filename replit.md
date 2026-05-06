# IDARA.ma

A Moroccan government services directory mobile app — helps citizens find all official government services in one place, in Moroccan Arabic (Darija).

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- Mobile app runs via Expo Go workflow (`artifacts/idara-ma: expo`)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Mobile: Expo (SDK 54), Expo Router (file-based routing)
- UI: React Native + StyleSheet, @expo/vector-icons (Feather)
- Fonts: Inter (pre-loaded), splash in crimson red (#c62828)

## Where things live

- `artifacts/idara-ma/` — Expo mobile app
- `artifacts/idara-ma/constants/data.ts` — all service/category data (static, in Arabic)
- `artifacts/idara-ma/constants/colors.ts` — design tokens (navy + red Moroccan palette)
- `artifacts/idara-ma/app/(tabs)/index.tsx` — home screen (search + category grid)
- `artifacts/idara-ma/app/category/[categoryId].tsx` — category services list
- `artifacts/idara-ma/app/service-detail.tsx` — service detail + official link

## Architecture decisions

- Frontend-only: all data is static in `constants/data.ts` — no backend needed for a directory app
- RTL-first: all styles use `textAlign: 'right'` and `flexDirection: 'row-reverse'` for Arabic layout
- Stack navigation (no visible tab bar): browse categories → services → detail
- expo-web-browser opens official government sites in an in-app browser
- `userInterfaceStyle: "light"` — app is light mode only (government services app)

## Product

- Home screen with search (real-time filter across all services) and 6 category cards
- 6 categories: Identity, Justice, Social Protection, Transport, Real Estate/Tax, Education
- Each service shows required documents, warnings, source website
- One-tap to open official Moroccan government websites

## User preferences

- Arabic/Darija language UI
- RTL layout throughout
- Moroccan colors: navy blue (#1a237e) + crimson red (#c62828)

## Gotchas

- Do NOT run `npx expo start` directly — use `restart_workflow` instead
- Do NOT create app.config.ts — must use static app.json
- RTL is handled via explicit styles, not `I18nManager.forceRTL` (avoids native restart requirement)

## Pointers

- See the `expo` skill for mobile development guidelines
- See the `pnpm-workspace` skill for workspace structure
