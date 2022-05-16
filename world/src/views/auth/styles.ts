import { Styles } from "../../theme/types";

export const styles: Styles = {
  loginContainer: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "200px"
  },
  loginForm: {
    display: "flex",
    flexDirection: "column",
    width: "500px",
    height: "500px",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    margin: "20px",
    fontFamily: "'Cedarville Cursive', cursive",
    fontWeight: "bold",
  },
  inputsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    margin: "20px",
    flex: 1,
  },
};