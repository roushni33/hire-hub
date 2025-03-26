import { Bookmark } from 'lucide-react'
import React from 'react'
import { Button } from './ui/Button'
import Avatar from './ui/Avatar'
import { AvatarImage } from '@radix-ui/react-avatar'

const Job = () => {
  return (
    <div>
        <p>2 days ago</p>
        <Button variant='outline' className='rounded-full' size='icon'><Bookmark/></Button>
        
          <Button>
              <Avatar>
                 <AvatarImage>
                     
                 </AvatarImage>
              </Avatar>
          </Button>
      
    </div>
  )
}

export default Job