import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/Button'
import { Avatar, AvatarImage } from './ui/Avatar'
import { Badge } from './ui/Badge'
import { useNavigate } from 'react-router-dom'


const Job = ({ job }) => {
  const navigate = useNavigate();
  if (!job) return null;
  const daysAgofunction = (mongodbtime) => {
    const createdAt = new Date(mongodbtime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  }
  return (
    <div className='p-5 bg-white rounded-lg shadow-md border border-gray-200'>
      <div className=' flex justify-between items-center'>

        <p className='text-sm text-gray-500'> {daysAgofunction(job?.createdAt) === 0 ? "Today" : `${daysAgofunction(job.createdAt)} days ago`} </p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark /></Button>
      </div>

      <div className='flex items-center gap-2 my-2'>
        <Button className='rounded-full' size='icon' variant='outline'>
          <Avatar>
            <AvatarImage src={job?.company?.logo}>

            </AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg'>{job?.company?.name}</h1>
          <p className='text-small text-gray-500'>{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant='ghost'>{job?.position} Positions</Badge>
        <Badge className='text-[#F83002] font-bold' variant='ghost'> {job?.jobType}</Badge>
        <Badge className='text-[#7209B7] font-bold' variant='ghost'> {job?.salary} LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button onClick={() => navigate(`/description/${job?._id}`)} variant='outline' className='rounded-3xl cursor-pointer'  >Details</Button>
        <Button className='bg-[#7209b7] rounded-3xl'  >Save for Later</Button>
      </div>

    </div>
  )
}

export default Job