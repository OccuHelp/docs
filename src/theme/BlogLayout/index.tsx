import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import BlogSidebar from '@theme/BlogSidebar';
import type {Props} from '@theme/BlogLayout';
import styles from './styles.module.css';

export default function BlogLayout(props: Props): ReactNode {
  const {sidebar, toc, children, ...layoutProps} = props;
  const hasSidebar = sidebar && sidebar.items.length > 0;

  return (
    <Layout {...layoutProps}>
      <div className={styles.blogLayoutWrapper}>
        {hasSidebar && (
          <aside className={styles.sidebarColumn}>
            <BlogSidebar sidebar={sidebar} />
          </aside>
        )}
        <main className={styles.mainColumn}>
          <div className={styles.mainContent}>
            {children}
          </div>
        </main>
      </div>
    </Layout>
  );
}

