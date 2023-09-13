import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import SignIn from './SignIn';
import SignUp from './SignUp';
import AppBar from './AppBar';
import ReviewForm from './ReviewForm';
import UserReviews from './UserReviews';

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route path="/" element={<RepositoryList />} exact />
				<Route path="/signin" element={<SignIn />} exact />
				<Route path="/:id" element={<SingleRepository />} exact />
				<Route path="/review" element={<ReviewForm />} exact />
				<Route path="/signup" element={<SignUp />} exact />
				<Route path="*" element={<Navigate to="/" replace />} />
				<Route path="/userreviews" element={<UserReviews />} exact />
			</Routes>
		</View>
	);
};

export default Main;