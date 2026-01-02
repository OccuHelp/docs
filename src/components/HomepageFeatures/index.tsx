import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'General',
    icon: '📚',
    description: (
      <>
        Comprehensive guides covering Quick Access, Risk Analysis, Prevention, Medical, Operations, Extras, and Settings.
      </>
    ),
    link: '/general/intro',
  },
  {
    title: 'Account',
    icon: '🔐',
    description: (
      <>
        Learn how to manage your account, log in, register, and recover your password.
      </>
    ),
    link: '/account/intro',
  },
  {
    title: 'Security',
    icon: '🛡️',
    description: (
      <>
        Security standards, data protection, compliance practices, and access controls.
      </>
    ),
    link: '/security/intro',
  },
  {
    title: 'Blog & Updates',
    icon: '📰',
    description: (
      <>
        Stay up to date with the latest news, features, and best practices from the OccuHelp team.
      </>
    ),
    link: '/blog',
  },
];

type DocSectionItem = {
  title: string;
  items: {name: string; link: string}[];
};

const DocSections: DocSectionItem[] = [
  {
    title: 'Quick Access',
    items: [
      {name: 'Dashboard', link: '/general/quick-access/dashboard'},
      {name: 'New Entry', link: '/general/quick-access/new-entry'},
      {name: 'Activity Reports', link: '/general/quick-access/activity-reports'},
      {name: 'Employee Files', link: '/general/quick-access/employee-files'},
    ],
  },
  {
    title: 'Risk Analysis',
    items: [
      {name: 'Job Analysis', link: '/general/risk-analysis/job-analysis'},
      {name: 'Task Analysis', link: '/general/risk-analysis/task-analysis'},
      {name: 'Site Analysis', link: '/general/risk-analysis/site-analysis'},
      {name: 'Risk Management', link: '/general/risk-analysis/risk-management'},
    ],
  },
  {
    title: 'Prevention',
    items: [
      {name: 'Ergonomics', link: '/general/prevention/ergonomics'},
      {name: 'Employment Testing', link: '/general/prevention/employment-testing'},
      {name: 'Prehab', link: '/general/prevention/prehab'},
      {name: 'Wellness', link: '/general/prevention/wellness'},
    ],
  },
  {
    title: 'Medical',
    items: [
      {name: 'Injury/Illness', link: '/general/medical/injury-illness'},
      {name: 'Case Management', link: '/general/medical/case-management'},
      {name: 'Early Intervention', link: '/general/medical/early-intervention'},
      {name: 'MSK Rehab', link: '/general/medical/msk-rehab'},
    ],
  },
  {
    title: 'Operations',
    items: [
      {name: 'Incident Manager', link: '/general/operations/incident-manager'},
      {name: 'OSHA Recordkeeping', link: '/general/operations/osha-recordkeeping'},
      {name: 'Quality Assurance', link: '/general/operations/quality-assurance'},
      {name: 'Safety Data Sheets', link: '/general/operations/safety-data-sheets'},
    ],
  },
  {
    title: 'Settings',
    items: [
      {name: 'My Profile', link: '/general/settings/my-profile'},
      {name: 'Company Profile', link: '/general/settings/company-profile'},
      {name: 'Admin Center', link: '/general/settings/admin-center'},
      {name: 'Help', link: '/general/settings/help'},
    ],
  },
];

function Feature({title, icon, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--3')}>
      <Link to={link} className={styles.featureCard}>
        <div className="text--center">
          <div className={styles.featureIcon}>{icon}</div>
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

function QuickLinks(): ReactNode {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <Heading as="h2" className="text--center margin-bottom--lg">
          Quick Links
        </Heading>
        <div className="row">
          {DocSections.map((section, idx) => (
            <div key={idx} className={clsx('col col--4 margin-bottom--lg')}>
              <div className={styles.quickLinkSection}>
                <Heading as="h3" className={styles.quickLinkTitle}>
                  {section.title}
                </Heading>
                <ul className={styles.quickLinkList}>
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Link to={item.link}>{item.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      <section className={styles.features}>
        <div className="container">
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>
      <QuickLinks />
    </>
  );
}
