import { Link } from 'react-router-dom'
import useSWR from 'swr'
import axios from 'axios'
import Loading from '../../Components/User/Loading'

// Custom fetcher with auth header
const fetcher = (url) =>
    axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((res) => res.data.user)

function Dashboard() {
    const {
        data: user,
        error,
        isLoading,
    } = useSWR('/api/user/', fetcher, {
        dedupingInterval: 5 * 60 * 1000, // cache for 5 minutes
    })

    // Optional error handling
    if (error) {
        return (
            <div className="mt-10 text-center text-red-500">
                Failed to load user data. Please try again.
            </div>
        )
    }

    if (isLoading || !user) {
        return <Loading />
    }

    return (
        <div className="relative min-h-screen bg-neutral-100 pt-6 pr-8 pb-6 pl-8">
            {/* Main Content */}
            <div className="mt-4 flex flex-row gap-4">
                {/* Profile Section */}
                <div className="flex basis-2/5 justify-between rounded-lg border-l-4 border-green-700 bg-white p-4 shadow-sm">
                    <div className="flex flex-col">
                        <img
                            src={user.pic}
                            alt="Profile"
                            className="h-16 w-16 rounded-full object-cover"
                        />
                        <h2 className="text-xl font-semibold">
                            {user.firstname} {user.lastname}
                        </h2>
                        <Link
                            to="/settings"
                            className="text-md text-green-600 hover:underline"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>

                {/* Address Section */}
                <div className="flex basis-3/5 rounded-lg border-l-4 border-green-700 bg-white p-4 shadow-sm">
                    <div className="flex flex-col">
                        <h3 className="text-sm font-semibold text-gray-500">
                            DEFAULT ADDRESS
                        </h3>
                        {user?.address && user?.address.street ? (
                            <>
                                <p className="mt-2 text-gray-700">
                                    {user.firstname} {user.lastname}
                                </p>
                                <p className="text-gray-500">
                                    {user.address.street}, {user.address.city},{' '}
                                    {user.address.country}
                                    <br />
                                    Postal Code: {user.address.postalCode}
                                    <br />
                                    {user.mobileNumbers?.[0]?.number ||
                                        'No mobile number'}
                                </p>
                                <Link
                                    to="/settings"
                                    className="text-sm text-green-600 hover:underline"
                                >
                                    Edit Address
                                </Link>
                            </>
                        ) : (
                            <div>
                                <p className="mt-2 text-red-500">
                                    Complete your profile by adding an address.
                                </p>
                                <Link to="/settings">
                                    <button
                                        type="button"
                                        className="mt-2 rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                                    >
                                        Click here
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
