import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/Label'
import { Input } from '../ui/input'
import { Button } from '../ui/Button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/Select'
import axios from 'axios'
import { JOB_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'





const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);



    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);

        setInput({ ...input, companyId: selectedCompany._id });
    }


    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/admin/jobs');
            }


        } catch (error) {
            toast.error(error?.response?.data?.message || "Something went wrong");

        } finally {
            setLoading(false);
        }

    }

    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen my-5'>
                <form onSubmit={submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>


                    <div className='grid grid-cols-2 gap-2'>

                        <div>
                            <Label className="text-primary">Title</Label>
                            <Input
                                type='text'
                                name="title"
                                value={input.title}
                                onChange={changeEventHandler}
                                className='my-1 bg-main text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent'
                            />
                        </div>

                        <div>
                            <Label className="text-primary">Description</Label>
                            <Input
                                type='text'
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className='my-1 bg-main text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent'
                            />
                        </div>


                        <div>
                            <Label className="text-primary" >Requirements</Label>
                            <Input
                                type='text'
                                name="requirements"
                                value={input.requirements}
                                onChange={changeEventHandler}
                                className='focus-visible:ring-offset-0 focus-visible:ring-0 my-1'
                            />
                        </div>


                        <div>
                            <Label className="text-primary">Salary</Label>
                            <Input
                                type='text'
                                name="salary"
                                value={input.salary}
                                onChange={changeEventHandler}
                                className='my-1 bg-main text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent'
                            />
                        </div>


                        <div>
                            <Label className="text-primary">Location</Label>
                            <Input
                                type='text'
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className='my-1 bg-main text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent'
                            />
                        </div>


                        <div>
                            <Label className="text-primary">Job Type</Label>
                            <Input
                                type='text'
                                name="jobType"
                                value={input.jobType}
                                onChange={changeEventHandler}
                                className='my-1 bg-main text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent'
                            />
                        </div>



                        <div>
                            <Label className="text-primary">Experience</Label>
                            <Input
                                type='text'
                                name="experience"
                                value={input.experience}
                                onChange={changeEventHandler}
                                className='my-1 bg-main text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent'
                            />
                        </div>

                        <div>
                            <Label className="text-primary">No of Position</Label>
                            <Input
                                type='Number'
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className='my-1 bg-main text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent'
                            />
                        </div>


                        {
                            companies.length > 0 && (
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Select a company" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            companies.map((company) => {
                                                return (
                                                    <SelectItem value={company?.name?.toLowerCase()}>{company?.name}</SelectItem>
                                                )
                                            })
                                        }


                                    </SelectContent>
                                </Select>
                            )
                        }
                    </div>



                    {
                        loading ? (
                            <Button className="w-full my-4 cursor-pointer" disabled={loading}>
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                Please wait
                            </Button>
                        ) : (
                            <Button
                                type="submit"
                                className="w-full my-4 cursor-pointer bg-accent text-accent-foreground hover:bg-accent/80"
                            >
                                Post New Job
                            </Button>
                        )
                    }


                    {
                        companies.length === 0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please register a company first , before posting  jobs</p>
                    }
                </form>

            </div>
        </div>
    )
}

export default PostJob