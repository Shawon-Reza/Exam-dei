const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://chakriova.com";

export const siteUrl = new URL(configuredSiteUrl);

export function getBlogPostUrl(postId: string) {
  const url = new URL("/blogs", siteUrl);
  url.searchParams.set("post", postId);
  url.hash = `blog-${postId}`;
  return url.toString();
}
