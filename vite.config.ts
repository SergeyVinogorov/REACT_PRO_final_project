import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
	plugins: [
		svgr({
			svgrOptions: {
				icon: true,
			},
		}),
		react(),
	],
	server: { port: 5173 },
	resolve: {
		alias: {
			app: path.resolve(__dirname, 'src/app'),
			pages: path.resolve(__dirname, 'src/pages'),
			widgets: path.resolve(__dirname, 'src/widgets'),
			features: path.resolve(__dirname, 'src/features'),
			entities: path.resolve(__dirname, 'src/entities'),
			shared: path.resolve(__dirname, 'src/shared'),
		},
	},
});
