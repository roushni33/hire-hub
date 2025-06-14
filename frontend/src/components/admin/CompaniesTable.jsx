import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/Table'
import { Avatar, AvatarImage } from '../ui/Avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/Popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const navigate = useNavigate();
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());

        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])
    return (
        <div>
            <Table>
                <TableCaption>
                    A list of your recent registered companies.
                </TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-accent font-semibold">Logo</TableHead>
                        <TableHead className="text-accent font-semibold">Name</TableHead>
                        <TableHead className="text-accent font-semibold">Date</TableHead>
                        <TableHead className="text-right text-accent font-semibold">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {

                        filterCompany?.map((company) => (
                            <tr key={company._id} className=" text-primary">
                                <TableCell>
                                    <Avatar className="bg-elevated border border-border">
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-muted hover:text-accent transition-colors" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-elevated text-primary border-border shadow-lg">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-2 cursor-pointer w-fit hover:bg-accent/10 rounded px-2 py-1 transition-colors"
                                            >
                                                <Edit2 className="w-4 text-accent" />
                                                <span className="ml-2">Edit</span>
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

export default CompaniesTable