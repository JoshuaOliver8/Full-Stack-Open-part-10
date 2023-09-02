import useRepositories from '../hooks/useRepositories';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';

import theme from '../theme';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.greyBackground
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = (props) => {
	const repositoryNodes = props.repositories
		? props.repositories.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({item}) =>
				<Pressable onPress={() => props.navigate(item.id)}>
					<RepositoryItem
						fullName={item.fullName}
						description={item.description}
						language={item.language}
						stargazersCount={item.stargazersCount}
						forksCount={item.forksCount}
						reviewCount={item.reviewCount}
						ratingAverage={item.ratingAverage}
						ownerAvatarUrl={item.ownerAvatarUrl}
						singleRepo={false}
					/>
				</Pressable>
			}
			keyExtractor={item => item.id}
		/>
	);
}

const RepositoryList = () => {
	const { repositories } = useRepositories();
	const navigate = useNavigate();

	return <RepositoryListContainer repositories={repositories} navigate={navigate} />
};

export default RepositoryList;