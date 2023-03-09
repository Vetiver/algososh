import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import {
    SHORT_ANIMATION,
  } from "../../constants/constants";

  export async function bubbleSort(
    arr: any[],
    isInAscendingOrder: string,
    sortNumbers: Dispatch<SetStateAction<any[]>>
  ) {
    const { length } = arr;
    switch (isInAscendingOrder) {
      case "ascending": {
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < length - i - 1; j++) {
            arr[j].type = ElementStates.Changing;
            arr[j + 1].type = ElementStates.Changing;
            sortNumbers([...arr]);
            await new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
            if (arr[j].value > arr[j + 1].value) {
              [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
            }
            arr[j].type = ElementStates.Default;
          }
          arr[length - i - 1].type = ElementStates.Modified;
          sortNumbers([...arr]);
        }
  
        break;
      }
  
      case "descending": {
        for (let i = 0; i < length; i++) {
          for (let j = 0; j < length - i - 1; j++) {
            arr[j].type = ElementStates.Changing;
            arr[j + 1].type = ElementStates.Changing;
            sortNumbers([...arr]);
            await new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
            if (arr[j].value < arr[j + 1].value) {
              [arr[j].value, arr[j + 1].value] = [arr[j + 1].value, arr[j].value];
            }
            arr[j].type = ElementStates.Default;
          }
          arr[length - i - 1].type = ElementStates.Modified;
          sortNumbers([...arr]);
        }
      }
    }
    sortNumbers([...arr]);
  }