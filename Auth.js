import { useEffect, useState, useContext, createContext } from "react";
import Loading from "./components/Loading";
import Login from "./pages/login";
import { auth, db } from "./firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                console.log("user is null");
                setCurrentUser(null);
                setLoading(false);
                return;
            }
            const token = await user.getIdToken();
            // console.log("token\n", user);
            const userData = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                lastSeen: serverTimestamp(),
            };
            await setDoc(doc(db, "users", user.uid), userData);
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);
    if (loading) {
        return <Loading type={"bubbles"} color={"rgb(238, 174, 202)"} />;
    }
    if (!currentUser) {
        return <Login />;
    } else {
        return (
            <AuthContext.Provider value={{ currentUser }}>
                {children}
            </AuthContext.Provider>
        );
    }
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default () => useContext(AuthContext);
