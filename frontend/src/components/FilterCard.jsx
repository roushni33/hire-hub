
import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/Label'
const filterData = [
  {
    filterType: 'Location',
    array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Gurgaon", "Mumbai", "chennai", "Kolkata", "Noida"]
  },

  {
    filterType: 'Industry',
    array: ["Frontend Developer", "Backend Developer", "Full Stack Developer", "Data Science", "DevOps "]
  },

  {
    filterType: 'Salary',
    array: ["0-40k", "42-1lakh", "1lakh-5lakh"]
  }


]
const FilterCard = () => {
  return (
    <div className='w-full bg-white p-5 rounded-lg shadow-md border border-gray-200'>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr className='mt-3' />
      <RadioGroup>
        {
          filterData.map((data, index) => (
            <div >
              <h1 className='font-bold text-lg '>{data.filterType}</h1>
              {
                data.array.map((item, index) => (
                  <div className='flex items-center space-x-2 my-2' >
                    <RadioGroupItem value={item} name={data.filterType} />
                    <Label>{item}</Label>
                  </div>
                ))
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard