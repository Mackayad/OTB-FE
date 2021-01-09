import React from 'react';

import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import SortMenu from '../components/sort/sort-menu'
import HolidayBox from '../components/holiday/holiday-box'

const sortTypes = [
  "name",
  "price",
  "stars"
]

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      activeSort: 1,
      holidays: [],
      reverseFlag: [false, false, false]
    }
  }

  componentDidMount = () => {
    this.getHolidays()
  }

  setActiveSort = ( id ) => {
    if(this.state.activeSort !== id) {
      if(this.state.reverseFlag[id]) {
        this.setState( prevState => ({
          activeSort: id,
          holidays: this.getSortedHolidays(prevState.holidays, id).reverse()
        }))
      } else {
        this.setState( prevState => ({
          activeSort: id,
          holidays: this.getSortedHolidays(prevState.holidays, id)
        }))
      }
    } else {
      this.setState( prevState => ({
        holidays: prevState.holidays.reverse(),
        reverseFlag: prevState.reverseFlag.map((v, i) => {
          return i === id ? !v : v
        })
      }))
    }
  }

  getSortedHolidays = ( holidayArray, sortType ) => {
    return holidayArray.sort((a, b) => {
      return a[sortTypes[sortType]] >= b[sortTypes[sortType]] ? 1 : -1
    })
  }

  getHolidays = () => {
    /**
     * This would of course normally be retrieved via an API endpoint...
     * And would have a loader, but seemed redundant whilst calling locally!
     */
    fetch('../data/holidays.json', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
    .then((response) => {
      return response.json();
    })
    .then((holidayJson) => {
      this.setState({
        holidays: this.getSortedHolidays(holidayJson, 1)
      })
    });
  }

  render() {
    const { activeSort, reverseFlag, holidays } = this.state
    return (
      <div className="app">
        <Head>
          <title>On The Beach</title>
          <link rel="apple-touch-icon" sizes="76x76" href="/assets/favicon/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon/favicon-16x16.png" />
          <link rel="manifest" href="/assets/favicon/site.webmanifest" />
          <link rel="mask-icon" href="/assets/favicon/safari-pinned-tab.svg" color="#5bbad5" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
  
        <main>
          <Container className="main-container">
            <Row>
              <Col md="12" lg="4">
                <SortMenu activeSort={activeSort} onSortChanged={this.setActiveSort} reverse={reverseFlag}></SortMenu>
              </Col>
              <Col md="12" lg="8">
                {holidays.map((holiday, idx) => {
                      return (
                          <HolidayBox key={`holiday-box-${idx}`} data={holiday} idx={idx}></HolidayBox>
                      )
                  })}
              </Col>
            </Row>
          </Container>
        </main>
  
        <footer>
          &copy; Adam Mackay {(new Date()).getFullYear()}
        </footer>
      </div>
    )
  }
}

export default Home
