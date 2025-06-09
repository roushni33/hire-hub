import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "../../utils/constant";
import { setUser } from "../../redux/authSlice";
import { toast } from "sonner";
import axios from "axios";


const Navbar = () => {


    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Something went wrong!");

        }
    }
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-16 '>
                <div onClick={() => navigate('/')} className='flex items-center gap-2 cursor-pointer'>
                    <h1 className='text-2xl font-bold'>Hire<span className='text-[#F83002]'>Hub</span></h1>
                </div>

                <div className='flex items-center gap-10'>
                    <ul className='flex items-center gap-5 font-medium'>
                        {
                            user && user.role === "recruiter" ? (
                                <>
                                    <li><Link to="/admin/companies">Campanies</Link></li>
                                    <li><Link to="/admin/jobs">Jobs</Link></li>

                                </>
                            ) : (
                                <>

                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>

                                </>
                            )
                        }

                    </ul>

                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to="/login"><Button variant="outline" className='cursor-pointer'>Login</Button></Link>
                                <Link to="/signup"> <Button className="bg-[#6838C2] hover:bg-[#6838a6] cursor-pointer">Signup</Button></Link>
                            </div>
                        ) : (

                            <Popover >
                                <PopoverTrigger>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="w-70 bg-white shadow-lg rounded-md p-4">
                                    <div>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className='cursor-pointer'>
                                                <AvatarImage src={user?.profile?.profilePhoto} />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user.fullName}</h4>
                                                <p className='text-sm text-muted-foreground'>{user.profile.bio} </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col  text-gray-600">
                                            {
                                                user && user.role === "student"  && (
                                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                    <User2 />
                                                    <Button variant="link"><Link to="/profile">View Profile</Link></Button>
                                                </div>
                                                )
                                            }
                                           
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant="link">Logout</Button>
                                            </div>
                                        </div>
                                    </div>


                                </PopoverContent>
                            </Popover>
                        )
                    }



                </div>

            </div>

        </div>

    )
}

export default Navbar