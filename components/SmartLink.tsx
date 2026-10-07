import React from "react";
import Link from "next/link";
import { linkPolicy } from "@/lib/link-policy";

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
  rel,
  target,
  ...props
}: SmartLinkProps) {
  // Treat /go/ affiliate redirects as outbound affiliate links
  const policy = linkPolicy(href, isAffiliate, rel, target);

  if (policy.internal) {
    return (
      <Link href={href} className={className} {...props} rel={policy.rel} target={policy.target}>
        {children}
      </Link>
    );
  }

  // Determine rel tags for external links

  return (
    <a
      href={href}
      className={className}
      {...props}
      target={policy.target}
      rel={policy.rel}
    >
      {children}
    </a>
  );
}
