import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  // const token = localStorage.getItem("accessToken");
  // const { data: users = [], refetch } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {
  //     const res = await fetch("http://localhost:5000/users", {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return res.json();
  //   },
  // });

  const [axiosSecure] = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      // console.log(res);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: `${user.name} is Admin Now`,
            text: "Make An Admin Successfully",
            icon: "success",
          });
          refetch();
        }
      });
  };

  const handleDelete = (user) => {
    console.log(user);
  };

  return (
    <div className="max-w-screen-lg	mx-auto">
      {" "}
      <Helmet>
        <title>All || Users</title>
      </Helmet>{" "}
      <h2 className="text-indigo-800 mt-8 text-center text-2xl">
        Total Number Of Users : {users.length}
      </h2>
      <div className="overflow-x-auto mt-8">
        <table className="table">
          {/* head */}
          <thead className="bg-[#D1A054] text-black">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {" "}
                  {user?.role === "admin" ? (
                    <button className="btn btn-active btn-primary btn-sm">
                      Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-ghost bg-orange-600 btn-sm"
                    >
                      <FaUserShield />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
