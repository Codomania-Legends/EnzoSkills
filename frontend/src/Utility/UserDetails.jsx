import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { sileo } from 'sileo';

export const userContext = createContext()

export function UserProvider({ children }) {
    const [username, setUsername] = useState("USER")
    const [userDetails, setUserDetails] = useState([])

    async function getUserDetails() {
        if (username == "USER") {
            const id = Cookies.get("user_id")
            const data = await axios.get(`http://localhost:3000/user/getuser/${id}`)
            setUserDetails(data.data.user)
            setUsername(data.data.user.user_name)
        }
    }

    useEffect(() => {
        sileo.promise(getUserDetails, {
            success: "Details fetched successfully",
            error: "Failed to fetch details",
            loading: "Fetching details..."
        })
    }, [])

    return (
        <userContext.Provider value={{
            username,
            setUserDetails,
            userDetails,
            setUsername
        }}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () => {
    const contextValue = useContext(userContext);

    if (!contextValue) {
        throw new Error("useUser must be used within a UserProvider! 🚨");
    }

    return contextValue;
};