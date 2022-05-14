import * as Yup from "yup";
import { store } from "../../../app/store";
import { createSinger, updateSinger } from "../../../services/singer";
import { CreateSingerDTO, SingerPosition, UpdateSingerDTO } from "./types";

export const validationSchemaCreate: Yup.SchemaOf<CreateSingerDTO> = Yup.object({
  stage_name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El nombre artistico del cantante a actualizar es requerido"),
  name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El nombre del cantante a actualizar es requerido"),
  last_name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El apellido del cantante a actualizar es requerido"),
  nationality: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("La nacionalidad del cantante a actualizar es requerido"),
  image: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .required("La imagen del cantante a actualizar es requerido"),
});

export const validationSchemaUpdate: Yup.SchemaOf<UpdateSingerDTO> = Yup.object({
  stage_name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El nombre artistico del cantante a actualizar es requerido"),
  name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El nombre del cantante a actualizar es requerido"),
  last_name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El apellido del cantante a actualizar es requerido"),
  nationality: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("La nacionalidad del cantante a actualizar es requerido"),
  image: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .required("La imagen del cantante a actualizar es requerido"),
});

export const initialValuesCreate: CreateSingerDTO = {
  stage_name: "",
  name: "",
  last_name: "",
  nationality: "",
  image: ""
};
export const initialValuesUpdate: UpdateSingerDTO = {
  stage_name: "",
  name: "",
  last_name: "",
  nationality: "",
  image: ""
};

export const fillAddSinger = (values: CreateSingerDTO) => {
  store.dispatch(createSinger(values));
};

export const fillUpdateSinger = (
  values: UpdateSingerDTO,
  singerPosition: SingerPosition
) => {
  store.dispatch(updateSinger(values, singerPosition));
};