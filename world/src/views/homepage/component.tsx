import { Box, Typography } from "@mui/material";
import { FC } from "react";
import { CardCarousel } from "../../components/cardCarousel/component";
import { CardTrending } from "../../components/cardTrending/component";
import { Styles } from "../../theme/types";

export const HomePage:FC = () => {
  const styles: Styles = {
    homeContainer:{
      padding: "10px 10px",
      width: "100%",
      maxWidth: "none",
      marginTop: "100px"
    },
    title:{
      color: "#000"
    },
    cardContainer:{
      display: "flex",
      flexWrap: "wrap",
      marginTop: "40px",
      justifyContent: "space-evenly",
    }
  };
  return(
    <Box sx={styles.homeContainer}>
      <Typography sx={styles.title} variant="h4">
        Discover Music
      </Typography>
      <Box sx={styles.cardContainer}>
        <CardTrending />
        <CardCarousel />
      </Box>
    </Box>
  )
}