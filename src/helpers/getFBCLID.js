const getFBCLID = () => {
    const event_id = parseInt(Date.now() / 1000);
    const urlString = typeof window !== "undefined" ? window.location.href : "";
    const url = new URL(urlString);
    // console.log("FBCLID", url.searchParams.get("fbclid"));
    return url.searchParams.get("fbclid");
}

export default getFBCLID;