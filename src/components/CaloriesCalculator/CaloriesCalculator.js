import "./CaloriesCalculator.css";
import React, { useEffect, useState } from "react";
import UseValidation from "../CustomHook/UseCustomHook";

function CaloriesCalculator() {
  //UseState para el Form
  const [GenderValue, SetGenderValue] = useState("");
  const [AgeValue, SetAgeValue] = useState("");
  const [HeightValue, SetHeightValue] = useState("");
  const [WeightValue, SetWeightValue] = useState("");
  const [ExerciseValue, SetExerciseValue] = useState("");

  //UseSatate para calorias y mensaje
  const [CalcoriesCalculate, SetCalcoriesCalculate] = useState();
  const [ShowMensage, SetShowMensage] = useState(false);

  const [ShowError, SetShowError] = useState();

  useEffect(() => {
    SetShowError(0);
  }, []);
  //Validacion

  const Validations = UseValidation(
    GenderValue,
    AgeValue,
    HeightValue,
    WeightValue,
    ExerciseValue
  );

  //Boton Enviar
  const CaloriesCalculateHandler = () => {
    SetShowError(1);
    if (
      Validations.gender &&
      Validations.age &&
      Validations.height &&
      Validations.weight &&
      Validations.exercise
    ) {
      //Calculadora:
      //Calcula las calorias segun hombre o mujer
      const Calories =
        GenderValue === "Male"
          ? 10 * WeightValue + 6.25 * HeightValue - 5 * AgeValue + 5
          : GenderValue === "Female"
          ? 10 * WeightValue + 6.25 * HeightValue - 5 * AgeValue - 161
          : null;

      //Calcula las calorias segun la actividad fisica
      const ExerciseCalories =
        ExerciseValue === "no exercise"
          ? 1.2
          : ExerciseValue === "little exercise"
          ? 1.375
          : ExerciseValue === "moderate exercise"
          ? 1.55
          : ExerciseValue === "high exercise"
          ? 1.75
          : 1.2;

      //Setea las calorias y la impresion del mensaje
      SetCalcoriesCalculate(Math.round(Calories * ExerciseCalories));
      SetShowMensage(true);
    } else {
      SetShowMensage(false);
    }
  };

  return (
    <div>
      {/* Mensajes */}
      <div className="app">
        <div className="container mt-5">
          <h1 className="text-center text-black mb-4">
            Enter your information to calculate your calories
          </h1>
          <div className="row d-flex justify-content-center">
            <div className="col-md-8">
              <div className="bg-white">
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade active show"
                    id="faq_tab_1"
                    role="tabpanel"
                    aria-labelledby="faq_tab_1-tab"
                  >
                    <div className="container p-3">
                      <div className="input-group mb-3">
                        <select
                          value={GenderValue}
                          className="form-control"
                          placeholder="Gender"
                          onChange={(event) => {
                            SetGenderValue(event.target.value);
                          }}
                        >
                          {" "}
                          <option value="" disabled>
                            Select your gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                        {!Validations.gender && ShowError === 1 && (
                          <p className="error">
                            error you must choose a gender
                          </p>
                        )}
                        {/*age*/}
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter your age"
                          min="1"
                          max="90"
                          onChange={(event) => {
                            SetAgeValue(event.target.value);
                          }}
                        />{" "}
                        {!Validations.age && ShowError === 1 && (
                          <p className="error">
                            error you must enter your age real
                          </p>
                        )}{" "}
                      </div>
                      <div className="input-group mb-3">
                        {" "}
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Enter your height (cm)"
                          min="50"
                          max="200"
                          onChange={(event) => {
                            SetHeightValue(event.target.value);
                          }}
                        />{" "}
                        {!Validations.height && ShowError === 1 && (
                          <p className="error">
                            error you must enter your height real
                          </p>
                        )}{" "}
                        <input
                          className="form-control"
                          type="number"
                          min="30"
                          max="400"
                          onChange={(event) => {
                            SetWeightValue(event.target.value);
                          }}
                          placeholder="Enter your weight"
                        />{" "}
                        {!Validations.weight && ShowError === 1 && (
                          <p className="error">
                            error you must enter your weight real
                          </p>
                        )}{" "}
                      </div>
                      <div className="input-group mb-3">
                        {" "}
                        <select
                          className="form-select form-control text-center"
                          value={ExerciseValue}
                          onChange={(event) => {
                            SetExerciseValue(event.target.value);
                          }}
                        >
                          <option value="" disabled>
                            Select your daily routine
                          </option>
                          <option value="no exercise">
                            no exercise(no type of exercise)
                          </option>
                          <option value="little exercise">
                            little exercise(1 or 3 days a week)
                          </option>
                          <option value="moderate exercise">
                            moderate exercise(3 or 5 days a week)
                          </option>
                          <option value="intense exercise">
                            intense exercise(6 or 7 days a week)
                          </option>
                        </select>
                        {!Validations.exercise && ShowError === 1 && (
                          <p className="error">
                            error you must enter your routine
                          </p>
                        )}{" "}
                      </div>
                      <div className="mt-4 d-flex justify-content-end">
                        {" "}
                        <button
                          className="btn btn-success custom-button px-5"
                          onClick={CaloriesCalculateHandler}
                        >
                          Calculate
                        </button>{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {ShowMensage && (
        <h3>Calorias para bajar de peso: {CalcoriesCalculate - 100}</h3>
      )}
      {ShowMensage && (
        <h3>Calorias para Mantener peso: {CalcoriesCalculate}</h3>
      )}
      {ShowMensage && (
        <h3>Calorias para Subir de peso: {CalcoriesCalculate + 100}</h3>
      )}
    </div>
  );
}

export default CaloriesCalculator;
