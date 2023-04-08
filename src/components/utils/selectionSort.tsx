import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import {
  SHORT_ANIMATION,
} from "../../constants/constants";
import { TSortingNumberArray } from "./types";

const swap = (
    arr: TSortingNumberArray[],
    firstIndex: number,
    secondIndex: number
  ) => {
    const temp = arr[firstIndex].value;
    arr[firstIndex].value = arr[secondIndex].value;
    arr[secondIndex].value = temp;
  };

export async function selectionSort(
    arr: TSortingNumberArray[],
    isInAscendingOrder: string,
    sortNumbers: Dispatch<SetStateAction<TSortingNumberArray[]>>
  ) {
    const { length } = arr;
    if(length === 0) {
      return;
    }
    switch (isInAscendingOrder) {
      case "ascending": {
        for (let i = 0; i < length; i++) {
          let min = i;
          for (let j = i + 1; j < length; j++) {
            arr[i].type = ElementStates.Changing;
            arr[j].type = ElementStates.Changing;
            sortNumbers([...arr]);
            await new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
            if (arr[j].value < arr[min].value) {
              min = j;
            }
            arr[j].type = ElementStates.Default;
          }
          if (min !== i) {
            swap(arr, i, min);
          }
          arr[i].type = ElementStates.Modified;
        }
        sortNumbers([...arr]);
        break;
      }
      case "descending": {
        for (let i = 0; i < length; i++) {
          let min = i;
  
          for (let j = i + 1; j < length; j++) {
            arr[i].type = ElementStates.Changing;
            arr[j].type = ElementStates.Changing;
            sortNumbers([...arr]);
            await new Promise((resolve) => setTimeout(resolve, SHORT_ANIMATION));
            if (arr[j].value > arr[min].value) {
              min = j;
            }
            arr[j].type = ElementStates.Default;
          }
          if (min !== i) {
            swap(arr, i, min);
          }
          arr[i].type = ElementStates.Modified;
        }
        sortNumbers([...arr]);
        break;
      }
    }
    sortNumbers([...arr]);
  }
  