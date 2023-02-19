import React from "react";
import style from '../string/string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  let data: any[] = [];





  return (
    <SolutionLayout title="Строка">
      <div className={style.mainContainer}>
        <div className={style.container}>
          <Input/>
          <Button text="Развернуть"/>
        </div>
        <span>Максимум — 11 символов</span>
        <div className={style.circleContainer}>
        {data.map((e) => (
          <Circle
          letter={e}
          />
        ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
