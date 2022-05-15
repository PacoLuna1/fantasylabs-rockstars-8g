import { Box, Card, IconButton, Paper, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { styles } from "./styles";
import { BsBox } from "react-icons/bs";
import { useAppSelector } from "../../app/hooks";
import { albumSelector } from "../../feature/labSlice";
import { AppDispatch } from "../../app/store";
import { useDispatch } from "react-redux";
import { getAlbums } from "../../services/album";

export const CardCarousel:FC = () => {
  const dispatch:AppDispatch = useDispatch() 
  const albums = useAppSelector(albumSelector)

  useEffect(()=>{
    dispatch(getAlbums())
  }, [dispatch])

  return(
    <Paper sx={styles.container} elevation={4}>
      <Typography sx={styles.title}>
        Trending albums
      </Typography>
      <Box component="div" sx={styles.carouselContainer}>
        {albums !== undefined ?
          <>
            {albums.map((album)=>(
              <Card sx={styles.smallCard} key={`${album.id}-container`}>
                <Box
                component="img"
                src={`data:image/jpeg;base64,/9j/${album.image}`} 
                sx={styles.cardImage}/>
                <Box component="div" sx={styles.info}>
                  <Typography sx={styles.infoTitle} key={`${album.id}-${album.name}`} variant="h5">
                    {album.name}
                  </Typography>
                    {album.singer.map((singer,index)=>(
                      <Typography sx={styles.infoSubtitle} key={`${singer.id}-${index}`}>{singer.name}</Typography>
                    ))}
                  <Typography sx={styles.infoExtra} key={`${album.id}-${album.stock}`}>
                    <IconButton sx={styles.infoExtraIcon} >
                      <BsBox />
                    </IconButton>
                    Stock {album.stock}
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