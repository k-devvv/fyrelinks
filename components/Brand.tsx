import Link from "next/link";

export default function Brand({ showSymbol = true, className = "" }: { showSymbol?: boolean; className?: string }) {
  return (
    <Link href="/" className={`brand ${className}`} aria-label="FyreLinkz home">
      {showSymbol && <span className="brand-icon-wrapper" aria-hidden="true">
        <svg className="brand-symbol" viewBox="0 0 48 48" fill="none" role="presentation">
          <path className="brand-mark-orbit" d="M24 3.75a20.25 20.25 0 1 1 0 40.5 20.25 20.25 0 0 1 0-40.5Z" />
          <path className="brand-mark-letter" d="M28.7 12.5h-5a5.7 5.7 0 0 0-5.7 5.7V35M14 24h13.5M29 26v8h7" />
          <path className="brand-mark-spark" d="m34 11 1.8 5.2L41 18l-5.2 1.8L34 25l-1.8-5.2L27 18l5.2-1.8L34 11Z" />
        </svg>
      </span>}
      <span className="brand-name"><span>fyre</span><span className="brand-accent">linkz</span><span className="brand-period">.</span></span>
    </Link>
  );
}
