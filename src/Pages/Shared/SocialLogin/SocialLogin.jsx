import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Providers/AuthProvider";

const SocialLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { googleSignIn } = useContext(AuthContext);

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        const saveUser = {
          name: user.displayName,
          email: user.email,
        };
        fetch(`http://localhost:5000/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(saveUser),
        })
          .then((res) => res.json())
          .then(() => {
            navigate(from, { replace: true });
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-circle btn-outline"
      >
        <FaGoogle />
      </button>
      <span className="ml-2">Google Login</span>
    </div>
  );
};

export default SocialLogin;
