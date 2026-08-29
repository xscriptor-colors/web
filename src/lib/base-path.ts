export function withBasePath(src: string): string {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return basePath ? `${basePath}${src}` : src;
}
