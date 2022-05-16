import * as Yup from "yup";
import { store } from "../../app/store";
import { login } from "../../services/user";
import { LoginDTO } from "./type";

export const validationSchema: Yup.SchemaOf<LoginDTO> = Yup.object({
  username: Yup.string()
  .required("El nombre del usuario es requerido"),
  email: Yup.string()
    .required("El email del usuario es requerido")
    .email("El email no tiene el formato adecuado"),
  password: Yup.string().required("La contraseña es requerida"),
});

export const initialValues: LoginDTO = {
  username: "",
  email: "",
  password: "",
};

export const loginUser = (values: LoginDTO) => {
  store.dispatch(login(values));
};