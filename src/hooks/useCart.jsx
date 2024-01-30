// import { useQuery } from "@tanstack/react-query";
// import { useContext } from "react";
// import { AuthContext } from "../Providers/AuthProvider";

// const useCart = () => {
//   const { user } = useContext(AuthContext);
//   const token = localStorage.getItem("accessToken");
//   const {
//     isLoading,
//     data: cart = [],
//     refetch,
//   } = useQuery({
//     queryKey: ["cart", user?.email],
//     queryFn: async () => {
//       const res = await fetch(
//         `http://localhost:5000/carts?email=${user?.email}`,
//         {
//           headers: {
//             authorization: `bearer ${token}`,
//           },
//         }
//       );
//       return res.json();
//     },
//   });

//   return [cart, refetch, isLoading];
// };

//export default useCart;

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useCart = () => {
  const [axiosSecure] = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/carts?email=${user.email}`);
      // console.log(res);
      return res.data;
    },
  });

  return [cart, refetch];
};

export default useCart;
