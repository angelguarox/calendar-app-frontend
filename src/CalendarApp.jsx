import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRouter from './router/AppRouter';
import { store } from './store/store';

function CalendarApp() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<AppRouter />
			</BrowserRouter>
		</Provider>
	);
}

export default CalendarApp;
