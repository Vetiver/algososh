import { Dispatch, SetStateAction } from "react";
import { ElementStates } from "../../types/element-states";
import { bubbleSort } from "../utils/bubleSort";
import { selectionSort } from "../utils/selectionSort";
import { TSortingNumberArray } from "../utils/types";

describe("sorting component", () => {
  it("bubble void", async () => {
    const arr: any[] = [];
    const sortNumbers = jest.fn();
    const sortingisInAscendingOrderState = "ascending";

    await bubbleSort(arr, sortingisInAscendingOrderState, sortNumbers);
    expect(sortNumbers).toHaveBeenCalledTimes(0);
  });

  it("bubble one", async () => {
    const arr: TSortingNumberArray[] = [
      { value: 1, type: ElementStates.Default },
    ];
    const setArrState: Dispatch<SetStateAction<TSortingNumberArray[]>> =
      jest.fn();
    const sortingisInAscendingOrderState = "ascending";

    await bubbleSort(arr, sortingisInAscendingOrderState, setArrState);
    expect(setArrState).toHaveBeenCalledWith([
      { value: 1, type: ElementStates.Modified },
    ]);
  });

  it("bubble all ascending", async () => {
    const arr: TSortingNumberArray[] = [
      { value: 3, type: ElementStates.Default },
      { value: 1, type: ElementStates.Default },
      { value: 2, type: ElementStates.Default },
      { value: 4, type: ElementStates.Default },
    ];
    const sortArrUp: any[] = [
      { value: 1, type: ElementStates.Modified },
      { value: 2, type: ElementStates.Modified },
      { value: 3, type: ElementStates.Modified },
      { value: 4, type: ElementStates.Modified },
    ];

    const setArrState: Dispatch<SetStateAction<TSortingNumberArray[]>> =
      jest.fn();
    const sortingisInAscendingOrderState = "ascending";

    await bubbleSort(arr, sortingisInAscendingOrderState, setArrState);

    expect(setArrState).toHaveBeenCalledWith(
      sortArrUp.map((el) => ({
        value: el.value,
        type: ElementStates.Modified,
      }))
    );
  });

  it("bubble all descending", async () => {
    const arr: TSortingNumberArray[] = [
      { value: 3, type: ElementStates.Default },
      { value: 1, type: ElementStates.Default },
      { value: 2, type: ElementStates.Default },
      { value: 4, type: ElementStates.Default },
    ];
    const sortArrDown: any[] = [
      { value: 4, type: ElementStates.Modified },
      { value: 3, type: ElementStates.Modified },
      { value: 2, type: ElementStates.Modified },
      { value: 1, type: ElementStates.Modified },
    ];

    const setArrState: Dispatch<SetStateAction<TSortingNumberArray[]>> =
      jest.fn();
    const sortingisInAscendingOrderState = "descending";
    await bubbleSort(arr, sortingisInAscendingOrderState, setArrState);
    expect(setArrState).toHaveBeenCalledWith(
      sortArrDown.map((el) => ({
        value: el.value,
        type: ElementStates.Modified,
      }))
    );
  });

  it("selection void", async () => {
    const arr: TSortingNumberArray[] | [] = [];
    const setArrState: Dispatch<SetStateAction<TSortingNumberArray[]>> =
      jest.fn();
    const sortingisInAscendingOrderState = "ascending";

    await selectionSort(arr, sortingisInAscendingOrderState, setArrState);
    expect(setArrState).toHaveBeenCalledTimes(0);
  });

  it("selection one", async () => {
    const arr: TSortingNumberArray[] = [
      { value: 1, type: ElementStates.Default },
    ];
    const setArrState: Dispatch<SetStateAction<TSortingNumberArray[]>> =
      jest.fn();
    const sortingisInAscendingOrderState = "ascending";

    await selectionSort(arr, sortingisInAscendingOrderState, setArrState);
    expect(setArrState).toHaveBeenCalledWith([
      { value: arr[0].value, type: ElementStates.Modified },
    ]);
  })
})