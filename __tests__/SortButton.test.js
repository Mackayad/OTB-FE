import { shallow } from 'enzyme';
import SortButton from "../components/sort/sort-button"

describe("Sort button component", () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SortButton key={0} onButtonClick={ jest.fn() } id={0} isActive={ false } >Test Button</SortButton>)
  });

  it('Should render correctly', () => expect(wrapper).toMatchSnapshot())

  it(`Should have text equal to provided value 'Test Button'`, () => {
    expect(wrapper.text()).toEqual('Test Button')
  })

})