import { createContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, sendEmailVerification, signOut, updateProfile } from "firebase/auth";
import app from "../Firebase/firebase.config";
import LoadingBar from 'react-top-loading-bar'

export const AuthContext = createContext();

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [progress, setProgress] = useState(25)
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // console.log(user);

  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
      return signOut(auth);
  }

  const sendVerficationEmail = (currentUser) => {
    return sendEmailVerification(currentUser);
  }

  const updateUserProfile = (currentUser, displayName = "", photoURL = "") => {
    return updateProfile(currentUser, {
      displayName: displayName? displayName : currentUser.displayName,
      photoURL: photoURL ? photoURL : currentUser.photoURL
    });
  }

  useEffect(() => {
     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        if((currentUser && currentUser?.emailVerified) || !currentUser) {
            setUser(currentUser);
            // console.log(user);
        }
        setIsLoading(false);
        setProgress(100)
        // console.log(user)
     })
     return () => {
        unsubscribe();
     }
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        auth,
        user,
        createUser,
        sendVerficationEmail,
        updateUserProfile,
        login,
        logout,
        isLoading,
        setIsLoading,
        setProgress,
      }}
    >
      {children}
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    </AuthContext.Provider>
  );
};

export default AuthProvider;
