// ... [rest of your code]

// Implement asset caching

// Define a condition to cache images, scripts, and styles
const assetMatchFunction = ({ request }) =>
  ['image', 'script', 'style'].includes(request.destination);

// Use CacheFirst strategy for these assets
const assetCache = new CacheFirst({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],                       // Cache opaque and 200 OK responses
    }),
    new ExpirationPlugin({
      maxEntries: 60,                           // Only keep 60 entries in cache
      maxAgeSeconds: 30 * 24 * 60 * 60,         // Cache for 30 days
    }),
  ],
});

// Register the route for asset caching
registerRoute(assetMatchFunction, assetCache);
