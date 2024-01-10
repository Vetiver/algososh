import React, { ChangeEvent, SyntheticEvent, useMemo, useState } from "react";
import styles from "./fibonacci-page.module.css";
import { Button } from "../ui/button/button";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { SHORT_ANIMATION } from "../../constants/constants";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<number | null>();
  const [buttonState, setButtonState] = useState<boolean>();
  const [fibonacciArray, setfibonacciArray] = useState<number[]>([]);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = Number(e.currentTarget.value);
    setInputValue(targetValue);
  };

  const boolean = useMemo(() => {
    if (inputValue) {
      return inputValue >= 1 && inputValue <= 19 ? true : false;
    }
  }, [inputValue]);

  const submit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue) {
      boolean && inputValue && getFibonacciNumbers(inputValue);
    }
    setInputValue(null);
  };

  

  async function getFibonacciNumbers(
    firstNumber: number,
    array = [1],
    number = 1,
    F1 = 0,
    F2 = 1
  ): Promise<number[]> {
    setButtonState(true);
    if (number <= firstNumber + 1) {
      if (number === 1) {
        setfibonacciArray([array[0]]);
        ++number;
        await new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
        return getFibonacciNumbers(firstNumber, array, number);
      }
      const numb = F1 + F2;
      array.push(numb);
      setfibonacciArray((arr) => [...arr, numb]);
      ++number;
      F1 = F2;
      F2 = numb;
      await new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
      return getFibonacciNumbers(firstNumber, array, number, F1, F2);
    }
    setButtonState(false);
    return array;
  }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.stringContainer}>
        <form onSubmit={submit} className={styles.inputContainer}>
          <Input
            data-testid="fibonacciInput"
            min={1}
            max={19}
            placeholder="Введите текст"
            onChange={onChange}
            type="number"
            value={String(inputValue)}/>
          <Button
            data-testid="fibonacciButton"
            type="submit"
            text="Развернуть"
            linkedList="small"
            isLoader={buttonState}
            disabled={inputValue && boolean ? false : true}/>
        </form>
        <p className={styles.span}>Максимум — 19 символов</p>
      </div>
      <div className={styles.circlesContainer}>
        {fibonacciArray &&
          fibonacciArray.map((character, index) => {
            return (
              <div key={index}>
                <Circle letter={character} />
                <span className={styles.sequenceIndex}>{index}</span>
              </div>
            );
          })}
      </div>
    </SolutionLayout>
  );
};
