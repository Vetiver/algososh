import React, {useState, useMemo, useEffect} from "react";
import style from '../fibonacci-page/fibonacci-page.module.css';
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

export const FibonacciPage: React.FC = () => {
  let time:any = 0;
  let timer:any;
  const [input, setInput] = useState<any>();
  const [data, setData] = useState<any>([])
  const [arr, setArr] = useState<any>([])
 

  function fib(num: number) {
    if (num < 0) {
      return [];
    }
    const res = [1, 1];
  
    for (let i=2 ;i < num; i++){
      const nextValue = res[i-1] + res[i-2];
      res.push(nextValue)
    }
  
    return res.slice(0,num+1)
    
  }

  // useEffect(() => {
  //   setData(fib(input))
  // }, [input])

  const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setInput([e.target.value]);
  };
  const handleClick = () => {
    setData(fib(input))
  }


  
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
          <Button onClick={handleClick} text="Рассчитать"/>
        </div>
        <div className={style.circleContainer}>
        { data 
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
