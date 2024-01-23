import { useEffect, useState } from "react";
import SectionTitle from "../../../Components/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";

const PopularMenu = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularItem = data.filter((item) => item.category === "popular");
        setPopular(popularItem);
      });
  }, []);
  return (
    <div className="mb-12">
      <SectionTitle
        heading={"From Our Menu"}
        subHeading={"Popular Items"}
      ></SectionTitle>

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-10">
        {popular.map((item) => (
          <MenuItem key={item._id} item={item}></MenuItem>
        ))}
      </div>
    </div>
  );
};

export default PopularMenu;
