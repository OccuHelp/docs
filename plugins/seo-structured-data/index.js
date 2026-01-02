/**
 * SEO Structured Data Plugin
 * Injects JSON-LD structured data into pages for better SEO.
 * Adds Organization schema site-wide and Article schema for blog posts.
 */
module.exports = function seoStructuredDataPlugin(context) {
  const {siteConfig} = context;
  const {url, title, tagline} = siteConfig;

  return {
    name: 'seo-structured-data',

    // Inject scripts into the <head> of every page
    injectHtmlTags() {
      // Organization schema - appears on all pages
      const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'OccuHelp',
        url: 'https://occuhelp.com',
        logo: `${url}/img/logo.svg`,
        description: 'OccuHelp provides workplace safety, occupational health management, ergonomics, OSHA compliance, injury tracking, and risk analysis software.',
        sameAs: [
          'https://occuhelp.com',
          // Add social media URLs when available
        ],
      };

      // WebSite schema with SearchAction for sitelinks searchbox
      const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: title,
        description: tagline,
        url: url,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${url}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      };

      // SoftwareApplication schema for the main product
      const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'OccuHelp',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web-based',
        description: 'Comprehensive workplace safety and occupational health management software. Features include risk analysis, ergonomics, OSHA recordkeeping, injury tracking, and incident management.',
        url: 'https://app.occuhelp.com',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
          description: 'Contact for pricing',
        },
        featureList: [
          'Job Analysis',
          'Task Analysis',
          'Site Analysis',
          'Risk Management',
          'Ergonomics Assessment',
          'Employment Testing',
          'Physical Demands Analysis',
          'Injury/Illness Tracking',
          'Case Management',
          'MSK Rehabilitation',
          'OSHA Recordkeeping',
          'Incident Management',
          'Safety Data Sheets Management',
        ],
      };

      return {
        headTags: [
          {
            tagName: 'script',
            attributes: {
              type: 'application/ld+json',
            },
            innerHTML: JSON.stringify(organizationSchema),
          },
          {
            tagName: 'script',
            attributes: {
              type: 'application/ld+json',
            },
            innerHTML: JSON.stringify(websiteSchema),
          },
          {
            tagName: 'script',
            attributes: {
              type: 'application/ld+json',
            },
            innerHTML: JSON.stringify(softwareSchema),
          },
        ],
      };
    },
  };
};

