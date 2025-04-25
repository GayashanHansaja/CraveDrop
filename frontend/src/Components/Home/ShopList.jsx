import { useEffect, useState } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { useNavigate } from "react-router-dom";
import foodData from "../../mock/shop";

// Initialize mock adapter
const mock = new MockAdapter(axios, { delayResponse: 1000 }); // optional delay

// Mock data
mock.onGet("/api/foods").reply(200, foodData);

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const { data } = await axios.get("/api/foods");
        setFoods(data);
      } catch (err) {
        console.error("Error fetching food items:", err);
        setError("Failed to fetch food items");
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 px-10 py-[5rem]">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            role="status"
            className="p-4 border border-gray-200 rounded-lg shadow animate-pulse"
          >
            <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded" />
            <div className="h-4 bg-gray-200 rounded-full w-3/4 mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded-full w-1/2 mb-2.5"></div>
            <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500 py-10">{error}</p>;
  }

  if (!foods.length) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl">No food items found.</h2>
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
    <div id="food-list" className="mx-auto max-w-7xl py-[5rem]">
      <h1 className="pb-10 text-4xl">Trending</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {foods.map((food) => (
          <div
            key={food.id}
            className="border-2 p-2 border-[#b8f724] rounded-lg cursor-pointer transition-transform hover:scale-105 hover:border-[#f3ffc6] hover:shadow-lg"
            onClick={() => navigate(`/foods/${food.id}`)}
          >
            <img
              src={food.image}
              alt={food.name}
              className="object-cover w-[300px] h-[200px] rounded-md transition-transform transform hover:scale-102"
            />
            <div className="flex flex-col py-3 gap-y-2">
              <h1 className="text-xl">{food.name}</h1>
              <div className="flex items-center gap-3">
                <h1>{food.category}</h1>
                <h1>{food.origin}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center pt-10 pb-[6rem]">
        <button
          className="px-10 py-4 bg-[#b8f724] rounded-lg hover:bg-[#f3ffc6]"
          onClick={() => navigate("/foods")}
        >
          View More
        </button>
      </div>
      <div className="h-[0.6vh] bg-[#f3ffc6] max-w-3xl mx-auto"></div>
    </div>
  );
};

export default FoodList;
