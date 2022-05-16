import * as Yup from "yup";
import { store } from "../../../app/store";
import { createGenre, updateGenre } from "../../../services/genre";
import { CreateGenreDTO, GenrePosition, UpdateGenreDTO } from "./types";

export const validationSchemaCreate: Yup.SchemaOf<CreateGenreDTO> = Yup.object({
  description: Yup.string()
    .min(3, "Tienes que escribir al menos 3 caracteres")
    .max(10, "Tienes que escribir menos de 10 caracteres")
    .required("El nombre del genero es requerido"),
});

export const validationSchemaUpdate: Yup.SchemaOf<UpdateGenreDTO> = Yup.object({
  description: Yup.string()
    .min(3, "Tienes que escribir al menos 3 caracteres")
    .max(10, "Tienes que escribir menos de 10 caracteres")
    .required("El nombre del genero a actualizar es requerido"),
});

export const initialValuesCreate: CreateGenreDTO = {
  description: "",
};
export const initialValuesUpdate: UpdateGenreDTO = {
  description: ""
};

export const fillAddGenre = (values: CreateGenreDTO) => {
  store.dispatch(createGenre(values));
};

export const fillUpdateGenre = (
  values: UpdateGenreDTO,
  genrePosition: GenrePosition
) => {
  store.dispatch(updateGenre(values, genrePosition));
};