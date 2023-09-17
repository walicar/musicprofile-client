const config = {
  CLIENT_URL: import.meta.env.VITE_CLIENT_URL || "http://localhost:3000",

  SERVER_URL: import.meta.env.VITE_SERVER_URL || "http://localhost:3001",

  SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL || "http://localhost:54321",

  SUPABASE_ID: import.meta.env.VITE_SUPABASE_ID || "localhost",

  SUPABASE_ANON_KEY:
    import.meta.env.VITE_SUPABASE_ANON_KEY ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0",

  SPOTIFY_ID:
    import.meta.env.VITE_SPOTIFY_ID,
};

console.log("Testing check CONFIG, ", config)
const test = import.meta.env.VITE_CLIENT_URL
console.log("can i check for the meta env?, ", test)

export default config;
