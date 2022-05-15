import { Styles } from "../../theme/types";

export const styles: Styles = {
  container:{
    width: "300px",
    maxWidth: "300px",
    margin: "60px 0",
    padding: "20px",
    borderRadius: "40px",
    height: "350px"
  },
  title:{
    fontSize: "18px",
    fontWeight: "bold",
    fontFamily: 'Georgia'
  },
  carouselContainer:{
    display: "flex",
    gap: "40px",
    overflowX: "auto",
    cursor: "grabbing"
  },
  smallCard:{
    width: "270px",
    boxShadow: "none",
    height: "290px",
    overflow: "unset"
  },
  cardImage:{
    borderRadius: "10px",
    width:"270px",
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