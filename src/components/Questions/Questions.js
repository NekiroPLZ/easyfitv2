/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import noMeQueme from "../Image/no_me_quemessss_x1x_1_crop1685489194443.jpg_1833193316.jpg";
import NavBar from "../NavBar/NavBar";
function Questions() {
  return (
    <div>
      <NavBar />
      <div className="text-center">
        <h1>Preguntas?</h1>

        <img src={noMeQueme} />
      </div>
    </div>
  );
}

export default Questions;
