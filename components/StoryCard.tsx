import Link from "next/link";
import Image from "next/image";
import { articlePath, formatDate, type EditorialPost } from "@/lib/editorial";
export function StoryImage({
  post,
  priority = false
}: {
  post: EditorialPost;
  priority?: boolean;
}) {
  return <Image className="story-image" src={`/art/${post.image}.svg`} alt={post.imageAlt} width={1200} height={750} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 760px" priority={priority} />;
}
export default function StoryCard({
  post,
  variant = "standard",
  priority = false
}: {
  post: EditorialPost;
  variant?: "standard" | "lead" | "compact";
  priority?: boolean;
}) {
  const Heading = "h2";
  return <article className={`story-card story-${variant}`}><Link href={articlePath(post)} className="story-image-link" tabIndex={-1} aria-hidden="true"><StoryImage post={post} priority={priority} /><span className="image-arrow" aria-hidden="true">↗</span></Link><div className="story-copy"><div className="story-meta"><span className="eyebrow topic">{post.topic}</span><span>{post.category === "news" ? "News" : "Guide"} · {post.readTime}</span></div><Heading><Link href={articlePath(post)}>{post.title}</Link></Heading>{variant !== "compact" && <p>{post.metaDescription}</p>}<div className="byline-small">FyreLinkz Editorial <span>· {post.category !== "news" && "Updated "}<time dateTime={post.category === "news" ? post.publishedAt : post.updatedAt}>{formatDate(post.category === "news" ? post.publishedAt : post.updatedAt)}</time></span></div></div></article>;
}
