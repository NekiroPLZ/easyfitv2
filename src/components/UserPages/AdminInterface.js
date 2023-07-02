import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../Credentials";
import "./UserPages.css";

import { UseTheme } from "../../context/ThemeContext";

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
} from "firebase/firestore";
import NavBar from "../NavBar/NavBar";
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
    if (selectId === "") {
      try {
        await addDoc(collection(db, "Blog"), {
          ...blog,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      await updateDoc(doc(db, "Blog", selectId), { ...blog });
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
      updateBlog(selectId);
    }
  },[selectId]);

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

  //Cambiar fondo

  return (
    <div>
      <NavBar />

      <div>
        {" "}
        <div className="mb-5">
          <form onSubmit={saveData}>
            <div class="mb-3">
              <div className="form-outline mt-2 w-75  blog">
                <input
                  type="text"
                  name="adminName"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Creator post"
                  onChange={inputCapture}
                  value={blog.adminName}
                />
              </div>
            </div>
            <div className="form-outline mb-4 w-75 pl-3 blog">
              <div class="mb-3">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  type="text"
                  placeholder="Enter blog"
                  onChange={inputCapture}
                  value={blog.blog}
                  name="blog"
                ></textarea>
              </div>
            </div>

            {/* <input
            type="text"
            name="adminName"
            placeholder="Creator post"
            onChange={inputCapture}
            value={blog.adminName}
          ></input>
          <div className="form-outline mb-4 w-75 p-3 blog">
            <textarea
              className="form-control "
              rows="5"
              type="text"
              name="blog"
              placeholder="Enter blog"
              onChange={inputCapture}
              value={blog.blog}
            ></textarea>
          </div> */}
            <button className="btn btn-success custom-button px-5">
              {selectId === "" ? "Save" : "Update"}
            </button>
          </form>
        </div>
        <div className="text-center">
          <button
            className="btn btn-warning mb-3"
            type="button"
            onClick={getBlog}
          >
            refresh
          </button>
        </div>
        <div>
          <div class="accordion" id="accordionExample">
            <div class="">
              <h2 class="accordion-header" id="headingOne">
                <button
                  class="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  Blogs
                </button>
              </h2>
              <div
                id="collapseOne"
                class="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div class="accordion-body">
                  {list.map((blogList, i) => {
                    return (
                      <div key={i}>
                        <h2>{blogList.blog.adminName}</h2>
                        <p>{blogList.blog.blog}</p>
                        <button
                          class="btn btn-danger"
                          onClick={() => deleteBlog(blogList.id)}
                        >
                          Delete
                        </button>
                        <button
                          class="btn btn-primary "
                          onClick={() => setSelectId(blogList.id)}
                        >
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
        </div>
      </div>
      <div className="text-center mt-3">
        <button class="btn btn-danger" onClick={logouthandler}>
          Log Out
        </button>
      </div>
    </div>
  );
}

export default AdminInterface;
