import React from "react";
import Link from "next/link";

export interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  isAffiliate?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function SmartLink({
  href,
  isAffiliate = false,
  children,
  className = "",
  ...props
}: SmartLinkProps) {
  // Treat /go/ affiliate redirects as outbound affiliate links
  const isGoRedirect = href.startsWith("/go/");
  const isInternal =
    (href.startsWith("/") || href.startsWith("#") || href.includes("fyrelinkz.com")) &&
    !isGoRedirect;

  if (isInternal) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  // Determine rel tags for external links
  const relAttribute = isAffiliate || isGoRedirect
    ? "nofollow sponsored noopener noreferrer"
    : "noopener noreferrer";

  return (
    <a
      href={href}
      target="_blank"
      rel={relAttribute}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}
