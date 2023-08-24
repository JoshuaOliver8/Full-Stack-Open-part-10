import FormikTextInput from './FormikTextInput';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

import useSignIn from '../hooks/useSignIn';

const styles = StyleSheet.create({
	background: {
		height: '100%',
		backgroundColor: theme.colors.greyBackground
	},
	submit: {
		paddingLeft: 159,
		paddingRight: 159,
	},
});

const validationSchema = yup.object().shape({
	Username: yup
		.string()
		.required('Username is required'),
	Password: yup
		.string()
		.required('Password is required'),
});

const SignIn = () => {
	const [signIn] = useSignIn();

	const initialValues = {
		username: '',
		password: ''
	}

	const onSubmit = async (values) => {
		const { username, password } = values;
	
		try {
			const { data } = await signIn({ username, password });
			console.log(data);
		} catch (e) {
			console.log(e);
		}
	};

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
							name={"Username"}
							placeholder="Username"
						/>
						<FormikTextInput 
							name={"Password"}
							placeholder="Password"
							secureTextEntry={true} 
						/>
						<Pressable 
							onPress={handleSubmit}
							style={[theme.centerButton, styles.submit,]}
						>
							<Text style={theme.centerButtonText}>Sign In</Text>
						</Pressable>
					</View>
				}
			</Formik>
		</View>
	);
};

export default SignIn;