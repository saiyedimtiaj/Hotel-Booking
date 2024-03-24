import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import auth from "./Firebase.config";



export const AuthContext = createContext([])
const provider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {
    const [user,setUser] = useState([])
    const [loading,setLoading] = useState(true)

    const signup = (email,password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const signin = (email,password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const Logout = () =>{
        setLoading(true)
        return signOut(auth)
    }

    const profile = (name,image) => {
        setLoading(true)
        return updateProfile(auth.currentUser,{
            displayName: name, 
            photoURL: image
        })
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth,provider)
    }

    useEffect(()=>{
        const subscribe = onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
            console.log(currentUser);
        })
        return () =>{
            return subscribe()
        }
    },[])

    const userInfo = {
        loading,user,signup,signin,profile,Logout,googleLogin
    }

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;