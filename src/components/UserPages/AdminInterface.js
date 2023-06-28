import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../Credentials";

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
function AdminInterface() {
  const initialValues = {
    adminName: "",
    blog: "",
  };

  const [blog, setBlog] = useState(initialValues);
  const [list, setList] = useState([]);
  const [selectId, setSelectId] = useState("");

  const inputCapture = (event) => {
    const { name, value } = event.target;
    setBlog({ ...blog, [name]: value });
  };
  const saveData = async (event) => {
    event.preventDefault();

    try {
      await addDoc(collection(db, "Blog"), {
        ...blog,
      });
    } catch (error) {
      console.log(error);
    }

    setBlog(initialValues);
  };
  const getBlog = () => {
    const blogCollection = collection(db, "Blog");
    getDocs(blogCollection)
      .then((response) => {
        const blogTest = response.docs.map((doc) => ({
          blog: doc.data(),
          id: doc.id,
        }));
        console.log(blogTest);
        setList(blogTest);
      })
      .catch((error) => console.log(error.message));
  };
  console.log(list);
  useEffect(() => {
    getBlog();
  }, []);
  const updateBlog = async (id) => {
    try {
      const docRef = doc(db, "Blog", id);
      const docSnap = await getDoc(docRef);
      setBlog(docSnap.data());
    } catch (error) {
      console.log("Error updating data", error);
    }
  };
  useEffect(() => {
    if (selectId !== "") {
      updateBlog("");
    }
  });

  const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "Blog", id));
    alert("Please click the refresh button to see changes");
  };
  //validations
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
      <div>
        <button type="button" onClick={getBlog}>
          refresh
        </button>
        <form onSubmit={saveData}>
          <input
            type="text"
            name="adminName"
            placeholder="Creator post"
            onChange={inputCapture}
            value={blog.adminName}
          ></input>

          <textarea
            type="text"
            name="blog"
            placeholder="Enter blog"
            onChange={inputCapture}
            value={blog.blog}
          ></textarea>
          <button>{selectId === "" ? "Save" : "Update"}</button>
        </form>
        <div>
          {list.map((blogList, i) => {
            return (
              <div key={i}>
                <h2>{blogList.blog.adminName}</h2>
                <p>{blogList.blog.blog}</p>

                <button onClick={() => deleteBlog(blogList.id)}>Delete</button>
                <button onClick={() => setSelectId(blogList.id)}>Update</button>
                <hr></hr>
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={logouthandler}>Log Out</button>
    </div>
  );
}

export default AdminInterface;
