const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "/gemapp";

/**
 * Resolves an asset/image path by prefixing the configured Next.js basePath.
 * Ensures compatibility both locally and when deployed to GitHub Pages.
 */
export function getImagePath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanBasePath = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  if (cleanBasePath && (cleanPath === cleanBasePath || cleanPath.startsWith(cleanBasePath + "/"))) {
    return cleanPath;
  }

  return `${cleanBasePath}${cleanPath}`;
}
