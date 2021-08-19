import React from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOS_BY_SEARCH_QUERY } from "./queries";

interface Repo {
	name: string;
	forkCount: number;
	stargazerCount: number;
	homepageUrl: string;
}

export const App = () => {
	const { loading, error, data } = useQuery(GET_REPOS_BY_SEARCH_QUERY, {
		variables: { query: "topic:react" },
	});

	if (loading) return <p>Loading...</p>;

	if (error) {
		console.log(error);
		return <p>Error</p>;
	}

	const { nodes: repos } = data.search;

	return (
		<div className="App">
			{repos?.length &&
				repos.map(({ name, forkCount, stargazerCount, homepageUrl }: Repo) => (
					<div key={name}>
						{name} {forkCount} {stargazerCount} {homepageUrl}
					</div>
				))}
		</div>
	);
};
