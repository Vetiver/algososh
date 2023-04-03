import renderer from "react-test-renderer";
import { Button } from "./button";



describe("button", () => {
  it('empty button', () => {
    const emptyButton = renderer.create(<Button />).toJSON();
    expect(emptyButton).toMatchSnapshot()
  })
  it('button with text', () => {
    const buttonWithText = renderer.create(<Button text='Принять' />).toJSON();
    expect(buttonWithText).toMatchSnapshot()
  })
  it('button disabled', () => {
    const buttonDisabled = renderer.create(<Button disabled={true} />).toJSON();
    expect(buttonDisabled).toMatchSnapshot()
  })
  it('button is loading', () => {
    const buttonIsLoading = renderer.create(<Button isLoader={true} />).toJSON();
    expect(buttonIsLoading).toMatchSnapshot()
  })
}) 