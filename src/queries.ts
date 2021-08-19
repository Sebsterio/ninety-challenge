import { gql } from "@apollo/client";

export const GET_REPOS_BY_SEARCH_QUERY = gql`
	query Search($query: String!) {
		search(query: $query, type: REPOSITORY, first: 3) {
			nodes {
				... on Repository {
					name
					forkCount
					stargazerCount
				}
			}
		}
	}
`;
