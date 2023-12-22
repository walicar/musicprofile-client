# Musicprofile
- Requires Supabase CLI

## Start Developing
```
git clone https://github.com/walicar/musicprofile-client
echo "VITE_SPOTIFY_ID=<PUT YOUR SPOTIFY CLIENT ID HERE>" > .env
npm install
npx supabase start
npm run dev
```

## Testing
- Unit tests: `npm run test`
- Automated tests: `npm run test:auto`
- Supabase tests: `npx supabase test`