// import { useContext } from "react"

// import { AuthContext } from "../Providers/AuthProvider"
// import { useQuery } from "@tanstack/react-query";

// const useAdmin = () => {
//     const {user} = useContext(AuthContext);
//     const token = localStorage.getItem("accessToken");
//     const {} = useQuery({
//         queryKey : ['isAdmin', user?.email],
//         queryFn : async () => {
//             const res = await fetch(`http://localhost:5000/users/admin/${user?.email}`, {
//                 headers : {
//                     authorization : `bearer ${token}`
//                 }
//             })
//             return res.json();
//         }
//     })
// }

// export default useAdmin

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();

  const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);

      return res.data?.admin;
    },
  });
  return [isAdmin, isAdminLoading];
};

export default useAdmin;
