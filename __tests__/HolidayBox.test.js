import { shallow } from 'enzyme';
import HolidayBox from "../components/holiday/holiday-box"
import HolidayJson from "../public/data/holidays.json"

describe("Holiday box component", () => {

  let wrapper
  let holidayData = HolidayJson[0]

  beforeEach(() => {
    wrapper = shallow(<HolidayBox key="holiday-box-0" data={holidayData} idx={0} />)
  });

  it('Should render correctly', () => expect(wrapper).toMatchSnapshot())

  it('Should contain hotel name, location, duration and airport', () => {
    expect(wrapper.text().indexOf(holidayData.name) >= 0).toBe(true)
    expect(wrapper.text().indexOf(holidayData.location) >= 0).toBe(true)
    expect(wrapper.text().indexOf(holidayData.airport) >= 0).toBe(true)
    expect(wrapper.text().indexOf(holidayData.duration) >= 0).toBe(true)
  })

  it('Should hide description initially, then show it when expanded is set to true', () => {
    expect(wrapper.text().indexOf(holidayData.description) >= 0).toBe(false)
    wrapper.setState({ expanded: true })
    expect(wrapper.text().indexOf(holidayData.description) >= 0).toBe(true)
  })

})