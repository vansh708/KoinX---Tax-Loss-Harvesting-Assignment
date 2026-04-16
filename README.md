# KoinX - Tax Loss Harvesting Tool

A modern, responsive Next.js application that provides a Tax Loss Harvesting interface, allowing users to calculate their capital gains, simulate tax savings through loss harvesting, and review their cryptocurrency holdings.

## Features

* **Pre-Harvesting & After-Harvesting Views**: Automatically calculates and tracks Capital Gains across Short and Long term.
* **Interactive Tooling**: Contextually tracks specific assets "checked" to realize their latent losses or gains, updating your effective capital gains immediately.
* **Saving Indications**: Dynamic UI highlighting the total tax amount effectively "saved" through loss harvesting.
* **Light and Dark Mode**: Fully responsive, aesthetic design strictly following the provided Figma specifications.
* **Responsive Architecture**: Fits tightly on mobile viewports with sticky headers, and scales elegantly to wide desktop screens.
* **Mock State Management**: Handled elegantly via global React Context simulating API latencies using promises (shimmering skeleton loading).

## Setup Instructions

### Pre-requisites
Ensure you have `Node.js` (v18+) and standard package managers like `npm`, `yarn`, or `pnpm` installed.

1. **Clone the repository** (if downloaded):
   ```bash
   git clone <your-repo>
   cd frontend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
   *(or `yarn install` / `pnpm install`)*

3. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The application will boot up at [http://localhost:3000](http://localhost:3000).

## Screenshots
*(Provide your screenshots here before final submission)*
- <img width="1891" height="1021" alt="image" src="https://github.com/user-attachments/assets/ccd1524c-1757-43b8-925b-5bbb526418e3" />

-<img width="1872" height="1024" alt="image" src="https://github.com/user-attachments/assets/2cdec70d-5c68-4835-b92e-4af619290f96" />


## Assumptions Made

1. **Tax Logic**: 
   * As per instructions, "If gain < 0, add it to losses." This means we increase the **loss amount** (e.g., if existing losses are 500, a new -100 gain makes total losses 600).
   * Net Capital Gains `= Profits (- Losses)`. Total Realised Capital Gains `= Net Short Term + Net Long Term`.
2. **Icons/Avatars**: Since exact brand SVG URLs might expire or block CORS, we are falling back to simple character-based avatars or the default provided `DefaultCoin.svg` when image `onError` fires.
3. **Data APIs**: APIs are simulated through promises inside `src/lib/api.ts` with a hardcoded `1.2s` latency to demonstrate the usage of generic `Skeleton` loading states on application mount.

## Tech Stack
* **Framework**: Next.js 15 (App Router - React server components compatible).
* **Styling**: Tailwind CSS v4.
* **Components**: `shadcn/ui` with Radix primitives.
* **Icons**: `lucide-react`.
* **State Management**: Context-API (Provider pattern). 

---
_Developed rigorously matching Figma for KoinX frontend intern assignment._
