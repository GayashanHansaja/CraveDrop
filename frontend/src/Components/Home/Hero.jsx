import { FaArrowDown } from "react-icons/fa";

const Hero = () => {
  const scrollToShopList = () => {
    const shopListSection = document.getElementById("shop-list");
    if (shopListSection) {
      shopListSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#b8f724] opacity-20 blur-[100px]"></div>
      </div>
      <div className="max-w-5xl mx-auto h-[60vh]">
        <div className="flex flex-col justify-center md:py-[6rem] text-center gap-y-8">
          <h1 className="bg-[#f3ffc6] border border-[#b8f724] max-w-3xl mx-auto px-10 rounded-full py-1 text-lg font-medium flex items-center justify-center gap-2">
            Delicious meals, lightning-fast delivery — Crave what you love, we
            drop it fast.
          </h1>
          <h1 className="text-5xl font-medium">
            FOOD, SNACKS, DRINKS & MORE <br />
            DELIVERED RIGHT TO YOUR DOORSTEP
          </h1>
          <div
            className="max-w-5xl px-10 py-3 mx-auto border-2 rounded-full border-[#99DD05] flex items-center justify-center gap-3 hover:bg-[#f5fce6] hover:cursor-pointer"
            onClick={scrollToShopList}
          >
            <FaArrowDown size={18} />
            Explore your Cravings.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
