import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from 'app/router';
import { Provider } from 'react-redux';
import { store } from 'app/store/store';
import { startMocking } from 'shared/api/msw/startMocking';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);
async function bootstrap() {
	await startMocking();

	root.render(
		<StrictMode>
			<Provider store={store}>
				<RouterProvider router={router} />
			</Provider>
		</StrictMode>
	);
}

bootstrap();
