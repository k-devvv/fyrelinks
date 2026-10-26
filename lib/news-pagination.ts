export const NEWS_PAGE_SIZE = 24;
export function newsPageCount(total: number) { return Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE)); }
export function newsPagePath(page: number) { return page === 1 ? '/news' : `/news/page/${page}`; }
export function newsPageItems<T>(posts: readonly T[], page: number): T[] {
  return posts.slice((page - 1) * NEWS_PAGE_SIZE, page * NEWS_PAGE_SIZE);
}
