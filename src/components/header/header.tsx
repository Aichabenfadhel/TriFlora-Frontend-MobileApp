import React from "react";
import "./header.css";
import { IonHeader, IonTitle } from "@ionic/react";

import { PiPlantFill } from "react-icons/pi";

const Header: React.FC = () => {
  return (
    <IonHeader className="headerContainer">
      <IonTitle>
        {" "}
        <PiPlantFill className="logo" />
        TriFlora
      </IonTitle>
    </IonHeader>
  );
};

export default Header;
