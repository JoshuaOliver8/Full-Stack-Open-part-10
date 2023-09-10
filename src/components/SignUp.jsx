import FormikTextInput from './FormikTextInput';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

import useSignUp from '../hooks/useSignUp';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
	background: {
		height: '100%',
		backgroundColor: theme.colors.greyBackground
	},
	submit: {
		paddingLeft: 132,
		paddingRight: 132,
	},
});

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.required('Username is required'),
	password: yup
		.string()
		.required('Password is required'),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Password must match')
		.required('Password confirm is required')
});

export const SignUpContainer = ({ onSubmit }) => {
	const initialValues = {
		username: '',
		password: '',
		passwordConfirm: '',
	}

	return (
		<View style={styles.background}>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				{({ handleSubmit }) =>  
					<View style={theme.pageItemContainer}>
						<FormikTextInput
							name={"username"}
							placeholder="Username"
						/>
						<FormikTextInput 
							name={"password"}
							placeholder="Password"
							secureTextEntry={true} 
						/>
						<FormikTextInput 
							name={"passwordConfirm"}
							placeholder="Confirm Password"
							secureTextEntry={true} 
						/>
						<Pressable 
							onPress={handleSubmit}
							style={[theme.centerButton, styles.submit,]}
						>
							<Text style={theme.centerButtonText}>Create Account</Text>
						</Pressable>
					</View>
				}
			</Formik>
		</View>
	);
}

const SignUp = () => {
	const [createUser] = useSignUp();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;
	
		try {
			await createUser({ username, password });
			console.log(`user ${username} created, logging in`);
			const { data } = await signIn({ username, password });
			console.log(data);
			navigate("/");
		} catch (e) {
			console.log(e);
		}
	};
	
	return <SignUpContainer onSubmit={onSubmit} />
};

export default SignUp;