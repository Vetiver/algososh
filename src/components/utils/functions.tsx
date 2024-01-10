import { ElementStates } from "../../types/element-states";
import { TSortingNumberArray } from "./types";

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
  arr: TSortingNumberArray[] = [],
  arrLength = randomNumber(minArrLength, maxArrLength)
): TSortingNumberArray[] => {
  if (i < arrLength) {
    const number = randomNumber(0, 100);
    number && arr.push({ value: number, type: ElementStates.Default });
    i++;
    return randomArr(minArrLength, maxArrLength, i, arr, arrLength);
  }
  return arr;
};

