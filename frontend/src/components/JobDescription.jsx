import React, { useEffect } from 'react'
import { Badge } from './ui/Badge'
import { Button } from './ui/Button'
import { useParams } from 'react-router-dom';

import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setSingleJob } from '../redux/jobSlice';
import { toast } from 'sonner'
import Navbar from './shared/Navbar';

const JobDescription = () => {
    const { singleJob } = useSelector(store => store.jobs);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth);
    const isApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setSingleJob(res.data.data.job));
                toast.dismiss();
                const updateSingleJob = { ...singleJob, applications: [...singleJob.applications, { applicant: user?._id }] };
                dispatch(setSingleJob(updateSingleJob));
                toast.success("Job applied successfully");
            }
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {

                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });

                if (res.data.success) {
                    dispatch(setSingleJob(res.data.data.job));
                    toast.dismiss();
                    toast.success("Job fetched successfully");
                }
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        }
        fetchSingleJob();
    }, [jobId, dispatch, user?._id]);
    return (
        <>

            <Navbar />
            <div className='max-w-7xl mx-auto px-20 py-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='font-bold text-xl'>{singleJob?.title}</h1>
                        <div className='flex items-center gap-2 mt-4'>
                            <Badge className='text-blue-700 font-bold' variant='ghost'>{singleJob?.position} Positions</Badge>
                            <Badge className='text-[#F83002] font-bold' variant='ghost'> {singleJob?.jobType}</Badge>
                            <Badge className='text-[#7209B7] font-bold' variant='ghost'> {singleJob?.salary} LPA</Badge>
                        </div>
                    </div>

                    <Button onClick={isApplied ? null : applyJobHandler}
                        disabled={isApplied}
                        className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#503d70]'}`}>{isApplied ? "Already Applied" : 'Apply Now'}
                    </Button>
                </div>
                <h1 className='border-b-2 border-b-gray-300 font-medium mt-2 py-4'>Job Description</h1>
                <div className='my-4'>
                    <h1 className='font-bold my-1'>Role:<span className='pl-4 font-normal text-secondary'>{singleJob?.title}</span></h1>
                    <h1 className='font-bold my-1'>Location:<span className='pl-4 font-normal text-accent'>{singleJob?.location}</span></h1>
                    <h1 className='font-bold my-1'>Description:<span className='pl-4 font-normal text-muted'>{singleJob?.description}</span></h1>
                    <h1 className='font-bold my-1'>Experience:<span className='pl-4 font-normal text-secondary'>{singleJob?.experience}</span></h1>
                    <h1 className='font-bold my-1'>Salary:<span className='pl-4 font-normal text-accent'>{singleJob?.salary} LPA</span></h1>
                    <h1 className='font-bold my-1'>Total Applicants:<span className='pl-4 font-normal text-primary'>{singleJob?.applications?.length || 0}</span></h1>
                    <h1 className='font-bold my-1'>Posted Date:<span className='pl-4 font-normal text-muted'>{singleJob?.createdAt?.split("T")[0]}</span></h1>
                </div>

            </div>
        </>
    )
}

export default JobDescription