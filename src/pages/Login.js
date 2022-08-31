import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { CgSpinnerTwo } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Container from "../components/Container";
import { actionType } from "../contexts/reducer";
import { useStateValue } from "../contexts/StateProvider";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = (values, { setSubmitting, resetForm }) => {
    resetForm();
    signInWithEmailAndPassword(auth, values.email, values.password)
      .then((userCredential) => {
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
      })
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          alert("User not found.");
        }
      });
  };

  return (
    <section className="">
      <Container className="">
        <div className="flex justify-center items-center flex-wrap gap-10 h-[70vh] text-gray-800">
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
                      Login
                    </button>
                    <div>
                      <Link
                        to="/signup"
                        className="text-orange-500 hover:text-orange-600 font-semibold text-lg underline"
                      >
                        Don't have an account?
                      </Link>
                    </div>
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

export default Login;
