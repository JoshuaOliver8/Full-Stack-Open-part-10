import { Text, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';

import theme from '../theme';

const styles = StyleSheet.create({
	container: {
		backgroundColor: theme.colors.appBarBackground,
		padding: 10,
	},
	text: {
		fontWeight: 'bold',
		color: 'white'
	}
});

const AppBarTab = ({ children, link, press }) => {
	return (
		<Link to={link} style={styles.container} onPress={press}>
			<Text style={styles.text}>{children}</Text>
		</Link>
	);
};

export default AppBarTab;