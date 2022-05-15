import * as Yup from "yup";
import { store } from "../../../app/store";
import { createAlbum, updateAlbum } from "../../../services/album";
import { AlbumPosition, UpdateAlbumDTO, CreateAlbumDTO ,CreateAlbumFormik, UpdateAlbumFormik } from "./types";

export const validationSchemaCreate: Yup.SchemaOf<CreateAlbumFormik> = Yup.object({
  name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El nombre del album a crear es requerido"),
  release_date: Yup.string()
  .required("La fecha de lanzamiento del album a crear es requerido"),
  price: Yup.number()
  .min(0, "El precio minimo es 0")
  .required("El precio del album a crear es requerido"),
  stock: Yup.number()
  .min(0, "La cantidad minima son 0")
  .required("El nombre del album a crear es requerido"),
  image: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .required("La imagen del album a crear es requerido"),
  genreID: Yup.string()
  .required("El id del genero del album a crear es requerido"),
  singerID: Yup.array().of(Yup.string().required())
  .required("El id del cantante(s) del album a crear es requerido"),
});

export const validationSchemaUpdate: Yup.SchemaOf<UpdateAlbumFormik> = Yup.object({
  name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El nombre del album a actualizar es requerido"),
  release_date: Yup.string()
  .required("La fecha de lanzamiento del album a actualizar es requerido"),
  price: Yup.number()
  .min(0, "El precio minimo es 0")
  .required("El precio del album a actualizar es requerido"),
  stock: Yup.number()
  .min(0, "La cantidad minima son 0")
  .required("El nombre del album a actualizar es requerido"),
  image: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .required("La imagen del album a actualizar es requerido"),
  genreID: Yup.string()
  .required("La imagen del album a actualizar es requerido"),
  singerID: Yup.array().of(Yup.string().required())
  .required("La imagen del album a actualizar es requerido"),
});

export const initialValuesCreate: CreateAlbumFormik = {
  name: "",
  release_date: "",
  price: 0,
  stock: 0,
  image: "",
  genreID: "",
  singerID: [""],
};

export const initialValues: CreateAlbumDTO = {
  name: "",
  release_date: "",
  price: 0,
  stock: 0,
  image: "",
  genre: {
    id: "",
    description: ""
  },
  singer: [{
    id: "",
    stage_name: "",
    name: "",
    last_name: "",
    nationality: "",
    image: ""
  }],
};

export const initialValuesUpdate: UpdateAlbumFormik = {
  name: "",
  release_date: "",
  price: 0,
  stock: 0,
  image: "",
  genreID: "",
  singerID: [""],
};

export const fillAddAlbum = (values: CreateAlbumFormik) => {
  const albumData:CreateAlbumDTO = initialValues;
  const album = fillAlbum(values, albumData);
  store.dispatch(createAlbum(album));
};

export const fillAlbum = (values: CreateAlbumFormik, albumData: CreateAlbumDTO) =>{
  Object.keys(values).forEach(key => {
    switch(key){
     case "singerID":
      albumData.singer = values[key].map((value: any)=>(JSON.parse(value)));
      break;
     case "genreID":
      albumData.genre = JSON.parse(values[key])
      break;
     case "name":
      albumData.name = values[key]
      break;
     case "release_date":
      albumData.release_date = values[key]
      break;
     case "price":
      albumData.price = values[key]
      break;
     case "stock":
      albumData.stock = values[key]
      break;
     case "image":
      albumData.image = values[key]
      break;
    }
 });
 return albumData;
}

export const fillUpdateAlbum = (
  values: UpdateAlbumFormik,
  albumPosition: AlbumPosition
) => {
  const albumData:CreateAlbumDTO = initialValues;
  const album = fillAlbum(values, albumData);
  store.dispatch(updateAlbum(album, albumPosition));
};
