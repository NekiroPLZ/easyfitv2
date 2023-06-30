import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../Credentials";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import { useAuth } from "../../context/AuthContext";
import "./UserPages.css";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);

function DefaultUser() {
  const initialValues = {
    userName: "",
    food: "",
    food1: "",
    food2: "",
    food3: "",
    calories: "",
    calories1: "",
    calories2: "",
    calories3: "",
  };

  const [food, setFood] = useState(initialValues);
  const [list, setList] = useState([]);
  const [selectId, setSelectId] = useState("");

  const inputCapture = (event) => {
    const { name, value } = event.target;
    setFood({ ...food, [name]: value });
  };

  //Formulario comida
  const saveData = async (event) => {
    event.preventDefault();
    // if (
    //   initialValues.userName === "" ||
    //   initialValues.food === "" ||
    //   initialValues.calories === ""
    // ) {
    //   alert("fill in the field");
    // } else {
    if (selectId === "") {
      try {
        await addDoc(collection(db, "Food"), {
          ...food,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await updateDoc(doc(db, "Food", selectId), { ...food });
    }
    // }
    setFood(initialValues);
    setSelectId("");
  };

  useEffect(() => {
    getFood();
  }, []);

  const getFood = () => {
    const foodCollection = collection(db, "Food");
    getDocs(foodCollection)
      .then((response) => {
        const foodTest = response.docs.map((doc) => ({
          food: doc.data(),
          calories: doc.data(),
          id: doc.id,
        }));
        console.log(foodTest);
        setList(foodTest);
      })
      .catch((error) => console.log(error.message));
  };
  const deleteFood = async (id) => {
    await deleteDoc(doc(db, "Food", id));
    alert("Please click the refresh button to see changes");
  };
  const updateFood = async (id) => {
    try {
      const docRef = doc(db, "Food", id);
      const docSnap = await getDoc(docRef);
      setFood(docSnap.data());
    } catch (error) {
      console.log("Error updating data", error);
    }
  };
  console.log(list);
  useEffect(() => {
    if (selectId !== "") {
      updateFood("");
    }
  });

  //VALIDATIONS AND LOGOUT
  const { logout } = useAuth();

  const logouthandler = async () => {
    await logout();
  };
  //Cambiar fondo

  return (
    <div>
      <NavBar />

      <div>
        <SearchBar />
        <div>
          <button onClick={logouthandler}>log out</button>
          {/* <form onSubmit={saveData} className="myform"> */}
          <div className="app">
            <div className="container mt-5">
              <h1 className="text-center text-black mb-4">
                Make a post with your favorites foods and calories
              </h1>
              <form onSubmit={saveData}>
                <div className="row d-flex justify-content-center">
                  <div className="col-md-7">
                    <div className="bg-white">
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade active show"
                          id="faq_tab_1"
                          role="tabpanel"
                          aria-labelledby="faq_tab_1-tab"
                        >
                          {" "}
                          <div className="container p-3">
                            <div className="input-group mb-3 form-control text-center">
                              {" "}
                              <input
                                type="text"
                                name="userName"
                                placeholder="Creator post"
                                onChange={inputCapture}
                                value={food.userName}
                                className="form-control"
                                required
                              ></input>
                            </div>
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                name="food"
                                placeholder="enter food"
                                onChange={inputCapture}
                                value={food.food}
                                className="form-control"
                                required
                              ></input>{" "}
                              <input
                                type="number"
                                name="calories"
                                placeholder="Enter calories"
                                onChange={inputCapture}
                                value={food.calories}
                                className="form-control"
                                required
                              ></input>{" "}
                            </div>{" "}
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                name="food1"
                                placeholder="enter food"
                                onChange={inputCapture}
                                value={food.food1}
                                className="form-control"
                                required
                              ></input>{" "}
                              <input
                                type="number"
                                name="calories1"
                                placeholder="Enter calories"
                                onChange={inputCapture}
                                value={food.calories1}
                                className="form-control"
                                required
                              ></input>{" "}
                            </div>{" "}
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                name="food2"
                                placeholder="enter food"
                                onChange={inputCapture}
                                value={food.food2}
                                className="form-control"
                                required
                              ></input>{" "}
                              <input
                                type="number"
                                name="calories2"
                                placeholder="Enter calories"
                                onChange={inputCapture}
                                value={food.calories2}
                                className="form-control"
                                required
                              ></input>{" "}
                            </div>{" "}
                            <div className="input-group mb-3">
                              <input
                                type="text"
                                name="food3"
                                placeholder="enter food"
                                onChange={inputCapture}
                                value={food.food3}
                                className="form-control"
                                required
                              ></input>{" "}
                              <input
                                type="number"
                                name="calories3"
                                placeholder="Enter calories"
                                onChange={inputCapture}
                                value={food.calories3}
                                className="form-control"
                                required
                              ></input>{" "}
                            </div>
                            <div className="text-center">
                              {" "}
                              <button className="btn btn-success custom-button px-5">
                                {selectId === "" ? "Save" : "Update"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2>Food list</h2>
        <button onClick={() => getFood()}>REFRESH</button>

        <div>
          <div>
            {list.map((foodList) => {
              return (
                <div key={foodList.id}>
                  <h4>User name: {foodList.food.userName}</h4>

                  <p>Food Name: {foodList.food.food}</p>
                  <p>Food calories: {foodList.food.calories}</p>
                  <p>Food Name: {foodList.food.food1}</p>
                  <p>Food calories: {foodList.food.calories1}</p>
                  <p>Food Name: {foodList.food.food2}</p>
                  <p>Food calories: {foodList.food.calories2}</p>
                  <p>Food Name: {foodList.food.food3}</p>
                  <p>Food calories: {foodList.food.calories3}</p>
                  <h2>
                    Total calories:
                    {parseInt(foodList.food.calories) +
                      parseInt(foodList.food.calories1) +
                      parseInt(foodList.food.calories2) +
                      parseInt(foodList.food.calories3)}
                  </h2>
                  <button onClick={() => deleteFood(foodList.id)}>
                    Delete
                  </button>
                  <button onClick={() => setSelectId(foodList.id)}>
                    Update
                  </button>
                  <hr></hr>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultUser;
