import { worker } from './browser';

function isDev() {
	return process.env.NODE_ENV === 'development';
}

function isEnabled() {
	// Enable MSW only in dev, and only when explicitly turned on:
	// - ?msw=1 in URL
	// - localStorage.setItem('msw','1')
	// - env MSW=1 (optional)
	if (!isDev()) return false;

	try {
		const url = new URL(window.location.href);
		if (url.searchParams.get('msw') === '1') return true;
	} catch {}

	if (
		typeof localStorage !== 'undefined' &&
		localStorage.getItem('msw') === '1'
	)
		return true;

	if (process.env.MSW === '1') return true;

	return false;
}

export async function startMocking() {
	if (!isEnabled()) return;

	await worker.start({
		onUnhandledRequest: 'bypass',
		serviceWorker: { url: '/mockServiceWorker.js' },
	});

	// eslint-disable-next-line no-console
	console.log('[msw] enabled');
}
