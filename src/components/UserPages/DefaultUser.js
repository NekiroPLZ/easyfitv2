import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../Credentials";
import SearchBar from "../SearchBar/SearchBar";
import { useAuth } from "../../context/AuthContext";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
const db = getFirestore(firebaseApp);

function DefaultUser() {
  const initialValues = {
    userName: "",
    food: "",
    calories: "",
  };

  const [food, setFood] = useState(initialValues);
  const [list, setList] = useState([]);
  const [selectId, setSelectId] = useState("");

  const inputCapture = (event) => {
    const { name, value } = event.target;
    setFood({ ...food, [name]: value });
  };

  const saveData = async (event) => {
    event.preventDefault();

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

  useEffect(() => {
    if (selectId !== "") {
      updateFood("");
    }
  });

  //VALIDATIONS AND LOGOUT
  const { user, logout, loading } = useAuth();
  console.log(user);
  const logouthandler = async () => {
    await logout();
  };
  if (loading) return <h2>loading</h2>;
  console.log(logout);
  console.log(loading);
  return (
    <div>
      <SearchBar />
      <div>
        <h3>Enter food</h3>
        <form onSubmit={saveData}>
          <div>
            <div>
              <input
                type="text"
                name="userName"
                placeholder="Creator post"
                onChange={inputCapture}
                value={food.userName}
              ></input>
              <input
                type="text"
                name="food"
                placeholder="enter food"
                onChange={inputCapture}
                value={food.food}
              ></input>
              <input
                type="text"
                name="calories"
                placeholder="Enter calories"
                onChange={inputCapture}
                value={food.calories}
              ></input>
              <button>{selectId === "" ? "Save" : "Update"}</button>
            </div>
          </div>
        </form>
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
      <button onClick={logouthandler}>Log Out</button>
    </div>
  );
}

export default DefaultUser;
