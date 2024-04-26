import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Acceuil from './pages/acceuil/accueil';
import Admin from './pages/admin/sellers/sellers'; 

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

import ProductDetails from './pages/productDetails/productDetails';
import CartPage from './pages/cartPage/cartPage';

import AdminProducts from './pages/admin/products/products';
import AdminSellers from './pages/admin/sellers/sellers';
import CategoryAdmin from './pages/category/category';
import AdminProfile from './pages/admin/profile-admin/adminProfile';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
       
        <Route exact path="/acceuil">
          <Acceuil />
          
        </Route>
        <Route exact path="/home">
          <Home />
          
        </Route>
        <Route exact path="/profile">
          < AdminProfile/>
          
        </Route>
        <Route exact path="/product-details/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <Route exact path="/admin">
          <AdminProducts />
        </Route>
        <Route exact path="/category">
          <CategoryAdmin />
        </Route>
        <Route exact path="/seller">
          <AdminSellers />
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

      <IonTabButton tab="basket" href="/cart" className="btn">
        <BsBasket2Fill className="icons" />
        <IonLabel className="btn">Basket</IonLabel>
      </IonTabButton>
      <IonTabButton tab="favorite" href="" className="btn">
        <MdFavorite className="icons" />
        <IonLabel className="btn">Favorite</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/profile" className="btn">
        <BsPersonFill className="icons" />
        <IonLabel className="btn">Profile</IonLabel>
      </IonTabButton>
      <IonTabButton tab="admin" href="/admin" className="btn">
            Admin
          </IonTabButton>
          {/* <IonTabButton tab="seller" href="/seller" className="btn">
            Seller
          </IonTabButton> */}
          <IonTabButton tab="category" href="/category" className="btn">
            Category
          </IonTabButton>
    </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
