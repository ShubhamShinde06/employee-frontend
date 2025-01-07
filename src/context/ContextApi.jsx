import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const ContextApi = createContext({isAuth: false})

export const ContextProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState()
    const [sidebar , setSidebar] = useState(true)

    const [user, setUser] = useState(() => {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        axios.get('/api/auth/me',{
          withCredentials: true,
        })
        .then((res) => {
          setIsAuth(true)
          localStorage.setItem('user', JSON.stringify(res.data.user))
        })
        .catch((error) => {
          setUser({})
          setIsAuth(false)
          console.log(error)
        })
      },[])
   
    return (
        <ContextApi.Provider
            value={{
                user,
                setUser,
                isAuth,
                setIsAuth,
                sidebar,
                setSidebar
            }}
        >
            {children}
        </ContextApi.Provider>
    )

}

export const UseContext = () => useContext(ContextApi)