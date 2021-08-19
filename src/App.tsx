import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { GET_REPOS_BY_SEARCH_QUERY } from "./queries";
import { useAppStyles } from "./App.styles";
import {
	TablePaginationActions,
	TablePaginationActionsDisabled,
} from "./TablePaginationActions";

interface Repo {
	name: string;
	forkCount: number;
	stargazerCount: number;
	homepageUrl: string;
}

export const App = () => {
	const classes = useAppStyles();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const [repos, setRepos] = useState([]);
	const [count, setCount] = useState(0);

	const { loading, error, data } = useQuery(GET_REPOS_BY_SEARCH_QUERY, {
		variables: {
			query: "topic:react",
			first: (page + 1) * rowsPerPage + 20, // buffer for smoother pagination
		},
	});
	if (error) console.log(error);
	if (data) {
		const { nodes, repositoryCount } = data.search;
		if (nodes.length !== repos.length) setRepos(nodes);
		if (!count) setCount(repositoryCount);
	}

	const handleChangePage = (_, newPage) => setPage(newPage);

	const handleChangeRowsPerPage = (e) => {
		setRowsPerPage(parseInt(e.target.value, 10));
		setPage(0);
	};

	const emptyRows =
		rowsPerPage - Math.min(rowsPerPage, repos.length - page * rowsPerPage);

	const freezePagination = page * rowsPerPage >= repos.length - rowsPerPage;

	return (
		<div className={classes.app}>
			{loading && !repos.length ? (
				<div>Loading...</div>
			) : error ? (
				<div>Error</div>
			) : (
				<>
					{loading && <div className={classes.spinner}>Loading...</div>}

					<TableContainer component={Paper} className={classes.table}>
						<Table>
							<TableBody>
								{(rowsPerPage > 0
									? repos.slice(
											page * rowsPerPage,
											page * rowsPerPage + rowsPerPage
									  )
									: repos
								).map(
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

								{emptyRows > 0 && (
									<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell colSpan={6} />
									</TableRow>
								)}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[5, 10]}
										colSpan={3}
										count={count}
										rowsPerPage={rowsPerPage}
										page={page}
										SelectProps={{ native: true }}
										onPageChange={handleChangePage}
										onRowsPerPageChange={handleChangeRowsPerPage}
										ActionsComponent={
											!freezePagination
												? TablePaginationActions
												: TablePaginationActionsDisabled
										}
									/>
								</TableRow>
							</TableFooter>
						</Table>
					</TableContainer>
				</>
			)}
		</div>
	);
};
