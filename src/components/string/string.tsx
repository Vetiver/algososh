import React, {useState, useMemo, useEffect} from "react";
import style from '../string/string.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const StringComponent: React.FC = () => {
  let data: any = [];
  const [input, setInput] = useState<any>();
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput([e.target.value]);
    
  };

 


  return (
    <SolutionLayout title="Строка">
      <div className={style.mainContainer}>
        <div className={style.container}>
          <Input
            onChange={onChange}
            maxLength={11}
            isLimitText={true}
          />
          <Button onClick={data.push(input)} text="Развернуть"/>
        </div>
        <div className={style.circleContainer}>
        { data
        .toString()
        .split('')
        .map((e: any) => (
          <Circle
          letter={e}
          />
        ))}
        </div>
      </div>
    </SolutionLayout>
  );
};
