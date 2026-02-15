$env:NODE_ENV="development"
$env:OAUTH_SERVER_URL="http://localhost:3000"
$env:VITE_ANALYTICS_WEBSITE_ID="dummy-id"
$env:VITE_APP_ID="dummy-app-id"
$env:JWT_SECRET="dummy-secret"

pnpm exec tsx watch server/_core/index.ts
