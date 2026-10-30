"use client";

export default function RouteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="route-error wrap" role="alert" data-no-ads="">
    <span className="eyebrow">A SMALL DETOUR</span>
    <h1>This page needs another moment.</h1>
    <p>Your articles are safe. Try loading this page again.</p>
    <button className="button-primary" onClick={() => reset()}>Try again <span aria-hidden="true">↗</span></button>
  </div>;
}
