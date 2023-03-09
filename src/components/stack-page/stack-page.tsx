import React, { SyntheticEvent, useState } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./stack-class";
import { ElementStates } from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_ANIMATION } from "../../constants/constants";
import { TSortingStringArray } from "../utils/types";
import { StackAndQueueButtons } from "../../types/buttons";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [stack] = useState(new Stack<TSortingStringArray>());
  const [stackArray, setStackArray] = useState<TSortingStringArray[]>([]);
  const [activeButton, setActiveButton] = useState<StackAndQueueButtons | null>(null);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.currentTarget.value);
  };

  async function push(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inputValue) {
      setInputValue("");
      setActiveButton(StackAndQueueButtons.Add);
      stack.push({ value: inputValue, type: ElementStates.Changing });
      setInputValue("");
      setStackArray([...stack.getContent()]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
      stack.peak().type = ElementStates.Default;
      setStackArray([...stack.getContent()]);
      setActiveButton(null);
    }
  }

  async function popElement() {
    if (stackArray.length) {
      setActiveButton(StackAndQueueButtons.Remove);
      stack.peak().type = ElementStates.Changing;
      setStackArray([...stack.getContent()]);
      await new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
      stack.pop();
      setStackArray([...stack.getContent()]);
      setActiveButton(null);
    }
  }

  const clearStack = () => {
    if (stackArray.length) {
      setActiveButton(StackAndQueueButtons.Clear);
      stack.clear();
      setStackArray([...stack.getContent()]);
      setActiveButton(null);
    }
  };

  const isTop = (arr: TSortingStringArray[], index: number): string => {
    const { length } = arr;
    return length - 1 === index ? "top" : "";
  };

  return (
    <SolutionLayout title="Стек">
      <div className={styles.stack}>
        <form onSubmit={push} className={styles.stackContainer}>
          <Input
            extraClass={styles.input}
            onChange={onChange}
            maxLength={4}
            value={inputValue}/>
          <Button
            extraClass={styles.button}
            text="Добавить"
            linkedList="small"
            type="submit"
             disabled={!inputValue && (!stackArray.length || (activeButton && activeButton !== StackAndQueueButtons.Add)) 
              ? true : false}
            isLoader={activeButton === StackAndQueueButtons.Add && true}/>
          <Button
            extraClass={styles.button}
            text="Удалить"
            linkedList="small"
            onClick={popElement}
            disabled={(activeButton && activeButton !== StackAndQueueButtons.Remove) || !stackArray.length ? true : false
            }
            isLoader={activeButton === StackAndQueueButtons.Remove && true}/>
          <Button
            extraClass={styles.button}
            text="Очистить"
            linkedList="small"
            onClick={clearStack}
            disabled={(activeButton && activeButton !== StackAndQueueButtons.Clear) || !stackArray.length ? true : false}
            isLoader={activeButton === StackAndQueueButtons.Clear && true}/>
        </form>
        <p className={styles.caption}>Максимум — 4 символа</p>
        <div className={styles.circleContainer}>
          {stackArray &&
            stackArray.map((el, index) => {
              return (
                <Circle
                  letter={el.value}
                  state={el.type}
                  key={index}
                  index={index}
                  head={isTop(stackArray, index)}
                />
              );
            })}
        </div>
      </div>
    </SolutionLayout>
  );
};
