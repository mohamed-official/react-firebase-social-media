import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ErrorMessage, Field, Formik } from "formik";
import { useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { CgSpinnerTwo } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import SignupImage from "../assets/signup.svg";
import Container from "../components/Container";
import { actionType } from "../contexts/reducer";
import { useStateValue } from "../contexts/StateProvider";
import { auth } from "../firebase";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [{ user }, dispatch] = useStateValue();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    username: Yup.string().min(4).max(20).required(),
    password: Yup.string()
      .min(8)
      .required()
      .matches(
        "^(?=.*?[a-z])(?=.*?[0-9]).{8,}$",
        "Password must contain at least 1 lowercase letter and 1 number"
      ),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords doesn't match")
      .required(),
  });

  const initialValues = {
    email: "",
    username: "",
    password: "",
    passwordConfirm: "",
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
        resetForm();
        updateProfile(userCredential.user, {
          displayName: values.username,
        }).then(() => {
          dispatch({
            type: actionType.SET_USER,
            user: userCredential.user.providerData[0],
          });
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...userCredential.user.providerData[0],
            })
          );
          setSubmitting(false);
          navigate("/");
        });
      })
      .catch((error) => {
        setSubmitting(false);
        resetForm();
      });
  };

  return (
    <section className="">
      <Container className="mt-8 md:mt-16 xl:mt-20">
        <div className="flex justify-center items-center flex-wrap gap-10 h-full text-gray-800">
          <div className="md:w-8/12 lg:w-5/12">
            <img src={SignupImage} className="w-full" alt="Phone image" />
          </div>
          <div className="md:w-8/12 lg:w-6/12">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit} noValidate>
                  <div className="flex flex-col gap-4">
                    {/* Email */}
                    <div>
                      <Field
                        name="email"
                        type="email"
                        className="auth-input"
                        placeholder="Email Address"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="auth-error-message"
                      />
                    </div>
                    {/* Username */}
                    <div>
                      <Field
                        name="username"
                        type="text"
                        className="auth-input"
                        placeholder="Username"
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="auth-error-message"
                      />
                    </div>
                    {/* Password */}
                    <div>
                      <div className="relative">
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="auth-input"
                          placeholder="Password"
                        />

                        <div
                          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <BsFillEyeSlashFill size={25} />
                          ) : (
                            <BsFillEyeFill size={25} />
                          )}
                        </div>
                      </div>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="auth-error-message"
                      />
                    </div>
                    {/* Password Confirm */}
                    <div>
                      <Field
                        name="passwordConfirm"
                        type="password"
                        className="auth-input"
                        placeholder="Password Confirm"
                      />
                      <ErrorMessage
                        name="passwordConfirm"
                        component="div"
                        className="auth-error-message"
                      />
                    </div>
                    {/* Submit */}
                    <button
                      type="submit"
                      className="flex items-center justify-center gap-4 px-7 py-3 bg-orange-500 disabled:bg-orange-400 disabled:pointer-events-none text-white font-medium text-md rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:outline-none transition duration-150 ease-in-out w-full"
                      disabled={
                        !(formik.isValid && formik.dirty) || formik.isSubmitting
                      }
                    >
                      {formik.isSubmitting && (
                        <CgSpinnerTwo
                          size={30}
                          className="animate-spin duration-50"
                        />
                      )}
                      Signup
                    </button>
                    {/* <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                     className="text-center font-semibold mx-4 mb-0">OR</p>
                    v> */}
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Signup;
