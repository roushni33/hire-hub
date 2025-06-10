import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table'
import { Avatar, AvatarImage } from '../ui/Avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { Edit2, Eye, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AdminJobsTable = () => {
    const navigate = useNavigate();
    const { allAdminJobs, searchJobByText } = useSelector(store => store.jobs);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    useEffect(() => {
        const filteredJobs = allAdminJobs.length >= 0 && allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true
            };
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase());

        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText])
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent posted jobs.
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-elevated border-b border-border">
                        <TableHead className="text-accent font-semibold">Company Name</TableHead>
                        <TableHead className="text-accent font-semibold">Role</TableHead>
                        <TableHead className="text-accent font-semibold">Date</TableHead>
                        <TableHead className="text-right text-accent font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        filterJobs?.map((job) => (
                            <tr key={job._id}>
                                <TableCell>{job?.company?.name}</TableCell>
                                <TableCell>{job?.title}</TableCell>

                                <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-muted hover:text-accent transition-colors" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-elevated text-primary border-border shadow-lg">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${job._id}`)}
                                                className="flex items-center gap-2 cursor-pointer w-fit hover:bg-accent/10 rounded px-2 py-1 transition-colors"
                                            >
                                                <Edit2 className="w-4 text-accent" />
                                                <span className="ml-2">Edit</span>
                                            </div>
                                            <div
                                                onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                                                className="flex items-center w-fit gap-2 cursor-pointer mt-2 hover:bg-accent/10 rounded px-2 py-1 transition-colors"
                                            >
                                                <Eye className="w-4 text-accent" />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>


                            </tr>




                        ))
                    }



                </TableBody>
            </Table>
        </div>
    )
}

export default AdminJobsTable