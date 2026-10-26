import Link from 'next/link';
import { newsPageCount, newsPagePath } from '@/lib/news-pagination';
export default function NewsPagination({total, page = 1}: {total: number; page?: number}) {
  const count = newsPageCount(total);
  if (count < 2) return null;
  return <nav className="news-pagination" aria-label="News archive pages">
    {page > 1 && <Link href={newsPagePath(page - 1)} rel="prev">← Newer</Link>}
    {Array.from({length: count}, (_, i) => i + 1).map(n => n === page
      ? <span key={n} aria-current="page">Page {n}</span>
      : <Link key={n} href={newsPagePath(n)}>Page {n}</Link>)}
    {page < count && <Link href={newsPagePath(page + 1)} rel="next">Older →</Link>}
  </nav>;
}
