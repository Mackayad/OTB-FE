import { shallow } from 'enzyme';
import SortMenu from "../components/sort/sort-menu"

describe("Sort menu component", () => {

  let wrapper

  beforeEach(() => {
    wrapper = shallow(<SortMenu activeSort={1} onSortChanged={jest.fn()} reverse={[false, false, false]} />)
  });

  it('Should render correctly', () => expect(wrapper).toMatchSnapshot())
  
})