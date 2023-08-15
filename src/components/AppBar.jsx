import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

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
	return (
		<View style={styles.container}>
			<ScrollView horizontal>
				<AppBarTab link={"/"}>
					Repositories
				</AppBarTab>
				<AppBarTab link={"/signin"}>
					Sign In
				</AppBarTab>
			</ScrollView>
		</View>);
};

export default AppBar;