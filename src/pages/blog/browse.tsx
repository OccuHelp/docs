import React, {useState, useMemo, type ReactElement} from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import {usePluginData} from '@docusaurus/useGlobalData';
import styles from './browse.module.css';

type ViewMode = 'posts' | 'authors' | 'tags' | 'dates';
type SortOrder = 'newest' | 'oldest' | 'az' | 'za';

interface Author {
  name: string;
  title?: string;
  url?: string;
  image_url?: string;
  key: string;
}

interface Tag {
  label: string;
  permalink: string;
}

interface BlogPost {
  id: string;
  metadata: {
    title: string;
    permalink: string;
    date: string;
    description?: string;
    authors: Author[];
    tags: Tag[];
  };
}

export default function BlogBrowsePage(): ReactElement {
  const [viewMode, setViewMode] = useState<ViewMode>('posts');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('newest');
  const [selectedAuthor, setSelectedAuthor] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  // Use our custom blog-global-data plugin that exposes blog posts
  const blogData = usePluginData('blog-global-data') as any;
  const posts: BlogPost[] = blogData?.blogPosts || [];

  // Extract all unique authors
  const authorsData = useMemo(() => {
    const authorsMap = new Map<string, {author: Author; posts: BlogPost[]}>();
    posts.forEach((post) => {
      post.metadata.authors?.forEach((author) => {
        const key = author.key || author.name;
        if (!authorsMap.has(key)) {
          authorsMap.set(key, {author, posts: []});
        }
        authorsMap.get(key)!.posts.push(post);
      });
    });
    return Array.from(authorsMap.values()).sort((a, b) =>
      a.author.name.localeCompare(b.author.name)
    );
  }, [posts]);

  // Extract all unique tags
  const tagsData = useMemo(() => {
    const tagsMap = new Map<string, {tag: Tag; posts: BlogPost[]}>();
    posts.forEach((post) => {
      post.metadata.tags?.forEach((tag) => {
        if (!tagsMap.has(tag.label)) {
          tagsMap.set(tag.label, {tag, posts: []});
        }
        tagsMap.get(tag.label)!.posts.push(post);
      });
    });
    return Array.from(tagsMap.values()).sort((a, b) =>
      a.tag.label.localeCompare(b.tag.label)
    );
  }, [posts]);

  // Extract all unique years
  const yearsData = useMemo(() => {
    const yearsMap = new Map<string, BlogPost[]>();
    posts.forEach((post) => {
      const year = new Date(post.metadata.date).getFullYear().toString();
      if (!yearsMap.has(year)) {
        yearsMap.set(year, []);
      }
      yearsMap.get(year)!.push(post);
    });
    return Array.from(yearsMap.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([year, yearPosts]) => ({year, posts: yearPosts}));
  }, [posts]);

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Apply filters
    if (selectedAuthor) {
      result = result.filter((post) =>
        post.metadata.authors?.some((a) => (a.key || a.name) === selectedAuthor)
      );
    }
    if (selectedTag) {
      result = result.filter((post) =>
        post.metadata.tags?.some((t) => t.label === selectedTag)
      );
    }
    if (selectedYear) {
      result = result.filter((post) =>
        new Date(post.metadata.date).getFullYear().toString() === selectedYear
      );
    }

    // Apply search
    if (searchTerm) {
      const lower = searchTerm.toLowerCase();
      result = result.filter((post) =>
        post.metadata.title.toLowerCase().includes(lower) ||
        post.metadata.description?.toLowerCase().includes(lower) ||
        post.metadata.authors?.some((a) => a.name.toLowerCase().includes(lower)) ||
        post.metadata.tags?.some((t) => t.label.toLowerCase().includes(lower))
      );
    }

    // Apply sort
    result.sort((a, b) => {
      switch (sortOrder) {
        case 'oldest':
          return new Date(a.metadata.date).getTime() - new Date(b.metadata.date).getTime();
        case 'az':
          return a.metadata.title.localeCompare(b.metadata.title);
        case 'za':
          return b.metadata.title.localeCompare(a.metadata.title);
        case 'newest':
        default:
          return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
      }
    });

    return result;
  }, [posts, searchTerm, sortOrder, selectedAuthor, selectedTag, selectedYear]);

  const clearFilters = () => {
    setSelectedAuthor(null);
    setSelectedTag(null);
    setSelectedYear(null);
    setSearchTerm('');
  };

  const hasActiveFilters = selectedAuthor || selectedTag || selectedYear || searchTerm;

  return (
    <Layout title="Browse Blog" description="Search and browse blog posts">
      <div className="container margin-vert--lg">
        <div className={styles.header}>
          <h1>Browse Blog</h1>
          <p>{posts.length} posts from {authorsData.length} authors</p>
        </div>

        {/* View Mode Tabs */}
        <div className={styles.tabs}>
          {(['posts', 'authors', 'tags', 'dates'] as ViewMode[]).map((mode) => (
            <button
              key={mode}
              className={`${styles.tab} ${viewMode === mode ? styles.tabActive : ''}`}
              onClick={() => setViewMode(mode)}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>

        {/* Posts View */}
        {viewMode === 'posts' && (
          <>
            <div className={styles.controls}>
              <input
                type="text"
                placeholder="Search posts, authors, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as SortOrder)}
                className={styles.sortSelect}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="az">A → Z</option>
                <option value="za">Z → A</option>
              </select>
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className={styles.activeFilters}>
                <span>Filters:</span>
                {selectedAuthor && (
                  <button onClick={() => setSelectedAuthor(null)} className={styles.filterChip}>
                    Author: {authorsData.find(a => (a.author.key || a.author.name) === selectedAuthor)?.author.name} ×
                  </button>
                )}
                {selectedTag && (
                  <button onClick={() => setSelectedTag(null)} className={styles.filterChip}>
                    Tag: {selectedTag} ×
                  </button>
                )}
                {selectedYear && (
                  <button onClick={() => setSelectedYear(null)} className={styles.filterChip}>
                    Year: {selectedYear} ×
                  </button>
                )}
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className={styles.filterChip}>
                    Search: "{searchTerm}" ×
                  </button>
                )}
                <button onClick={clearFilters} className={styles.clearAll}>Clear All</button>
              </div>
            )}

            {/* Posts List */}
            <div className={styles.postsList}>
              {filteredPosts.length === 0 ? (
                <div className={styles.noResults}>No posts match your criteria</div>
              ) : (
                filteredPosts.map((post) => (
                  <article key={post.id} className={styles.postCard}>
                    <Link to={post.metadata.permalink} className={styles.postTitle}>
                      {post.metadata.title}
                    </Link>
                    <div className={styles.postMeta}>
                      <span className={styles.postDate}>
                        {new Date(post.metadata.date).toLocaleDateString('en-US', {
                          year: 'numeric', month: 'short', day: 'numeric'
                        })}
                      </span>
                      {post.metadata.authors?.length > 0 && (
                        <span className={styles.postAuthors}>
                          by {post.metadata.authors.map((a, i) => (
                            <button
                              key={a.key || a.name}
                              onClick={(e) => {
                                e.preventDefault();
                                setSelectedAuthor(a.key || a.name);
                              }}
                              className={styles.metaLink}
                            >
                              {a.name}{i < post.metadata.authors.length - 1 ? ', ' : ''}
                            </button>
                          ))}
                        </span>
                      )}
                    </div>
                    {post.metadata.tags?.length > 0 && (
                      <div className={styles.postTags}>
                        {post.metadata.tags.map((tag) => (
                          <button
                            key={tag.label}
                            onClick={() => setSelectedTag(tag.label)}
                            className={styles.tagChip}
                          >
                            {tag.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </article>
                ))
              )}
            </div>
            <div className={styles.resultCount}>
              Showing {filteredPosts.length} of {posts.length} posts
            </div>
          </>
        )}

        {/* Authors View */}
        {viewMode === 'authors' && (
          <div className={styles.grid}>
            {authorsData.map(({author, posts: authorPosts}) => (
              <div key={author.key || author.name} className={styles.card}>
                <div className={styles.cardHeader}>
                  {author.image_url && (
                    <img src={author.image_url} alt={author.name} className={styles.avatar} />
                  )}
                  <div>
                    <h3 className={styles.cardTitle}>{author.name}</h3>
                    {author.title && <p className={styles.cardSubtitle}>{author.title}</p>}
                    <p className={styles.cardCount}>{authorPosts.length} posts</p>
                  </div>
                </div>
                <ul className={styles.cardList}>
                  {authorPosts.slice(0, 3).map((post) => (
                    <li key={post.id}>
                      <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
                    </li>
                  ))}
                </ul>
                {authorPosts.length > 3 && (
                  <button
                    onClick={() => {
                      setSelectedAuthor(author.key || author.name);
                      setViewMode('posts');
                    }}
                    className={styles.viewAllBtn}
                  >
                    View all {authorPosts.length} posts →
                  </button>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tags View */}
        {viewMode === 'tags' && (
          <div className={styles.tagsCloud}>
            {tagsData.map(({tag, posts: tagPosts}) => (
              <button
                key={tag.label}
                onClick={() => {
                  setSelectedTag(tag.label);
                  setViewMode('posts');
                }}
                className={styles.tagButton}
              >
                {tag.label}
                <span className={styles.tagCount}>{tagPosts.length}</span>
              </button>
            ))}
          </div>
        )}

        {/* Dates View */}
        {viewMode === 'dates' && (
          <div className={styles.timeline}>
            {yearsData.map(({year, posts: yearPosts}) => (
              <div key={year} className={styles.yearSection}>
                <h2 className={styles.yearHeader}>
                  <button
                    onClick={() => {
                      setSelectedYear(year);
                      setViewMode('posts');
                    }}
                    className={styles.yearLink}
                  >
                    {year}
                  </button>
                  <span className={styles.yearCount}>{yearPosts.length} posts</span>
                </h2>
                <div className={styles.yearPosts}>
                  {yearPosts.slice(0, 5).map((post) => (
                    <div key={post.id} className={styles.timelinePost}>
                      <span className={styles.timelineDate}>
                        {new Date(post.metadata.date).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric'
                        })}
                      </span>
                      <Link to={post.metadata.permalink}>{post.metadata.title}</Link>
                    </div>
                  ))}
                  {yearPosts.length > 5 && (
                    <button
                      onClick={() => {
                        setSelectedYear(year);
                        setViewMode('posts');
                      }}
                      className={styles.viewAllBtn}
                    >
                      View all {yearPosts.length} posts from {year} →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
