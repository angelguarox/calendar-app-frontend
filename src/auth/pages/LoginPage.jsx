import { useEffect } from 'react';
import Swal from 'sweetalert2';
import useAuthStore from '../../hooks/useAuthStore';
import useForm from '../../hooks/useForm';
import './LoginPage.css';

const loginFormFields = {
	loginEmail: '',
	loginPassword: '',
};

const registerFormFields = {
	registerName: '',
	registerEmail: '',
	registerPassword: '',
	registerPasswordConfirm: '',
};

function LoginPage() {
	const { startLogin, startRegister, errorMsg } = useAuthStore();

	const {
		loginEmail,
		loginPassword,
		onInputChange: onLoginInputChange,
	} = useForm(loginFormFields);

	const {
		registerName,
		registerEmail,
		registerPassword,
		registerPasswordConfirm,
		onInputChange: onRegisterInputChange,
	} = useForm(registerFormFields);

	const handleLoginSubmit = (event) => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	const handleRegisterSubmit = (event) => {
		event.preventDefault();
		if (registerPassword !== registerPasswordConfirm) {
			Swal.fire('Register error', 'Passwords must be the same', 'error');
			return;
		}

		if (registerPassword.length < 6) {
			Swal.fire(
				'Register error',
				'The password field must contain at least 6 characters',
				'error',
			);
			return;
		}

		startRegister({
			name: registerName,
			email: registerEmail,
			password: registerPassword,
		});
	};

	useEffect(() => {
		if (errorMsg !== undefined) {
			Swal.fire('Authentication error', errorMsg, 'error');
		}
	}, [errorMsg]);

	return (
		<div className='container login-container'>
			<div className='row'>
				<div className='col-md-6 login-form-1'>
					<h3>Sign in</h3>
					<form onSubmit={handleLoginSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Email'
								name='loginEmail'
								value={loginEmail}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
								name='loginPassword'
								value={loginPassword}
								onChange={onLoginInputChange}
							/>
						</div>
						<div className='d-grid gap-2'>
							<input type='submit' className='btnSubmit' value='Login' />
						</div>
					</form>
				</div>

				<div className='col-md-6 login-form-2'>
					<h3>Sign up</h3>
					<form onSubmit={handleRegisterSubmit}>
						<div className='form-group mb-2'>
							<input
								type='text'
								className='form-control'
								placeholder='Full name'
								name='registerName'
								value={registerName}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='email'
								className='form-control'
								placeholder='Email'
								name='registerEmail'
								value={registerEmail}
								onChange={onRegisterInputChange}
							/>
						</div>
						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Password'
								name='registerPassword'
								value={registerPassword}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className='form-group mb-2'>
							<input
								type='password'
								className='form-control'
								placeholder='Confirm password'
								name='registerPasswordConfirm'
								value={registerPasswordConfirm}
								onChange={onRegisterInputChange}
							/>
						</div>

						<div className='d-grid gap-2'>
							<input
								type='submit'
								className='btnSubmit'
								value='Create account'
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
