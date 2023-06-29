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
          ? 66 + (13.7 * WeightValue + 5 * HeightValue - 6.8 * AgeValue)
          : GenderValue === "Female"
          ? 655 + (9.6 * WeightValue + 1.8 * HeightValue - 4.7 * AgeValue)
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
      <form>
        {/* Genero */}
        <div>
          <label>gender:</label>
          <select
            value={GenderValue}
            onChange={(event) => {
              SetGenderValue(event.target.value);
            }}
          >
            <option value="" disabled>
              Select your gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          {!Validations.gender && ShowError === 1 && (
            <p className="error">error you must choose a gender</p>
          )}
        </div>

        {/* Edad */}
        <div>
          <label>Age:</label>
          <input
            type="number"
            min="1"
            max="90"
            onChange={(event) => {
              SetAgeValue(event.target.value);
            }}
          ></input>
          {!Validations.age && ShowError === 1 && (
            <p className="error">error you must enter your age real</p>
          )}
        </div>
        {/* Altura */}
        <div>
          <label>Height (cm):</label>
          <input
            type="number"
            min="50"
            max="200"
            onChange={(event) => {
              SetHeightValue(event.target.value);
            }}
          ></input>
          {!Validations.height && ShowError === 1 && (
            <p className="error">error you must enter your height real</p>
          )}
        </div>

        {/* Peso*/}
        <div>
          <label>Weight (kg):</label>
          <input
            type="number"
            min="30"
            max="400"
            onChange={(event) => {
              SetWeightValue(event.target.value);
            }}
          ></input>
          {!Validations.weight && ShowError === 1 && (
            <p className="error">error you must enter your weight real</p>
          )}
        </div>
        {/* Actividad Fisica*/}
        <div>
          <label>How active are you daily?:</label>
          <select
            value={ExerciseValue}
            onChange={(event) => {
              SetExerciseValue(event.target.value);
            }}
          >
            <option value="" disabled>
              Select an option
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
            <p className="error">error you must enter your routine</p>
          )}
        </div>
      </form>
      <div>
        <button onClick={CaloriesCalculateHandler}>Enviar</button>
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
