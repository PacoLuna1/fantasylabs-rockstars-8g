import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../app/hooks';
import { albumSelector } from '../../../feature/labSlice';
import { AppDispatch } from '../../../app/store';
import { getAlbums } from '../../../services/album';

export const Album:FC = ()=> {
  const dispatch: AppDispatch = useDispatch();

  const albums = useAppSelector(albumSelector);

  useEffect(() =>{
    dispatch(getAlbums())
  }, [dispatch]);

  return (
    <>
      {albums !== undefined ? (
        <div>
          {albums.map((album, index) => (
              <p key={`${album.id}-${index}`}>{album.name}</p>
          ))}
        </div>
      ): null}
    </>
  );
}

// import {
//   Box,
//   Button,
//   Paper,
//   TableCell,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { FC, useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { useAppSelector } from "../../../app/hooks";
// import TableCRUD from "../../../components/tables/component";
// import { deleteAlbum, getAlbums } from "../../../services/genre";
// import { Formik } from "formik";
// import { styles } from "./styles";
// import {
//   fillAddGenre,
//   initialValuesUpdate,
//   initialValuesCreate,
//   validationSchemaCreate,
//   validationSchemaUpdate,
//   fillUpdateGenre,
// } from "./form";

// import { UpdateAlbumDTO } from "./types" 
// import { albumSelector } from "../../../feature/labSlice";
// import { AppDispatch } from "../../../app/store";

// export const AdminAlbum:FC = () => {
//   const [editIndex, setEditIndex] = useState<number | undefined>(undefined);
//   const dispatch:AppDispatch = useDispatch();

//   const albums = useAppSelector(albumSelector);

//   useEffect(() => {
//     dispatch(getAlbums());
//   }, [dispatch]);

//   const passToUpdate = (values: UpdateAlbumDTO) => {
//     if (editIndex !== undefined)
//       fillUpdateGenre(values, {
//         id: albums[editIndex].id,
//         index: editIndex,
//       });
//   };

//   return (
//     <Box sx={styles.fullGenreContainer}>
//       <Typography variant="h2" sx={styles.title}>
//         Administrador de géneros.
//       </Typography>{" "}
//       <Box sx={styles.genreContainer}>
//         <TableCRUD
//           rowsPerPageOptions={[5, 10, 15]}
//           data={albums}
//           columnsNames={["Id", "Nombre", "Acciones"]}
//           title="Géneros"
//           row={(item, index) => (
//             <TableRow key={`${item.id}-${index}`}>
//               <TableCell sx={styles.genreId}>{item.id}</TableCell>
//               <TableCell sx={styles.genreField}>{item.name}</TableCell>
//               <TableCell sx={styles.genreActions}>
//                 <Button
//                   variant="contained"
//                   color="error"
//                   onClick={() => dispatch(deleteAlbum(item.id, index))}
//                 >
//                   Eliminar
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="warning"
//                   onClick={() => setEditIndex(index)}
//                 >
//                   Editar
//                 </Button>
//               </TableCell>
//             </TableRow>
//           )}
//         />
//         <Box sx={styles.formGroup}>
//           <Box>
//             <Typography variant="h5" sx={styles.title}>
//               Crear un nuevo Album.
//             </Typography>
//             <Formik
//               initialValues={initialValuesCreate}
//               onSubmit={fillAddGenre}
//               validationSchema={validationSchemaCreate}
//             >
//               {({ handleSubmit, handleChange, values, errors }) => (
//                 <form onSubmit={handleSubmit}>
//                   <Paper elevation={6} sx={styles.formContainer}>
//                     <TextField
//                       label="Nombre"
//                       error={Boolean(errors.description)}
//                       name="description"
//                       value={values.description}
//                       onChange={handleChange}
//                       helperText={errors.description}
//                     />
//                     <Button
//                       sx={styles.formButton}
//                       variant="contained"
//                       color="success"
//                       type="submit"
//                     >
//                       Crear
//                     </Button>
//                   </Paper>
//                 </form>
//               )}
//             </Formik>
//           </Box>
//           {editIndex !== undefined && (
//             <Box>
//               <Formik
//                 initialValues={initialValuesUpdate}
//                 onSubmit={passToUpdate}
//                 validationSchema={validationSchemaUpdate}
//               >
//                 {({ handleSubmit, handleChange, values, errors }) => (
//                   <form onSubmit={handleSubmit}>
//                     <Paper elevation={6} sx={styles.formContainer}>
//                       <TextField
//                         label="Nombre"
//                         error={Boolean(errors.description)}
//                         name="description"
//                         value={values.description}
//                         onChange={handleChange}
//                         helperText={errors.description}
//                       />
//                       <Button
//                         sx={styles.formButton}
//                         variant="contained"
//                         color="warning"
//                         type="submit"
//                       >
//                         Editar
//                       </Button>
//                     </Paper>
//                   </form>
//                 )}
//               </Formik>
//             </Box>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };