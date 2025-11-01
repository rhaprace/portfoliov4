# Visitor Tracking API

This is a secure serverless API endpoint for tracking portfolio visitors without exposing credentials in client-side code.

## Security

- GitHub token is stored server-side only (never exposed to clients)
- CORS protection limits requests to your domain
- No sensitive data is logged (no IP addresses, no personal info)

## Deployment Options

### Option 1: Deploy to Vercel (Recommended)

1. Create a new Vercel project for the API:
   ```bash
   # Create a new directory for the API
   mkdir portfolio-api
   cd portfolio-api
   
   # Copy the api folder
   cp -r ../api .
   
   # Initialize git
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Deploy to Vercel:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:
   - `GITHUB_TOKEN`: Your new GitHub personal access token
   - `GIST_ID`: Your private gist ID

4. Get your API endpoint URL (e.g., `https://your-api.vercel.app/api/track`)

5. Update your portfolio `.env.local`:
   ```
   VITE_TRACKING_API_ENDPOINT=https://your-api.vercel.app/api/track
   ```

### Option 2: Deploy to Netlify

1. Create `netlify.toml` in the api directory:
   ```toml
   [build]
     functions = "api"
   ```

2. Deploy to Netlify and add environment variables

3. Your endpoint will be: `https://your-site.netlify.app/.netlify/functions/track`

### Option 3: Disable Tracking

If you don't want to set up a separate API, simply don't set `VITE_TRACKING_API_ENDPOINT` in your `.env.local` file. The tracking will be automatically disabled.

## Local Development

1. Create `.env.local` in the API directory:
   ```
   GITHUB_TOKEN=your_new_token_here
   GIST_ID=your_gist_id_here
   ```

2. Run locally with Vercel CLI:
   ```bash
   vercel dev
   ```

3. Update your portfolio `.env.local`:
   ```
   VITE_TRACKING_API_ENDPOINT=http://localhost:3000/api/track
   ```

## Creating a New GitHub Token

1. Go to https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Portfolio Visitor Tracking"
4. Select scope: `gist` (only this permission)
5. Generate and copy the token
6. Add it to your API deployment environment variables

## Privacy

This tracking solution:
- ✅ Does NOT collect IP addresses
- ✅ Does NOT use cookies
- ✅ Does NOT track across sites
- ✅ Only logs: timestamp, page, referrer, browser info, screen size, language
- ✅ Data stored in your private GitHub Gist (only you can access)

