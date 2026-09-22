import Link from "next/link";
import Image from "next/image";
import { articlePath, formatDate, type EditorialPost } from "@/lib/editorial";

export function StoryImage({
  post,
  priority = false,
  className = ""
}: {
  post: EditorialPost;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      className={`story-image ${className}`.trim()}
      src={`/art/${post.image}.svg`}
      alt={post.imageAlt || `FyreLinkz editorial illustration: ${post.title}`}
      width={1200}
      height={750}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 760px"
      priority={priority}
    />
  );
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
  const url = articlePath(post);

  return (
    <article className={`story-card story-${variant}`}>
      <Link
        href={url}
        className="story-image-link"
        aria-label={`Read article: ${post.title}`}
      >
        <StoryImage post={post} priority={priority} />
        <span className="image-arrow" aria-hidden="true">↗</span>
      </Link>
      <div className="story-copy">
        <div className="story-meta">
          <span className="eyebrow topic">{post.topic}</span>
          <span className="card-badge">{post.category === "news" ? "News" : "Guide"} · {post.readTime}</span>
        </div>
        <Heading>
          <Link href={url}>{post.title}</Link>
        </Heading>
        {variant !== "compact" && <p>{post.metaDescription}</p>}
        <div className="byline-small">
          FyreLinkz Editorial{" "}
          <span>
            · {post.category !== "news" && "Updated "}
            <time dateTime={post.category === "news" ? post.publishedAt : post.updatedAt}>
              {formatDate(post.category === "news" ? post.publishedAt : post.updatedAt)}
            </time>
          </span>
        </div>
      </div>
    </article>
  );
}
