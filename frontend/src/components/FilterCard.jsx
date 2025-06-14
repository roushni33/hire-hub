
import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/Radio-group'
import { Label } from './ui/Label'
import { useDispatch } from 'react-redux'
import { setSearchQuery } from '../redux/jobSlice'
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
  const [selectedValue, setSelectedvalue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedvalue(value);
  }
  useEffect(() => {
    dispatch(setSearchQuery(selectedValue))
  }, [selectedValue])
  return (
    <div className='w-full bg-elevated p-5 rounded-lg shadow-md border border-border'>
      <h1 className='font-bold text-lg text-primary'>Filter Jobs</h1>
      <hr className='mt-3 border-border' />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data, index) => (
            <div key={index}>
              <h1 className='font-bold text-lg text-secondary'>{data.filterType}</h1>
              {
                data.array.map((item, idx) => {
                  const itemid = `id${index} - ${idx}`
                  return (
                    <div className='flex items-center space-x-2 my-2' key={itemid}>
                      <RadioGroupItem value={item} name={data.filterType} id={itemid} />
                      <Label htmlFor={itemid} className='text-muted'>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard