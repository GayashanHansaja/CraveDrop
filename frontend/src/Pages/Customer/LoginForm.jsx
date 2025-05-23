import { useState, useEffect } from 'react'
import { useLogin } from '../../Hooks/useLogin'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'
import farmcartLogo from '../../assets/logo.png'

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login, error, isLoading } = useLogin()

    const handleSubmit = async (event) => {
        event.preventDefault()
        await login(email, password)
        // toast.success('Login successful!')
    }

    useEffect(() => {
        document.title = 'FarmCart : Login'
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
            setEmail('')
            setPassword('')
        }
    }, [error])

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded-lg border-2 border-green-600 bg-white p-8 shadow-lg">
                <img
                    src={farmcartLogo} // Replace with the path to your logo image
                    alt="Logo"
                    className="mb-2 h-8 w-auto" // Adjust the height as needed
                />
                <div className="mb-5 text-left">
                    <h2 className="text-3xl font-bold">Welcome Back...</h2>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="mt-1 block w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-lime-400 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email address"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full rounded-lg border bg-gray-50 px-4 py-2 focus:ring-2 focus:ring-lime-400 focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter Password"
                        />
                    </div>
                    <button
                        disabled={isLoading}
                        type="submit"
                        className="w-full rounded-lg bg-lime-500 px-4 py-2 text-black hover:bg-lime-600 focus:ring-2 focus:ring-lime-400 focus:outline-none"
                    >
                        {isLoading ? (
                            <div className="flex items-center justify-center">
                                <svg
                                    className="mr-3 h-5 w-5 animate-spin text-white"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    ></circle>
                                    <path
                                        className="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                                Loading...
                            </div>
                        ) : (
                            'Login'
                        )}
                    </button>
                    <ToastContainer />
                </form>
                <div className="mt-4">
                    <Link
                        to="/forgot-password"
                        className="text-blue-600 hover:underline"
                    >
                        Forgot Password!
                    </Link>
                </div>
                <div className="mt-4">
                    If you dont have an account..?
                    <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Register Now.
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
