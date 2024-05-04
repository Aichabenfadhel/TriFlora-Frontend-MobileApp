import React from 'react';

import { Redirect, Route , useLocation } from 'react-router-dom';
import { IonApp, IonContent, IonPopover, IonRouterOutlet, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Acceuil from './pages/acceuil/accueil';
import Login from './pages/login/login';
import Signin from './pages/login/signin';
import ResetPwd from './pages/login/resetPwd';

import Admin from './pages/admin/sellers/sellers'; 





import '@ionic/react/css/core.css';


import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';


import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';


import './theme/variables.css';

import { IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { BsBasket2Fill, BsPersonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import { MdFavorite } from "react-icons/md";
import "../src/components/footer/footer.css"

import "./app.css"
import ProductDetails from './pages/productDetails/productDetails';
import CartPage from './pages/cartPage/cartPage';

import AdminProducts from './pages/admin/products/products';
import AdminSellers from './pages/admin/sellers/sellers';
import CategoryAdmin from './pages/category/category';
import AdminProfile from './pages/admin/profile-admin/adminProfile';
import FavouritePage from './pages/wishList/favoritesPage';
import SellerRequestManagement from './pages/admin/sellerRequest/sellerRequest';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
    <IonTabs>
      <IonRouterOutlet onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
       
        <Route  path="/acceuil" exact={true}>
          <Acceuil />
          
        </Route>
        <Route path="/login" exact={true}>
                 <Login />
              </Route>
              <Route  path="/signin" exact={true}>
                 <Signin />
              </Route>
              <Route  path="/resetPwd" exact={true}>
                 <ResetPwd />
              </Route>
        <Route path="/home" exact={true}>
          <Home />
          
        </Route>
        <Route path="/sellerRequest" exact={true}>
          <SellerRequestManagement />
        </Route>
        <Route path="/profile" exact={true}>
          < AdminProfile/>
            
        </Route>
        <Route  path="/product-details/:id" exact={true}>
          <ProductDetails />
        </Route>
        <Route path="/cart" exact={true}>
          <CartPage />
        </Route>
        <Route component={FavouritePage} path="/favorites" exact={true}>
         
        </Route>
       
        <Route  path="/category" exact={true}>
          <CategoryAdmin />
        </Route>
        <Route  path="/seller" exact={true}>
          <AdminSellers/>
        </Route>
        <Route  path="/dashboard" exact={true}>
          <AdminProducts/>
        </Route>
        
        <Route  path="/" exact={true}>
          <Redirect to="/acceuil" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home" className="btn" >
        <AiFillHome className="icons" />
        <IonLabel className="btn">Home</IonLabel>
      </IonTabButton>

      <IonTabButton tab="basket" href="/cart" className="btn">
        <BsBasket2Fill className="icons" />
        <IonLabel className="btn">Basket</IonLabel>
      </IonTabButton>
      <IonTabButton tab="favorite" href="/favorites" className="btn">
        <MdFavorite className="icons" />
        <IonLabel className="btn">Favorite</IonLabel>
      </IonTabButton>
      <IonTabButton tab="profile" href="/profile" className="btn">
        <BsPersonFill className="icons" />
        <IonLabel className="btn">Profile</IonLabel>
      </IonTabButton>
      {/* <IonTabButton tab="admin" href="/admin" className="btn">
            Admin
          </IonTabButton> */}
          {/* <IonTabButton tab="seller" href="/seller" className="btn">
            Seller
          </IonTabButton> */}
          {/* <IonTabButton tab="category" href="/category" className="btn">
            Category
          </IonTabButton> */}
    </IonTabBar>
      </IonTabs>

    </IonReactRouter>
  </IonApp>
  );


export default App;
