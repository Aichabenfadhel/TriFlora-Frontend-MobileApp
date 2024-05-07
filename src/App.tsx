import React, { createContext, useState } from 'react';
import { Redirect, Route , useLocation } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Acceuil from './pages/acceuil/accueil';
import Login from './pages/login/login';
import Signin from './pages/login/signin';
import ResetPwd from './pages/login/resetPwd';


const defaultValue = {};
export const RecoveryContext = createContext<any>(defaultValue);

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


import { IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { BsBasket2Fill, BsPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import "../src/components/footer/footer.css"
import ForgotPwd from './pages/login/forgotPwd';
import Otp from './pages/login/otp';


setupIonicReact();

const App: React.FC = () => {
  const [page,setPage] = useState("login");
  const [email,setEmail] = useState();
  const [otp,setOtp] = useState();

  return(
    <IonApp>
    <RecoveryContext.Provider value={{page, setPage, otp,setOtp,email,setEmail}}>

    </RecoveryContext.Provider>
    
       <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
              <Route exact path="/login">
                 <Login />
              </Route>
              <Route exact path="/forgotPwd">
                 <ForgotPwd />
              </Route>
              <Route exact path="/otp">
                 <Otp />
              </Route>
              <Route exact path="/signin">
                 <Signin />
              </Route>
              <Route exact path="/resetPwd">
                 <ResetPwd />
              </Route>
              <Route exact path="/acceuil">
                  <Acceuil />
              </Route>          
              <Route exact path="/home">
                <Home />
              </Route>
              <Route exact path="/">
                <Redirect to="/acceuil" />
              </Route>
                          
              </IonRouterOutlet>
              <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home" className="btn">
                <AiFillHome className="icons" />
                <IonLabel className="btn">Home</IonLabel>
              </IonTabButton>
                  
              <IonTabButton tab="basket" href="" className="btn">
                <BsBasket2Fill className="icons" />
                <IonLabel className="btn">Basket</IonLabel>
              </IonTabButton>
              <IonTabButton tab="favorite" href="" className="btn">
                <MdFavorite className="icons" />
                <IonLabel className="btn">Favorite</IonLabel>
              </IonTabButton>
              <IonTabButton tab="profile" href="" className="btn">
                <BsPersonFill className="icons" />
                <IonLabel className="btn">Profile</IonLabel>
              </IonTabButton>
            </IonTabBar>
              </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
}

export default App;
