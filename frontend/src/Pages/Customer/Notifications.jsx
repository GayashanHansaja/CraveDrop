import { useState } from 'react'
import { FiBell, FiCheckCircle, FiX } from 'react-icons/fi'

const mockNotifications = [
    {
        id: 1,
        message: 'Your order #123456 has been shipped!',
        createdAt: '2025-04-20T12:34:56.789Z',
        read: false,
    },
    {
        id: 2,
        message: 'New promotions are available for your next purchase!',
        createdAt: '2025-04-22T09:12:33.000Z',
        read: false,
    },
    {
        id: 3,
        message: "Don't forget to check out our new arrivals.",
        createdAt: '2025-04-23T14:45:01.000Z',
        read: true,
    },
]

function Notifications() {
    const [notifications, setNotifications] = useState(mockNotifications)

    const markAsRead = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        )
    }

    const deleteNotification = (id) => {
        setNotifications((prevNotifications) =>
            prevNotifications.filter((notification) => notification.id !== id)
        )
    }

    return (
        <div className="mx-auto max-w-5xl rounded-lg bg-white p-6 shadow-lg">
            <h1 className="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-800">
                <FiBell className="text-xl" />
                Notifications
            </h1>

            {notifications.length === 0 ? (
                <div className="text-center text-gray-500">
                    No notifications
                </div>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`flex items-center justify-between rounded-md border p-4 ${
                                notification.read ? 'bg-gray-100' : 'bg-blue-50'
                            }`}
                        >
                            <div className="flex flex-col space-y-2">
                                <p className="text-sm">
                                    {notification.message}
                                </p>
                                <span className="text-xs text-gray-500">
                                    {new Date(
                                        notification.createdAt
                                    ).toLocaleString()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                {!notification.read && (
                                    <button
                                        onClick={() =>
                                            markAsRead(notification.id)
                                        }
                                        className="text-green-600 hover:text-green-800"
                                    >
                                        <FiCheckCircle className="text-lg" />
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        deleteNotification(notification.id)
                                    }
                                    className="text-red-600 hover:text-red-800"
                                >
                                    <FiX className="text-lg" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Notifications
