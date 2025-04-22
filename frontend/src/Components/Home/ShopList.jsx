import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ShopList = () => {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const { data } = await axios.get(`/api/shops/all-shops`);
        setShops(data);
      } catch (err) {
        console.error("Error fetching shops:", err);
        setError("Failed to fetch shops");
      } finally {
        setLoading(true); // TODO change
      }
    };

    fetchShops();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 px-10 py-[5rem]">
        {[...Array(11)].map((_, i) => (
          <div
            key={i}
            role="status"
            className="p-4 border border-gray-200 rounded-lg shadow animate-pulse"
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-300">
              <svg
                className="w-12 h-12 text-gray-200 dark:text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 640 512"
              >
                <path d="M..." />
              </svg>
            </div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-200 w-3/4 mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-200 w-1/2 mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-200 w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!shops.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl">No shops found.</h2>
        <button
          className="mt-4 px-6 py-3 bg-[#b8f724] rounded hover:bg-[#f3ffc6]"
          onClick={() => navigate("/")}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div id="shop-list" className="mx-auto max-w-7xl py-[5rem]">
      <h1 className="pb-10 text-4xl">Shop List</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {shops.map((shop, index) => (
          <div
            key={index}
            className="border-2 p-2 border-[#b8f724] rounded-lg cursor-pointer transition-transform transform hover:scale-105 hover:border-[#f3ffc6] hover:shadow-lg"
            onClick={() => navigate(`/shops/${shop._id}`)}
          >
            <img
              src={shop.image.replace(/\.\w+$/, ".webp")}
              alt={shop.name}
              className="object-cover w-[300px] h-[200px] rounded-md transition-transform transform hover:scale-103"
            />
            <div className="flex flex-col py-3 gap-y-2">
              <h1 className="text-xl">{shop.name}</h1>
              <div className="flex items-center gap-3">
                <h1>{shop.category}</h1>
                <h1>{shop.district}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center pt-10 pb-[6rem]">
        <button
          className="px-10 py-4 bg-[#b8f724] rounded-lg hover:bg-[#f3ffc6]"
          onClick={() => navigate("/shops")}
        >
          View More
        </button>
      </div>
      <div className="h-[0.6vh] bg-[#f3ffc6] max-w-3xl mx-auto"></div>
    </div>
  );
};

export default ShopList;
