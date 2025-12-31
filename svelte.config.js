import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// SPA 모드: 모든 라우트를 index.html로 fallback
			fallback: 'index.html',
			// 기본값: 빌드된 파일을 'build' 디렉토리에 출력
			// pages: 'build',
			// assets: 'build',
			// precompress: false,
			// strict: true
		})
	}
};

export default config;
