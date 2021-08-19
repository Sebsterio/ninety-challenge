import { gql } from "@apollo/client";

export const GET_REPOS_BY_SEARCH_QUERY = gql`
	query Search($query: String!, $first: Int!) {
		search(query: $query, type: REPOSITORY, first: $first) {
			repositoryCount
			nodes {
				... on Repository {
					name
					forkCount
					stargazerCount
					homepageUrl
				}
			}
		}
	}
`;
