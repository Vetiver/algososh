import { ElementStates } from "../../types/element-states";

export const randomNumber = (minLen: number, maxLen: number) => {
  const randomNumber = Math.floor(
    Math.random() * (maxLen - minLen + 1) + minLen
  );
  return randomNumber;
};

export const randomArr = (
  minArrLength: number,
  maxArrLength: number,
  i = 0,
  arr: any[] = [],
  arrLength = randomNumber(minArrLength, maxArrLength)
): any[] => {
  if (i < arrLength) {
    const number = randomNumber(0, 100);
    number && arr.push({ value: number, type: ElementStates.Default });
    i++;
    return randomArr(minArrLength, maxArrLength, i, arr, arrLength);
  }
  return arr;
};

