import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { BsArrowLeft } from 'react-icons/bs';
import { PiPlantFill } from 'react-icons/pi';
import { useHistory } from "react-router";
export interface CategoryInterfaceType {
  _id?: string;
  name: string;
}

const CategoryAdmin: React.FC = () => {
  const [categories, setCategories] = useState<CategoryInterfaceType[]>([]);
  const [newCategory, setNewCategory] = useState<CategoryInterfaceType>({
    name: '',
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updatingCategory, setUpdatingCategory] = useState<CategoryInterfaceType| null>(null);
  const history = useHistory();

  useEffect(() => {
    fetchCatrgories();
  }, []);

  const fetchCatrgories = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/api/v1/categories/`);
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateCategory = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API}/api/v1/categories/`, newCategory);
      setNewCategory({
        name: '',
      });
      fetchCatrgories();
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating categories:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/api/v1/categories/${id}`);
      fetchCatrgories();
    } catch (error) {
      console.error('Error deleting categories:', error);
    }
  };

  const handleUpdateCateggory = (category: CategoryInterfaceType) => {
    setUpdatingCategory(category);
  };

  const handleSaveUpdateCategory = async () => {
    try {
      if (updatingCategory) {
        await axios.put(`${process.env.REACT_APP_API}/api/v1/categories/${updatingCategory._id}`, updatingCategory);
        fetchCatrgories();
        setUpdatingCategory(null);
      }
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  
  return (
    
        <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton
            slot="start"
            onClick={()=>history.push("/home")}
            fill="clear"
            className="backArrow"
          >
            <BsArrowLeft className="backArrow" />
          </IonButton>
          <IonTitle className="logo">
            {" "}
            <PiPlantFill />
            TriFlora
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
    <div className="container">
      <h2>Manage Categories</h2>
      <div>
            <FontAwesomeIcon icon={faPlus} className="icon" onClick={() => setIsCreating(true)}/>
            Create New Category
            </div>
      <div>
        {isCreating ? (
          <div className="form-group">
            <h3>Add New Category</h3>
            <input
              className="input-field"
              type="text"
              placeholder="Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
        
            <div className="adminBtnContainer">
            <IonButton className="detailsBTN" onClick={handleCreateCategory}>Create Category</IonButton>
            <IonButton className="cancel-button" onClick={() => setIsCreating(false)}>Cancel</IonButton>
            </div>
          </div>
        ) : (
         <br />
        )}
      </div>
        {updatingCategory ? (
          <div className="form-group">
            <h3>Edit Category</h3>
            <input
              className="input-field"
              type="text"
              placeholder="Name"
              value={updatingCategory.name}
              onChange={(e) => setUpdatingCategory({ ...updatingCategory, name: e.target.value })}
            />
           
            <IonButton className="detailsBTN" onClick={handleSaveUpdateCategory}>Save</IonButton>
            <IonButton className="cancel-button" onClick={() => setUpdatingCategory(null)}>Cancel</IonButton>
          </div>
        ) : (

        <IonList>
        <h3>List of Products</h3>
              {categories.map((item, index) => (
                <IonItem key={index}>
                   
                  <IonLabel>{item.name}</IonLabel>
                 
                  <IonButton className="favListTrashBTN" fill="clear" 
                  onClick={() => item._id && handleDeleteCategory(item._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => item._id && handleDeleteCategory(item._id)}/>
                  </IonButton>
                  <IonButton className="favListTrashBTN" fill="clear" 
                  onClick={() => item._id && handleUpdateCateggory(item)}
                  >
                    <FontAwesomeIcon icon={faPen} className="icon" onClick={() => item._id && handleUpdateCateggory(item)}/>
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
        )}
        </div>
       
      </IonContent>
      </IonPage>
  );
};

export default CategoryAdmin;
