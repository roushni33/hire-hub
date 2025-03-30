import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/Table'
import { Badge } from './ui/Badge'

const AppliedJobTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your applied jobs
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        [1, 2, 3, 4].map((item, index) => (

                            <TableRow key={index}>
                                <TableCell>28-03-2025</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className='text-right'><Badge>Selected</Badge></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable