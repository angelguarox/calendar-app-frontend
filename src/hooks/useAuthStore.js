import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import {
	onChecking,
	onClearErrorMsg,
	onLogin,
	onLogout,
} from '../store/auth/authSlice';

function useAuthStore() {
	const { status, user, errorMsg } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const startLogin = async ({ email, password }) => {
		dispatch(onChecking());

		try {
			const { data } = await calendarApi.post('/auth', { email, password });
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ id: data.data.id, name: data.data.name }));
		} catch (error) {
			dispatch(onLogout(error.response.data.msg));
			setTimeout(() => {
				dispatch(onClearErrorMsg());
			}, 10);
		}
	};

	const startRegister = async ({ name, email, password }) => {
		try {
			const { data } = await calendarApi.post('/auth/new', {
				name,
				email,
				password,
			});
			localStorage.setItem('token', data.token);
			localStorage.setItem('token-init-date', new Date().getTime());
			dispatch(onLogin({ id: data.data.id, name: data.data.name }));
		} catch (error) {
			dispatch(onLogout(error.response.data?.msg || 'User alredy exist'));
			setTimeout(() => {
				dispatch(onClearErrorMsg());
			}, 10);
		}
	};

	return {
		status,
		user,
		errorMsg,
		startLogin,
		startRegister,
	};
}

export default useAuthStore;
