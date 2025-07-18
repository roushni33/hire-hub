import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { toast } from 'sonner'
import { RadioGroup } from "../ui/Radio-group"
import { Button } from '../ui/Button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '../../utils/constant'
import { setLoading, setUser } from '../../redux/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Loader2 } from 'lucide-react'


const Login = () => {
    const [input, setInput] = useState({

        email: "",
        password: "",
        role: ""

    });
    const { loading, user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/loginUser`, input, {
                headers: {
                    "content-Type": "application/json"
                },
                withCredentials: true,
            })

            if (res.data.success) {
                dispatch(setUser(res.data.data.loginUser));
                navigate("/")
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.response.data.message || "Something went wrong");
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
                <form onSubmit={submitHandler} className='w-1/2 border border-border rounded-md p-4 my-10 bg-elevated'>
                    <h1 className='font-bold text-xl mb-5 text-primary'>Login</h1>
                    <div className='my-2 space-y-1'>
                        <Label className='text-primary'>Email</Label>
                        <Input
                            type="email"
                            value={input.email}
                            name="email"
                            onChange={changeEventHandler}
                            placeholder="Enter email"
                            className='border border-border rounded-md bg-primary text-primary placeholder:text-muted'
                        />
                    </div>
                    <div className='my-2 space-y-1'>
                        <Label className='text-primary'>Password</Label>
                        <Input
                            type="password"
                            value={input.password}
                            name="password"
                            onChange={changeEventHandler}
                            placeholder="Enter Password"
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
                                    className="cursor-pointer accent"
                                />
                                <Label htmlFor="student" className='text-secondary'>Student</Label>
                            </div>
                            <div className="flex items-center space-x-2 ">
                                <Input
                                    type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                    className="cursor-pointer accent"
                                />
                                <Label htmlFor="Recruiter" className='text-secondary'>Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ?
                            <Button className="w-full my-4 cursor-pointer" disabled={loading}>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait </Button>
                            : <Button type="submit" className="w-full my-4 cursor-pointer">Login</Button>
                    }
                    <span className='text-sm text-muted'>Don't have an account?
                        <Link to="/Signup" className="text-accent hover:underline">Signup</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login