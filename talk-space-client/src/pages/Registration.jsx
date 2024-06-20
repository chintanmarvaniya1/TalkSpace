import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import uploadFile from '../utilities/uploadfile.js';
import axios from 'axios'
import toast from 'react-hot-toast';
import configuration from '../configuration/envImport.js';

function userRegistration() {

  const [data, setData] = useState({
    name: "",
    username:"",
    email: "",
    username:"",
    password: "",
    profile_pic: ""
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    
    e.preventDefault()
    e.stopPropagation()
    const URL = `${configuration.backendURL}/api/signup`
      try {
          const response = await axios.post(URL,data)

          toast.success(response.data.message)

          if(response.data.success){
              setData({
                name : "",
                email : "",
                username:"",
                password : "",
                profile_pic : ""
              })

              navigate('/email')

          }
      } catch (error) {
          toast.error(error?.response?.data?.message)
      }

  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0]

      const uploadPhoto = await uploadFile(file)

      setUploadPhoto(file)

      setData((preve)=>{
        return{
          ...preve,
          profile_pic : uploadPhoto?.url
        }
      })
  }
  const handleClearUploadPhoto = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  return (
    <div className='mt-5'>
      <div className='bg-white  w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
        <h3 className='text-center'>Welcome to Chat app!</h3>

        <form className='grid gap-4 mt-5' onSubmit={handleSubmit}>
          <InputField label="Name" type="text" name='name' placeholder="Enter Name"
            value={data.name} handleOnChange={handleOnChange} />

          <InputField label="Username" type="text" name='username' placeholder="Enter Username"
            value={data.username} handleOnChange={handleOnChange} />            

          <InputField label="Email" type="email" name='email' placeholder="Enter Email"
            value={data.email} handleOnChange={handleOnChange} />

          <InputField label="Password" type="password" name='password' placeholder="Enter Password"
            value={data.password} handleOnChange={handleOnChange} />


          <div className='flex flex-col gap-1'>
            <label htmlFor='profile_pic'>Photo :

              <div className='h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                  }
                </p>
                {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                      <IoClose />
                    </button>
                  )
                }

              </div>

            </label>

            <input
              type='file'
              id='profile_pic'
              name='profile_pic'
              className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
              onChange={handleUploadPhoto}
            />
          </div>


          <button
            className='bg-primary text-lg  px-4 py-1 hover:bg-secondary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'
          >
            Register
          </button>

        </form>

        <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='hover:text-primary font-semibold'>Login</Link></p>
      </div>
    </div>
  )
}

export default userRegistration