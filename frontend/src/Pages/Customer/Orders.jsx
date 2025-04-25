import { useEffect, useState } from 'react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import OrderTable from '../../Components/User/OrderTable'
import { orders as mockOrders } from '../../mock/order'

// Initialize mock adapter
const mock = new MockAdapter(axios, { delayResponse: 1000 }) // Optional delay
mock.onGet('/api/orders').reply(200, mockOrders)

const SkeletonRow = () => (
    <tr className="animate-pulse">
        <td className="p-3">
            <div className="h-4 w-24 rounded bg-gray-300" />
        </td>
        <td className="p-3">
            <div className="h-4 w-20 rounded bg-gray-300" />
        </td>
        <td className="p-3">
            <div className="h-4 w-28 rounded bg-gray-300" />
        </td>
        <td className="p-3">
            <div className="h-4 w-20 rounded bg-gray-300" />
        </td>
    </tr>
)

const SkeletonTable = () => (
    <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg border border-gray-200 bg-white shadow">
            <thead className="bg-gray-100">
                <tr>
                    <th className="border-b p-3 text-left">Order ID</th>
                    <th className="border-b p-3 text-left">Total</th>
                    <th className="border-b p-3 text-left">Date</th>
                    <th className="border-b p-3 text-left">Status</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(5)].map((_, idx) => (
                    <SkeletonRow key={idx} />
                ))}
            </tbody>
        </table>
    </div>
)

const Orders = () => {
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .get('/api/orders')
            .then((res) => setOrders(res.data || []))
            .catch((error) => console.error('Error fetching orders:', error))
            .finally(() => setLoading(false))
    }, [])

    const filteredOrders = orders.filter((order) =>
        order.orderId.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-6">
            <h1 className="mb-4 text-2xl font-semibold">Orders</h1>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by Order ID..."
                    className="w-full rounded-md border px-3 py-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading ? (
                <SkeletonTable />
            ) : (
                <OrderTable orders={filteredOrders} />
            )}
        </div>
    )
}

export default Orders
