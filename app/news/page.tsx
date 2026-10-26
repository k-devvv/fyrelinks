import CategoryPage from '@/app/[category]/page';
import { pageMetadata } from '@/lib/metadata';
import { getCategoryBySlug } from '@/lib/posts';
const category = getCategoryBySlug('news')!;
export const metadata = pageMetadata(category.metaTitle, category.description, '/news');
export default function NewsPage() {
  return CategoryPage({params: Promise.resolve({category:'news'})});
}
