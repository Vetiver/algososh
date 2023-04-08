import { sortArray } from "./string";
import { ElementStates } from "../../types/element-states";



describe("string component", () => {
  it('even numbers', async () => {
    const text = 'text';
    const reversedText = 'txet';
    const sortingState = jest.fn();
    const buttonState = jest.fn();

    await sortArray (
      buttonState,
        text.split('').map((value) => ({ 
            value: value, 
            type: ElementStates.Default
        })),
      sortingState
    )
    expect(sortingState).toHaveBeenCalledWith(reversedText.split('').map((value) => ({ 
        value: value, 
        type: ElementStates.Modified
    })))
  })
  it('uneven numbers', async () => {
    const text = 'texts';
    const reversedText = 'stxet';
    const sortingState = jest.fn();
    const buttonState = jest.fn();

    await sortArray (
      buttonState,
        text.split('').map((value) => ({ 
            value: value, 
            type: ElementStates.Default
        })),
      sortingState
    )
    expect(sortingState).toHaveBeenCalledWith(reversedText.split('').map((value) => ({ 
        value: value, 
        type: ElementStates.Modified
    })))
  })
  it('single string', async () => {
    const text = 't';
    const reversedText = 't';
    const sortingState = jest.fn();
    const buttonState = jest.fn();

    await sortArray (
      buttonState,
        text.split('').map((value) => ({ 
            value: value, 
            type: ElementStates.Default
        })),
      sortingState
    )
    expect(sortingState).toHaveBeenCalledWith(reversedText.split('').map((value) => ({ 
        value: value, 
        type: ElementStates.Modified
    })))
  })
  it('empty string', async () => {
    const text = '';
    const reversedText = '';
    const sortingState = jest.fn();
    const buttonState = jest.fn();

    await sortArray (
      buttonState,
        text.split('').map((value) => ({ 
            value: value, 
            type: ElementStates.Default
        })),
      sortingState
    )
    expect(sortingState).toHaveBeenCalledTimes(0);
  })
}) 