import { useEffect } from "react";
import CTABar from "../Components/Home/CTABar";
import Hero from "../Components/Home/Hero";
import ShopList from "../Components/Home/ShopList";
import Footer from "../Components/Home/Footer";

const Homepage = () => {
  useEffect(() => {
    document.title = "FarmCart : Home";
  }, []);

  return (
    <>
      <Hero />
      {/* <CTABar /> */}
      <ShopList />
      <Footer />
    </>
  );
};

export default Homepage;
