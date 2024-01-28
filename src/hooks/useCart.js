import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";

const useCart = () => {
  const { user } = useContext(AuthContext);
  const {
    isLoading,
    data: cart = [],
    refetch,
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:3001/carts?email=${user?.email}`
      );
      return res.json();
    },
  });

  return [cart, refetch, isLoading];
};

export default useCart;
