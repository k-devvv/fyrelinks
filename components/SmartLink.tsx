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
  // Check if link is internal (starts with '/' or '#' or contains domain)
  const isInternal = href.startsWith("/") || href.startsWith("#") || href.includes("fyrelinkz.com");

  if (isInternal) {
    return (
      <Link href={href} className={className} {...props}>
        {children}
      </Link>
    );
  }

  // Determine rel tags for external links
  const relAttribute = isAffiliate
    ? "nofollow sponsored noopener noreferrer"
    : "nofollow noopener noreferrer";

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
