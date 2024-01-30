import { useContext, useEffect, useState } from "react";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";
const Login = () => {
  const [disabled, setDisabled] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const { signIn } = useContext(AuthContext);
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((res) => {
        navigate(from, { replace: true });
        const user = res.user;
        console.log(user);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Login Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    // console.log(user_captcha_value);
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };
  return (
    <div className="">
      <Helmet>
        <title>Restuarent || Login</title>
      </Helmet>
      <form
        onSubmit={handleLogin}
        className="h-[600px] flex flex-col justify-center items-center"
      >
        <h2 className="uppercase text-indigo-800 text-2xl  btn-accent mb-6">
          Please Login
        </h2>

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className="input input-bordered input-accent w-2/5 my-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          className="input input-bordered input-accent w-2/5 my-2"
          required
        />
        <div>
          <LoadCanvasTemplate />
        </div>
        <input
          type="text"
          name="captcha"
          onBlur={handleValidateCaptcha}
          placeholder="Type Captcha Above"
          className="input input-bordered input-accent w-2/5 my-2"
          required
        />

        {/* <button
          onClick={handleValidateCaptcha}
          className="btn btn-active btn-ghost w-2/5 my-2"
        >
          Validate Captcha
        </button> */}

        <input
          className=" btn btn-accent w-2/5 my-2"
          type="submit"
          value="Login"
          disabled={disabled}
        />

        <p className="mt-8">
          Do not Have Any Account{" "}
          <Link className="text-red-800 font-bold uppercase" to="/signup">
            Please Register
          </Link>
        </p>
      </form>
      <div className=" text-center">
        <SocialLogin />
      </div>
    </div>
  );
};

export default Login;
