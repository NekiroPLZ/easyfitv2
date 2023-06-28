import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../Credentials";
import { getFirestore, getDoc, getDocs, collection } from "firebase/firestore";
const db = getFirestore(firebaseApp);
function BlogInformation() {
  const [list, setList] = useState([]);
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

  useEffect(() => {
    getBlog();
  }, []);
  return (
    <div>
      {" "}
      <div>
        {list.map((blogList, i) => {
          return (
            <div key={i}>
              <h2>{blogList.blog.adminName}</h2>
              <p>{blogList.blog.blog}</p>

              <hr></hr>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BlogInformation;
