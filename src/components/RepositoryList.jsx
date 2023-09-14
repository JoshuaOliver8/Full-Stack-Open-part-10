import useRepositories from '../hooks/useRepositories';
import { FlatList, View, StyleSheet, Pressable, Text, TextInput } from 'react-native';
import RepositoryItem from './RepositoryItem';
import { useNavigate } from 'react-router-native';
import { useState, useEffect } from 'react';
import {Picker} from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';
import React from "react";

import theme from '../theme';

const styles = StyleSheet.create({
	separator: {
		height: 10,
		backgroundColor: theme.colors.greyBackground
	},
	orderList: {
		backgroundColor: theme.colors.greyBackground
	},
	orderListHeader: {
		marginLeft: '2%',
		marginTop: '2%',
		fontWeight: theme.fontWeights.bold,
		fontSize: theme.fontSizes.subheading
	},
	picker: {
		width: '90%',
		marginHorizontal: '10%',
		marginTop: '2%',
	},
	pickerText: {
		fontSize: theme.fontSizes.body,
		backgroundColor: 'white',
	},
	searchList: {
		marginVertical: '2%',
		marginHorizontal: '5%',
		backgroundColor: 'white',
		textAlign: 'center',
		borderRadius: 5
	}
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryViewSelector = (props) => (
	<View style={styles.orderList}>
		<Text style={styles.orderListHeader}>Change Repository List Order</Text>
		<Picker
			selectedValue={props.selectView}
			onValueChange={(itemValue) => {
				props.setSelectView(itemValue)
			}}
			style={styles.picker}
		>
			<Picker.Item style={styles.pickerText} label="Latest repositories" value="Latest repositories" />
			<Picker.Item style={styles.pickerText} label="Highest rated repositories" value="Highest rated repositories" />
			<Picker.Item style={styles.pickerText} label="Lowest rated repositories" value="Lowest rated repositories" />
		</Picker>
		<Text style={styles.orderListHeader}>Filter Repository List</Text>
		<TextInput 
			onChangeText={props.setFilterText}
			value={props.filterText}
			placeholder="Search list"
			style={styles.searchList}
		/>
		<ItemSeparator />
	</View>
);

export class RepositoryListContainer extends React.Component {
	renderHeader = () => {
		const props = this.props;

		return (
			<RepositoryViewSelector
				selectView={props.selectView} 
				setSelectView={props.setSelectView}
				filterText={props.filterText}
				setFilterText={props.setFilterText}
			/>
		);
	}

	render() {
		const props = this.props;

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
				ListHeaderComponent={this.renderHeader}
				onEndReached={props.onEndReach}
				onEndReachedThreshold={0.5}
			/>
		);
	}

	
}

const RepositoryList = () => {
	const [orderBy, setOrderBy] = useState('CREATED_AT');
	const [orderDirection, setOrderDirection] = useState('DESC');
	const [selectView, setSelectView] = useState('Latest repositories');
	const [filterText, setFilterText] = useState('')
	const [searchKeyword] = useDebounce(filterText, 500);
	const { repositories, handleFetchMore } = useRepositories({
		first: 6, orderBy, orderDirection, searchKeyword
	});
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

	const onEndReach = () => {
		handleFetchMore();
	}

	return <RepositoryListContainer
		repositories={repositories}
		navigate={navigate}
		selectView={selectView}
		setSelectView={setSelectView}
		filterText={filterText}
		setFilterText={setFilterText}
		onEndReach={onEndReach}
	/>;
};

export default RepositoryList;