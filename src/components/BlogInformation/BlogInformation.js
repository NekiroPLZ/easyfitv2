import React, { useEffect, useState } from "react";
import { firebaseApp } from "../../Credentials";
import { getFirestore, getDocs, collection } from "firebase/firestore";

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
  );
}

export default BlogInformation;
