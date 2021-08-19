import React from "react";
import { useQuery } from "@apollo/client";

import { TEST_QUERY } from "../../queries";

export const Table = () => {
	const { loading, error, data } = useQuery(TEST_QUERY);

	if (loading) return <p>Loading...</p>;

	if (error) return <p>Error</p>;

	return <p>{data.user?.login}</p>;
};
