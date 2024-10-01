export default function urlParser(url: string) {
  if (!url) return;
  switch (true) {
    case url.includes("/cms"):
      return url.replace("/cms", "");
    case url.includes("entity:"):
      return url.replace("entity:", "/");
    case url.includes("internal:"):
      return url.replace("internal:", "");
    default:
      return url;
  }
}
