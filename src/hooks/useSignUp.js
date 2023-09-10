import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
	const [mutate, result] = useMutation(CREATE_USER);

	const createUser = async ({ username, password }) => {
		const mutation = await mutate(
			{ variables: { user: { username, password } }}
		);

		return mutation;
	};

	return [createUser, result]
};

export default useSignUp;