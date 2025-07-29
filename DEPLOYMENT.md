# MySMS Frontend Deployment Guide

## Deployment Options

### Option 1: Vercel (Recommended - Easy & Free)
1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import your GitHub** repository
3. **Set build settings**:
   - Framework Preset: Angular
   - Build Command: `ng build`
   - Output Directory: `dist/my-sms-front`
4. **Set environment variables**:
   - `API_URL`: Your deployed backend URL
5. **Deploy**

### Option 2: Netlify
1. **Sign up** at [netlify.com](https://netlify.com)
2. **Connect your GitHub** repository
3. **Set build settings**:
   - Build command: `ng build`
   - Publish directory: `dist/my-sms-front`
4. **Set environment variables**:
   - `API_URL`: Your deployed backend URL
5. **Deploy**

### Option 3: GitHub Pages
1. **Build the project**: `ng build --prod`
2. **Push to GitHub** with the `dist` folder
3. **Enable GitHub Pages** in repository settings
4. **Set custom domain** if needed

## Build Commands

```bash
# Install dependencies
npm install

# Build for production
ng build --configuration production

# Build with custom API URL
ng build --configuration production --environment prod
```

## Environment Configuration

### Development (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### Production (environment.prod.ts)
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-domain.com'
};
```

## Post-Deployment Steps

1. **Update backend CORS** to allow your frontend domain
2. **Test authentication** flow
3. **Test SMS sending** functionality
4. **Verify webhooks** are working

## Troubleshooting

- **CORS errors**: Update backend `FRONTEND_URL` environment variable
- **API connection**: Verify `apiUrl` in environment files
- **Build errors**: Check Angular version compatibility
- **Authentication issues**: Ensure credentials are being sent properly 