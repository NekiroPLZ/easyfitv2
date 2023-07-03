import { useEffect, useState } from "react";

const UseValidation = (
  GenderValue,
  AgeValue,
  HeightValue,
  WeightValue,
  ExerciseValue
) => {
  const [Validations, SetValidations] = useState({
    gender: false,
    age: false,
    height: false,
    weight: false,
    exercise: false,
  });

  useEffect(() => {
    const Gendervalid = GenderValue !== "";
    const Agevalid = AgeValue !== "" && AgeValue > 0 && AgeValue <= 90;
    const Heightvalid =
      HeightValue !== "" && HeightValue >= 50 && HeightValue <= 200;
    const Weightvalid =
      WeightValue !== "" && WeightValue >= 30 && WeightValue <= 400;
    const Exercisevalid = ExerciseValue !== "";

    SetValidations({
      gender: Gendervalid,
      age: Agevalid,
      height: Heightvalid,
      weight: Weightvalid,
      exercise: Exercisevalid,
    });
  }, [GenderValue, AgeValue, HeightValue, WeightValue, ExerciseValue]);

  return Validations;
};

export default UseValidation;
