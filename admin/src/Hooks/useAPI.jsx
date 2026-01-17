import React, { useCallback, useContext } from 'react'
import { EnableLoader } from '../App'
import { ErrorState } from '../App'
import { RefreshState } from '../App'
import { useState } from 'react'
const useAPI = () => {
    const [error, setError] = useContext(ErrorState);
    const [loaderState ,setLoaderState] = useContext(EnableLoader);
    const [isRefreshing, setIsRefreshing] = useContext(RefreshState);

    const [data, setData] = useState("")
    // const [error, setError] = useState("")
    const [loading, setLoading] = useState(false);
    const postREQUEST = useCallback(async (PATH, BODY, HEADER) => {
        // setLoaderState(true);
        try {
            const RESPONSE = await fetch(`${import.meta.env.VITE_API_URL}${PATH}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("token"),
                        ...HEADER
                    },
                    body: BODY,
                    method: "POST"
                })
            const data = await RESPONSE.json();
            if (data) {
                // setLoaderState(false);
            }
            setData(data);
            return data
        }
        catch (error) {
            return error
        }
    }, [data, error, loading]);
    
    const getREQUEST = useCallback(async (PATH, BODY, HEADER) => {
        setIsRefreshing(true)
        try {
            const RESPONSE = await fetch(`${import.meta.env.VITE_API_URL}${PATH}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("token")
                    },
                    method: "GET"
                })
            const data = await RESPONSE.json();
            if (data) {
                setIsRefreshing(false)
            }
            setData(data);
            return data
        }
        catch (error) {
            setIsRefreshing(false)
            setLoaderState(false);
            setError(error);
            return error
        }
        finally{
            setIsRefreshing(false)
        }
    }, [data, error, loading]);
    
    console.log(error);
    
    const patchREQUEST = useCallback(async (PATH,COLLECTION_NAME  ,_id, COLUMNS ) => {
        try {
            // setLoaderState(true)
            const RESPONSE = await fetch(`${import.meta.env.VITE_API_URL}${PATH}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("token")
                    },
                    method: "PATCH",
                    body:JSON.stringify({
                        COLLECTION_NAME,
                        COLUMNS,
                        _id
                    })
                })
            const data = await RESPONSE.json();
            if (data) {
                // setLoaderState(false)
                setData(data);
            }
            return data
        }
        catch (error) {
            // setLoaderState(false);
            setError(error);
            return error
        }
    }, [data, error, loading]);
    
    
    const deleteREQUEST = useCallback(async (PATH,COLLECTION_NAME , WHERE ) => {
        try {
            const RESPONSE = await fetch(`${import.meta.env.VITE_API_URL}${PATH}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "authorization": localStorage.getItem("token")
                    },
                    method: "DELETE",
                    body:JSON.stringify({
                        COLLECTION_NAME,
                        WHERE
                    })
                })
            const data = await RESPONSE.json();
            setData(data);
            return data
        }
        catch (error) {
            setLoaderState(false);
            setError(error);
            return error
        }
    }, [data, error, loading]);
    
    return {postREQUEST ,getREQUEST ,deleteREQUEST,patchREQUEST , error, data , loading }
}

export default useAPI


// const response = await fetch("http://localhost:5500/login", {
//                     body: JSON.stringify({ email, password }),
//                     method: "POST",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 })