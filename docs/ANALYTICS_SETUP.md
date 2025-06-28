# Analytics Setup Instructions

## Google Analytics Setup

1. **Create a Google Analytics 4 property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property
   - Get your Measurement ID (format: G-XXXXXXXXXX)

2. **Update the layout.tsx file:**
   - Replace `GA_MEASUREMENT_ID` with your actual Measurement ID
   - Example: `G-ABC123DEF4`

## Google Tag Manager Setup

1. **Create a Google Tag Manager account:**
   - Go to [Google Tag Manager](https://tagmanager.google.com/)
   - Create a new account and container
   - Get your Container ID (format: GTM-XXXXXXX)

2. **Update the layout.tsx file:**
   - Replace `GTM-XXXXXXX` with your actual Container ID
   - Example: `GTM-ABC1234`

## Required Images

Create and add the following images to the `/public` directory:

- `og-image.jpg` (1200x630px) - Open Graph image for social sharing
- `icon-192x192.png` (192x192px) - PWA icon
- `icon-512x512.png` (512x512px) - PWA icon
- `apple-touch-icon.png` (180x180px) - iOS app icon
- `mstile-150x150.png` (150x150px) - Windows tile icon

## Domain Configuration

Update the following URLs in `layout.tsx` with your actual domain:

- `metadataBase: new URL('https://kundanpawar.com')`
- `openGraph.url: 'https://kundanpawar.com'`
- Replace `@kundanpawar` with your actual Twitter handle

## Verification

After setup, verify that:

1. Google Analytics is tracking page views
2. Google Tag Manager is loading without errors
3. Social media cards display correctly when sharing
4. PWA features work on mobile devices
5. Favicons display correctly across browsers
