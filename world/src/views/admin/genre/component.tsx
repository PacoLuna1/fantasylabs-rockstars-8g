import {
  Box,
  Button,
  Paper,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../app/hooks";
import TableCRUD from "../../../components/tables/component";
import { deleteGenre, getGenres } from "../../../services/genre";
import { Formik } from "formik";
import { styles } from "./styles";
import {
  fillAddGenre,
  initialValuesUpdate,
  initialValuesCreate,
  validationSchemaCreate,
  validationSchemaUpdate,
  fillUpdateGenre,
} from "./form";

import { UpdateGenreDTO } from "./types" 
import { genreSelector } from "../../../feature/labSlice";
import { AppDispatch } from "../../../app/store";

export const AdminGenre:FC = () => {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
  const dispatch:AppDispatch = useDispatch();

  const genres = useAppSelector(genreSelector);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  const passToUpdate = (values: UpdateGenreDTO) => {
    if (editIndex !== undefined)
      fillUpdateGenre(values, {
        id: genres[editIndex].id,
        index: editIndex,
      });
  };

  return (
    <Box sx={styles.fullGenreContainer}>
      <Typography variant="h2" sx={styles.title}>
        Administrador de géneros.
      </Typography>{" "}
      <Box sx={styles.genreContainer}>
        <TableCRUD
          rowsPerPageOptions={[5, 10, 15]}
          data={genres}
          columnsNames={["Id", "Nombre", "Acciones"]}
          title="Géneros"
          row={(item, index) => (
            <TableRow key={`${item.id}-${index}`}>
              <TableCell sx={styles.genreId}>{item.id}</TableCell>
              <TableCell sx={styles.genreField}>{item.description}</TableCell>
              <TableCell sx={styles.genreActions}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(deleteGenre(item.id, index))}
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
              Crear un nuevo genero.
            </Typography>
            <Formik
              initialValues={initialValuesCreate}
              onSubmit={fillAddGenre}
              validationSchema={validationSchemaCreate}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Paper elevation={6} sx={styles.formContainer}>
                    <TextField
                      label="Nombre"
                      error={Boolean(errors.description)}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                      helperText={errors.description}
                    />
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
                        error={Boolean(errors.description)}
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        helperText={errors.description}
                      />
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