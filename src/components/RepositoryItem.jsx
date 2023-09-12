import { Text, View, Image, StyleSheet, Pressable } from "react-native";
import * as Linking from 'expo-linking';
import theme from "../theme";

const styles = StyleSheet.create({
	topFlexContainer: {
		flexDirection: 'row',
		height: 'auto'
	},
	topRightFlexContainer: {
		flexDirection: 'column',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
		marginLeft: 5,
		padding: 5,
	},
	name: {
		flex: 1,
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.textPrimary,
	},
	descContainer: {
		flex: 1,
		flexDirection: 'row',
		flexGrow: 1,
		width: 300,
		height: 'auto',
		justifyContent: 'flex-start'
	},
	description: {
		color: theme.colors.textSecondary,
	},
	language: {
		flex: 1,
		backgroundColor: theme.colors.primary,
		borderRadius: 5,
		color: 'white',
		padding: 5,
		margin: 5,
		alignSelf: 'flex-start'
	},
	bottomFlexContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		width: '80%',
		marginLeft: 'auto',
		marginRight: 'auto'
	},
	numbersContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignContent: 'space-between'
	},
	numbers: {
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.textPrimary,
		flex: 1
	},
	legendContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignContent: 'space-between'
	},
	legends: {
		color: theme.colors.textSecondary,
		flex: 1
	},
	linkButton: {
		paddingLeft: 133,
		paddingRight: 133,
	}
})

const RepositoryItem = (props) => {
	let stars 
	let forks
	let reviews

	if (props.stargazersCount >= 1000) {
		stars = `${Math.round((props.stargazersCount * 0.001) * 10) / 10}k`
	} else {
		stars = `${props.stargazersCount}`
	}

	if (props.forksCount >= 1000) {
		forks = `${Math.round((props.forksCount * 0.001) * 10) / 10}k`
	} else {
		forks = `${props.forksCount}`
	}

	if (props.reviewCount >= 1000) {
		reviews = `${Math.round((props.reviewCount * 0.001) * 10) / 10}k`
	} else {
		reviews = `${props.reviewCount}`
	}

	return (
		<View testID="repositoryItem" style={theme.pageItemContainer}>
			<View style={styles.topFlexContainer}>
				<Image
					style={theme.profilePic}
					source={{ uri: props.ownerAvatarUrl }} 
				/>
				<View style={styles.topRightFlexContainer}>
					<Text style={styles.name}>{props.fullName}</Text>
					<View style={styles.descContainer}>
						<Text style={styles.description}>{props.description}</Text>
					</View>
					<Text style={styles.language}>{props.language}</Text>
				</View>
			</View>
			<View style={styles.bottomFlexContainer}>
				<View style={styles.numbersContainer}>
					<Text style={styles.numbers}>{stars}</Text>
					<Text style={styles.numbers}>{forks}</Text>
					<Text style={styles.numbers}>{reviews}</Text>
					<Text style={styles.numbers}>{props.ratingAverage}</Text>
				</View>
				<View style={styles.legendContainer}>
					<Text style={styles.legends}>Stars</Text>
					<Text style={styles.legends}>Forks</Text>
					<Text style={styles.legends}>Reviews</Text>
					<Text style={styles.legends}>Rating</Text>
				</View>
			</View>
			{props.singleRepo && <Pressable 
				style={[theme.centerButton, styles.linkButton]}
				onPress={() => Linking.openURL(props.url)}
			>
				<Text style={theme.centerButtonText}>Open in GitHub</Text>
			</Pressable>}
		</View>
	);
}

export default RepositoryItem;