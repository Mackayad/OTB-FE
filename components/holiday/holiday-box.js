import React from 'react'

import Image from 'next/image'
import styles from '../../styles/components/holiday/holiday-box.module.sass'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { faStar, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class HolidayBox extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: false
        }
    }

    /**
     * I personally hate the way I've done this - and I think a lot of the edge cases
     * I've handled weren't even necessary! Particularly handling holidays with infants only...
     * Would like to see a better way of doing this.
     */
    getGuestsString = () => {
        return `${this.props.data.adults && this.props.data.adults > 0 ? `<strong>${this.props.data.adults}</strong> Adult${this.props.data.adults === 1 ? '' : 's'}` : ``}${this.props.data.children && this.props.data.children > 0 ? `${this.props.data.adults && this.props.data.adults > 0 ? ', ' : ''}<strong>${this.props.data.children}</strong> ${this.props.data.children === 1 ? 'Child' : 'Children'}` : ``}${this.props.data.infants && this.props.data.infants > 0 ? `${(this.props.data.adults && this.props.data.adults > 0) || (this.props.data.children && this.props.data.children >0)  ? ' & ' : ''}<strong>${this.props.data.infants}</strong> ${this.props.data.infants === 1 ? 'Infant' : 'Infants'}` : ``}`
    }

    getFormattedPrice = () => `£${this.props.data.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`

    render() {
        const { expanded } = this.state
        return (
            <Container className={styles['holiday-box']}>
                <Row className={styles['holiday-box__main-row']}>
                    <Col className={styles['holiday-box__image-container']} sm="12" md="7">
                        <Image src={this.props.data.image} layout="fill"></Image>
                    </Col>
                    <Col sm="12" md="5">
                        <h1 className={`${styles['holiday-box__hotel-name']} mt-4`}>{this.props.data.name}</h1>
                        <p className={styles['holiday-box__location']}>{this.props.data.location}</p>
                        <p className="mb-3">
                            {[...Array(this.props.data.stars).keys()].map((star) => {
                                return (
                                    <FontAwesomeIcon key={`holiday-${this.props.idx}-star-${star}`} className={styles['holiday-box__star-icon']} icon={faStar}></FontAwesomeIcon>
                                )
                            })}
                        </p>
                        <p className={styles['holiday-box__information-text']} dangerouslySetInnerHTML={{ __html: this.getGuestsString() }}></p>
                        <p className={styles['holiday-box__information-text']}><strong>{this.props.data.date}</strong> for <strong>{this.props.data.duration}</strong></p>
                        <p className={styles['holiday-box__information-text']}>departing from <strong>{this.props.data.airport}</strong></p>
                        <Button className={styles['holiday-box__book-button']}>
                            <p className={styles['holiday-box__book-text']}>Book now</p>
                            <p className={styles['holiday-box__price']}>{this.getFormattedPrice()}</p>
                        </Button>
                    </Col>
                    <Button className={styles['holiday-box__read-more-button']} onClick={() => this.setState({expanded: !expanded})}>
                        <strong>Read {expanded ? 'less' : 'more'}</strong> about this hotel
                        <FontAwesomeIcon className={styles['holiday-box__read-more-icon']} icon={faChevronRight}></FontAwesomeIcon>
                    </Button>
                </Row>
                {
                    expanded && <Row className={styles['holiday-box__description-container']}>
                        <h2 className={styles['holiday-box__overview-header']}>Overview</h2>
                        <p className={styles['holiday-box__description']}>{this.props.data.description}</p>
                    </Row>
                }
            </Container>
        )
    }
}

export default HolidayBox