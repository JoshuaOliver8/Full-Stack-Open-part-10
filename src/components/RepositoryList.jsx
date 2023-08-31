import useRepositories from '../hooks/useRepositories';
import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';

import theme from '../theme';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.greyBackground
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({item}) => 
				<RepositoryItem
					fullName={item.fullName}
					description={item.description}
					language={item.language}
					stargazersCount={item.stargazersCount}
					forksCount={item.forksCount}
					reviewCount={item.reviewCount}
					ratingAverage={item.ratingAverage}
					ownerAvatarUrl={item.ownerAvatarUrl}
				/>
			}
			keyExtractor={item => item.id}
		/>
	);
}

const RepositoryList = () => {
	const { repositories } = useRepositories();

	return <RepositoryListContainer repositories={repositories} />
};

export default RepositoryList;