const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Resolves an asset/image path by prefixing the configured Next.js basePath.
 * Ensures compatibility both locally and when deployed to Netlify root or subpaths.
 */
export function getImagePath(path: string): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanBasePath = basePath.endsWith("/") ? basePath.slice(0, -1) : basePath;
  let cleanPath = path.startsWith("/") ? path : `/${path}`;

  // If deployed to root (no cleanBasePath) and path has legacy /gemapp prefix, strip it
  if (!cleanBasePath && cleanPath.startsWith("/gemapp/")) {
    cleanPath = cleanPath.slice("/gemapp".length);
  }

  if (cleanBasePath && (cleanPath === cleanBasePath || cleanPath.startsWith(cleanBasePath + "/"))) {
    return cleanPath;
  }

  return `${cleanBasePath}${cleanPath}`;
}

