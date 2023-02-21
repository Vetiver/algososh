import React, {useState, useMemo, useEffect} from "react";
import style from '../fibonacci-page/fibonacci-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState<any>();
  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput([e.target.value]);
    
  };
  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={style.mainContainer}>
        <div className={style.container}>
          <Input
            onChange={onChange}
            type="number"
            max={19}
            isLimitText={true}
          />
          <Button  text="Рассчитать"/>
        </div>
      </div>
    </SolutionLayout>
  );
};
