import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
	const graphqlRepo = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
	});

	const repositories = graphqlRepo.loading ?
		undefined
		: graphqlRepo.data.repositories
	
	const loading = graphqlRepo.loading

	return { repositories, loading };
};

export default useRepositories;