import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { login } from "../../services/user";
import { useDispatch } from 'react-redux';
import { messageActions } from '../../Store/messageSlice';
import { authActions } from '../../Store/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const onSubmit = async ({ username, password }) => {
    const response = await login({username,password})
    if (response.status !== 200) dispatch(messageActions.show([response.data, "error"]))
    if (response.status === 200){
      dispatch(authActions.login({
        username: response.data.user.username,
        userID: response.data.user._id,
      }))
      navigate("Dashboard")
    }

  }

  const initVals = {
    username: "",
    password: "",
  }

  const Schema = yup.object().shape({
    username: yup.string().required("Required*"),
    password: yup.string().required("Required*"),
  })


  const formik = useFormik({
    initialValues: initVals,
    onSubmit: onSubmit,
    validationSchema: Schema,
  })
  return (
    <Box>

      <Box width={"calc( 100% - 50px ) "} mx="auto" my={"auto"} height="90vh" display="flex" flexDirection="column" justifyContent="center" >
      <Typography fontSize={40} fontWeight={700} sx={{ mb: 5 }} textAlign="center"> Login </Typography>

        <form onSubmit={formik.handleSubmit}>

          <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }} >
            <Box width={"100%"} mb={2}>
              <TextField
                variant="outlined"
                size='small'
                type="text"
                placeholder='Username'
                name='username'
                sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.2 } }}
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                onBlur={formik.handleBlur}
              />
            </Box>
            <Box width={"100%"} mb={2}>
              <TextField
                variant="outlined"
                size='small'
                type="password"
                placeholder='Password'
                name='password'
                sx={{ width: "100%", ".MuiOutlinedInput-root": { bgcolor: "white", borderRadius: 0.2 } }}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                onBlur={formik.handleBlur}
              />
            </Box>

            <Button
              variant='contained'
              size='small'
              type='submit'
              sx={{ width: "80%", color: "white", bgcolor: "secondary.main", p: 0.5, mx: 1 }}
            >
              Login
            </Button>
          </Box>
        </form>

      </Box>
    </ Box>
  );
}

export default Login;
