# Production Deployment Guide

## 🚀 Deployment Checklist

### Pre-Deployment

- [ ] All tests passing (`npm run test`)
- [ ] Linting clean (`npm run lint`)
- [ ] Type checking clean (`npm run type-check`)
- [ ] Bundle analysis completed (`npm run analyze`)
- [ ] Security audit passed (`npm run security:audit`)
- [ ] Environment variables configured
- [ ] Performance testing completed

### Environment Variables

Create a `.env.local` file with the following variables:

```bash
# Application
NEXT_PUBLIC_BASE_URL=https://your-domain.com
NEXT_PUBLIC_SITE_NAME="Your Portfolio"
NEXT_PUBLIC_SITE_DESCRIPTION="Your Portfolio Description"

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Contact Form
CONTACT_EMAIL=your-email@domain.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Security
NEXTAUTH_SECRET=your-secure-secret
NEXTAUTH_URL=https://your-domain.com

# Performance Monitoring
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
NEXT_PUBLIC_LOG_ROCKET_ID=your-logrocket-id
```

## 🛠️ Build Commands

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build:prod
```

### Preview Production Build

```bash
npm run preview
```

### Bundle Analysis

```bash
npm run analyze
```

## 🔒 Security Features

### Implemented Security Measures

- ✅ Content Security Policy (CSP) headers
- ✅ XSS Protection headers
- ✅ CSRF protection for forms
- ✅ Input sanitization and validation
- ✅ Rate limiting for API endpoints
- ✅ Security headers optimization
- ✅ HTTPS enforcement
- ✅ Frame options protection

### Security Testing

```bash
# Run security audit
npm run security:audit

# Fix security issues
npm run security:fix
```

## 📊 Performance Optimization

### Implemented Optimizations

- ✅ Image optimization with WebP/AVIF
- ✅ Bundle splitting and code splitting
- ✅ CSS purging for unused styles
- ✅ Compression enabled
- ✅ CDN optimization
- ✅ Core Web Vitals monitoring
- ✅ Performance metrics collection

### Performance Testing

```bash
# Run Lighthouse CI
npm run lighthouse

# Bundle analysis
npm run analyze
```

## 🧪 Testing Strategy

### Test Coverage Requirements 

- **Lines**: 70%
- **Functions**: 70%
- **Branches**: 70%
- **Statements**: 70%

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🌐 Deployment Platforms

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `.next`
4. Configure environment variables

### AWS Amplify

1. Connect your GitHub repository to AWS Amplify
2. Configure build settings
3. Set environment variables

## 📈 Monitoring & Analytics

### Performance Monitoring

- **Core Web Vitals**: LCP, FID, CLS
- **Bundle Size**: Tracked via bundle analyzer
- **Error Tracking**: Sentry integration
- **User Analytics**: Google Analytics 4

### Uptime Monitoring

- Set up uptime monitoring with services like:
  - UptimeRobot
  - Pingdom
  - StatusCake

## 🔧 Maintenance

### Regular Tasks

- [ ] Weekly security audits
- [ ] Monthly performance reviews
- [ ] Quarterly dependency updates
- [ ] Annual accessibility audits

### Update Dependencies

```bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Update to latest versions (use with caution)
npm install package@latest
```

## 🚨 Error Handling

### Error Boundaries

- Global error boundary implemented
- Graceful error fallbacks
- Error logging and monitoring

### Common Issues & Solutions

#### Build Failures

```bash
# Clean build
npm run clean
npm run build

# Check TypeScript errors
npm run type-check
```

#### Performance Issues

```bash
# Analyze bundle
npm run analyze

# Check Core Web Vitals
# Use Lighthouse in Chrome DevTools
```

#### Security Issues

```bash
# Run security audit
npm run security:audit

# Fix vulnerabilities
npm run security:fix
```

## 📱 Cross-Browser Testing

### Supported Browsers

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

### Testing Checklist

- [ ] Desktop browsers
- [ ] Mobile browsers
- [ ] Tablet browsers
- [ ] Accessibility testing
- [ ] Performance testing

## 🔍 SEO Optimization

### Implemented Features

- ✅ Dynamic sitemap generation
- ✅ Robots.txt configuration
- ✅ Meta tags optimization
- ✅ Open Graph tags
- ✅ Twitter Card tags
- ✅ Structured data markup

### SEO Testing

```bash
# Generate sitemap
npm run build

# Check sitemap at /sitemap.xml
# Check robots.txt at /robots.txt
```

## 📊 Analytics Setup

### Google Analytics 4

1. Create GA4 property
2. Add measurement ID to environment variables
3. Verify tracking in GA4 dashboard

### Performance Monitoring

1. Set up Sentry account
2. Add DSN to environment variables
3. Verify error tracking

## 🔄 CI/CD Pipeline

### GitHub Actions (Recommended)

```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🎯 Performance Targets

### Core Web Vitals

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

### Bundle Size

- **JavaScript**: < 500KB (gzipped)
- **CSS**: < 50KB (gzipped)
- **Images**: Optimized with WebP/AVIF

### Loading Performance

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Speed Index**: < 3.4s

## 📞 Support

For deployment issues or questions:

1. Check the error logs in your deployment platform
2. Review the troubleshooting section above
3. Contact the development team

---

**Last Updated**: June 2024
**Version**: 1.0.0
