# Eco Kitty

## Overview

Eco Kitty is an interactive, educational app designed to teach children about sustainability and environmental consciousness in a fun and engaging way. With features like AI-powered chat, a recycling scanner, and carbon footprint tracking, Eco Kitty makes learning about eco-friendly practices an exciting adventure for kids.

## Features

- **AI Eco-Buddy**: Chat with an AI assistant for eco-tips and sustainability advice.
- **Recycle Scanner**: Scan items to learn if and how they can be recycled in your area.
- **Carbon Paw-print Tracker**: Track and reduce your carbon footprint with fun challenges.
- **Daily Quests**: Engage in daily eco-friendly challenges to promote sustainable habits.

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript and React
- **Styling**: Tailwind CSS
- **Backend**: Next.js API routes
- **Database**: Supabase
- **Authentication**: Supabase Auth
- **AI Integration**: OpenAI API
- **Web Scraping**: Cheerio
- **UPC Data**: Zxing Library

## Code Structure and Explanation

### Frontend

The frontend is built using Next.js 14 with TypeScript, leveraging the App Router for improved performance and easier server-side rendering. React is used for building interactive UI components.

Key components include:

- `app/page.tsx`: The main landing page component.
- `app/stats/page.tsx`: The stats page component, featuring the quests popup.
- `app/chat/page.tsx`: The AI chat interface.
- `app/scan/page.tsx`: The recycling scanner interface.

The Stats component (`app/stats/page.tsx`) demonstrates the use of React hooks for state management:

### Styling

Tailwind CSS is used for styling, providing a utility-first approach that allows for rapid UI development. Custom styles are defined in the `tailwind.config.js` file.

### Backend

Next.js API routes are used to handle server-side logic and API integrations. These routes are located in the `app/api` directory.

### Database and Authentication

Supabase is used for both database management and user authentication. The Supabase client is initialized in a separate file (e.g., `lib/supabaseClient.ts`) to ensure consistent usage across the app:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### AI Integration

The OpenAI API is used for the AI Eco-Buddy feature. API calls are typically handled in Next.js API routes to keep the API key secure:

```typescript
// app/api/chat/route.ts
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
	// Handle chat requests here
}
```

### Web Scraping

Cheerio is used for web scraping to gather recycling information. This is typically done server-side in API routes:

```typescript
// app/api/scrape/route.ts
import cheerio from "cheerio";

export async function GET(req: Request) {
	// Scrape recycling information here
}
```

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

Ensure these variables are properly set for the application to function correctly.

## Setup and Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/eco-kitty.git
   ```

2. Install dependencies:

   ```
   cd eco-kitty
   npm install
   ```

3. Set up your environment variables as described above.

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This project can be easily deployed on Vercel, which is optimized for Next.js applications. Ensure that you set up the environment variables in your Vercel project settings.

## Contributing

We welcome contributions to Eco Kitty! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.
