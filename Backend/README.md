(Required environment variables)

- GEMINI_API_KEY (or GOOGLE_API_KEY): API key for Google Generative AI (Gemini). Required for caption generation.
- IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY, IMAGEKIT_URL_ENDPOINT: credentials for ImageKit uploads.
- JWT_SECRET, MONGODB connection string, and other existing envs required by the project (see `.env.example` if any).

Set env vars before starting the server, for example (Windows PowerShell):

```powershell
$env:GEMINI_API_KEY = "your_key_here"
$env:IMAGEKIT_PUBLIC_KEY = "..."
$env:IMAGEKIT_PRIVATE_KEY = "..."
$env:IMAGEKIT_URL_ENDPOINT = "https://ik.imagekit.io/your_endpoint"
node server.js
```

