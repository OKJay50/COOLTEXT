// Importing required Workbox modules
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Precache assets based on the Webpack Workbox plugin's generated manifest
precacheAndRoute(self.__WB_MANIFEST);

// Define a cache-first strategy for pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',                      // Name of the cache
  plugins: [
    new CacheableResponsePlugin({               // Ensure only cacheable responses are cached
      statuses: [0, 200],                       // Cache opaque and 200 OK responses
    }),
    new ExpirationPlugin({                      // Set expiration for cached entries
      maxAgeSeconds: 30 * 24 * 60 * 60,         // Cache for 30 days
    }),
  ],
});

// Warm up the cache with specific URLs
warmStrategyCache({
  urls: ['/index.html', '/'],                   // URLs to pre-cache
  strategy: pageCache,                          // Cache strategy to use
});

// Register a route to handle navigation requests using the cache-first strategy
registerRoute(
  ({ request }) => request.mode === 'navigate', // Route only navigation requests
  pageCache                                     // Use the page cache strategy
);

// TODO: Implement asset caching. Add details about what assets to cache and the caching strategy.
registerRoute(
  // Define a condition for which assets to cache (e.g., images, scripts, styles)
  ({ request }) => request.destination === 'image',
  // Define a caching strategy for the assets (e.g., CacheFirst, StaleWhileRevalidate)
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxEntries: 60,                        // Only keep 60 entries in cache
        maxAgeSeconds: 30 * 24 * 60 * 60,      // Cache for 30 days
      }),
    ],
  })
);
