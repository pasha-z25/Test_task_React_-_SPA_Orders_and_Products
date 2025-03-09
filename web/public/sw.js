if (!self.define) {
  let e,
    i = {};
  const a = (a, t) => (
    (a = new URL(a + '.js', t).href),
    i[a] ||
      new Promise((i) => {
        if ('document' in self) {
          const e = document.createElement('script');
          (e.src = a), (e.onload = i), document.head.appendChild(e);
        } else (e = a), importScripts(a), i();
      }).then(() => {
        let e = i[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (t, o) => {
    const n =
      e ||
      ('document' in self ? document.currentScript.src : '') ||
      location.href;
    if (i[n]) return;
    let s = {};
    const r = (e) => a(e, n),
      c = { module: { uri: n }, exports: s, require: r };
    i[n] = Promise.all(t.map((e) => c[e] || r(e))).then((e) => (o(...e), s));
  };
}
define(['./workbox-c2c0676f'], function (e) {
  'use strict';
  importScripts(),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: '/_next/static/chunks/0e762574-6bf79cd35a2c9ebe.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/12.b4fab58ca4ffacfd.js',
          revision: 'b4fab58ca4ffacfd',
        },
        {
          url: '/_next/static/chunks/143-1baa706fa5673967.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js',
          revision: '2b4c1ee4fbe3a7cf',
        },
        {
          url: '/_next/static/chunks/218.57a830a2c55ba802.js',
          revision: '57a830a2c55ba802',
        },
        {
          url: '/_next/static/chunks/285-2ec464e7bee62c8b.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/447-47c86462cdb427b2.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/470.569fb785d9bbdffc.js',
          revision: '569fb785d9bbdffc',
        },
        {
          url: '/_next/static/chunks/479ba886-fc253390aa6d2c1a.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/4bd1b696-677c8cc3ae36fc07.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/5e22fd23-dcd7ff3487a5d619.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/657-f96a4b3396d5f797.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/733.a1e1db185fc13655.js',
          revision: 'a1e1db185fc13655',
        },
        {
          url: '/_next/static/chunks/825-f3cf04ce5195eb08.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/8e1d74a4-5958972865305129.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/94730671-6108b23c2b681116.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/995-d8532fb383402f15.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/9c4e2130-76b5966c64d773f9.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/groups/page-a5a02df03ca819f3.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/layout-a8dc69c702d80277.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/login/page-599c267cb107cc47.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/orders/%5Bid%5D/page-756ca97ab4b83198.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/orders/add/page-3af45c3b75e0b46f.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/orders/page-7c06771b06b50717.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/page-0d20cd3a01fc19bd.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/products/%5Bid%5D/page-d68bc41adcb4a285.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/products/page-819471ec3cfca771.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/register/page-65f53a1285a4f34e.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/settings/page-bb1e36d74c8c821e.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/users/%5Bid%5D/page-23c9b993691d5f0d.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/%5Blng%5D/users/page-797c5b0c993744c1.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/app/_not-found/page-d6cc87b2a0f4dc1e.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/fca4dd8b-69774d9323352124.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/framework-6b27c2b7aa38af2d.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/main-876486f92a9cb73d.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/main-app-2ca13cec600ceffd.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/pages/_app-430fec730128923e.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/pages/_error-2d7241423c4a35ba.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/chunks/polyfills-42372ed130431b0a.js',
          revision: '846118c33b2c0e922d7b3a7676f81f6f',
        },
        {
          url: '/_next/static/chunks/webpack-76146ac6b2c8d929.js',
          revision: 'vMskaiMAVYnhV__F_bBAz',
        },
        {
          url: '/_next/static/css/1932bbf31413fb07.css',
          revision: '1932bbf31413fb07',
        },
        {
          url: '/_next/static/media/569ce4b8f30dc480-s.p.woff2',
          revision: 'ef6cefb32024deac234e82f932a95cbd',
        },
        {
          url: '/_next/static/media/747892c23ea88013-s.woff2',
          revision: 'a0761690ccf4441ace5cec893b82d4ab',
        },
        {
          url: '/_next/static/media/93f479601ee12b01-s.p.woff2',
          revision: 'da83d5f06d825c5ae65b7cca706cb312',
        },
        {
          url: '/_next/static/media/ba015fad6dcf6784-s.woff2',
          revision: '8ea4f719af3312a055caf09f34c89a77',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-300-normal.8cbdc114.woff',
          revision: '8cbdc114',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-300-normal.e944d72f.woff2',
          revision: 'e944d72f',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-400-normal.830ea0fe.woff2',
          revision: '830ea0fe',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-400-normal.ffef0604.woff',
          revision: 'ffef0604',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-500-normal.95215259.woff',
          revision: '95215259',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-500-normal.b3ce57b2.woff2',
          revision: 'b3ce57b2',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-700-normal.a44f839c.woff2',
          revision: 'a44f839c',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-700-normal.e38d0717.woff',
          revision: 'e38d0717',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-ext-300-normal.7ff9e33e.woff2',
          revision: '7ff9e33e',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-ext-300-normal.9e07036d.woff',
          revision: '9e07036d',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-ext-400-normal.946432d9.woff2',
          revision: '946432d9',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-ext-400-normal.d9a08d80.woff',
          revision: 'd9a08d80',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-ext-500-normal.50e31865.woff2',
          revision: '50e31865',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-ext-500-normal.6799a51d.woff',
          revision: '6799a51d',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-ext-700-normal.156db8ce.woff',
          revision: '156db8ce',
        },
        {
          url: '/_next/static/media/roboto-cyrillic-ext-700-normal.3c367f45.woff2',
          revision: '3c367f45',
        },
        {
          url: '/_next/static/media/roboto-greek-300-normal.5750927f.woff2',
          revision: '5750927f',
        },
        {
          url: '/_next/static/media/roboto-greek-300-normal.92521aaf.woff',
          revision: '92521aaf',
        },
        {
          url: '/_next/static/media/roboto-greek-400-normal.12d60326.woff',
          revision: '12d60326',
        },
        {
          url: '/_next/static/media/roboto-greek-400-normal.89cf8ff8.woff2',
          revision: '89cf8ff8',
        },
        {
          url: '/_next/static/media/roboto-greek-500-normal.4c50a582.woff',
          revision: '4c50a582',
        },
        {
          url: '/_next/static/media/roboto-greek-500-normal.c0bba667.woff2',
          revision: 'c0bba667',
        },
        {
          url: '/_next/static/media/roboto-greek-700-normal.879b2d5c.woff',
          revision: '879b2d5c',
        },
        {
          url: '/_next/static/media/roboto-greek-700-normal.97bb7109.woff2',
          revision: '97bb7109',
        },
        {
          url: '/_next/static/media/roboto-greek-ext-300-normal.05694797.woff2',
          revision: '05694797',
        },
        {
          url: '/_next/static/media/roboto-greek-ext-300-normal.8974c9fc.woff',
          revision: '8974c9fc',
        },
        {
          url: '/_next/static/media/roboto-greek-ext-400-normal.3e3c2479.woff',
          revision: '3e3c2479',
        },
        {
          url: '/_next/static/media/roboto-greek-ext-400-normal.d7be5eea.woff2',
          revision: 'd7be5eea',
        },
        {
          url: '/_next/static/media/roboto-greek-ext-500-normal.07139cea.woff',
          revision: '07139cea',
        },
        {
          url: '/_next/static/media/roboto-greek-ext-500-normal.575fb0b1.woff2',
          revision: '575fb0b1',
        },
        {
          url: '/_next/static/media/roboto-greek-ext-700-normal.12c1c67e.woff',
          revision: '12c1c67e',
        },
        {
          url: '/_next/static/media/roboto-greek-ext-700-normal.74208cc1.woff2',
          revision: '74208cc1',
        },
        {
          url: '/_next/static/media/roboto-latin-300-normal.2329f82f.woff2',
          revision: '2329f82f',
        },
        {
          url: '/_next/static/media/roboto-latin-300-normal.a85b9cf5.woff',
          revision: 'a85b9cf5',
        },
        {
          url: '/_next/static/media/roboto-latin-400-normal.4046ec9b.woff2',
          revision: '4046ec9b',
        },
        {
          url: '/_next/static/media/roboto-latin-400-normal.df5217cd.woff',
          revision: 'df5217cd',
        },
        {
          url: '/_next/static/media/roboto-latin-500-normal.48ee0eb8.woff2',
          revision: '48ee0eb8',
        },
        {
          url: '/_next/static/media/roboto-latin-500-normal.fc749f39.woff',
          revision: 'fc749f39',
        },
        {
          url: '/_next/static/media/roboto-latin-700-normal.8cca2ed7.woff',
          revision: '8cca2ed7',
        },
        {
          url: '/_next/static/media/roboto-latin-700-normal.fa764960.woff2',
          revision: 'fa764960',
        },
        {
          url: '/_next/static/media/roboto-latin-ext-300-normal.66661d87.woff',
          revision: '66661d87',
        },
        {
          url: '/_next/static/media/roboto-latin-ext-300-normal.7c4c2da6.woff2',
          revision: '7c4c2da6',
        },
        {
          url: '/_next/static/media/roboto-latin-ext-400-normal.1876457c.woff',
          revision: '1876457c',
        },
        {
          url: '/_next/static/media/roboto-latin-ext-400-normal.b0684611.woff2',
          revision: 'b0684611',
        },
        {
          url: '/_next/static/media/roboto-latin-ext-500-normal.2ac13ad6.woff',
          revision: '2ac13ad6',
        },
        {
          url: '/_next/static/media/roboto-latin-ext-500-normal.c95bea87.woff2',
          revision: 'c95bea87',
        },
        {
          url: '/_next/static/media/roboto-latin-ext-700-normal.dbdfbeed.woff2',
          revision: 'dbdfbeed',
        },
        {
          url: '/_next/static/media/roboto-latin-ext-700-normal.eff0f851.woff',
          revision: 'eff0f851',
        },
        {
          url: '/_next/static/media/roboto-math-300-normal.0fa6e724.woff2',
          revision: '0fa6e724',
        },
        {
          url: '/_next/static/media/roboto-math-300-normal.25fb3631.woff',
          revision: '25fb3631',
        },
        {
          url: '/_next/static/media/roboto-math-400-normal.03ab07d3.woff',
          revision: '03ab07d3',
        },
        {
          url: '/_next/static/media/roboto-math-400-normal.3592474a.woff2',
          revision: '3592474a',
        },
        {
          url: '/_next/static/media/roboto-math-500-normal.27f0db5d.woff2',
          revision: '27f0db5d',
        },
        {
          url: '/_next/static/media/roboto-math-500-normal.a939ed5a.woff',
          revision: 'a939ed5a',
        },
        {
          url: '/_next/static/media/roboto-math-700-normal.0bf4f2d2.woff',
          revision: '0bf4f2d2',
        },
        {
          url: '/_next/static/media/roboto-math-700-normal.cbbc9d9c.woff2',
          revision: 'cbbc9d9c',
        },
        {
          url: '/_next/static/media/roboto-symbols-300-normal.05419fae.woff2',
          revision: '05419fae',
        },
        {
          url: '/_next/static/media/roboto-symbols-300-normal.529d9f6a.woff',
          revision: '529d9f6a',
        },
        {
          url: '/_next/static/media/roboto-symbols-400-normal.2df13a5f.woff',
          revision: '2df13a5f',
        },
        {
          url: '/_next/static/media/roboto-symbols-400-normal.3ef1322e.woff2',
          revision: '3ef1322e',
        },
        {
          url: '/_next/static/media/roboto-symbols-500-normal.276175a1.woff',
          revision: '276175a1',
        },
        {
          url: '/_next/static/media/roboto-symbols-500-normal.5c0ceab0.woff2',
          revision: '5c0ceab0',
        },
        {
          url: '/_next/static/media/roboto-symbols-700-normal.6a556eb8.woff',
          revision: '6a556eb8',
        },
        {
          url: '/_next/static/media/roboto-symbols-700-normal.89973ea4.woff2',
          revision: '89973ea4',
        },
        {
          url: '/_next/static/media/roboto-vietnamese-300-normal.6434f505.woff',
          revision: '6434f505',
        },
        {
          url: '/_next/static/media/roboto-vietnamese-300-normal.d7bef676.woff2',
          revision: 'd7bef676',
        },
        {
          url: '/_next/static/media/roboto-vietnamese-400-normal.a76b569a.woff2',
          revision: 'a76b569a',
        },
        {
          url: '/_next/static/media/roboto-vietnamese-400-normal.f39df0ee.woff',
          revision: 'f39df0ee',
        },
        {
          url: '/_next/static/media/roboto-vietnamese-500-normal.2c54b0a4.woff2',
          revision: '2c54b0a4',
        },
        {
          url: '/_next/static/media/roboto-vietnamese-500-normal.7e173723.woff',
          revision: '7e173723',
        },
        {
          url: '/_next/static/media/roboto-vietnamese-700-normal.045471f8.woff2',
          revision: '045471f8',
        },
        {
          url: '/_next/static/media/roboto-vietnamese-700-normal.0d7ccaea.woff',
          revision: '0d7ccaea',
        },
        {
          url: '/_next/static/vMskaiMAVYnhV__F_bBAz/_buildManifest.js',
          revision: 'c3ed5bbed7a1516252148448980fe5c2',
        },
        {
          url: '/_next/static/vMskaiMAVYnhV__F_bBAz/_ssgManifest.js',
          revision: 'b6652df95db52feb4daf4eca35380933',
        },
        {
          url: '/android-chrome-192x192.png',
          revision: 'ccd06a0bf5dac82bffa845d62b5b4fad',
        },
        {
          url: '/android-chrome-512x512.png',
          revision: '146857b1d2978a5d90d470c63b3fe62d',
        },
        {
          url: '/apple-touch-icon.png',
          revision: '78c576059010378ce8917b5b64896f6c',
        },
        {
          url: '/favicon-16x16.png',
          revision: '6dfd19f8667b89775a7ea18acd8bd530',
        },
        {
          url: '/favicon-32x32.png',
          revision: '618371f91ebf81fa62b0f2e429455b8d',
        },
        { url: '/favicon.ico', revision: 'eff12b925def5f66a186acb6a7c8c4f2' },
        { url: '/file.svg', revision: 'd09f95206c3fa0bb9bd9fefabfd0ea71' },
        { url: '/globe.svg', revision: '2aaafa6a49b6563925fe440891e32717' },
        { url: '/manifest.json', revision: '259e675f1e991acb2d33d7f27024c473' },
        { url: '/next.svg', revision: '8e061864f388b47f33a1c3780831193e' },
        { url: '/vercel.svg', revision: 'c0af2f507b369b085b35ef4bbe3bcf1e' },
        { url: '/window.svg', revision: 'a2760511c65806022ad20adf74370ff3' },
      ],
      { ignoreURLParametersMatching: [/^utm_/, /^fbclid$/] }
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      '/',
      new e.NetworkFirst({
        cacheName: 'start-url',
        plugins: [
          {
            cacheWillUpdate: function (e) {
              return _ref.apply(this, arguments);
            },
          },
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,
      new e.CacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 31536e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,
      new e.StaleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-font-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 4, maxAgeSeconds: 604800 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-image-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 2592e3 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/static.+\.js$/i,
      new e.CacheFirst({
        cacheName: 'next-static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/image\?url=.+$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-image',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 64, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp3|wav|ogg)$/i,
      new e.CacheFirst({
        cacheName: 'static-audio-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:mp4|webm)$/i,
      new e.CacheFirst({
        cacheName: 'static-video-assets',
        plugins: [
          new e.RangeRequestsPlugin(),
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:js)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-js-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 48, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:css|less)$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'static-style-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\/_next\/data\/.+\/.+\.json$/i,
      new e.StaleWhileRevalidate({
        cacheName: 'next-data',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      /\.(?:json|xml|csv)$/i,
      new e.NetworkFirst({
        cacheName: 'static-data-assets',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        var i = e.sameOrigin,
          a = e.url.pathname;
        return !(
          !i ||
          a.startsWith('/api/auth/callback') ||
          !a.startsWith('/api/')
        );
      },
      new e.NetworkFirst({
        cacheName: 'apis',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 16, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        var i = e.request,
          a = e.url.pathname,
          t = e.sameOrigin;
        return (
          '1' === i.headers.get('RSC') &&
          '1' === i.headers.get('Next-Router-Prefetch') &&
          t &&
          !a.startsWith('/api/')
        );
      },
      new e.NetworkFirst({
        cacheName: 'pages-rsc-prefetch',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        var i = e.request,
          a = e.url.pathname,
          t = e.sameOrigin;
        return '1' === i.headers.get('RSC') && t && !a.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'pages-rsc',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        var i = e.url.pathname;
        return e.sameOrigin && !i.startsWith('/api/');
      },
      new e.NetworkFirst({
        cacheName: 'pages',
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 }),
        ],
      }),
      'GET'
    ),
    e.registerRoute(
      function (e) {
        return !e.sameOrigin;
      },
      new e.NetworkFirst({
        cacheName: 'cross-origin',
        networkTimeoutSeconds: 10,
        plugins: [
          new e.ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 3600 }),
        ],
      }),
      'GET'
    );
});
