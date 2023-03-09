import React, { ChangeEvent, useState } from "react";
import styles from "./sorting-page.module.css";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import { RadioInput } from "../ui/radio-input/radio-input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Direction } from "../../types/direction";
import { randomArr } from "../utils/functions";
import { selectionSort } from "../utils/selectionSort";
import { bubbleSort } from "../utils/bubleSort";
import { SortArrayButtons } from "../../types/buttons";
import { SHORT_ANIMATION } from "../../constants/constants";

export const SortingPage: React.FC = () => {
  const [radioInputState, setRadioInputState] =
    useState<string>("selectionSort");
  const [arrState, setArrState] = useState<any[]>([]);
  const [activeButton, setActiveButton] = useState<SortArrayButtons | null>(
    null
  );

  const setSortingKind = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioInputState(e.currentTarget.value);
  };

  async function setSortingDirection(e: React.SyntheticEvent) {
    const buttonChosen = e.currentTarget.getAttribute("name");
    new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
    buttonChosen === SortArrayButtons.Ascending
      ? setActiveButton(SortArrayButtons.Ascending)
      : setActiveButton(SortArrayButtons.Descending);

    radioInputState === SortArrayButtons.BubbleSort
      ? await bubbleSort(arrState, buttonChosen!, setArrState)
      : await selectionSort(arrState, buttonChosen!, setArrState);
    setActiveButton(null);
  }

  const setRandomArray = () => {
    setArrState(randomArr(3, 17));
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.container}>
        <div className={styles.controlsContainer}>
          <div className={styles.radioInputsContainer}>
            <RadioInput
              onInput={setSortingKind}
              name="sortKind"
              value="bubbleSort"
              label="Пузырёк"
              disabled={activeButton ? true : false}
            />
            <RadioInput
              onInput={setSortingKind}
              name="sortKind"
              value="selectionSort"
              label="Выбор"
              defaultChecked
              disabled={activeButton ? true : false}
            />
          </div>
          <div className={styles.buttonsContainer}>
            <Button
              extraClass={styles.button}
              sorting={Direction.Ascending}
              text="По возрастанию"
              onClick={setSortingDirection}
              name={SortArrayButtons.Ascending}
              isLoader={activeButton === SortArrayButtons.Ascending && true}
              disabled={
                (activeButton && activeButton !== SortArrayButtons.Ascending) ||
                !arrState.length
                  ? true
                  : false
              }
            />
            <Button
              extraClass={styles.button}
              sorting={Direction.Descending}
              text="По убыванию"
              onClick={setSortingDirection}
              name={SortArrayButtons.Descending}
              isLoader={activeButton === SortArrayButtons.Descending && true}
              disabled={
                (activeButton &&
                  activeButton !== SortArrayButtons.Descending) ||
                !arrState.length
                  ? true
                  : false
              }
            />
            <Button
              extraClass={styles.button}
              text="Новый массив"
              onClick={setRandomArray}
              disabled={activeButton ? true : false}
            />
          </div>
        </div>
        <div className={styles.chartContainer}>
          {arrState &&
            arrState.map((el, index) => {
              return <Column index={el.value} key={index} state={el.type} />;
            })}
        </div>
      </form>
    </SolutionLayout>
  );
};
