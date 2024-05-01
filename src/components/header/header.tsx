import React, { useRef, useState } from "react";
import "./header.css";
import { IonButton, IonContent, IonHeader, IonPopover, IonTitle } from "@ionic/react";

import { PiPlantFill } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { AuthContextType, useAuth } from "../../provider/auth";
import { useHistory } from "react-router-dom";

const Header: React.FC = () => {

  const auth: AuthContextType = useAuth();
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const history = useHistory();
  
    const openPopover = (e: any) => {
      popover.current!.event = e;
      setPopoverOpen(true);
    };

    const handleLogout = () => {
      try {
        auth.setAuth({
          ...auth,
          user: null,
          token: "",
        });
        localStorage.removeItem("auth");
        localStorage.removeItem("cart");
        history.push('/');
        window.location.reload();
      } catch (error) {
        console.error("Error while logging out:", error);
      }
    };

  return (
    <IonHeader className="headerContainer1">
      <IonTitle>
        {" "}
        <PiPlantFill className="logo" />
        TriFlora
      </IonTitle>
      {auth?.token?(
        <div className="Iconcontainer">
      <FontAwesomeIcon onClick={openPopover} icon={faBars} style={{color: "#506726",}} />
      
      <IonPopover ref={popover} isOpen={popoverOpen} onDidDismiss={() => setPopoverOpen(false)}>
        <IonContent class="ion-padding">
          <div className="menuListContainer">
            
              <div className="listItem">
                <FontAwesomeIcon icon={faRightFromBracket}
                                 size="xl" 
                                 style={{color: "#506726"}} 
                                 onClick={handleLogout} />
                <h1>Logout</h1>
              </div>
            
          </div>
        </IonContent>
      </IonPopover>
      </div>
      ):(
        <div className="Iconcontainer">
        <FontAwesomeIcon icon={faUser} style={{color: "#506726",}}  onClick={()=> {history.push('/login');window.location.reload();}} />
        </div>
      )}
     
    </IonHeader>
    
  );
};

export default Header;
