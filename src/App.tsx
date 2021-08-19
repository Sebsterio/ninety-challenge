import React from "react";
import { useQuery } from "@apollo/client";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { GET_REPOS_BY_SEARCH_QUERY } from "./queries";
import { useAppStyles } from "./App.styles";

interface Repo {
	name: string;
	forkCount: number;
	stargazerCount: number;
	homepageUrl: string;
}

export const App = () => {
	const classes = useAppStyles();
	const { loading, error, data } = useQuery(GET_REPOS_BY_SEARCH_QUERY, {
		variables: { query: "topic:react" },
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error</p>;

	const { nodes: repos } = data.search;

	return (
		<div className={classes.app}>
			<TableContainer component={Paper} className={classes.table}>
				<Table>
					<TableBody>
						{repos.map(
							({ name, forkCount, stargazerCount, homepageUrl }: Repo) => (
								<TableRow key={name}>
									<TableCell component="th" scope="row">
										<a
											href={homepageUrl}
											className={classes.link}
											target="_blank"
											rel="noreferrer"
										>
											{name}
										</a>
									</TableCell>
									<TableCell style={{ width: 100 }}>
										🌟&nbsp;{stargazerCount}
									</TableCell>
									<TableCell style={{ width: 100 }}>
										🍴&nbsp;{forkCount}
									</TableCell>
								</TableRow>
							)
						)}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};
