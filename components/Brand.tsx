import Link from "next/link";

export default function Brand({
  showSymbol = true,
  className = ""
}: {
  showSymbol?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={`brand ${className}`} aria-label="FyreLinkz home">
      {showSymbol && (
        <span className="brand-icon-wrapper" aria-hidden="true">
          <svg
            className="brand-symbol"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="none"
          >
            <rect width="32" height="32" rx="7.5" fill="#0B0E17" stroke="#1E2536" strokeWidth="1" />
            <rect x="6.5" y="5" width="5.5" height="22" rx="1.75" fill="#FFFFFF" />
            <path
              d="M 12 5.5 L 20.5 5.5 C 21.5 5.5 22.3 6.1 22.8 7 L 24 5 L 25.2 7 C 26 5.8 27.5 5.5 29 6.2 C 29.8 6.6 30 7.6 29.4 8.2 L 27.5 9.5 L 29.5 11 C 30.2 11.6 29.8 12.6 29 12.8 C 27.5 13.2 26 12.5 25.2 11.5 L 24 13.5 L 22.8 11.5 C 22.2 12.2 21.4 12.5 20.5 12.5 L 12 12.5 Z"
              fill="url(#brandSymbolGrad)"
            />
            <path
              d="M 25 3 L 26.2 6.5 L 29.5 7.5 L 26.2 8.5 L 25 12 L 23.8 8.5 L 20.5 7.5 L 23.8 6.5 Z"
              fill="#FFAA00"
            />
            <rect x="12" y="15.5" width="7" height="4.5" rx="1" fill="url(#brandSymbolGrad)" />
            <circle cx="21.5" cy="17.75" r="3.25" fill="#0B0E17" stroke="#FF6A00" strokeWidth="2" />
            <circle cx="21.5" cy="17.75" r="1.25" fill="#FFAA00" />
            <defs>
              <linearGradient id="brandSymbolGrad" x1="6" y1="3" x2="30" y2="29" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FF3800" />
                <stop offset="50%" stopColor="#FF6A00" />
                <stop offset="100%" stopColor="#FFAA00" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      )}
      <span className="brand-name">
        fyre<span className="brand-accent">linkz</span>
        <span className="brand-spark" aria-hidden="true">✳</span>
        <span className="brand-period">.</span>
      </span>
    </Link>
  );
}
