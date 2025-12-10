import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			// 기본값: 빌드된 파일을 'build' 디렉토리에 출력
			// pages: 'build',
			// assets: 'build',
			// fallback: undefined,
			// precompress: false,
			// strict: true
		})
	}
};

export default config;
