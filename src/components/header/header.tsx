import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import { IonButton, IonButtons, IonContent, IonHeader, IonItem, IonLabel, IonList, IonMenu, IonMenuButton, IonPopover, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";

import { PiPlantFill } from "react-icons/pi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faList, faPersonCircleQuestion, faRightFromBracket, faTableColumns, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { AuthContextType, useAuth } from "../../provider/auth";
import { useHistory } from "react-router-dom";
import { Storage } from '@capacitor/storage';
import { CategoryInterfaceType } from "../../pages/category/category";
import axios from "axios";
const Header: React.FC = () => {

  const auth: AuthContextType = useAuth();
    const popover = useRef<HTMLIonPopoverElement>(null);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const history = useHistory();
    const [categories, setCategories] = useState<CategoryInterfaceType[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const fetchCatrgories = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/categories/`);
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    useEffect(() => {
      fetchCatrgories();
    }, []);

    const handleCategoryChange = async (categoryId: string | undefined) => {
      console.log("parametre",categoryId);
      
      const categoryParam = categoryId ? `/${categoryId}` : ''; // Include category ID in URL if it exists
      history.push(`/home${categoryParam}`);
      
    };
  
    const openPopover = (e: any) => {
      popover.current!.event = e;
      setPopoverOpen(true);
    };

    const handleLogout = async() => {
      try {
        auth.setAuth({
          ...auth,
          user: null,
          token: "",
        });
        await Storage.remove({ key: 'user' });
        await Storage.remove({ key: 'token' });
        history.push('/home');
        
      } catch (error) {
        console.error("Error while logging out:", error);
      }
    };

  

  return (

    <>
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >

      <IonList>
      {auth?.user?.role === 'admin' && (
        <>
          <IonItem button onClick={() => history.push('/sellerRequest')}>
          <FontAwesomeIcon icon={faPersonCircleQuestion}
                         size="xl"
                         style={{ color: "#506726" }}
                         />
            <IonLabel>Requests</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push('/seller')}>
          <FontAwesomeIcon icon={faUsers}
                         size="xl"
                         style={{ color: "#506726" }}
                          />
            <IonLabel>Sellers</IonLabel>
          </IonItem>
        </>
      )}

      {auth?.user?.role === 'seller' && auth?.user?.sellerRequestStatus === 'approved' && (
        <>
          <IonItem button onClick={() => history.push('/dashboard')}>
          <FontAwesomeIcon icon={faList}
                         size="xl"
                         style={{ color: "#506726" }}
                          />
            <IonLabel>Products</IonLabel>
          </IonItem>
          <IonItem button onClick={() => history.push('/category')}>
          <FontAwesomeIcon icon={faTableColumns}
                         size="xl"
                         style={{ color: "#506726" }}
                          />
            <IonLabel>Categories</IonLabel>
          </IonItem>
        </>
      )}
       <IonSelect
      value={selectedCategory}
      placeholder="Select a category"
      onIonChange={(e) => handleCategoryChange(e.detail.value)}
    >
      {categories.map((category) => (
        <IonSelectOption key={category._id} value={category._id}>
          {category.name}
        </IonSelectOption>
      ))}
    </IonSelect>



      <IonItem button onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket}
                         size="xl"
                         style={{ color: "#506726" }}
                         onClick={handleLogout} />
        <IonLabel>Logout</IonLabel>
      </IonItem>
    </IonList>
  




{/* 
      {auth?.user?.role === "admin" ? (
                   <div className="menuListContainer">

                     <div className="listItem">
                       <FontAwesomeIcon icon={faPersonCircleQuestion}
                         size="xl"
                         style={{ color: "#506726" }}
                         onClick={() => { history.push("/sellerRequest"); setPopoverOpen(false); } } />
                       <h1>Requests</h1>
                     </div>
                     <div className="listItem">
                       
                       <FontAwesomeIcon icon={faUsers}
                         size="xl"
                         style={{ color: "#506726" }}
                         onClick={() => { history.push("/seller"); setPopoverOpen(false); } } />
                       <h1>Sellers</h1>
                     </div>

                   </div>
                 ) : (
                   <br />
                 )}



                 {auth?.user?.role === "seller" && auth?.user?.sellerRequestStatus === "approved" ? (
                   <div className="menuListContainer">

                     <div className="listItem">
                       <FontAwesomeIcon icon={faList}
                         size="xl"
                         style={{ color: "#506726" }}
                         onClick={() => { history.push("/dashboard"); setPopoverOpen(false); } } />
                       <h1>Products</h1>
                     </div>
                     <div className="listItem">
                       <FontAwesomeIcon icon={faTableColumns}
                         size="xl"
                         style={{ color: "#506726" }}
                         onClick={() => { history.push("/category"); setPopoverOpen(false); } } />
                       <h1>Categories</h1>
                     </div>
                     <div className="listItem">
                       <FontAwesomeIcon icon={faRightFromBracket}
                         size="xl"
                         style={{ color: "#506726" }}
                         onClick={handleLogout} />
                       <h1>Logout</h1>
                     </div>
                   </div>
                 ) : (
                   <div className="menuListContainer">
                     <div className="listItem">
                       <FontAwesomeIcon icon={faRightFromBracket}
                         size="xl"
                         style={{ color: "#506726" }}
                         onClick={handleLogout} />
                       <h1>Logout</h1>
                     </div>
                   </div>
                 )} */}



      </IonContent>
    </IonMenu>
    <IonHeader className="headerContainer1" id="main-content">
       
        {auth?.token ? (
           <IonButtons slot="start">
           <IonMenuButton>
           </IonMenuButton>
         </IonButtons>
      
        ) : (
          <div className="Iconcontainer">
            <FontAwesomeIcon icon={faUser} style={{ color: "#506726", }} onClick={() => { history.push('/login'); } } />
          </div>
        )}
 <IonTitle>
          {" "}
          <div className="titleApp">
            <PiPlantFill className="logo" />
            TriFlora
          </div>

        </IonTitle>
      </IonHeader></>
    
  );
};

export default Header;
