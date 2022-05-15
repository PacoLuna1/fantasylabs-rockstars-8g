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
import { Formik } from "formik";
import { styles } from "./styles";
import {
  fillAddSinger,
  initialValuesUpdate,
  initialValuesCreate,
  validationSchemaCreate,
  validationSchemaUpdate,
  fillUpdateSinger,
} from "./form";

import { UpdateSingerDTO } from "./types" 
import { singerSelector } from "../../../feature/labSlice";
import { AppDispatch } from "../../../app/store";
import { deleteSinger, getSingers } from "../../../services/singer";

export const AdminSinger:FC = () => {
  const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
  const dispatch:AppDispatch = useDispatch();

  const singers = useAppSelector(singerSelector);

  useEffect(() => {
    dispatch(getSingers());
  }, [dispatch]);

  const passToUpdate = (values: UpdateSingerDTO) => {
    if (editIndex !== undefined)
      fillUpdateSinger(values, {
        id: singers[editIndex].id,
        index: editIndex,
      });
  };

  return (
    <Box sx={styles.fullSingerContainer}>
      <Typography variant="h2" sx={styles.title}>
        Administrador de cantantes.
      </Typography>{" "}
      <Box sx={styles.singerContainer}>
        <TableCRUD
          rowsPerPageOptions={[5, 10, 15]}
          data={singers}
          columnsNames={["Id","Nombre artistico", "Nombre", "Apellidos", "Nacionalidad", "Imagen", "Acciones"]}
          title="Cantantes"
          row={(item, index) => (
            <TableRow key={`${item.id}-${index}`}>
              <TableCell sx={styles.singerId}>{item.id}</TableCell>
              <TableCell sx={styles.singerField}>{item.stage_name}</TableCell>
              <TableCell sx={styles.singerField}>{item.name}</TableCell>
              <TableCell sx={styles.singerField}>{item.last_name}</TableCell>
              <TableCell sx={styles.singerField}>{item.nationality}</TableCell>
              <TableCell sx={styles.singerField}>{item.image}</TableCell>
              <TableCell sx={styles.singerActions}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => dispatch(deleteSinger(item.id, index))}
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
              Crear un nuevo cantante.
            </Typography>
            <Formik
              initialValues={initialValuesCreate}
              onSubmit={fillAddSinger}
              validationSchema={validationSchemaCreate}
            >
              {({ handleSubmit, handleChange, values, errors }) => (
                <form onSubmit={handleSubmit}>
                  <Paper elevation={6} sx={styles.formContainer}>
                    <TextField
                      label="Nombre artistico"
                      error={Boolean(errors.stage_name)}
                      name="stage_name"
                      value={values.stage_name}
                      onChange={handleChange}
                      helperText={errors.stage_name}
                    />
                    <TextField
                      label="Nombre"
                      error={Boolean(errors.name)}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      helperText={errors.name}
                    />
                    <TextField
                      label="Apellidos"
                      error={Boolean(errors.last_name)}
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      helperText={errors.last_name}
                    />
                    <TextField
                      label="Nacionalidad"
                      error={Boolean(errors.nationality)}
                      name="nationality"
                      value={values.nationality}
                      onChange={handleChange}
                      helperText={errors.nationality}
                    />
                    <TextField
                      label="Imagen"
                      error={Boolean(errors.image)}
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      helperText={errors.image}
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
              <Typography variant="h5" sx={styles.title}>
                Editar cantante.
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
                      label="Nombre artistico"
                      error={Boolean(errors.stage_name)}
                      name="stage_name"
                      value={values.stage_name}
                      onChange={handleChange}
                      helperText={errors.stage_name}
                    />
                    <TextField
                      label="Nombre"
                      error={Boolean(errors.name)}
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      helperText={errors.name}
                    />
                    <TextField
                      label="Apellidos"
                      error={Boolean(errors.last_name)}
                      name="last_name"
                      value={values.last_name}
                      onChange={handleChange}
                      helperText={errors.last_name}
                    />
                    <TextField
                      label="Nacionalidad"
                      error={Boolean(errors.nationality)}
                      name="nationality"
                      value={values.nationality}
                      onChange={handleChange}
                      helperText={errors.nationality}
                    />
                    <TextField
                      label="Imagen"
                      error={Boolean(errors.image)}
                      name="image"
                      value={values.image}
                      onChange={handleChange}
                      helperText={errors.image}
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