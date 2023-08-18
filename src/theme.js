import { Platform } from "react-native";

const theme = {
	colors: {
		textPrimary: '#24292e',
		textSecondary: '#586069',
		primary: '#0366d6',
		appBarBackground: '#0d1117',
		greyBackground: '#f2f2f2',
		error: '#d73a4a'
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		...Platform.select({
			ios: {
				main: 'Arial'
			},
			android: {
				main: 'Roboto'
			},
			default: {
				main: 'System'
			}
		})
	},
	fontWeights: {
		normal: '400',
		bold: '700',
	},
	pageItemContainer: {
		backgroundColor: 'white',
		padding: 10
	},
	centerInput: {
		padding: 5,
		borderWidth: 1,
		borderRadius: 5,
		margin: 5
	},
	centerButton: {
		backgroundColor: '#0366d6',
		borderRadius: 5,
		margin: 5,
		alignSelf: 'center'
	},
	centerButtonText: {
		color: 'white',
		fontWeight: 'bold',
		paddingTop: 10,
		paddingBottom: 10
	},
	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 5,
		padding: 5
	}
};
  
export default theme;