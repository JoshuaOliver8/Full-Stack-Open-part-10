import { View, StyleSheet, ScrollView, Text } from 'react-native';
import Constants from 'expo-constants';

import { useAuthStorage } from '../hooks/useAuthStorage';
import { useApolloClient } from "@apollo/client";
import { CHECK_USER } from '../graphql/queries';
import { useQuery } from '@apollo/client';

import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
	container: {
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.appBarBackground,
	},
	scroll: {
		flexDirection: 'row',
	}
});

const AppBar = () => {
	const authStorage = useAuthStorage();
	const { data, loading } = useQuery(CHECK_USER);
	console.log(data?.me)
	const apolloClient = useApolloClient();

	const logOut = async () => {
		await authStorage.removeAccessToken();
		apolloClient.resetStore();
	}

	if (loading) {
		return (<Text>Loading...</Text>);
	}

	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab link={"/"}>
					Repositories
				</AppBarTab>
				{data.me === null && 
				(<>
					<AppBarTab link={"/signin"}>
						Sign in
					</AppBarTab>
					<AppBarTab link={"/signup"}>
						Sign up
					</AppBarTab>
				</>)}
				{data.me !== null && 
				(<>
					<AppBarTab link={"/"} press={logOut}>
						Sign out
					</AppBarTab>
					<AppBarTab link={"/review"}>
						Create a review
					</AppBarTab>
				</>)}
			</ScrollView>
		</View>);
};

export default AppBar;