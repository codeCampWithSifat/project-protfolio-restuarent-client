import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin/SocialLogin";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = {
              name: data.name,
              email: data.email,
            };
            fetch(`http://localhost:5000/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(saveUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  navigate(from, { replace: true });
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "User Created Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                  reset();
                }
              });
          })
          .catch((error) => {
            console.log(error.errorMessage);
          });
      })
      .catch((error) => {
        const errorMessage = error.errorMessage;
        console.log(errorMessage);
      });
  };
  return (
    <div>
      <Helmet>
        <title>Restuarent || Register</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-[600px] flex flex-col justify-center items-center"
      >
        <h2 className="uppercase text-indigo-800 text-2xl  btn-accent mb-6">
          Please Register
        </h2>

        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Your Name"
          className="input input-bordered input-accent w-2/5 my-2"
        />
        {errors.name && (
          <div>
            {" "}
            <span className="text-red-600  text-left">Name is required</span>
          </div>
        )}
        <input
          type="text"
          placeholder="Your Image Url"
          className="input input-bordered input-accent w-2/5 my-2"
          {...register("photoURL", { required: true })}
        />
        {errors.photoURL && (
          <div>
            {" "}
            <span className="text-red-600  text-left">
              Photo URL is required
            </span>
          </div>
        )}
        <input
          type="email"
          name="email"
          {...register("email", { required: true })}
          placeholder="Your Email"
          className="input input-bordered input-accent w-2/5 my-2"
        />
        {errors.email && (
          <div>
            {" "}
            <span className="text-red-600  text-left">Email is required</span>
          </div>
        )}
        <input
          type="password"
          name="password"
          {...register("password", {
            required: true,
            maxLength: 20,
            minLength: 6,
          })}
          placeholder="Your Password"
          className="input input-bordered input-accent w-2/5 my-2"
        />
        {errors.password?.type === "required" && (
          <p role="" className="text-red-600">
            Password is required
          </p>
        )}
        {errors.password?.type === "minLength" && (
          <p role="" className="text-red-600">
            Password is Must Be 6 Characters
          </p>
        )}
        {errors.password?.type === "maxLength" && (
          <p role="" className="text-red-600">
            Password is Not More Than 20 Characters
          </p>
        )}
        <input
          className=" btn btn-accent w-2/5 my-2"
          type="submit"
          value="Register"
        />

        <p className="mt-8">
          Already Have An Account{" "}
          <Link className="text-red-800 font-bold uppercase" to="/login">
            Please Login
          </Link>
        </p>
      </form>
      <div className=" text-center">
        <SocialLogin />
      </div>
    </div>
  );
};

export default SignUp;
