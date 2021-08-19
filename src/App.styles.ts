import { makeStyles } from "@material-ui/core/styles";

export const useAppStyles = makeStyles({
	app: {
		position: "absolute",
		width: "100vw",
		height: "100vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		background: "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
		backgroundSize: "400% 400%",
		animation: "gradient 15s ease infinite",
	},
	table: {
		maxWidth: 500,
	},
	link: {
		fontWeight: 700,
		textDecoration: "none",
	},
	"@keyframes gradient": {
		"0%": {
			backgroundPosition: "0% 50%",
		},
		"50%": {
			backgroundPosition: "100% 50%",
		},
		"100%": {
			backgroundPosition: "0% 50%",
		},
	},
});
