import styles from "./string.module.css";
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { LONG_ANIMATION } from "../../constants/constants";
import { ElementStates } from "../../types/element-states";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TSortingStringArray, TStringArray } from "../utils/types";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  const [allInputValuesArr, setAllInputValuesArr] = useState<TStringArray>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [sortingArray, setSortingArray] = useState<any[]>([]);
  const [buttonState, setButtonState] = useState<boolean>(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const takeArr = e.currentTarget.value.split("");
    setAllInputValuesArr(takeArr);
    setInputValue(e.currentTarget.value);
  };


  const swap = (
    firstElement: number,
    secondElement: number,
    arr: TSortingStringArray[]
  ) => {
    const saveFirstElement = arr[firstElement];
    arr[firstElement] = arr[secondElement];
    arr[secondElement] = saveFirstElement;
    return arr;
  };


  async function sortArray(
    arr: TSortingStringArray[],
    setSortingCharactersState: Dispatch<SetStateAction<TSortingStringArray[]>>
  ) {
    setButtonState(true);
    const mid = Math.floor((arr.length - 1) / 2);
    for (let firstIndex = 0; firstIndex <= mid; firstIndex++) {
      const secondIndex = arr.length - 1 - firstIndex;
      if (firstIndex !== secondIndex) {
        arr[firstIndex].type = ElementStates.Changing;
        arr[secondIndex].type = ElementStates.Changing;
        setSortingArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      }
      swap(firstIndex, secondIndex, arr);
      arr[firstIndex].type = ElementStates.Modified;
      arr[secondIndex].type = ElementStates.Modified;
      setSortingCharactersState([...arr]);
    }
    setButtonState(false);
  }

  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const arrForDisplay = allInputValuesArr.map((item: any) => {
      return { value: item, type: ElementStates.Default };
    });
    setSortingArray([...arrForDisplay]);
    sortArray(arrForDisplay, setSortingArray);
    setInputValue("");
  };

  return (
    <SolutionLayout title="Строка">
      <div className={styles.container}>
        <form onSubmit={submit} className={styles.inputContainer}>
          <Input
            placeholder="Введите текст"
            maxLength={11}
            onChange={onChange}
            value={inputValue}
          ></Input>
          <Button
            type="submit"
            text="Развернуть"
            linkedList="small"
            disabled={inputValue ? false : true}
            isLoader={buttonState}
          ></Button>
        </form>
        <p className={styles.span}>Максимум — 11 символов</p>
      </div>
      <div className={styles.circleContainer}>
        {sortingArray &&
          sortingArray.map((obj, index) => {
            return <Circle letter={obj.value} key={index} state={obj.type} />;
          })}
      </div>
    </SolutionLayout>
  );
};
