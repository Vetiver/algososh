import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";



describe("circle", () => {
  it('empty circle', () => {
    const emptyCircle = renderer.create(<Circle />).toJSON();
    expect(emptyCircle).toMatchSnapshot()
  })
  it('circle with text', () => {
    const circleWithText = renderer.create(<Circle letter='П' />).toJSON();
    expect(circleWithText).toMatchSnapshot()
  })
  it('circle with head', () => {
    const circleWithHead = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circleWithHead).toMatchSnapshot()
  })
  it('circle with tail', () => {
    const circleWithTail = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circleWithTail).toMatchSnapshot()
  })
  it('circle with index', () => {
    const circleWithIndex = renderer.create(<Circle index={2} />).toJSON();
    expect(circleWithIndex).toMatchSnapshot()
  })
  it('circle is small', () => {
    const circleIsSmall = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(circleIsSmall).toMatchSnapshot()
  })
  it('circle is default', () => {
    const circleIsDefault = renderer.create(<Circle state={ElementStates.Default} />).toJSON();
    expect(circleIsDefault).toMatchSnapshot()
  })
  it('circle is changing', () => {
    const circleIsChanging = renderer.create(<Circle state={ElementStates.Changing} />).toJSON();
    expect(circleIsChanging).toMatchSnapshot()
  })
  it('circle is modified', () => {
    const circleIsModified = renderer.create(<Circle state={ElementStates.Modified} />).toJSON();
    expect(circleIsModified).toMatchSnapshot()
  })
}) 