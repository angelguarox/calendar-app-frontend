import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from '../auth/pages/LoginPage';
import CalendarPage from '../calendar/pages/CalendarPage';

function AppRouter() {
	const authStatus = 'not-authenticated';

	return (
		<Routes>
			{authStatus === 'not-authenticated' ? (
				<Route path='/auth/*' element={<LoginPage />} />
			) : (
				<Route path='/*' element={<CalendarPage />} />
			)}
			<Route path='/*' element={<Navigate to='/auth/login' />} />
		</Routes>
	);
}

export default AppRouter;
