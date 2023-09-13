import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { useQuery } from '@apollo/client';
import { CHECK_USER } from '../graphql/queries';
import useDeleteReview from '../hooks/useDeleteReview';
import theme from '../theme';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.greyBackground
	},
	title: {
		marginTop: '2%',
		marginLeft: '5%',
		marginRight: '5%',
		paddingBottom: '1%',
		fontWeight: theme.fontWeights.bold,
		fontSize: theme.fontSizes.subheading,
		borderBottomWidth: 2,
		borderBottomColor: 'black',
	},
	flexContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginVertical: 10,
	},
	leftContainer: {
		flexDirection: 'column',
		flex: 1,
		marginLeft: 10
	},
	rightContainer: {
		flexDirection: 'column',
		width: '85%',
		justifyContent: 'space-around'
	},
	rating: {
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.primary,
		width: 30,
		height: 30,
		borderWidth: 1,
		borderColor: theme.colors.primary,
		borderRadius: 15,
		textAlign: 'center',
		padding: 5,
	},
	username: {
		fontWeight: theme.fontWeights.bold,
		color: theme.colors.textPrimary,
		flex: 1,
		fontSize: theme.fontSizes.body
	},
	date: {
		color: theme.colors.textSecondary,
		flex: 1,
		fontSize: theme.fontSizes.body
	},
	reviewTextContainer: {
		width: 300,
		flex: 3,
	},
	reviewText: {
		fontSize: theme.fontSizes.body
	},
	leftButton: {
		backgroundColor: theme.colors.primary,
		paddingVertical: '3%',
		paddingHorizontal: '8%',
		borderRadius: 5,
		marginRight: '2.5%'
	},
	leftButtonText: {
		color: 'white',
		fontWeight: theme.fontWeights.bold,
	},
	rightButton: {
		backgroundColor: theme.colors.error,
		paddingVertical: '3%',
		paddingHorizontal: '10%',
		borderRadius: 5,
		marginLeft: '2.5%'
	},
	rightButtonText: {
		color: 'white',
		fontWeight: theme.fontWeights.bold,
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, navigate, removeReview }) => {
	const reviewDate = new Date(review.createdAt);

	return (
		<View style={theme.pageItemContainer}>
			<View style={styles.flexContainer}>
				<View style={styles.leftContainer}>
					<Text style={styles.rating}>{review.rating}</Text>
				</View>
				<View style={styles.rightContainer}>
					<Text style={styles.username}>{review.repository.fullName}</Text>
					<Text style={styles.date}>{format(reviewDate, 'dd.MM.yyyy')}</Text>
					<View style={styles.reviewTextContainer}>
						<Text style={styles.reviewText}>{review.text}</Text>
					</View>
				</View>
			</View>
			<View style={styles.flexContainer}>
				<Pressable 
					onPress={() => navigate(`/${review.repository.id}`)}
					style={styles.leftButton}
				>
					<Text style={styles.leftButtonText}>View repository</Text>
				</Pressable>
				<Pressable
					onPress={() => removeReview(review.id)}
					style={styles.rightButton}
				>
					<Text style={styles.rightButtonText}>Delete review</Text>
				</Pressable>
			</View>
		</View>);
};

const UserReviews = () => {
	const navigate = useNavigate();
	const [deleteReview] = useDeleteReview();
	const { data, loading, refetch } = useQuery(CHECK_USER, {
		variables: { 'includeReviews': true }
	});

	if (loading) {
		return (
			<Text>Loading...</Text>
		);
	}

	const reviewNodes = data.me.reviews
		? data.me.reviews.edges.map((edge) => edge.node)
		: [];

	const removeReview = async (id) => {
		Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
			{
				text: 'Cancel',
				style: 'cancel'
			},
			{
				text: 'Delete',
				onPress: async () => {
					try {
						const { data } = await deleteReview(id);
						console.log(data);
						refetch();
					} catch (e) {
						console.log(e);
					}
				}
			}
		]);
	} 
	
	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => 
				<ReviewItem
					review={item}
					navigate={navigate}
					removeReview={removeReview}
				/>}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <Text style={styles.title}>My Reviews</Text>}
		/>
	);
};

export default UserReviews;