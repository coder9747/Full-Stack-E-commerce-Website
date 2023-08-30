import { createContext } from "react";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";

export const UserAuthContext = createContext();

export default function({children})
{
    const navigate = useNavigate();
    const SignUpUser = async(info)=>
    {
        const req = await fetch("http://localhost:4500/api/user/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(info)
        })
        const data = await req.json();
        if(data?.succes)
        {
            toast.success(data.message);
            localStorage.setItem("token",data.token);
            setTimeout(() => {
                navigate("/home");
            }, 1000);
            
        }
        else
        {
            toast.error(data.message);
        }
        
    }
    const loginUser = async(info)=>
    {
        const req = await fetch("http://localhost:4500/api/user/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(info),
        })
        const data = await req.json();
        if(data?.succes)
        {
            //we can save token to localstorage
            localStorage.setItem("token",data.token);
            toast.success(data.message);
            setTimeout(() => {
                navigate("/home");
            }, 1000);
        }
        else
        {
            toast.error(data.message);
        }
    }
    return <UserAuthContext.Provider value={{
        SignUpUser,
        loginUser,
    }}>
                {children}
          </UserAuthContext.Provider>
}