import styles from "./list-page.module.css";
import React, { useEffect, useMemo, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { TSortingArray } from "../utils/types";
import { List } from "./list-class";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { randomNumber } from "../utils/functions";
import { ElementStates } from "../../types/element-states";
import { LONG_ANIMATION} from "../../constants/constants";
import { LinkedListButtons } from "../../types/buttons";

type TElementPointer = {
  value: string;
  index: number;
};

export const ListPage: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [indexState, setIndexState] = useState<string>("");
  const [arrayFromList, setArrayFromList] = useState<
    TSortingArray[]
  >([]);
  const [elementPointer, setElementPointer] = useState<TElementPointer | null>(
    null
  );
  const [activeButton, setActiveButton] = useState<LinkedListButtons | null>(
    null
  );
    console.log(indexState)
  const isIndexMetTheConditions = useMemo(() => {
    if (indexState) {
      return (arrayFromList.length &&
        (Number(indexState) === 0 || Number(indexState) < arrayFromList.length)
        ? true
        : false);
    }
  }, [indexState, arrayFromList.length]);

  const createArray = () => {
    const arr: string[] = [];
    for (let i = 0; i < 4; i++) {
      arr.push(String(randomNumber(0, 100)));
    }
    return arr;
  };

  const list = useMemo(() => {
    return new List<string>(createArray());
  }, []);

  useEffect(() => {
    setArrayFromList(list.getArrayFromLinkedList());
  }, []);


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setInputValue(inputValue);
  };

  const onIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value;
    setIndexState(inputValue);
  };

  const setElementTypeChanging = (
    arr: TSortingArray[],
    type: ElementStates,
    index: number
  ) => {
    setArrayFromList(
      arr.map((element, elementIndex) =>
        elementIndex === index ? { ...element, type: type } : { ...element }
      )
    );
  };

  const setZeroInput = () => {
    inputValue && setInputValue('');
    indexState && setIndexState('');
  };

  const setZeroCircle = (index: number) => {
    setArrayFromList(
      arrayFromList.map((element, elementIndex) =>
        elementIndex === index ? { ...element, value: "" } : { ...element }
      )
    );
  };

  const setPoint = (index: number) => {
    setElementPointer({
      value: arrayFromList[index].value,
      index: index,
    });
  };

  async function addToHead(value: string) {
    if (value) {
      setActiveButton(LinkedListButtons.AddToHead);
      setZeroInput();
      setElementPointer({
        value: value,
        index: 0,
      });
      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      list.insertIntoTheHead(value);
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Modified,
        0
      );
      setElementPointer(null);

      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Default,
        0
      );
      setActiveButton(null);
    }
  }

  async function addToTail(value: string) {
    if (value) {
      setActiveButton(LinkedListButtons.AddToEnd);
      setZeroInput();
      setElementPointer({
        value: value,
        index: arrayFromList.length - 1,
      });
      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      list.insertIntoTheTail(value);
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Modified,
        arrayFromList.length
      );
      setElementPointer(null);

      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      setElementTypeChanging(
        list.getArrayFromLinkedList(),
        ElementStates.Default,
        arrayFromList.length
      );
      setActiveButton(null);
    }
  }

  async function deleteHead() {
    setActiveButton(LinkedListButtons.RemoveFromHead);
    setPoint(0);
    setZeroCircle(0);
    await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));

    setElementPointer(null);
    list.removeFromTheHead();
    setArrayFromList(list.getArrayFromLinkedList());
    setActiveButton(null);
  }

  async function deleteTail() {
    setActiveButton(LinkedListButtons.RemoveFromEnd);
    setPoint(arrayFromList.length - 1);
    setZeroCircle(arrayFromList.length - 1);
    await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
    setElementPointer(null);
    list.removeFromTheTail();
    setArrayFromList(list.getArrayFromLinkedList());
    setActiveButton(null);
  }

  async function changeColorStepByStep(index: number, isPointer: boolean) {
    for (let i = 0; i <= index; i++) {
      isPointer && setPoint(i);
      if (i < index) {
        await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
        swithColor(arrayFromList, i, ElementStates.Changing);
      }
    }
  }

  async function swithColor(
    array: TSortingArray[],
    index: number,
    type: ElementStates
  ) {
    const newArray = array;
    newArray[index].type = type;
    setArrayFromList([...newArray]);
  }

  async function insertByIndex(index: number, content: string) {
    if (inputValue && indexState) {
      setActiveButton(LinkedListButtons.InsertByIndex);
      setZeroInput();
      await changeColorStepByStep(index, true);
      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      setElementPointer(null);
      list.insertByPosition(index, content);
      setArrayFromList(list.getArrayFromLinkedList());
      swithColor(list.getArrayFromLinkedList(), index, ElementStates.Modified);
      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      swithColor(list.getArrayFromLinkedList(), index, ElementStates.Default);
      setActiveButton(null);
    }
  }
  async function removeByIndex(index: number) {
    if (indexState) {
      setActiveButton(LinkedListButtons.ExtractByIndex);
      setZeroInput();
      await changeColorStepByStep(index, false);

      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      setZeroCircle(index);
      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));

      setPoint(index);
      await new Promise((resolve) => setTimeout(resolve, LONG_ANIMATION));
      setElementPointer(null);
      list.removeFromPosition(index);
      setArrayFromList(list.getArrayFromLinkedList());
      setActiveButton(null);
    }
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.stack}>
        <div className={styles.stackContainer}>
          <Input
            data-testid="listInputEl"
            extraClass={styles.input}
            maxLength={4}
            placeholder="Введите значение"
            value={inputValue}
            onChange={onChange}
          />
          <Button
            data-testid="listButtonAddHead"
            extraClass={styles.button}
            text="Добавить в head"
            linkedList="small"
            type="button"
            onClick={() => addToHead(inputValue)}
            disabled={!inputValue || !arrayFromList.length || (activeButton && activeButton !== LinkedListButtons.AddToHead) ? true
              : false}
            isLoader={activeButton === LinkedListButtons.AddToHead && true}/>
          <Button
            data-testid="listButtonAddTail"
            extraClass={styles.button}
            text="Добавить в tail"
            linkedList="small"
            onClick={() => addToTail(inputValue)}
            disabled={!inputValue || !arrayFromList.length || (activeButton && activeButton !== LinkedListButtons.AddToEnd) ? true
            : false}
            isLoader={activeButton === LinkedListButtons.AddToEnd && true}/>
          <Button
            data-testid="listButtonDelHead"
            extraClass={styles.button}
            text="Удалить из head"
            linkedList="small"
            onClick={deleteHead}
            disabled={!arrayFromList.length || (activeButton && activeButton !== LinkedListButtons.RemoveFromHead) ? true
            : false}
            isLoader={activeButton === LinkedListButtons.RemoveFromHead && true}/>
          <Button
            data-testid="listButtonDelTail"
            extraClass={styles.button}
            text="Удалить из tail"
            linkedList="small"
            onClick={deleteTail}
            disabled={!arrayFromList.length || (activeButton && activeButton !== LinkedListButtons.RemoveFromEnd) ? true
            : false}
            isLoader={activeButton === LinkedListButtons.RemoveFromEnd && true}/>
        </div>
        <p className={styles.caption}>Максимум — 4 символа</p>
        <div className={styles.stackContainer}>
          <Input
            data-testid="listInputIndex"
            extraClass={styles.input}
            maxLength={4}
            value={indexState}
            placeholder="Введите индекс"
            onChange={onIndexChange}
            type="number"
            min={1}
            max={3}
          />
          <Button
            data-testid="listButtonAddIndex"
            extraClass={styles.button}
            text="Добавить по индексу"
            type="button"
            onClick={() => insertByIndex(Number(indexState), inputValue)}
            disabled={!isIndexMetTheConditions || !inputValue || !indexState || !arrayFromList.length  || (activeButton && activeButton !== LinkedListButtons.InsertByIndex) ? true
            : false}
            isLoader={activeButton === LinkedListButtons.InsertByIndex && true}/>
          <Button
            data-testid="listButtonDelIndex"
            extraClass={styles.button}
            text="Удалить по индексу"
            onClick={() => removeByIndex(Number(indexState))}
            disabled={!isIndexMetTheConditions || (activeButton && activeButton !== LinkedListButtons.ExtractByIndex) ? true
            : false}
            isLoader={activeButton === LinkedListButtons.ExtractByIndex && true}/>
        </div>
        <div className={styles.circleContainer}>
          {arrayFromList &&
            arrayFromList.map((el, index) => {
              if (index === 0 && elementPointer?.index === index) {
                return (
                  <div className={styles.circle} key={index}>
                    {elementPointer?.index === index && (
                      <Circle
                        extraClass={styles.circlePointer}
                        letter={elementPointer.value}
                        state={ElementStates.Changing}
                        isSmall
                      />
                    )}
                    <Circle letter={el.value} state={el.type} index={index} />
                    <ArrowIcon />
                  </div>
                );
              } else if (index === 0)
                return (
                  <div className={styles.circle} key={index}>
                    <Circle
                      letter={el.value}
                      state={el.type}
                      index={index}
                      head="head"
                    />
                    <ArrowIcon />
                  </div>
                );

              if (
                index > 0 &&
                index < arrayFromList.length - 1 &&
                elementPointer?.index === index
              ) {
                return (
                  <div className={styles.circle} key={index}>
                    <Circle
                      extraClass={styles.circlePointer}
                      letter={elementPointer.value}
                      state={ElementStates.Changing}
                      isSmall
                    />
                    <Circle letter={el.value} state={el.type} index={index} />
                    <ArrowIcon />
                  </div>
                );
              } else if (index > 0 && index < arrayFromList.length - 1) {
                return (
                  <div className={styles.circle} key={index}>
                    <Circle letter={el.value} state={el.type} index={index} />
                    <ArrowIcon />
                  </div>
                );
              }
              if (
                index === arrayFromList.length - 1 &&
                elementPointer?.index === index
              ) {
                return (
                  <div className={styles.circle} key={index}>
                    <Circle
                      extraClass={`${styles.circlePointer} ${styles.tailCirclePointer}`}
                      letter={elementPointer.value}
                      state={ElementStates.Changing}
                      isSmall
                    />
                    <Circle letter={el.value} state={el.type} index={index} />
                  </div>
                );
              } else if (index === arrayFromList.length - 1) {
                return (
                  <div className={styles.circle} key={index}>
                    <Circle
                      letter={el.value}
                      state={el.type}
                      index={index}
                      tail="tail"
                    />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
