import React, { use, useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { RadioGroup } from "../ui/Radio-group"
import { Button } from '../ui/Button'
import { Form, Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../../utils/constant';
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/authSlice'
import { Loader2 } from 'lucide-react'
import axios from 'axios';
import { toast } from 'sonner'



const Signup = () => {
    const [input, setInput] = useState({
        fullName: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });

    const { loading, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);

        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/registerUser`, formData, {
                headers: {
                    "content-Type": "multipart/form-data"
                },
                withCredentials: true,
            })
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            dispatch(setLoading(false));
        }
    }

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user])


    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto '>
                <form onSubmit={submitHandler} className='w-1/2 border border-border rounded-md p-4 my-10 bg-elevated '>
                    <h1 className='font-bold text-xl mb-5 text-primary'>Sign Up</h1>
                    <div className='my-2 space-y-1'>
                        <Label >Full Name</Label>

                        <Input
                            type="text"
                            value={input.fullName}
                            name="fullName"
                            onChange={changeEventHandler}
                            placeholder="Enter your Full Name"
                            className='border border-border rounded-md bg-primary text-primary placeholder:text-muted'
                        />
                    </div>

                    <div className='my-2 space-y-1'>
                        <Label>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter Your Email"
                            className='border border-border rounded-md bg-primary text-primary placeholder:text-muted'
                        />
                    </div>

                    <div className='my-2 space-y-1'>
                        <Label>Phone Number</Label>
                        <Input
                            type="text"
                            value={input.phoneNumber}
                            name="phoneNumber"
                            onChange={changeEventHandler}
                            placeholder="Enter Phone Number"
                            className='border border-border rounded-md bg-primary text-primary placeholder:text-muted'
                        />
                    </div>

                    <div className='my-2 space-y-1'>
                        <Label>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className='border border-border rounded-md bg-primary text-primary placeholder:text-muted'
                        />
                    </div>

                    <div className='flex items-center justify-between '>

                        <RadioGroup defaultValue="Student" className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2 ">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2 ">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer"
                                />
                                <Label htmlFor="Recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>

                        <div className='flex items-center gap-2'>
                            <Label>Profile</Label>
                            <Input
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer file:bg-elevated file:text-secondary file:border-none file:rounded-md file:p-2 file:cursor-pointer"
                            />
                        </div>

                    </div>

                    {
                        loading ?
                            <Button className="w-full my-4 cursor-pointer" disabled={loading}>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait </Button>
                            : <Button type="submit" className="w-full my-4 cursor-pointer">Sign up</Button>
                    }


                    <span className='text-sm text-muted'>Already have an account?
                        <Link to="/Login" className="text-accent hover:underline">Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Signup