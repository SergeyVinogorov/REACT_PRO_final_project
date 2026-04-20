import './styles/normalize.css';
import './styles/styles.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Header } from 'widgets/Header';
import { Footer } from 'widgets/Footer';

export const App = () => {
	return (
		<div className='appShell'>
			<Header />
			<main className='appMain'>
				<Outlet />
			</main>
			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				pauseOnHover
				theme='colored'
			/>
			<Footer />
		</div>
	);
};
