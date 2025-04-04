import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/Avatar'
import { Button } from './ui/Button'
import { Contact, Mail, Pen } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Badge } from './ui/Badge'
import { Label } from './ui/Label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'

const isResume = true
const Profile = () => {
    const [open, setOpen] = useState(false)

    const { user } = useSelector(state => state.auth)
    const skills = user.profile.skills ?? [] // ['React', 'Node', 'Express', 'MongoDB']

    return (
        <div >
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5  p-8 '>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4 '>
                        <Avatar className="w-20 h-20">
                            <AvatarImage src="https://thumbs.dreamstime.com/b/d-icon-avatar-cute-smiling-woman-cartoon-hipster-character-people-close-up-portrait-isolated-transparent-png-background-352288894.jpg" />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullName}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>

                    <Button onClick={() => setOpen(true)} className='text-right' variant='outline'><Pen /></Button>

                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-4 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-4 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>

                <div>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-2 mt-2'>
                        {
                            skills.length != 0 ? skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>No skills found</span>
                        }
                    </div>

                </div>

                <div className='grid max-w-sm w-full items-center gap-2 mt-1'>
                    <Label className="text-md font-bold "> Resume </Label>
                    {
                        isResume ? <a className='text-blue-500 w-full hover:underline cursor-pointer' target='blank ' href={user?.profile?.resume}>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                <AppliedJobTable />

            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    )
}

export default Profile