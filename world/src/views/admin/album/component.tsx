import {
  Box,
  Button,
  MenuItem,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
  SelectChangeEvent
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import TableCRUD from "../../../components/tables/component";
import { deleteAlbum, getAlbums } from "../../../services/album";
import { Formik } from "formik";
import Select from '@mui/material/Select';
import { styles } from "./styles";
import {
  fillAddAlbum,
  initialValuesUpdate,
  initialValuesCreate,
  validationSchemaCreate,
  validationSchemaUpdate,
  fillUpdateAlbum,
} from "./form";

import { UpdateAlbumDTO, UpdateAlbumFormik } from "./types" 
import { albumSelector, genreSelector, singerSelector } from "../../../feature/labSlice";
import { AppDispatch } from "../../../app/store";
import { getGenres } from "../../../services/genre";
import { getSingers } from "../../../services/singer";

export const AdminAlbum:FC = () => {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);

  const dispatch:AppDispatch = useDispatch();

  const albums = useAppSelector(albumSelector);
  const genres = useAppSelector(genreSelector);
  const singers = useAppSelector(singerSelector);

  useEffect(() => {
    dispatch(getAlbums());
    dispatch(getGenres());
    dispatch(getSingers());
  }, [dispatch]);

  const passToUpdate = (values: UpdateAlbumFormik) => {
    if (editIndex !== undefined)
      fillUpdateAlbum(values, {
        id: albums[editIndex].id,
        index: editIndex,
      });
  };

  return (
    <Box sx={styles.fullGenreContainer}>
      <Typography variant="h2" sx={styles.title}>
        Administrador de albums.
      </Typography>{" "}
      <Box sx={styles.genreContainer}>
        <TableCRUD
          rowsPerPageOptions={[5, 10, 15]}
          data={albums}
          columnsNames={["Id", "Nombre", "Lanzamiento", "Precio", "Existencia", "Imagen", "Genero", "Cantantes", "Acciones"]}
          title="Albums"
          row={(item, index) => (
            <TableRow key={`${item.id}-${index}`}>
              <TableCell sx={styles.genreId}>{item.id}</TableCell>
              <TableCell sx={styles.genreField}>{item.name}</TableCell>
              <TableCell sx={styles.genreField}>{item.release_date?.toString()}</TableCell>
              <TableCell sx={styles.genreField}>{item.price}</TableCell>
              <TableCell sx={styles.genreField}>{item.stock}</TableCell>
              <TableCell sx={styles.genreField}>
                <Box
                component="img"
                src={`data:image/jpeg;base64,/9j/${item.image}`} 
                sx={{width: "50px"}}/>
              </TableCell>
              <TableCell sx={styles.genreField}>{item.genre.description}</TableCell>
              <TableCell sx={styles.genreField}>{item.singer.map((singer)=>(
                singer.name + ","
              ))}</TableCell>
              <TableCell sx={styles.genreActions}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(deleteAlbum(item.id, index))}
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
              Crear un nuevo Album.
            </Typography>
            <Formik
              initialValues={initialValuesCreate}
              onSubmit={fillAddAlbum}
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
                      name="release_date"
                      value={values.release_date}
                      onChange={handleChange}
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
                    <TextField
                      label="Existencia"
                      type="number"
                      error={Boolean(errors.stock)}
                      name="stock"
                      value={values.stock}
                      onChange={handleChange}
                      helperText={errors.stock}
                    />
                    <TextField
                      label="Imagen"
                      error={Boolean(errors.image)}
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      helperText={errors.image}
                    />
                    {genres !== undefined ? 
                        <TextField
                          label="Genero"
                          name="genreID"
                          select
                          error={Boolean(errors.genreID)}
                          value={values.genreID}
                          onChange={handleChange}
                        >
                        {genres?.map((genre, index)=>(
                          <MenuItem key={`${genre.id}-${index}`} value={JSON.stringify(genre)}>{genre.description}</MenuItem>
                        ))}
                      </TextField>
                    : null}
                    {errors.genreID && <div className="input-feedback">{errors.genreID}</div>}
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
                        name="releaseDate"
                        value={values.release_date}
                        onChange={handleChange}
                        type="date"
                        defaultValue="2000-01-01"
                        sx={{ width: 220 }}
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
                      <TextField
                        label="Existencia"
                        type="number"
                        error={Boolean(errors.stock)}
                        name="stock"
                        value={values.stock}
                        onChange={handleChange}
                        helperText={errors.stock}
                      />
                      <TextField
                        label="Imagen"
                        error={Boolean(errors.image)}
                        name="image"
                        value={values.image}
                        onChange={handleChange}
                        helperText={errors.image}
                      />
                      {/* {genres !== undefined ? 
                          <Select
                            label="Genero"
                            name="genre"
                            value={`${values.genre ? values.genre : " " }`}
                            onChange={handleChange}
                          >
                          {genres?.map((genre, index)=>(
                              <MenuItem key={`${genre.id}-${index}`} value={genre.id} id={genre.id}>{genre.description}</MenuItem>
                          ))}
                        </Select>
                      : null} */}
                      {/* {singers !== undefined ? 
                        <Select
                          label="Cantante"
                          multiple
                          value={values.singer ? values.singer : [" "]}
                          onChange={handleChange}
                        >
                          {singers?.map((singer, index)=>(
                            <MenuItem key={`${singer.id}-${index}`} value={singer.id} id={singer.id}>{singer.name}</MenuItem>
                          ))}
                        </Select>
                      : null} */}
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