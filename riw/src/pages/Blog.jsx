import { Link, useParams } from "react-router-dom";
import { BLOG_POSTS, getPostBySlug } from "../content/blogPosts";

export default function Blog() {
  const { slug } = useParams();

  // If no slug -> list view
  if (!slug) {
    return (
      <div className="container blog-page">
        <header className="section-head">
          <h2>RIW Blog</h2>
          <p className="section-sub">
            Student-led stories connecting New York&apos;s water chemistry,
            microbial events, and agricultural yields.
          </p>
        </header>

        <div className="blog-list">
          {BLOG_POSTS.map((post) => (
            <article key={post.slug} className="blog-card">
                <div className="blog-card-meta">
                    <div className="blog-card-left">
                        <div className="avatar avatar-lg">{post.avatar}</div>
                        <div className="blog-card-author">
                        <div className="name">{post.authorName}</div>
                        <div className="role">{post.authorRole}</div>
                        </div>
                    </div>

                    <div className="blog-card-right">
                        <img src={post.icon} alt="" className="blog-card-icon" />
                        <div className="blog-card-pill">{post.keyword}</div>
                    </div>
                </div>


              <h3 className="blog-card-title">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>

              <p className="blog-card-teaser">{post.teaser}</p>

              <div className="blog-card-footer">
                <div className="blog-card-location">
                  <span>📍</span> {post.location}
                </div>
                <div className="blog-card-meta2">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <Link to={`/blog/${post.slug}`} className="blog-card-read-link">
                  Read article →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }

  // Detail view
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div className="container blog-page">
        <p>We couldn&apos;t find that article. Try going back to the blog.</p>
        <Link to="/blog" className="back-link">
          ← Back to RIW Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="container blog-post-page">
      <nav className="blog-breadcrumb">
        <Link to="/blog">← Back to RIW Blog</Link>
      </nav>

      <article className="blog-post">
        <header className="blog-post-header">
            <div className="blog-post-meta-top">
                <img src={post.icon} alt="" className="blog-post-icon" />
                <span className="blog-post-pill">{post.keyword}</span>
            </div>

          <h1 className="blog-post-title">{post.title}</h1>
          <p className="blog-post-subtitle">{post.teaser}</p>

          <div className="blog-post-meta">
            <div className="blog-post-author">
              <div className="avatar avatar-lg">{post.avatar}</div>
              <div>
                <div className="name">{post.authorName}</div>
                <div className="role">{post.authorRole}</div>
              </div>
            </div>
            <div className="blog-post-meta-right">
              <div className="blog-post-meta-line">
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <div className="blog-post-meta-line">
                <span>📍 {post.location}</span>
              </div>
            </div>
          </div>
        </header>

        <section className="blog-post-body">
          {post.sections.map((section) => (
            <section key={section.heading} className="blog-post-section">
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </section>
          ))}
        </section>
      </article>
    </div>
  );
}
