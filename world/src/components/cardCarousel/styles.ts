import { Styles } from "../../theme/types";

export const styles: Styles = {
  container:{
    width: "75%",
    margin: "60px 0",
    padding: "20px",
    borderRadius: "40px",
    maxWidth: "1200px",
    height: "350px"
  },
  title:{
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: 'Georgia',
    marginBottom: "20px",
  },
  carouselContainer:{
    display: "flex",
    gap: "40px",
    overflowX: "auto",
    height: "80%"
  },
  smallCard:{
    width: "186px",
    boxShadow: "none",
    overflow: "unset"
  },
  cardImage:{
    borderRadius: "10px",
    width:"186px",
    objectFit: "cover",
    height: "70%"
  },
  info:{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  infoTitle:{
    gridColumnStart: "1",
    gridColumnEnd: "3",
    textOverflow: "hidden"
  },
  infoSubtitle:{

  },
  infoExtra:{
    whiteSpace: "nowrap",
    textAlign: "right",
    color: "#D3D6DB",
    display: "flex"
  },
  infoExtraIcon:{
    paddingTop: "0"
  }
};