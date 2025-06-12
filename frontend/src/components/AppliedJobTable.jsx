import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/Table'
import { Badge } from './ui/Badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.jobs)
    return (
        <div className='bg-elevated rounded-2xl'>
            <Table>
                <TableCaption className='text-muted'>
                    A list of your applied jobs
                </TableCaption>
                <TableHeader>
                    <TableRow className='bg-elevated border-b border-border'>
                        <TableHead className='text-secondary'>Date</TableHead>
                        <TableHead className='text-secondary'>Job Role</TableHead>
                        <TableHead className='text-secondary'>Company</TableHead>
                        <TableHead className="text-right text-secondary">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allAppliedJobs.length <= 0
                            ? <span className='text-muted'>You haven't applied any job yet.</span>
                            : allAppliedJobs.map((appliedJob) => (
                                <TableRow key={appliedJob._id} className='bg-elevated border-b border-border'>
                                    <TableCell className='text-muted'>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell className='text-primary'>{appliedJob?.job?.title}</TableCell>
                                    <TableCell className='text-secondary'>{appliedJob?.job?.company?.name}</TableCell>
                                    <TableCell className='text-right'>
                                        <Badge className={
                                            `${appliedJob?.status.toLowerCase() === "rejected"
                                                ? 'bg-red-500 text-white'
                                                : appliedJob.status.toLowerCase() === 'pending'
                                                    ? 'bg-gray-500 text-primary'
                                                    : 'bg-green-500 text-bg-primary'
                                            } font-bold border border-border`
                                        }>
                                            {appliedJob.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable