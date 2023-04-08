import { ElementStates } from "../../types/element-states";
import { bubbleSort } from "../utils/bubleSort"
import { selectionSort } from "../utils/selectionSort"
import { TSortingNumberArray } from "../utils/types";


describe("sorting component", () => {
    it('bubble void', async () => {
        const arr: any[] = [];
        const sortNumbers = jest.fn();
        const sortingisInAscendingOrderState = 'ascending';
    
        await bubbleSort (
            arr,
            sortingisInAscendingOrderState,
            sortNumbers
        )
        expect(sortNumbers).toHaveBeenCalledTimes(0);
    })
      it('bubble one', async () => {
        const arr: any[] = [1];
        const sortNumbers = jest.fn();
        const setArrState = jest.fn();
        const sortingisInAscendingOrderState = 'ascending';
    
        await bubbleSort (
            arr,
            sortingisInAscendingOrderState,
            sortNumbers
        )
        expect(setArrState).toHaveBeenCalledWith([{value: arr[0], type: ElementStates.Modified}])
 
    })
       it('bubble all ascending', async () => {
        const arr: any[] = [3,1,2,4];
        const sortArrUp: any[] = [1,2,3,4];
        const sortNumbers = jest.fn();
        const setArrState = jest.fn();
        const sortingisInAscendingOrderState = 'ascending';
        await bubbleSort (
            arr,
            sortingisInAscendingOrderState,
            sortNumbers
        )
        expect(setArrState).toHaveBeenCalledWith(sortArrUp.map((value) => ({ 
            value: value, 
            type: ElementStates.Modified
        })))

    })
    
        it('bubble all descending', async () => {
            const arr: any[] = [3,1,2,4];
            const sortArrDown: any[] = [4,3,2,1]
            const sortNumbers = jest.fn();
            const setArrState = jest.fn();
            const sortingisInAscendingOrderState = 'descending';
            await bubbleSort (
                arr,
                sortingisInAscendingOrderState,
                sortNumbers
            )
            expect(setArrState).toHaveBeenCalledWith(sortArrDown.map((value) => ({ 
                value: value, 
                type: ElementStates.Modified
            })))
 
    })
    it('selection void', async () => {
        const arr: any[] = [];
        const sortNumbers = jest.fn();
        const sortingisInAscendingOrderState = 'ascending';
    
        await selectionSort (
            arr,
            sortingisInAscendingOrderState,
            sortNumbers
        )
        expect(sortNumbers).toHaveBeenCalledTimes(0);
    })
    it('selection one', async () => {
        const arr: any[] = [1];
        const sortNumbers = jest.fn();
        const setArrState = jest.fn();
        const sortingisInAscendingOrderState = 'ascending';
    
        await selectionSort (
            arr,
            sortingisInAscendingOrderState,
            sortNumbers
        )
        expect(setArrState).toHaveBeenCalledWith([{value: arr[0], type: ElementStates.Modified}])
 
    })
       it('selection all ascending', async () => {
        const arr: any[] = [3,1,2,4];
        const sortArrUp: any[] = [1,2,3,4];
        const sortNumbers = jest.fn();
        const setArrState = jest.fn();
        const sortingisInAscendingOrderState = 'ascending';
        await selectionSort (
            arr,
            sortingisInAscendingOrderState,
            sortNumbers
        )
        expect(setArrState).toHaveBeenCalledWith(sortArrUp.map((value) => ({ 
            value: value, 
            type: ElementStates.Modified
        })))

    })
    
        it('selection all descending', async () => {
            const arr: any[] = [3,1,2,4];
            const sortArrDown: any[] = [4,3,2,1]
            const sortNumbers = jest.fn();
            const setArrState = jest.fn();
            const sortingisInAscendingOrderState = 'descending';
            await selectionSort (
                arr,
                sortingisInAscendingOrderState,
                sortNumbers
            )
            expect(setArrState).toHaveBeenCalledWith(sortArrDown.map((value) => ({ 
                value: value, 
                type: ElementStates.Modified
            })))
 
    })

})