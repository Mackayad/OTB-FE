import { shallow } from 'enzyme';
import Home from "../pages/index"
import HolidayJson from "../public/data/holidays.json"

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(
      HolidayJson
    ),
  })
);

describe("Home page component", () => {

  let wrapper
  let sortTypes = ["name", "price", "stars"]

  beforeEach(() => {
    fetch.mockClear()
    wrapper = shallow(<Home />)
  });

  it('Should render correctly', () => expect(wrapper).toMatchSnapshot())

  it("Should initially have a sortType of 1", () => {
    expect(wrapper.state('activeSort')).toEqual(1)
  })

  let testTypes = [0, 2]

  testTypes.forEach((sortIdx) => {
    it(`Should update to sort type ${sortIdx} and sort holiday results by ${sortTypes[sortIdx]} when relevant button is clicked, then should reverse order when clicked again`, () => {
      let sortedHolidays = Array.from(HolidayJson).sort((a, b) => a[sortTypes[sortIdx]] >= b[sortTypes[sortIdx]] ? 1 : -1)
      wrapper.instance().setActiveSort(sortIdx)
      expect(wrapper.state('activeSort')).toEqual(sortIdx)
      expect(wrapper.state('holidays')).toEqual(sortedHolidays)
      wrapper.instance().setActiveSort(sortIdx)
      sortedHolidays = Array.from(HolidayJson).sort((a, b) => a[sortTypes[sortIdx]] >= b[sortTypes[sortIdx]] ? -1 : 1)
      expect(wrapper.state('holidays')).toEqual(sortedHolidays)
    })
  })

  it(`Should reverse the price order when sort by price is clicked whilst already active`, () => {
    let sortedHolidays = Array.from(HolidayJson).sort((a, b) => a.price >= b.price ? -1 : 1)
    wrapper.instance().setActiveSort(1)
    expect(wrapper.state('activeSort')).toEqual(1)
    expect(wrapper.state('holidays')).toEqual(sortedHolidays)
  })

})