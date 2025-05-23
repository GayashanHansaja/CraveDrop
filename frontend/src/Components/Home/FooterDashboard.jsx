import { FaFacebookSquare, FaTwitter } from 'react-icons/fa'
import { FaTiktok } from 'react-icons/fa'
import { FaMedium, FaX } from 'react-icons/fa6'

const FooterDashboard = () => {
    return (
        <div className="mx-auto max-w-7xl pt-[2rem] pb-5">
            {/* <div className="grid grid-cols-2 pt-10 pb-8 md:grid-cols-4">
                <div>
                    <h1 className="text-3xl font-bold ">FarmCart.</h1>
                </div>
                <div></div>
                <div className="flex flex-col gap-y-4">
                    <p className="hover:text-[#b8f724] hover:underline hover:cursor-pointer">
                        Get Help
                    </p>
                    <p className="hover:text-[#b8f724] hover:underline hover:cursor-pointer">
                        Add your Shop
                    </p>
                    <p className="hover:text-[#b8f724] hover:underline hover:cursor-pointer">
                        Sign up to Deliver
                    </p>
                    <p className="hover:text-[#b8f724] hover:underline hover:cursor-pointer">
                        Create a Business Account
                    </p>
                </div>
                <div className="flex flex-col gap-y-4">
                    <p className="hover:text-[#b8f724] hover:underline hover:cursor-pointer">
                        Shops near me
                    </p>
                    <p className="hover:text-[#b8f724] hover:underline hover:cursor-pointer">
                        View all cities
                    </p>
                    <p className="hover:text-[#b8f724] hover:underline hover:cursor-pointer">
                        Pickup near me
                    </p>
                    <p className="hover:text-[#b8f724] hover:underline hover:cursor-pointer">
                        About Farm cart
                    </p>
                </div>
            </div> */}
            <hr className="" />
            <div className="flex items-center justify-between">
                <div className="flex gap-5 pt-6 text-xl">
                    <FaFacebookSquare />
                    <FaTiktok />
                    <FaMedium />
                    <FaTwitter />
                </div>
                <div className="flex items-center gap-4">
                    <p className="hover:cursor-pointer hover:text-[#b8f724] hover:underline">
                        Privacy Policy
                    </p>
                    <p className="hover:cursor-pointer hover:text-[#b8f724] hover:underline">
                        Terms
                    </p>
                </div>
                <div>
                    <p>© 2025 CraveDrop Technologies Inc.</p>
                </div>
            </div>
        </div>
    )
}

export default FooterDashboard
