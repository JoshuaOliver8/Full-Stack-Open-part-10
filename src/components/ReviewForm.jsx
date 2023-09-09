import FormikTextInput from './FormikTextInput';
import { View, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';

import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
	background: {
		height: '100%',
		backgroundColor: theme.colors.greyBackground
	},
	submit: {
		paddingLeft: 155,
		paddingRight: 155,
	},
});

const validationSchema = yup.object().shape({
	ownerName: yup
		.string()
		.required('Repository owner username is required'),
	rating: yup
		.number()
		.typeError('Rating must be a number')
		.required('Rating is required')
		.min(0, 'Rating must be between 0 and 100')
		.max(100, 'Rating must be between 0 and 100'),
	repositoryName: yup
		.string()
		.required('Repository name is required'),
	text: yup
		.string()
		.max(2000, 'Review character limit is 2000.'),
});

export const ReviewFormContainer = ({ onSubmit }) => {
	const initialValues = {
		ownerName: '',
		rating: '',
		repositoryName: '',
		text: ''
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
							name={"ownerName"}
							placeholder="Owner Name"
						/>
						<FormikTextInput 
							name={"repositoryName"}
							placeholder="Repository Name"
						/>
						<FormikTextInput
							name={"rating"}
							placeholder="Rating"
						/>
						<FormikTextInput 
							name={"text"}
							placeholder="Optional Written Review"
							multiline={true}
						/>
						<Pressable 
							onPress={handleSubmit}
							style={[theme.centerButton, styles.submit,]}
						>
							<Text style={theme.centerButtonText}>Submit</Text>
						</Pressable>
					</View>
				}
			</Formik>
		</View>
	);
}

const ReviewForm = () => {
	const [createReview] = useCreateReview()
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		let { ownerName, rating, repositoryName, text } = values;
		rating = parseInt(rating, 10);

		try {
			console.log('are you even trying?');
			const { data } = await createReview({ ownerName, repositoryName, rating, text });
			console.log(data);
			console.log(data.createReview.repositoryId);
			navigate(`../${data.createReview.repositoryId}`, {replace: true});
		} catch (e) {
			console.log(e);
		}
	};
	
	return <ReviewFormContainer onSubmit={onSubmit} />
};

export default ReviewForm;