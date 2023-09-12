import useRepositories from '../hooks/useRepositories';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';

import theme from '../theme';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.greyBackground
	},
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryViewSelector = (props) => (
	<Picker
		selectedValue={props.selectView}
		onValueChange={(itemValue) => {
			props.setSelectView(itemValue)
		}}
	>
		<Picker.Item label="Latest repositories" value="Latest repositories" />
		<Picker.Item label="Highest rated repositories" value="Highest rated repositories" />
		<Picker.Item label="Lowest rated repositories" value="Lowest rated repositories" />
	</Picker>
);

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
			ListHeaderComponent={() => <RepositoryViewSelector 
				selectView={props.selectView} 
				setSelectView={props.setSelectView}
			/>}
		/>
	);
}

const RepositoryList = () => {
	const [orderBy, setOrderBy] = useState('CREATED_AT');
	const [orderDirection, setOrderDirection] = useState('DESC');
	const [selectView, setSelectView] = useState('Latest repositories');
	const { repositories } = useRepositories(orderBy, orderDirection);
	const navigate = useNavigate();

	useEffect(() => {
		if (selectView === 'Latest repositories') {
			setOrderBy('CREATED_AT');
			setOrderDirection('DESC');
		} else if (selectView === 'Highest rated repositories') {
			setOrderBy('RATING_AVERAGE');
			setOrderDirection('DESC');
		} else if (selectView === 'Lowest rated repositories') {
			setOrderBy('RATING_AVERAGE');
			setOrderDirection('ASC');
		}
	}, [selectView])

	return <RepositoryListContainer
		repositories={repositories}
		navigate={navigate}
		selectView={selectView}
		setSelectView={setSelectView}
	/>;
};

export default RepositoryList;