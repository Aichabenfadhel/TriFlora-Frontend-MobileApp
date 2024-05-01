import React,{ useState, useEffect, useContext, createContext, ReactNode, Dispatch, SetStateAction, Children } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import { userType } from "../Modals/userModal";

export interface AuthContextType {
    user: userType | null;
    token: string | null;
    setAuth: Dispatch<SetStateAction<AuthContextType>>;
}

const AuthProviderPropType={
    Children : PropTypes.node.isRequired
};
const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    setAuth: () => null, 
});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [auth, setAuth] = useState<AuthContextType>({
        user: null,
        token: null,
        setAuth: () => null,
    });

    useEffect(() => {
        const data = localStorage.getItem('auth');
        if (data) {
            const parseData = JSON.parse(data);
            setAuth({
                ...parseData,
                setAuth: setAuth, 
            });
        }
    }, []);

    
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = auth?.token;
    }, [auth.token]);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook pour utiliser le contexte d'authentification
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
