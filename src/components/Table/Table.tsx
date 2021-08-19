import React from "react";
import { useQuery } from "@apollo/client";

import { GET_REPOS_BY_SEARCH_QUERY } from "../../queries";

interface Repo {
	name: string;
	forkCount: number;
	stargazerCount: number;
	homepageUrl: string;
}

export const Table = () => {
	const { loading, error, data } = useQuery(GET_REPOS_BY_SEARCH_QUERY, {
		variables: { query: "topic:react" },
	});

	if (error) console.log(error);

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error</p>;

	const { nodes: repos } = data.search;

	return (
		<div>
			{repos?.length &&
				repos.map(({ name, forkCount, stargazerCount, homepageUrl }: Repo) => (
					<div key={name}>
						{name} {forkCount} {stargazerCount} {homepageUrl}
					</div>
				))}
		</div>
	);
};
