import { Box, Card, Paper, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { AppDispatch } from "../../app/store";
import { songSelector } from "../../feature/labSlice";
import { getSongs } from "../../services/song";
import { styles } from "./styles";

export const CardTrending:FC = () => {

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