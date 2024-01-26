import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuImage from "../../../assets/menu/banner.jpg";
import useMenu from "../../../hooks/useMenu";
import SectionTitle from "../../../Components/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import dessertImage from "../../../assets/menu/dessert-bg.jpeg";
import pizzaImage from "../../../assets/menu/pizza-bg.jpg";
import saladImage from "../../../assets/menu/salad-bg.jpg";
import soupImage from "../../../assets/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const dessert = menu.filter((item) => item.category === "dessert");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const offered = menu.filter((item) => item.category === "offered");
  return (
    <div>
      <Helmet>
        <title>menu</title>
      </Helmet>
      <Cover img={menuImage} title={"Our Menu"}></Cover>
      {/* Main Cover */}
      <SectionTitle
        subHeading={"Don't Miss"}
        heading={"Today's Offer"}
      ></SectionTitle>
      {/* Offered Menu Items */}
      <MenuCategory items={offered}></MenuCategory>
      {/* dessert menu items */}
      <MenuCategory
        items={dessert}
        title={"dessert"}
        img={dessertImage}
      ></MenuCategory>

      {/* pizza items */}
      <MenuCategory
        items={pizza}
        title={"pizza"}
        img={pizzaImage}
      ></MenuCategory>

      {/* Salad item */}
      <MenuCategory
        items={salad}
        title={"salad"}
        img={saladImage}
      ></MenuCategory>

      {/* Soup items */}
      <MenuCategory items={soup} title={"soup"} img={soupImage}></MenuCategory>
    </div>
  );
};

export default Menu;
