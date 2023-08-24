import { useMutation } from "@apollo/client";
import { useAuthStorage } from '../hooks/useAuthStorage';
import { AUTHENTICATE } from "../graphql/mutations";
import { useApolloClient } from "@apollo/client";

const useSignIn = () => {
	const [mutate, result] = useMutation(AUTHENTICATE);
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signIn = async ({username, password}) => {
		const mutation = await mutate(
			{ variables: { credentials: { username, password }}}
		);
		const { data } = mutation;
		
		if (data?.authenticate) {
			await authStorage.setAccessToken(data.authenticate.accessToken);
			apolloClient.resetStore();
		}

		return mutation;
	};

	return [signIn, result]
};

export default useSignIn;