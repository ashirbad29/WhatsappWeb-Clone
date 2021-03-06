import React from 'react';
import { Button } from '@material-ui/core';
import './Login.css';
import { auth } from 'firebase';
import firebase from 'firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
	const provider = new firebase.auth.GoogleAuthProvider();

	const [{}, dispatch] = useStateValue();

	const signIn = () => {
		auth()
			.signInWithPopup(provider)
			.then(result => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch(error => alert(error.message));
	};

	return (
		<div className="login">
			<div className="login__container">
				<img src={require('./images/whatsapp-logo.png')} alt="whatsapp logo" />
				<div className="login__text">
					<h1>sign in to whatsapp</h1>
				</div>

				<Button onClick={signIn}>Sign in with Google</Button>
			</div>
		</div>
	);
}

export default Login;
