import { Box, Button, Paper, TextField } from "@mui/material";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { tokenSelector } from "../../feature/authSlice";
import { styles } from "./styles";
import { initialValues, loginUser, validationSchema } from "./form";

export const LoginAuth:FC = () => {
  const navigate = useNavigate();
  const token = useAppSelector(tokenSelector);

  useEffect(() => {
    if (token.access !== "") navigate("/");
  }, [navigate, token]);

  return (
    <Box sx={styles.loginContainer}>
      <Formik
        initialValues={initialValues}
        onSubmit={loginUser}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleSubmit, errors, values }) => (
          <form onSubmit={handleSubmit}>
            <Paper sx={styles.loginForm} elevation={6}>
              <Box sx={styles.inputsContainer}>
                <TextField
                  label="Username"
                  error={Boolean(errors.username)}
                  onChange={handleChange}
                  name="username"
                  type="name"
                  helperText={errors.username}
                />
                <TextField
                  label="Email"
                  error={Boolean(errors.email)}
                  onChange={handleChange}
                  name="email"
                  type="email"
                  helperText={errors.email}
                />
                <TextField
                  label="Password"
                  name="password"
                  error={Boolean(errors.password)}
                  onChange={handleChange}
                  type="password"
                  helperText={errors.password}
                />
                <Box>
                  <Button variant="contained" color="success" type="submit">
                    Login
                  </Button>
                </Box>
              </Box>
            </Paper>
          </form>
        )}
      </Formik>
    </Box>
  );
};