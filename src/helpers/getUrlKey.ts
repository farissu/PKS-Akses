export default function getUrlKey(key: string) {
    const urlString = typeof window !== "undefined" ? window.location.href : "";
    const url = new URL(urlString);

    // console.log("FBCLID", url.searchParams.get("fbclid"));
    return url.searchParams.get(key);
}