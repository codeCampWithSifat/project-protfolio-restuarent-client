import FoodCart from "../../../Components/FoodCart";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const OrderTab = ({ items }) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  console.log(pagination);

  return (
    <div>
      <Swiper
        pagination={pagination}
        modules={[Pagination]}
        className="mySwiper"
      ></Swiper>
      <SwiperSlide>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
          {items.map((item) => (
            <FoodCart item={item} key={item._id}></FoodCart>
          ))}
        </div>
      </SwiperSlide>
    </div>
  );
};

export default OrderTab;
