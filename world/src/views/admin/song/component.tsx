import {
  Box,
  Button,
  MenuItem,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import TableCRUD from "../../../components/tables/component";
import { deleteSong } from "../../../services/song";
import { Formik } from "formik";
import Select from '@mui/material/Select';
import { styles } from "./styles";
import {
  fillAddSong,
  initialValuesUpdate,
  initialValuesCreate,
  validationSchemaCreate,
  validationSchemaUpdate,
  fillUpdateSong,
} from "./form";

import { UpdateSongFormik } from "./types" 
import { albumSelector, songSelector, singerSelector } from "../../../feature/labSlice";
import { AppDispatch } from "../../../app/store";
import { getSongs } from "../../../services/song";
import { getSingers } from "../../../services/singer";
import { getAlbums } from '../../../services/album';

export const AdminSong:FC = () => {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  const dispatch:AppDispatch = useDispatch();

  const albums = useAppSelector(albumSelector);
  const songs = useAppSelector(songSelector);
  const singers = useAppSelector(singerSelector);

  useEffect(() => {
    dispatch(getAlbums());
    dispatch(getSongs());
    dispatch(getSingers());
  }, [dispatch]);

  const passToUpdate = (values: UpdateSongFormik) => {
    if (editIndex !== undefined)
      fillUpdateSong(values, {
        id: songs[editIndex].id,
        index: editIndex,
      });
  };

  return (
    <Box sx={styles.fullSongContainer}>
      <Typography variant="h2" sx={styles.title}>
        Administrador de canciones.
      </Typography>
      <Box sx={styles.songContainer}>
        <TableCRUD
          rowsPerPageOptions={[5, 10, 15]}
          data={songs}
          columnsNames={["Id", "Nombre", "Lanzamiento","Duracion", "Cancion completa", "Previsualizacion", "Precio", "Albums", "Cantantes", "Acciones"]}
          title="Canciones"
          row={(item, index) => (
            <TableRow key={`${item.id}-${index}`}>
              <TableCell sx={styles.songId}>{item.id}</TableCell>
              <TableCell sx={styles.songField}>{item.name}</TableCell>
              <TableCell sx={styles.songField}>{item.release_date?.toString()}</TableCell>
              <TableCell sx={styles.songField}>{item.duration}</TableCell>
              <TableCell sx={styles.songField}>{item.complete_file}</TableCell>
              <TableCell sx={styles.songField}>{item.preview_file}</TableCell>
              <TableCell sx={styles.songField}>{item.price}</TableCell>
              <TableCell sx={styles.songField}>{item.album.map((album)=>(
                album.name + ","
              ))}</TableCell>
              <TableCell sx={styles.songField}>{item.singer.map((singer)=>(
                singer.name + ","
              ))}</TableCell>
              <TableCell sx={styles.songActions}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(deleteSong(item.id, index))}
                >
                  Eliminar
                </Button>
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => setEditIndex(index)}
                >
                  Editar
                </Button>
              </TableCell>
            </TableRow>
          )}
        />
        <Box sx={styles.formGroup}>
          <Box>
            <Typography variant="h5" sx={styles.title}>
              Crear una nueva cancion.
            </Typography>
            <Formik
              initialValues={initialValuesCreate}
              onSubmit={fillAddSong}
              validationSchema={validationSchemaCreate}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Paper elevation={6} sx={styles.formContainer}>
                    <TextField
                      label="Nombre"
                      error={Boolean(errors.name)}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      helperText={errors.name}
                    />
                    <TextField
                      label="Fecha de lanzamiento"
                      error={Boolean(errors.release_date)}
                      type="date"
                      name="release_date"
                      value={values.release_date}
                      onChange={handleChange}
                    />
                    <TextField
                      label="Duracion"
                      error={Boolean(errors.duration)}
                      name="duration"
                      value={values.duration}
                      onChange={handleChange}
                      helperText={errors.duration}
                    />
                    <TextField
                      label="Cancion completa"
                      error={Boolean(errors.complete_file)}
                      name="complete_file"
                      value={values.complete_file}
                      onChange={handleChange}
                      helperText={errors.complete_file}
                    />
                    <TextField
                      label="Previsualizacion"
                      error={Boolean(errors.preview_file)}
                      name="preview_file"
                      value={values.preview_file}
                      onChange={handleChange}
                      helperText={errors.preview_file}
                    />
                    <TextField
                      label="Precio"
                      type="number"
                      error={Boolean(errors.price)}
                      name="price"
                      value={values.price}
                      onChange={handleChange}
                      helperText={errors.price}
                    />
                    {albums !== undefined ? 
                        <Select
                          label="Album"
                          name="albumID"
                          multiple
                          error={Boolean(errors.albumID)}
                          value={values.albumID}
                          onChange={handleChange}
                        >
                        <MenuItem key={``} value={``}>Ninguno</MenuItem>
                        {albums?.map((album, index)=>(
                          <MenuItem key={`${album.id}-${index}`} value={JSON.stringify(album)}>{album.name}</MenuItem>
                        ))}
                      </Select>
                    : null}
                    {errors.albumID && <div className="input-feedback">{errors.albumID}</div>}
                    {singers !== undefined ? 
                      <Select
                        label="Cantante"
                        name="singerID"
                        multiple
                        error={Boolean(errors.singerID)}
                        value={values.singerID}
                        onChange={handleChange}
                      >
                        <MenuItem key={``} value={``}>Ninguno</MenuItem>
                        {singers?.map((singer, index)=>(
                          <MenuItem key={`${singer.id}-${index}`} value={JSON.stringify(singer)} id={singer.id}>{singer.name}</MenuItem>
                        ))}
                      </Select>
                    : null}
                    {errors.singerID && <div className="input-feedback">{errors.singerID}</div>}
                    <Button
                      sx={styles.formButton}
                      variant="contained"
                      color="success"
                      type="submit"
                    >
                      Crear
                    </Button>
                  </Paper>
                </form>
              )}
            </Formik>
          </Box>
          {editIndex !== undefined && (
            <Box>
              <Typography variant="h5" sx={styles.title}>
                Actualizar un Album.
              </Typography>
              <Formik
                initialValues={initialValuesUpdate}
                onSubmit={passToUpdate}
                validationSchema={validationSchemaUpdate}
              >
                {({ handleSubmit, handleChange, values, errors }) => (
                  <form onSubmit={handleSubmit}>
                    <Paper elevation={6} sx={styles.formContainer}>
                      <TextField
                        label="Nombre"
                        error={Boolean(errors.name)}
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        helperText={errors.name}
                      />
                      <TextField
                        label="Fecha de lanzamiento"
                        error={Boolean(errors.release_date)}
                        type="date"
                        name="release_date"
                        value={values.release_date}
                        onChange={handleChange}
                      />
                      <TextField
                        label="Duracion"
                        error={Boolean(errors.duration)}
                        name="duration"
                        value={values.duration}
                        onChange={handleChange}
                        helperText={errors.duration}
                      />
                      <TextField
                        label="Cancion completa"
                        error={Boolean(errors.complete_file)}
                        name="complete_file"
                        value={values.complete_file}
                        onChange={handleChange}
                        helperText={errors.complete_file}
                      />
                      <TextField
                        label="Previsualizacion"
                        error={Boolean(errors.preview_file)}
                        name="preview_file"
                        value={values.preview_file}
                        onChange={handleChange}
                        helperText={errors.preview_file}
                      />
                      <TextField
                        label="Precio"
                        type="number"
                        error={Boolean(errors.price)}
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        helperText={errors.price}
                      />
                      {albums !== undefined ? 
                          <Select
                            label="Album"
                            name="albumID"
                            multiple
                            error={Boolean(errors.albumID)}
                            value={values.albumID}
                            onChange={handleChange}
                          >
                          <MenuItem key={``} value={``}>Ninguno</MenuItem>
                          {albums?.map((album, index)=>(
                            <MenuItem key={`${album.id}-${index}`} value={JSON.stringify(album)}>{album.name}</MenuItem>
                          ))}
                        </Select>
                      : null}
                      {errors.albumID && <div className="input-feedback">{errors.albumID}</div>}
                      {singers !== undefined ? 
                        <Select
                          label="Cantante"
                          name="singerID"
                          multiple
                          error={Boolean(errors.singerID)}
                          value={values.singerID}
                          onChange={handleChange}
                        >
                          <MenuItem key={``} value={``}>Ninguno</MenuItem>
                          {singers?.map((singer, index)=>(
                            <MenuItem key={`${singer.id}-${index}`} value={JSON.stringify(singer)} id={singer.id}>{singer.name}</MenuItem>
                          ))}
                        </Select>
                      : null}
                      {errors.singerID && <div className="input-feedback">{errors.singerID}</div>}
                      <Button
                        sx={styles.formButton}
                        variant="contained"
                        color="warning"
                        type="submit"
                      >
                        Editar
                      </Button>
                    </Paper>
                  </form>
                )}
              </Formik>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};