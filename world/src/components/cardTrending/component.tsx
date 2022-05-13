import { Box, Card, Paper, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { songSelector } from "../../feature/labSlice";
import { getSongs } from "../../services/song";
import { Styles } from "../../theme/types";

export const CardTrending:FC = () => {
  const styles: Styles = {
    container:{
      width: "400px",
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

  const dispatch:AppDispatch = useDispatch() 
  const songs = useAppSelector(songSelector)

  useEffect(()=>{
    dispatch(getSongs())
  }, [dispatch])

  return(
    <Paper sx={styles.container} elevation={4}>
      <Typography sx={styles.title}>
        Trending songs
      </Typography>
      <Box component="div" sx={styles.carouselContainer}>
        {songs !== undefined ?
          <>
            {songs.map((song)=>(
              <Card sx={styles.smallCard} key={`${song.id}-container`}>
                <Box
                component="img"
                src={`data:image/jpeg;base64,/9j/${song.album[0]?.image}`} 
                sx={styles.cardImage}/>
                <Box component="div" sx={styles.info}>
                  <Typography sx={styles.infoTitle} key={`${song.id}-${song.name}`} variant="h5">
                    {song.name}
                  </Typography>
                    {song.singer.map((singer,index)=>(
                      <Typography sx={styles.infoSubtitle} key={`${singer.id}-${index}`}>{singer.name}</Typography>
                    ))}
                  <Typography sx={styles.infoExtra} key={`${song.id}-${song.price}`}>
                    Stock {song.price}
                  </Typography>
                </Box>
              </Card>
            ))}
          </>
        : null }
      </Box>
    </Paper>
  )
}