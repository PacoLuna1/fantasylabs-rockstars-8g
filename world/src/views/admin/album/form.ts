import * as Yup from "yup";
import { store } from "../../../app/store";
import { createAlbum, updateAlbum } from "../../../services/album";
import { CreateAlbumDTO, AlbumPosition, UpdateAlbumDTO } from "./types";

// export const validationSchemaCreate: Yup.SchemaOf<CreateAlbumDTO> = Yup.object({
//   name: Yup.string()
//     .min(3, "Tienes que escribir al menos 3 caracteres")
//     .max(10, "Tienes que escribir menos de 10 caracteres")
//     .required("El nombre del genero es requerido"),
// });

// export const validationSchemaUpdate: Yup.SchemaOf<UpdateAlbumDTO> = Yup.object({
//   name: Yup.string()
//   .min(3, "Tienes que escribir al menos 3 caracteres")
//   .max(20, "Tienes que escribir menos de 10 caracteres")
//   .required("El nombre del album a actualizar es requerido"),
//   releaseDate: Yup.date(),
//   price: Yup.number()
//   .min(0, "El precio minimo es 0")
//   .required("El precio del album a actualizar es requerido"),
//   stock: Yup.number()
//   .min(0, "La cantidad minima son 0")
//   .required("El nombre del album a actualizar es requerido"),
//   image: Yup.string()
//   .min(3, "Tienes que escribir al menos 3 caracteres")
//   .required("La imagen del album a actualizar es requerido"),
// });

export const initialValuesCreate: CreateAlbumDTO = {
  name: "",
  releaseDate: new Date("2000-01-01"),
  price: 0,
  stock: 0,
  image: "",
  genre: {
    id: "",
    description: ""
  },
  singer: {
    id: "",
    stage_name: "",
    name: "",
    last_name: "",
    nationality: "",
    image: ""
  },
};
export const initialValuesUpdate: UpdateAlbumDTO = {
  name: "",
  releaseDate: new Date("2000-01-01"),
  price: 0,
  stock: 0,
  image: "",
  genre: {
    id: "",
    description: ""
  },
  singer: {
    id: "",
    stage_name: "",
    name: "",
    last_name: "",
    nationality: "",
    image: ""
  },
};

export const fillAddAlbum = (values: CreateAlbumDTO) => {
  store.dispatch(createAlbum(values));
};

export const fillUpdateAlbum = (
  values: UpdateAlbumDTO,
  albumPosition: AlbumPosition
) => {
  store.dispatch(updateAlbum(values, albumPosition));
};
