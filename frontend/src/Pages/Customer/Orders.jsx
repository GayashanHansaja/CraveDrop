import { useEffect, useState } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import OrderTable from "../../Components/User/OrderTable";
import { orders as mockOrders } from "../../mock/order";

// Initialize mock adapter
const mock = new MockAdapter(axios, { delayResponse: 1000 }); // Optional delay
mock.onGet("/api/orders").reply(200, mockOrders);

const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="p-3">
      <div className="h-4 bg-gray-300 rounded w-24" />
    </td>
    <td className="p-3">
      <div className="h-4 bg-gray-300 rounded w-20" />
    </td>
    <td className="p-3">
      <div className="h-4 bg-gray-300 rounded w-28" />
    </td>
    <td className="p-3">
      <div className="h-4 bg-gray-300 rounded w-20" />
    </td>
  </tr>
);

const SkeletonTable = () => (
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 bg-white shadow rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-3 border-b">Order ID</th>
          <th className="text-left p-3 border-b">Total</th>
          <th className="text-left p-3 border-b">Date</th>
          <th className="text-left p-3 border-b">Status</th>
        </tr>
      </thead>
      <tbody>
        {[...Array(5)].map((_, idx) => (
          <SkeletonRow key={idx} />
        ))}
      </tbody>
    </table>
  </div>
);

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/orders")
      .then((res) => setOrders(res.data || []))
      .catch((error) => console.error("Error fetching orders:", error))
      .finally(() => setLoading(false));
  }, []);

  const filteredOrders = orders.filter((order) =>
    order.orderId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Order ID..."
          className="w-full border px-3 py-2 rounded-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? <SkeletonTable /> : <OrderTable orders={filteredOrders} />}
    </div>
  );
};

export default Orders;
