import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/Button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/Label'
import { Input } from '../ui/input'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { COMPANY_API_END_POINT } from '../../utils/constant'
import { useSelector } from 'react-redux'
import store from '../../redux/store'
import useGetCompanyById from '../../hooks/useGetCompanyById'

const CompanySetup = () => {
  const params = useParams();
  useGetCompanyById(params.id);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  });

  const { singleCompany } = useSelector(store => store.company);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();




  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }


  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();



    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true)
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (res.data.success) {
        toast.success(res.data.message);

        navigate('/admin/companies')
      }
    } catch (error) {
      console.log(error);;
      toast.error(error?.response?.data?.message || "Something went wrong");


    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    setInput({
      name: singleCompany?.name || "",
      description: singleCompany?.description || "",
      website: singleCompany?.website || "",
      location: singleCompany?.location || "",
      file: singleCompany?.file || null
    })
  }, [singleCompany]);



  return (
    <div className="bg-main min-h-screen">
      <Navbar />
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate('/admin/companies')}
              variant="outline"
              className="flex items-center gap-2 text-accent font-semibold border border-border hover:bg-elevated"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl text-accent">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2 text-primary">Company Name</Label>
              <Input
                type="text"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
                className="bg-elevated text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent"
              />
            </div>
            <div>
              <Label className="mb-2 text-primary">Description</Label>
              <Input
                type="text"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
                className="bg-elevated text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent"
              />
            </div>
            <div>
              <Label className="mb-2 text-primary">Website</Label>
              <Input
                type="text"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
                className="bg-elevated text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent"
              />
            </div>
            <div>
              <Label className="mb-2 text-primary">Location</Label>
              <Input
                type="text"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
                className="bg-elevated text-primary border-border placeholder:text-muted focus:ring-accent focus:border-accent"
              />
            </div>
            <div>
              <Label className="mb-2 text-primary">Logo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="file:bg-elevated file:text-primary file:border-border file:placeholder:text-muted file:focus:ring-accent file:focus:border-accent"
              />
            </div>
          </div>
          {loading ? (
            <Button className="w-full my-4 cursor-pointer bg-accent text-accent-foreground" disabled={loading}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4 cursor-pointer bg-accent text-accent-foreground hover:bg-accent/80">
              Update
            </Button>
          )}
        </form>
      </div>
    </div>
  )
}

export default CompanySetup