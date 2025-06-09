import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '../../utils/constant'
const shortlistingStatus = ["Accepted", "Rejected"]
const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application)
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                 withCredentials: true 
                });
                if(res.data.success){
                   toast.success(res.data.data);
                }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
    return (
        <div>
            <Table>
                <TableCaption>A list of your recent applied user</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact Number</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((application) => {
                            const applicant = application.applicant
                            return <tr key={application._id}>
                                <TableCell>{applicant?.fullName}</TableCell>
                                <TableCell>{applicant?.email}</TableCell>
                                <TableCell>{applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        applicant?.profile?.resume ? <a className='text-blue-600 cursor-pointer' href={applicant?.profile?.resume} target='blank'>{applicant?.profile?.resume}</a> : <span className='text-zinc-500'>NA</span>

                                    }
                                </TableCell>
                                <TableCell>{application?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='float-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal />
                                        </PopoverTrigger>
                                        <PopoverContent className='w-32'>
                                            {
                                                shortlistingStatus.map((status, index) => {
                                                    return (
                                                        <div onClick={() => statusHandler(status,application._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                                                            <span>{status}</span>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </PopoverContent>
                                    </Popover>

                                </TableCell>
                            </tr>
                        })
                    }

                </TableBody>

            </Table>
        </div>
    )
}

export default ApplicantsTable