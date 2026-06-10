# MacroForge

A React Native (Expo) app built with `create-expo-app`, using Expo Router for file-based navigation.

## Prerequisites

- Node.js >= 18
- npm
- Android device or emulator (for Android builds)

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the dev server:
   ```bash
   npx expo start
   ```

   If your phone can't reach the dev server (host unreachable), use the tunnel option:
   ```bash
   npx expo start --tunnel
   ```

3. Scan the QR code with Expo Go (or a development build) to run the app on your device.

## Development Build

To create an Android APK:
```bash
npx expo run:android
```

## Scripts

| Command                     | Description               |
|-----------------------------|---------------------------|
| `npm start`                 | Start Expo dev server     |
| `npm run android`           | Run on Android            |
| `npm run ios`               | Run on iOS                |
| `npm run web`               | Start with web support    |
| `npm run lint`              | Run ESLint                |
| `npm run reset-project`     | Reset to blank project    |

## Project Structure

- `src/app/` — Expo Router file-based routes
- `src/components/` — Reusable UI components
- `src/storage/` — Storage utilities
- `src/styles/` — Style configurations
- `src/utils/` — Helper utilities

## Tech Stack

- [Expo SDK 55](https://docs.expo.dev/versions/v55.0.0/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [Expo Dev Client](https://docs.expo.dev/develop/development-builds/introduction/)
- TypeScript
