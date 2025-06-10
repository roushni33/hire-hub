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
    <div className='p-5 bg-elevated rounded-lg shadow-md border border-border'>
      <div className='flex justify-between items-center'>
        <p className='text-sm text-muted'>
          {daysAgofunction(job?.createdAt) === 0 ? "Today" : `${daysAgofunction(job.createdAt)} days ago`}
        </p>
        <Button variant='outline' className='rounded-full text-accent' size='icon'>
          <Bookmark />
        </Button>
      </div>
      <div className='flex items-center gap-2 my-2'>
        <Button className='rounded-full bg-secondary/40' size='icon' variant='outline'>
          <Avatar>
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className='font-medium text-lg text-secondary'>{job?.company?.name}</h1>
          <p className='text-small text-accent'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2 text-primary'>{job?.title}</h1>
        <p className='text-sm text-muted'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge className='text-secondary font-bold border border-border' variant='ghost'>{job?.position} Positions</Badge>
        <Badge className='text-accent font-bold border border-border' variant='ghost'>{job?.jobType}</Badge>
        <Badge className='text-primary font-bold border border-border' variant='ghost'>{job?.salary} LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant='outline'
          className='rounded-3xl cursor-pointer text-secondary border border-border hover:bg-elevated hover:text-accent transition-colors'
        >
          Details
        </Button>
        <Button className='bg-accent text-bg-primary rounded-3xl hover:text-white transition-colors'>Save for Later</Button>
      </div>
    </div>
  )
}

export default Job