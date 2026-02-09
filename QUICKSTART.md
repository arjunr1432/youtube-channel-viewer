# Quick Start Guide

Get your YouTube Channel Viewer up and running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Get YouTube API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable "YouTube Data API v3"
4. Go to Credentials → Create Credentials → API Key
5. Copy your API key

## Step 3: Get Your Channel ID

Visit your YouTube channel and copy the ID from the URL:
- Format: `https://www.youtube.com/channel/YOUR_CHANNEL_ID`
- Or use: `https://www.youtube.com/@YourHandle` and find the channel ID in the page source

## Step 4: Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_YOUTUBE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_YOUTUBE_CHANNEL_ID=UCxxxxxxxxxxxxxxxxxxxxxxxxx
VITE_APP_TITLE=My Awesome Channel
```

## Step 5: Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173` 🎉

## Step 6: Deploy to AWS (Optional)

### Prerequisites
- AWS account
- AWS CLI installed: `brew install awscli` (macOS)
- AWS credentials configured: `aws configure`

### Deploy
```bash
npm run deploy
```

That's it! Your site will be live on CloudFront with HTTPS.

## Common Issues

### "API key not valid"
- Check your API key is correct in `.env`
- Ensure YouTube Data API v3 is enabled in Google Cloud Console

### "Channel not found"
- Verify your channel ID is correct
- Make sure the channel is public

### "Quota exceeded"
- YouTube API has daily limits
- Wait 24 hours or request quota increase

## Next Steps

- Customize the design in `src/components/`
- Add your logo to `public/logo.png`
- Update PWA manifest in `public/manifest.json`
- Read full deployment guide: [aws/DEPLOYMENT.md](aws/DEPLOYMENT.md)

## Need Help?

- Check [README.md](README.md) for detailed documentation
- Review [aws/DEPLOYMENT.md](aws/DEPLOYMENT.md) for AWS deployment
- Check browser console for error messages
