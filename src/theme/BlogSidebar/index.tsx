import React from 'react';
import Link from '@docusaurus/Link';
import type {Props} from '@theme/BlogSidebar';
import styles from './styles.module.css';

/**
 * Simplified BlogSidebar - provides navigation to the unified browse page
 * instead of duplicating filtering functionality here.
 */
export default function BlogSidebar({sidebar}: Props): JSX.Element | null {
  // Don't render if explicitly disabled
  if (sidebar.items.length === 0) {
    return null;
  }

  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <h2>Explore</h2>
      </div>

      <div className={styles.quickLinks}>
        <Link to="/blog/browse" className={styles.quickLink}>
          🔍 Search & Browse
        </Link>
        <Link to="/blog/tags" className={styles.quickLink}>
          🏷️ Tags
        </Link>
        <Link to="/blog/archive" className={styles.quickLink}>
          📚 All Posts
        </Link>
      </div>

      {sidebar.items.length > 0 && (
        <div className={styles.recentPosts}>
          <h3>Recent Posts</h3>
          <ul>
            {sidebar.items.slice(0, 10).map((item: any) => (
              <li key={item.permalink}>
                <Link to={item.permalink} className={styles.postLink}>
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}

