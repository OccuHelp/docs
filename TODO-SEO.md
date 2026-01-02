# SEO Setup Todo List

## Remaining Tasks

### 1. Create Social Card Image
- [ ] Create `static/img/occuhelp-social-card.png`
- Recommended size: **1200x630px**
- This image appears when links are shared on social media (Facebook, Twitter, LinkedIn, etc.)
- Should include OccuHelp branding and a brief tagline

### 2. Add Meta Descriptions to Content
- [ ] Add `description` field to documentation page frontmatter for better Google snippets
- [ ] Add `description` field to blog post frontmatter

Example frontmatter with description:
```yaml
---
sidebar_position: 1
description: "Learn how to perform job analysis in OccuHelp to identify workplace hazards and reduce injury risk."
---
```

### 3. Google Search Console Setup
- [ ] Go to [Google Search Console](https://search.google.com/search-console)
- [ ] Add property for `https://docs.occuhelp.com`
- [ ] Get verification code (HTML tag method recommended)
- [ ] Uncomment and add verification code in `docusaurus.config.ts`:
  ```ts
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'google-site-verification',
        content: 'YOUR_GOOGLE_VERIFICATION_CODE',  // <-- Add your code here
      },
    },
    // ... rest of headTags
  ],
  ```
- [ ] Submit sitemap URL: `https://docs.occuhelp.com/sitemap.xml`

### 4. Google Analytics Setup
- [ ] Go to [Google Analytics](https://analytics.google.com)
- [ ] Create a new GA4 property for `docs.occuhelp.com`
- [ ] Get your Measurement ID (starts with `G-`)
- [ ] Uncomment and configure in `docusaurus.config.ts` preset options:
  ```ts
  gtag: {
    trackingID: 'G-XXXXXXXXXX',  // <-- Add your Measurement ID here
    anonymizeIP: true,
  },
  ```
- [ ] Rebuild and deploy the site

---

## Optional Enhancements

### Bing Webmaster Tools
- [ ] Submit site to [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [ ] Add Bing verification meta tag if desired

### Monitor Performance
- [ ] Check Google Search Console regularly for indexing issues
- [ ] Review Core Web Vitals reports
- [ ] Monitor which queries drive traffic to docs vs blog

