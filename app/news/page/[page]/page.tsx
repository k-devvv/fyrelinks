import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPostsByCategory } from '@/lib/posts';
import { SITE_URL, articlePath } from '@/lib/editorial';
import { pageMetadata } from '@/lib/metadata';
import { NEWS_PAGE_SIZE, newsPageCount, newsPageItems, newsPagePath } from '@/lib/news-pagination';
import NewsPagination from '@/components/NewsPagination';
import StoryCard from '@/components/StoryCard';
import JsonLd from '@/components/JsonLd';
type Props = {params: Promise<{page: string}>};
export const dynamicParams = false;
export function generateStaticParams() {
  return Array.from({length: newsPageCount(getPostsByCategory('news').length) - 1}, (_, i) => ({page: String(i + 2)}));
}
function getPage(value: string) {
  const page = Number(value);
  if (!/^[1-9]\d*$/.test(value) || page < 2 || page > newsPageCount(getPostsByCategory('news').length)) notFound();
  return page;
}
export async function generateMetadata({params}: Props) {
  const page = getPage((await params).page);
  return pageMetadata(`AI news archive — page ${page}`, `Browse page ${page} of FyreLinkz AI news: sourced model releases, research and practical implications.`, newsPagePath(page));
}
export default async function NewsArchive({params}: Props) {
  const page = getPage((await params).page);
  const posts = getPostsByCategory('news');
  const items = newsPageItems(posts, page);
  return <div className="wrap category-page">
    <JsonLd data={{'@context':'https://schema.org','@type':'CollectionPage',url:SITE_URL + newsPagePath(page),name:`AI news archive — page ${page}`,mainEntity:{'@type':'ItemList',numberOfItems:items.length,itemListElement:items.map((p,i)=>({'@type':'ListItem',position:(page-1)*NEWS_PAGE_SIZE+i+1,name:p.title,url:SITE_URL+articlePath(p)}))}}} />
    <nav className="breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/news">News</Link><span>/</span><span aria-current="page">Page {page}</span></nav>
    <header className="category-header"><span className="eyebrow">THE NEWS ARCHIVE</span><h1>AI news · page {page}<span>.</span></h1><p>Earlier reporting, original sources and practical next steps.</p></header>
    <NewsPagination total={posts.length} page={page} />
    <div className="category-grid">{items.map((p,i)=><StoryCard post={p} key={p.slug} priority={i===0} />)}</div>
    <NewsPagination total={posts.length} page={page} />
  </div>;
}
