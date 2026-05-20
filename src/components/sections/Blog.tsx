import React from "react";

type BlogPost = {
  id: number;
  title: string;
  date: string;
  summary: string;
  url?: string; // Optional: for linking to full post
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to My Blog!",
    date: "2024-06-01",
    summary: "This is the first post on my new blog. Stay tuned for more updates about web development, projects, and tech tips!",
    url: "#"
  },
  {
    id: 2,
    title: "How I Built My Portfolio",
    date: "2024-06-05",
    summary: "A behind-the-scenes look at the technologies and design choices that went into building this portfolio site.",
    url: "#"
  },
  // Add more posts here
];

const Blog: React.FC = () => {
  return (
    <section id="blog" className="py-12 px-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Blog</h2>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h3 className="text-2xl font-semibold mb-2">
              {post.url ? (
                <a href={post.url} className="hover:underline text-blue-600 dark:text-blue-400">
                  {post.title}
                </a>
              ) : (
                post.title
              )}
            </h3>
            <p className="text-gray-500 text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p>
            <p className="text-gray-700 dark:text-gray-300">{post.summary}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
