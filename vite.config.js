import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const neonThemeColor = '#0f1115';

export default defineConfig({
	plugins: [
		sveltekit(),
		VitePWA({
			registerType: 'autoUpdate',
			includeAssets: ['favicon.svg'],
			manifest: {
				name: 'Taskry Planner',
				short_name: 'Taskry',
				description: 'Plan, classify, and complete neon-themed tasks anywhere.',
				theme_color: neonThemeColor,
				background_color: neonThemeColor,
				display: 'standalone',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: '/favicon.svg',
						sizes: 'any',
						type: 'image/svg+xml',
						purpose: 'any maskable'
					}
				]
			},
			devOptions: {
				enabled: true,
				suppressWarnings: true,
				navigateFallback: '/'
			},
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,ico,webp,woff2}'],
				navigateFallback: '/',
				runtimeCaching: [
					{
						urlPattern: ({ request }) => request.mode === 'navigate',
						handler: 'NetworkFirst',
						options: {
							cacheName: 'taskry-pages',
							networkTimeoutSeconds: 3,
							expiration: {
								maxEntries: 32,
								maxAgeSeconds: 60 * 60 * 24
							}
						}
					},
					{
						urlPattern: ({ request }) =>
							['style', 'script', 'worker'].includes(request.destination),
						handler: 'StaleWhileRevalidate',
						options: {
							cacheName: 'taskry-static',
							expiration: {
								maxEntries: 64,
								maxAgeSeconds: 60 * 60 * 24 * 7
							}
						}
					},
					{
						urlPattern: ({ request }) => request.destination === 'image',
						handler: 'CacheFirst',
						options: {
							cacheName: 'taskry-images',
							expiration: {
								maxEntries: 64,
								maxAgeSeconds: 60 * 60 * 24 * 30
							}
						}
					}
				]
			}
		})
	]
});
