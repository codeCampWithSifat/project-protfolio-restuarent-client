import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";

const MyCart = () => {
  const [cart, refetch] = useCart();
  //   console.log(cart);
  const totalPrice = cart.reduce((sum, items) => sum + items.price, 0);

  const handleDelete = (id) => {
    // console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:3001/carts/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your Order has been deleted.",
                icon: "success",
              });
              refetch();
            }
          });
      }
    });
  };
  return (
    <div className="max-w-screen-lg  mx-auto mt-20">
      <Helmet>
        <title>My || Cart</title>
      </Helmet>
      <div className="uppercase  flex h-[60px]  justify-evenly items-center">
        <h3 className="text-xl">Total Items : {cart?.length}</h3>
        <h3 className="text-xl">Total Price : {totalPrice}</h3>
        <button className="btn btn-success btn-sm">PAY</button>
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="table table-zebra">
          {/* head */}
          <thead className="bg-[#D1A054] text-black">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>
                  <img className="w-20" src={item.image} alt="" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    onClick={() => handleDelete(item._id)}
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

export default MyCart;
