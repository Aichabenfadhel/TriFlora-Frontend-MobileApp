import React, { useState, useEffect, createContext, ReactNode, Dispatch, SetStateAction } from "react";
import axios from "axios";
import { Storage } from '@capacitor/storage';import PropTypes from 'prop-types';
import { userType } from "../Modals/userModal";



export interface AuthContextType {
    user: userType | null;
    token: string | null;
    setAuth: Dispatch<SetStateAction<AuthContextType>>;
}

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
        const getAuthData = async () => {
            try {
                const data = await Storage.get({ key: 'auth' });
                if (data.value) {
                    const parseData = JSON.parse(data.value);
                    setAuth({
                        ...parseData,
                        setAuth: setAuth, 
                    });
                }
            } catch (error) {
                console.error("Error retrieving auth data from storage:", error);
            }
        };

        getAuthData();
    }, []);

    useEffect(() => {
        const saveAuthData = async () => {
            try {
                await Storage.set({ key: 'auth', value: JSON.stringify(auth) });
            } catch (error) {
                console.error("Error saving auth data to storage:", error);
            }
        };

        saveAuthData();
    }, [auth]);

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = auth?.token;
    }, [auth.token]);

    return (
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

// Custom hook to use the authentication context
const useAuth = () => React.useContext(AuthContext);

export { useAuth, AuthProvider };
