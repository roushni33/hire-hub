import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/Label'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '../../redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [companyName, setCompanyName] = useState();
    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/registerCompany`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
            if (res?.data?.success) {
                dispatch(setSingleCompany(res?.data?.data?.company));
                toast.success(res?.data?.message);
                const companyId = res?.data?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="bg-main min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto">
                <div className="my-10">
                    <h1 className="font-bold text-2xl text-accent">Your Company Name</h1>
                    <p className="text-muted">What would you like to give your company name? You can change this later.</p>
                </div>

                <Label className="text-primary">Company Name</Label>
                <Input
                    type="text"
                    className="my-2 bg-elevated text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent"
                    placeholder="JobHunt, Microsoft, Google ...."
                    onChange={(e) => setCompanyName(e.target.value)}
                />
                <div className="flex items-center gap-2 my-10">
                    <Button
                        variant="outline"
                        className="border border-border text-accent hover:bg-elevated"
                        onClick={() => navigate('/admin/companies')}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-accent text-accent-foreground hover:bg-accent/80"
                        onClick={registerNewCompany}
                    >
                        Continue
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate