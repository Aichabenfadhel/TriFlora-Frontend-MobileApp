import React, { useRef,useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { IonButton, IonContent, IonHeader, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import { BsArrowLeft } from 'react-icons/bs';
import { PiPlantFill } from 'react-icons/pi';
import { FaTrashCan } from "react-icons/fa6";
import { CategoryInterfaceType } from '../../category/category';
import { useHistory } from "react-router";
import { FcFullTrash } from 'react-icons/fc';
interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  category: string;
  photo:File|null;
}

const AdminProducts: React.FC = () => {
  const [categories, setCategories] = useState<CategoryInterfaceType[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [photo, setPhoto] = useState<File | null>(null);
  const [newProduct, setNewProduct] = useState<Product>({
    title: '',
    description: '',
    price: 0,
    category: '',
    photo:  null,
  });
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const [updatingProduct, setUpdatingProduct] = useState<Product | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const history = useHistory();
 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/products');
      setProducts(response.data.data);
      console.log(products);
      
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // const handleCreateProduct = async () => {
    
  //   try {
  //     if (!newProduct.title || !newProduct.description || isNaN(newProduct.price ) ||!newProduct.category)
  //      {        console.error('All fields are required.');
  //       return;
  //     }
  
  //     await axios.post('http://localhost:8000/api/v1/products', {
  //       title: newProduct.title,
  //       description: newProduct.description,
  //       price: newProduct.price,
  //       category: newProduct.category,

  //     });

  //     setNewProduct({
  //       title: '',
  //       description: '',
  //       price: 0,
  //       category: ''
  //     });
  //     fetchProducts();
  //     setIsCreating(false);
  //   } catch (error) {
  //     console.error('Error creating product:', error);
  //   }
  // };
  
  const handleCreateProduct = async () => {
    try {
      // Check if all required fields are filled
      if (!newProduct.title || !newProduct.description || isNaN(newProduct.price) || !newProduct.category || !photo) {
        console.error('All fields are required.');
        return;
      }
  
      // Create FormData object to append the file
      const formData = new FormData();
      formData.append('title', newProduct.title);
      formData.append('description', newProduct.description);
      formData.append('price', String(newProduct.price)); // Convert price to string
      formData.append('category', newProduct.category);
      formData.append('photo', photo);
  
      // Make POST request to create new product
      const rep=await axios.post('http://localhost:8000/api/v1/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log("product adding",rep);
      
      // Clear input fields after successful creation
      setNewProduct({
        title: '',
        description: '',
        price: 0,
        category: '',
        photo:null
      });
  
      // Fetch updated list of products
      fetchProducts();
      
      // Exit create mode
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };
  
  
  const handleDeleteProduct = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleUpdateProduct = (product: Product) => {
    setUpdatingProduct(product);
  };

  const handleSaveUpdateProduct = async () => {
    try {
      if (updatingProduct) {
        await axios.put(`http://localhost:8000/api/v1/products/${updatingProduct._id}`, updatingProduct);
        fetchProducts();
        setUpdatingProduct(null);
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setPhoto(e.target.files[0]);
    }
  };

  const onChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const removeFile = () => {
    setPhoto(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/categories/`
      );
      
      
      if (data?.success) {
        setCategories(data?.data);
        
      }
      
    } catch (error) {
      console.log(error);
      
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);
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
      <h2>Manage Products</h2>
      <div>
        <FontAwesomeIcon icon={faPlus} className="icon" onClick={() => setIsCreating(true)}/>
         Create New Product
      </div>
      <div>
        {isCreating ? (
          <div className="form-group">
            <h3>Add New Product</h3>
            <input
              className="input-field"
              type="text"
              placeholder="Title"
              value={newProduct.title}
              onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
            />
            <IonSelect
              value={newProduct.category}
              placeholder="Select a category"
              className="form-select mb-3"
              onIonChange={(e) => setNewProduct({ ...newProduct, category: e.detail.value })}
>
              {categories?.map((c) => (
               <IonSelectOption key={c._id} value={c._id}>
               {c.name}
                </IonSelectOption>
               ))}
            </IonSelect>

            <textarea
              className="input-field"
              placeholder="Description"
              value={newProduct.description}
              onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            ></textarea>
            <input
              className="input-field"
              type="number"
              placeholder="Price"
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
            />
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  
                  <input
                    type="file"
                    ref={inputRef}
                    className='importPhotoInput'
                    name="photo"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: "none" }}
                    hidden
                  />
                </label>
              </div>
              <button className="file-btn" onClick={onChooseFile} style={{ display: photo ? 'none' : 'flex' }}>
  <span className="material-symbols-rounded">upload</span> Upload Picture
</button>

              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                    <div className="selected-file">
          <p>{photo.name}</p>

          <button onClick={removeFile}>
            <span className="material-symbols-rounded">
            <FaTrashCan />
            </span>
          </button>
        </div>
                  </div>
                  
                )}
              </div>
            <IonButton className="detailsBTN" onClick={handleCreateProduct}>Create Product</IonButton>
            <IonButton className="cancel-button" onClick={() => setIsCreating(false)}>Cancel</IonButton>
          </div>
        ) : (   
         <br />
        )}
      </div>
        {updatingProduct ? (
          <div className="form-group">
            <h3>Edit Product</h3>
            <input
              className="input-field"
              type="text"
              placeholder="Title"
              value={updatingProduct.title}
              onChange={(e) => setUpdatingProduct({ ...updatingProduct, title: e.target.value })}
            />
               <input
              className="input-field"
              type="text"
              placeholder="Category"
              value={updatingProduct.category}
              onChange={(e) => setUpdatingProduct({ ...updatingProduct, category: e.target.value })}
            />
            <textarea
              className="input-field"
              placeholder="Description"
              value={updatingProduct.description}
              onChange={(e) => setUpdatingProduct({ ...updatingProduct, description: e.target.value })}
            ></textarea>
            <input
              className="input-field"
              type="number"
              placeholder="Price"
              value={updatingProduct.price}
              onChange={(e) => setUpdatingProduct({ ...updatingProduct, price: parseInt(e.target.value) })}
            />
            <IonButton className="detailsBTN" onClick={handleSaveUpdateProduct}>
              save
            </IonButton>
            <IonButton className="cancel-button" onClick={() => setUpdatingProduct(null)}>
              cancel
            </IonButton>
          </div>
        ) : (
        //      <h3>List of Products</h3>
        //   <div className="productsListContainer">
        //   <ul className="listItems">
        //     {products.map((product) => (
        //       <li key={product._id} className="lisItem">
        //         <span>{product.title}</span>
        //         <div>
        //             <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => product._id && handleDeleteProduct(product._id)}/>
        //             <FontAwesomeIcon icon={faPen} className="icon" onClick={() => product._id && handleUpdateProduct(product)}/>
        //         </div>
        //       </li>
        //     ))}
        //   </ul>
        // </div>
        
        <IonList>
          <h3>List of Products</h3>
                {products.map((item, index) => (
                  <IonItem key={index}>
                     <IonThumbnail slot="start">
                      <img
                        alt={item.title || ""}
                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${item._id}`}
                      />
                    </IonThumbnail>
                    <IonLabel>{item.title}</IonLabel>
                   
                   
                      <FontAwesomeIcon icon={faTrash} className="icon" onClick={() => item._id && handleDeleteProduct(item._id)}/>
                    
                   
                      <FontAwesomeIcon icon={faPen} className="icon" onClick={() => item._id && handleUpdateProduct(item)}/>
                    
                  </IonItem>
                ))}
              </IonList>
        )}
     
    </div>
    </IonContent>
      </IonPage>
  );
};

export default AdminProducts;
