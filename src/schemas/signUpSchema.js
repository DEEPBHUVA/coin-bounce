import * as yup from 'yup'

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,25}$/;

const erroMessage = "One uppercase & One lowercase character\n One degit";

const signUpSchema = yup.object().shape({
    name: yup.string().max(25).required('name is required'),
    username: yup.string().min(5).max(30).required('username is required'),
    email: yup
    .string()
    .email("enter a valid email")
    .required("email is required"),
    password: yup
    .string()
    .min(8)
    .max(25)
    .matches(passwordPattern, { message: erroMessage })
    .required("password is required"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "passwords must match")
    .required("password is required"),
});

export default signUpSchema;