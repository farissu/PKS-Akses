// service-worker.js
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('my-cache').then((cache) => {
            // Determine the route based on the current location
            const route = self.location.host;
            // Select the appropriate manifest file
            let manifestFile = `${route}/manifest.json`;
            return fetch(manifestFile)
                .then((response) => {
                    if (!response.ok) {
                        console.log(response)
                        throw new Error('Response was not OK');
                    }
                    return cache.put(manifestFile, response);
                })
                .catch((error) => {
                    console.error('Error fetching or caching manifest:', error);
                });
        })
    );
});



// Add other service worker logic for fetching assets, caching, etc.



