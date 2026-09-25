"use client";

export default function RouteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="route-error wrap" role="alert">
    <span className="eyebrow">A SMALL DETOUR</span>
    <h1>This page needs another moment.</h1>
    <p>Your articles are safe. Try loading this page again.</p>
    <button className="button-primary" onClick={() => reset()}>Try again <span aria-hidden="true">↗</span></button>
  </main>;
}
