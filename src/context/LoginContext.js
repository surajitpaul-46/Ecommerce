const { createContext, useState } = require("react");

export const LoginContext=createContext()

export default function LoginProvider(props)
{
    let [isLogin, setIsLogin]=useState(false)
    let [userId, setUserId]=useState(null)
    return(
        <LoginContext.Provider value={{isLogin,setIsLogin,userId,setUserId}}>
            {props.children}
        </LoginContext.Provider>
    )
}