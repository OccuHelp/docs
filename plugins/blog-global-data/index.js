/**
 * Custom plugin to expose blog posts to global data for use in custom pages.
 * This allows the browse page to access all blog posts client-side.
 */
module.exports = function blogGlobalDataPlugin(context, options) {
  return {
    name: 'blog-global-data',

    async allContentLoaded({allContent, actions}) {
      const {setGlobalData} = actions;

      // Get blog content from the default blog plugin
      const blogPluginContent = allContent['docusaurus-plugin-content-blog']?.default;

      if (blogPluginContent) {
        const {blogPosts, blogTags} = blogPluginContent;

        // Extract the data we need for the browse page
        const postsData = blogPosts.map((post) => ({
          id: post.id,
          metadata: {
            title: post.metadata.title,
            permalink: post.metadata.permalink,
            date: post.metadata.date,
            description: post.metadata.description,
            authors: post.metadata.authors || [],
            tags: post.metadata.tags || [],
          },
        }));

        // Set global data that can be accessed via usePluginData
        setGlobalData({
          blogPosts: postsData,
          blogTags: Object.keys(blogTags || {}).map((tagName) => ({
            label: tagName,
            permalink: blogTags[tagName].permalink,
            count: blogTags[tagName].items.length,
          })),
        });
      } else {
        setGlobalData({
          blogPosts: [],
          blogTags: [],
        });
      }
    },
  };
};

