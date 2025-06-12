import React, { useState, useEffect } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { BASE_URL } from '../utils/constant'
function decodeJwt(token){
    try{
        const parts=token.split('.')
        return JSON.parse(atob(parts[1]))
    }catch(err){
        console.warn('Could not decode JWT:', err)
        return null
    }
}

const Manager=({ onLogout })=>{
    const [showPassword, setShowPassword]=useState(false)
    const [formState, setFormState]=useState({
        website: '',
        username: '',
        password: ''
    })
    const [passwordList, setPasswordList]=useState([])
    const [currentUser, setCurrentUser]=useState(null)

    const token=localStorage.getItem('token')

    useEffect(()=>{
        if(token){
            const decodedUser=decodeJwt(token)
            setCurrentUser(decodedUser)
        }
    }, [token])

    useEffect(()=>{
        if(!token){
            window.location.href='/login'
        }
    }, [token])

    const loadPasswords=async()=>{
        try{
            const res=await fetch(`${BASE_URL}/api/passwords`,{
                headers: { Authorization: `Bearer ${token}` }
            })

            if(res.status===401){
                toast.error('Session expired. Please login again.')
                localStorage.removeItem('token')
                window.location.href='/login'
                return
            }

            const data=await res.json()
            setPasswordList(data)
        }catch(e){
            console.error('Fetch error:', e)
            toast.error('Could not load passwords!')
        }
    }

    useEffect(()=>{
        if(token){
            loadPasswords()
        }
    },[])

    const handleInputChange=(e)=>{
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const handleSave=async()=>{
        if(formState.website.length<4 || formState.username.length<4 || formState.password.length<4){
            toast('Please fill out all fields properly.', { theme: "dark" })
            return
        }

        if(formState.id){
            await fetch(`${BASE_URL}/api/passwords/${formState.id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        }

        const res=await fetch(`${BASE_URL}/api/passwords`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                website: formState.website,
                username: formState.username,
                password: formState.password
            })
        })

        if(res.ok){
            toast('Password saved successfully!', { theme: "dark" })
            setFormState({ website: '', username: '', password: '' })

            loadPasswords()
        }else{
            toast.error('Could not save password')
        }
    }

    const handleDelete=async(id)=>{
        if(window.confirm('Delete this password?')){
            const res=await fetch(`${BASE_URL}/api/passwords/${id}`,{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if(res.ok){
                toast('Password deleted.', { theme: "dark" })
                setPasswordList(passwordList.filter(item=>item._id!==id))
            }else{
                toast.error('Failed to delete password.')
            }
        }
    }

    const handleEdit=(id)=>{
        const toEdit=passwordList.find(pw=>pw._id===id)
        if(toEdit){
            setFormState({ ...toEdit, id: toEdit._id })
        }
    }

    const handleCopy=(text)=>{
        navigator.clipboard.writeText(text)
        toast('Copied to clipboard.', { theme: "dark" })
    }

    const doLogout=()=>{
        localStorage.removeItem('token')
        onLogout && onLogout()
        window.location.href='/login'
    }

    return (
        <>
            <ToastContainer theme="dark" />
            <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
                <div className="p-2 md:px-5 md:py-8 md:mycontainer overflow-auto mb-9 h-full">
                    <div className="flex justify-between items-center">
                        <div className="logo font-bold text-4xl text-center">
                            <span className='text-[#a59afffa]'>&lt;</span>
                            Pass
                            <span className='text-[#a59afffa]'>OP/&gt;</span>
                        </div>
                        {currentUser && (
                            <div className="flex flex-col items-end">
                                <span className='text-[#c4bcfffa] text-sm'>
                                    Logged in as: <b>{currentUser.email}</b>
                                </span>
                                <button
                                    onClick={doLogout}
                                    className='bg-[#3A1D87] hover:bg-[#6a42d8] rounded-full py-1 px-4 text-white mt-1 text-xs'
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <p className='text-[#9e92f8fa] text-lg text-center'>Your own Password Manager</p>

                    <div className="flex flex-col p-4 gap-8">
                        <input
                            onChange={handleInputChange}
                            name='website'
                            value={formState.website}
                            placeholder='Enter website URL'
                            type="text"
                            className='rounded-full text-black border-[3px] border-[#4e2cd7fa] py-1 px-4'
                        />

                        <div className="flex md:flex-row flex-col w-full justify-between gap-8">
                            <input
                                onChange={handleInputChange}
                                name='username'
                                value={formState.username}
                                placeholder='Enter Username'
                                type="text"
                                className='w-full rounded-full text-black border-[3px] border-[#4e2cd7fa] py-1 px-4'
                            />

                            <div className="relative md:w-2/4 flex items-center">
                                <input
                                    onChange={handleInputChange}
                                    name='password'
                                    value={formState.password}
                                    placeholder='Enter Password'
                                    type={showPassword ? 'text' : 'password'}
                                    className='w-full rounded-full text-black border-[3px] border-[#4e2cd7fa] py-1 px-4'
                                />
                                <span
                                    className='absolute right-5 cursor-pointer'
                                    onClick={()=>setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEye fill='black' /> : <FaEyeSlash fill='black' />}
                                </span>
                            </div>
                        </div>

                        <div className="flex justify-center" onClick={handleSave}>
                            <button className='flex justify-center items-center bg-[#3A1D87] hover:bg-[#6a42d8] rounded-full py-1 px-4 w-fit gap-3 border-gray-400 border-[1px]'>
                                <lord-icon
                                    src="https://cdn.lordicon.com/jgnvfzqg.json"
                                    trigger="hover" colors="primary:#ffffff"
                                ></lord-icon>
                                Save
                            </button>
                        </div>
                    </div>

                    <div className='passwords'>
                        <h2 className='text-2xl font-bold py-5 text-[#c4bcfffa]'>Your passwords</h2>
                        {passwordList.length===0 && <div>No passwords to show.</div>}
                        {passwordList.length!==0 && (
                            <table className="table-auto w-full overflow-hidden rounded-md border border-gray-50">
                                <thead className='bg-[#3A1D87]'>
                                    <tr>
                                        <th className='py-2'>Website URL</th>
                                        <th className='py-2'>Username</th>
                                        <th className='py-2'>Password</th>
                                        <th className='py-2'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-[#1f0d4f]'>
                                    {passwordList.map((entry, idx)=>(
                                        <tr key={entry._id || idx}>
                                            <td className='py-2 border border-gray-500 text-center'>
                                                <div className="flex justify-center items-center gap-2">
                                                    <a href={entry.website} target='_blank' rel="noopener noreferrer">{entry.website}</a>
                                                    <div className="size-7 cursor-pointer" onClick={()=>handleCopy(entry.website)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" colors="primary:#ffffff"
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-gray-500 text-center'>
                                                <div className="flex justify-center items-center gap-2">
                                                    <span>{entry.username}</span>
                                                    <div className="size-7 cursor-pointer" onClick={()=>handleCopy(entry.username)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" colors="primary:#ffffff"
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-gray-500 text-center'>
                                                <div className="flex justify-center items-center gap-2">
                                                    <span>{"*".repeat(5)}</span>
                                                    <div className="size-7 cursor-pointer" onClick={()=>handleCopy(entry.password)}>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/iykgtsbt.json"
                                                            trigger="hover" colors="primary:#ffffff"
                                                            style={{ width: "25px", height: "25px", paddingTop: "3px", paddingLeft: "3px" }}
                                                        ></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='py-2 border border-gray-500 text-center'>
                                                <div className="flex gap-3 justify-center">
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/gwlusjdu.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff"
                                                        style={{ width: "20px", height: "20px" }}
                                                        onClick={()=>handleEdit(entry._id)}
                                                    ></lord-icon>
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        colors="primary:#ffffff"
                                                        style={{ width: "20px", height: "20px" }}
                                                        onClick={()=>handleDelete(entry._id)}
                                                    ></lord-icon>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
