import { Carousel } from "primereact/carousel";
import Booba from "../assets/booba-1.jpeg";
import Booba2 from "../assets/booba-2.jpeg";

const Caroussel = () => {
  const products = [
    {
      img: Booba,
    },
    {
      img: Booba2,
    },
  ];
  return (
    <>
      <Carousel
        style={{
          height: "200px",
          overflowY: "hidden",
          borderRadius: "10px",
        }}
        value={products}
        itemTemplate={productTemplate}
        numVisible={1}
        autoplayInterval={2000}
      />
    </>
  );
};

const productTemplate = (product) => {
  return (
    <img
      style={{
        width: "100%",
        height: "50%",
        objectFit: "cover",
        overflow: "hidden",
        borderRadius: "10px",
      }}
      src={product.img}
    />
  );
};

export default Caroussel;
