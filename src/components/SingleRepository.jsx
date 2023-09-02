import { Text } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useSingleRepo from '../hooks/useSingleRepo';
import { useParams } from 'react-router-native';

const SingleRepository = () => {
	const { id } = useParams();

	if (!id) {
		return null;
	}

	const { repository, loading } = useSingleRepo(id);
	console.log(repository);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	return (
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
	);
};

export default SingleRepository;