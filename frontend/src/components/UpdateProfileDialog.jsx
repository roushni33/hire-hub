import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/Dialog'
import { Label } from './ui/Label'
import { Input } from './ui/input'
import { Button } from './ui/Button'
import { Loader2 } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'sonner'
import { USER_API_END_POINT } from '../utils/constant'
import { setUser } from '../redux/authSlice'


const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
    const [input, setInput] = useState({
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phoneNumber || "",
        bio: user?.profile?.bio || "",
        skills: user?.profile.skills?.map(skill => skill) || [],
        file: user?.profile?.resume || ""

    });

    React.useEffect(() => {
  if (open) {
    setInput({
      fullName: user?.fullName || "",
      email: user?.email || "",
      phoneNumber: user?.phoneNumber || "",
      bio: user?.profile?.bio || "",
      skills: (user?.profile.skills && Array.isArray(user.profile.skills)) ? user.profile.skills.join(", ") : "",
      file: user?.profile?.resume || ""
    });
  }
}, [open, user]);

    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const fileChangeHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullName", input.fullName);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true)
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.data.user));
                toast.success(res.data.message);
                 setOpen(false);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message || "Something went wrong!");
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen} >

                <DialogContent className='sm:max-w-[425px] max-h-[80vh] overflow-y-auto bg-elevated border border-border text-primary'  >
                    <DialogHeader>
                        <DialogTitle>
                            Update Profile

                        </DialogTitle>

                    </DialogHeader>
                    <form onSubmit={submitHandler}>
                        <div className='grid gap-4 py-4'>
                            <Label className="text-md font`-bold text-primary text-right" htmlFor="name" > Full Name </Label>
                            <Input
                                type="text"
                                id='name' className='border border-border rounded-md p-2 bg-primary text-primary placeholder:text-muted'
                                name="fullName"
                                placeholder='Enter your full name'
                                value={input.fullName}
                                onChange={changeEventHandler}
                            />
                            <Label className="text-md font-bold text-primary text-right" htmlFor="email" > Email </Label>
                            <Input
                                type="email"
                                id='email'
                                name="email"
                                className='border border-border rounded-md p-2 bg-primary text-primary placeholder:text-muted'
                                placeholder='Enter your email'
                                value={input.email}
                                onChange={changeEventHandler}
                            />
                            <Label className="text-md font-bold text-primary text-right" htmlFor="phone" > Phone Number </Label>
                            <Input
                                type="text"
                                value={input.phoneNumber}
                                id='phone'
                                name="phoneNumber"
                                className='border border-border rounded-md p-2 bg-primary text-primary placeholder:text-muted'
                                placeholder='Enter your phone number'
                                onChange={changeEventHandler}
                            />
                            <Label className="text-md font-bold text-primary text-right" htmlFor="skills" > Skills </Label>
                            <Input
                                type="text"
                                value={input.skills}
                                id='skills'
                                name="skills"
                                className='border border-border rounded-md p-2 bg-primary text-primary placeholder:text-muted'
                                placeholder='Enter your skills'
                                onChange={changeEventHandler}
                            />
                            <Label className="text-md font-bold text-primary text-right" htmlFor="bio" > Bio </Label>
                            <Input
                                type="text"
                                value={input.bio}
                                id='bio'
                                name="bio"
                                className='border border-border rounded-md p-2 bg-primary text-primary placeholder:text-muted'
                                placeholder='Bio'
                                onChange={changeEventHandler}
                            />
                            <Label className="text-md font-bold text-primary text-right" htmlFor="resume" > Resume </Label>
                            <Input
                                type="file"
                                id='resume'
                                name='file'
                                accept='application/pdf'
                                onChange={fileChangeHandler}
                                className='border border-border rounded-md p-2 bg-primary text-primary file:bg-elevated file:text-secondary file:border-none file:rounded-md file:p-2 file:cursor-pointer placeholder:text-muted'
                                placeholder='Upload your resume'
                            />

                        </div>
                        <DialogFooter>


                            {
                                loading ?
                                    <Button className="w-full my-4 cursor-pointer" disabled={loading}>
                                        <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                        Please wait </Button>
                                    : <Button type="submit" className="w-full my-4 cursor-pointer">Update</Button>
                            }




                        </DialogFooter>
                    </form>
                </DialogContent>

            </Dialog>
        </div>
    )
}

export default UpdateProfileDialog