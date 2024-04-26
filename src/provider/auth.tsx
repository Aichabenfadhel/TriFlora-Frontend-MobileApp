import React,{ useState, useEffect, useContext, createContext, ReactNode, Dispatch, SetStateAction, Children } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

interface AuthContextType {
    user: string | null;
    token: string | null;
    setAuth: Dispatch<SetStateAction<AuthContextType>>;
}

const AuthProviderPropType={
    Children : PropTypes.node.isRequired
};
const AuthContext = createContext<AuthContextType>({
    user: null,
    token: null,
    setAuth: () => null, // Cette fonction est une simple initialisation, elle sera remplacée par la vraie fonction lors de l'utilisation du contexte.
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
                setAuth: setAuth, // Cette ligne est importante pour mettre à jour la fonction setAuth dans le contexte.
            });
        }
    }, []);

    // Configurer l'en-tête d'Authorization lorsque le token change
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
