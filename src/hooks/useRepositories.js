import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection) => {
	const graphqlRepo = useQuery(GET_REPOSITORIES, {
		variables: { "orderBy": orderBy, "orderDirection": orderDirection},
		fetchPolicy: 'cache-and-network',
	});

	const repositories = graphqlRepo.loading ?
		undefined
		: graphqlRepo.data.repositories
	
	const loading = graphqlRepo.loading

	return { repositories, loading };
};

export default useRepositories;