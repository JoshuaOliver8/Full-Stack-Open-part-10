import { useQuery } from '@apollo/client';
import { GET_ONE_USER_REPO } from '../graphql/queries';

const useSingleRepo = (variables) => {	
	const { loading, data, fetchMore, ...result } = useQuery(GET_ONE_USER_REPO, {
		variables,
		fetchPolicy: 'cache-and-network',
	});

	const repository = loading ?
		undefined
		: data.repository;

	const handleFetchMore = () => {
		const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				...variables,
			},
		});
	};
	
	return { repository, loading, handleFetchMore, ...result };
};

export default useSingleRepo;