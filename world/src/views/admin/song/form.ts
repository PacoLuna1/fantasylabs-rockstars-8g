import * as Yup from "yup";
import { store } from "../../../app/store";
import { createSong, updateSong } from "../../../services/song";
import { SongPosition, CreateSongFormik, UpdateSongFormik, CreateSongDTO } from "./types";

export const validationSchemaCreate: Yup.SchemaOf<CreateSongFormik> = Yup.object({
  name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El nombre del album a actualizar es requerido"),
  release_date: Yup.string()
  .required("La fecha de lanzamiento del album a actualizar es requerido"),
  duration: Yup.string()
  .min(0, "La cantidad minima son 0")
  .required("El nombre del album a actualizar es requerido"),
  complete_file: Yup.string()
  .min(0, "La cantidad minima son 0")
  .required("El nombre del album a actualizar es requerido"),
  preview_file: Yup.string()
  .min(0, "La cantidad minima son 0")
  .required("El nombre del album a actualizar es requerido"),
  price: Yup.number()
  .min(0, "El precio minimo es 0")
  .required("El precio del album a actualizar es requerido"),
  albumID: Yup.array().of(Yup.string().required())
  .required("La imagen del album a actualizar es requerido"),
  singerID: Yup.array().of(Yup.string().required())
  .required("La imagen del album a actualizar es requerido"),
});

export const validationSchemaUpdate: Yup.SchemaOf<UpdateSongFormik> = Yup.object({
  name: Yup.string()
  .min(3, "Tienes que escribir al menos 3 caracteres")
  .max(20, "Tienes que escribir menos de 10 caracteres")
  .required("El nombre del album a actualizar es requerido"),
  release_date: Yup.string()
  .required("La fecha de lanzamiento del album a actualizar es requerido"),
  duration: Yup.string()
  .min(0, "La cantidad minima son 0")
  .required("El nombre del album a actualizar es requerido"),
  complete_file: Yup.string()
  .min(0, "La cantidad minima son 0")
  .required("El nombre del album a actualizar es requerido"),
  preview_file: Yup.string()
  .min(0, "La cantidad minima son 0")
  .required("El nombre del album a actualizar es requerido"),
  price: Yup.number()
  .min(0, "El precio minimo es 0")
  .required("El precio del album a actualizar es requerido"),
  albumID: Yup.array().of(Yup.string().required())
  .required("La imagen del album a actualizar es requerido"),
  singerID: Yup.array().of(Yup.string().required())
  .required("La imagen del album a actualizar es requerido"),
});

export const initialValuesCreate: CreateSongFormik = {
  name: "",
  release_date: "",
  duration: "",
  complete_file: "",
  preview_file: "",
  price: 0,
  albumID: [""],
  singerID: [""]
};

export const initialValues: CreateSongDTO = {
  name: "",
  release_date: "",
  duration: "",
  complete_file: "",
  preview_file: "",
  price: 0,
  album: [{
    id: "",
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
    }]
  }],
  singer: [{
    id: "",
    stage_name: "",
    name: "",
    last_name: "",
    nationality: "",
    image: ""
  }],
};

export const initialValuesUpdate: UpdateSongFormik = {
  name: "",
  release_date: "",
  duration: "",
  complete_file: "",
  preview_file: "",
  price: 0,
  albumID: [""],
  singerID: [""]
};

export const fillAddSong = (values: CreateSongFormik) => {
  const songData:CreateSongDTO = initialValues;
  const song = fillSong(values, songData);
  store.dispatch(createSong(song));
};

export const fillSong = (values: CreateSongFormik, songData: CreateSongDTO) =>{
  Object.keys(values).forEach(key => {
    switch(key){
      case "singerID":
        songData.singer = values[key].map((value: any)=>(JSON.parse(value)));
        break;
      case "albumID":
        songData.album = values[key].map((value: any)=>(JSON.parse(value)));
        break;
      case "name":
        songData.name = values[key];
        break;
      case "release_date":
        songData.release_date = values[key];
        break;
      case "duration":
        songData.duration = values[key];
        break;
      case "complete_file":
        songData.complete_file = values[key];
        break;
      case "preview_file":
        songData.preview_file = values[key];
        break;
      case "price":
        songData.price = values[key];
        break;
    }
 });
 return songData;
}

export const fillUpdateSong = (
  values: UpdateSongFormik,
  songPosition: SongPosition
) => {
  const albumData:CreateSongDTO = initialValues;
  const song = fillSong(values, albumData);
  store.dispatch(updateSong(song, songPosition));
};
