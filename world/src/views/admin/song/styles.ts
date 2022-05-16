import { Styles } from "../../../theme/types";

export const styles: Styles = {
  fullSongContainer:{
    padding: "30px 0 0 50px"
  },
  title: {
    fontWeight: "Bold",
    padding: "20px 0",
  },
  songContainer: {
    display: "flex",
    gap: "60px",
    padding: "40px 0",
    flexWrap: "wrap"
  },
  songId: {
    fontSize: "1.1rem",
  },
  songField: {
    fontSize: "1.1rem",
    fontWeight: "600",
    textTransform: "capitalize",
  },
  songActions: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  formGroup: {
    display: "flex",
    flexDirection: "row",
    width: "50%",
    justifyContent: "space-evenly"
  },
  formContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  formButton: {
    margin: "20px 0",
  },
};