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
            if (res.data.success) {
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
                        <TableHead className="text-accent font-semibold">Full Name</TableHead>
                        <TableHead className="text-accent font-semibold">Email</TableHead>
                        <TableHead className="text-accent font-semibold">Contact Number</TableHead>
                        <TableHead className="text-accent font-semibold">Resume</TableHead>
                        <TableHead className="text-accent font-semibold">Date</TableHead>
                        <TableHead className="text-right text-accent font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((application) => {
                            const applicant = application.applicant
                            return <tr key={application._id} className="   text-primary">
                                <TableCell>{applicant?.fullName}</TableCell>
                                <TableCell>{applicant?.email}</TableCell>
                                <TableCell>{applicant?.phoneNumber}</TableCell>
                                <TableCell >
                                    {
                                        applicant?.profile?.resume ? <a className='text-accent underline hover:text-accent/80 transition-colors' href={applicant?.profile?.resume} target='blank'>{applicant?.profile?.resume}</a> : <span className='text-muted'>NA</span>

                                    }
                                </TableCell>
                                <TableCell>{application?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className='float-right cursor-pointer'>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-muted hover:text-accent transition-colors" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-elevated text-primary border-border shadow-lg">
                                            {shortlistingStatus.map((status, index) => (
                                                <div
                                                    onClick={() => statusHandler(status, application._id)}
                                                    key={index}
                                                    className="flex w-fit items-center my-2 cursor-pointer hover:bg-accent/10 rounded px-2 py-1 transition-colors"
                                                >
                                                    <span className="text-accent mr-2 flex items-center gap-1">
                                                        {status}
                                                        {status === "Accepted" && (
                                                            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded bg-green-600/20 border border-green-500 text-green-500 text-xs font-bold">
                                                                &#10003;
                                                            </span>
                                                        )}
                                                        {status === "Rejected" && (
                                                            <span className="ml-1 inline-flex items-center justify-center w-5 h-5 rounded bg-red-600/20 border border-red-500 text-red-500 text-xs font-bold">
                                                                &#10007;
                                                            </span>
                                                        )}
                                                    </span>
                                                </div>
                                            ))}
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