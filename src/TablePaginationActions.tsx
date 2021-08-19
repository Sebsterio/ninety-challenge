import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

const useStyles = makeStyles((theme) => ({
	root: {
		flexShrink: 0,
		marginLeft: theme.spacing(2.5),
	},
}));

interface Props {
	count: any;
	page: any;
	rowsPerPage: any;
	onPageChange: any;
	disabled?: boolean;
}

export const TablePaginationActions = ({
	count,
	page,
	rowsPerPage,
	onPageChange,
	disabled,
}: Props) => {
	const classes = useStyles();

	const handleBackButtonClick = (e) => onPageChange(e, page - 1);
	const handleNextButtonClick = (e) => onPageChange(e, page + 1);

	return (
		<div className={classes.root}>
			<IconButton
				onClick={handleBackButtonClick}
				disabled={page === 0}
				aria-label="previous page"
			>
				<KeyboardArrowLeft />
			</IconButton>
			<IconButton
				onClick={handleNextButtonClick}
				disabled={disabled || page >= Math.ceil(count / rowsPerPage) - 1}
				aria-label="next page"
			>
				<KeyboardArrowRight />
			</IconButton>
		</div>
	);
};

export const TablePaginationActionsDisabled = (props) => (
	<TablePaginationActions {...props} disabled={true} />
);
