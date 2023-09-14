import { View, Text, StyleSheet, FlatList } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useSingleRepo from '../hooks/useSingleRepo';
import { useParams } from 'react-router-native';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.greyBackground
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
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
	return (
		<View>
			<RepositoryItem
				fullName={repository.fullName}
				description={repository.description}
				language={repository.language}
				stargazersCount={repository.stargazersCount}
				forksCount={repository.forksCount}
				reviewCount={repository.reviewCount}
				ratingAverage={repository.ratingAverage}
				ownerAvatarUrl={repository.ownerAvatarUrl}
				url={repository.url}
				singleRepo={true}
			/>
			<ItemSeparator />
		</View>
	);
};

const ReviewItem = ({ review }) => {
	const reviewDate = new Date(review.createdAt);

	return (
		<View style={theme.pageItemContainer}>
			<View style={styles.flexContainer}>
				<View style={styles.leftContainer}>
					<Text style={styles.rating}>{review.rating}</Text>
				</View>
				<View style={styles.rightContainer}>
					<Text style={styles.username}>{review.user.username}</Text>
					<Text style={styles.date}>{format(reviewDate, 'dd.MM.yyyy')}</Text>
					<View style={styles.reviewTextContainer}>
						<Text style={styles.reviewText}>{review.text}</Text>
					</View>
				</View>
			</View>
		</View>);
};

const SingleRepository = () => {
	const { id } = useParams();

	if (!id) {
		return null;
	}

	const { repository, loading, handleFetchMore } = useSingleRepo({ 
		first: 5, repositoryId: id 
	});
	
	const onEndReach = () => {
		handleFetchMore();
	}

	if (loading) {
		return (
			<Text>Loading...</Text>
		);
	}

	const reviewNodes = repository.reviews
		? repository.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => <ReviewItem review={item} />}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
			onEndReached={onEndReach}
			onEndReachedThreshold={0.5}
		/>
	);
};

export default SingleRepository;