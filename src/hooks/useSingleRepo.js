import { useQuery } from '@apollo/client';
import { GET_ONE_USER_REPO } from '../graphql/queries';

const useSingleRepo = (repoId) => {	
	const { loading, data } = useQuery(GET_ONE_USER_REPO, {
		variables: { "id": repoId },
		fetchPolicy: 'cache-and-network',
	});

	const repository = loading ?
		undefined
		: data.repository;
	
	return { repository, loading };
};

export default useSingleRepo;