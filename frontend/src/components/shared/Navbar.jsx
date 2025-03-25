import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User2, LogOut } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const user = false;
    return (
        <div className='bg-white'>
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-16 '>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                </div>

                <div className='flex items-center gap-10'>
                    <ul className='flex items-center gap-5 font-medium'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
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
                                        <AvatarImage src="https://github.com/shadcn.png" />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent align="end" className="w-70 bg-white shadow-lg rounded-md p-4">
                                    <div>
                                        <div className='flex gap-2 space-y-2'>
                                            <Avatar className='cursor-pointer'>
                                                <AvatarImage src="https://github.com/shadcn.png" />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>Roushni Kumari</h4>
                                                <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur </p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col  text-gray-600">
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <User2 />
                                                <Button variant="link">View Profile</Button>
                                            </div>
                                            <div className="flex w-fit items-center gap-2 cursor-pointer">
                                                <LogOut />
                                                <Button variant="link">Logout</Button>
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