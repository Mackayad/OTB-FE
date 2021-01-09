import React from 'react'

import styles from '../../styles/components/sort/sort-menu.module.sass'
import { Container } from 'react-bootstrap'
import SortButton from './sort-button'

import { faSortAlphaDown, faSortAlphaUp, faPoundSign, faStar, faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const sortButtons = [
    {
        prefix: "sort",
        sortType: "alphabetically",
        id: 0,
        icon: faSortAlphaDown,
        reverseIcon: faSortAlphaUp
    },
    {
        prefix: "sort by",
        sortType: "price",
        id: 1,
        icon: faPoundSign
    },
    {
        prefix: "sort by",
        sortType: "star rating",
        id: 2,
        icon: faStar
    }
]

class SortMenu extends React.Component {
    constructor(props) {
        super(props)
    }

    setActiveSort = (id) => {
        this.props.onSortChanged(id)
    }

    render() {
        return (
            <Container className={styles['sort-menu']}>
                {sortButtons.map((btn, idx) => {
                    return (
                        <SortButton key={btn.id} onButtonClick={ this.setActiveSort } id={btn.id} isActive={ this.props.activeSort === btn.id }>{btn.prefix} <strong>{btn.sortType}</strong> <FontAwesomeIcon className={this.props.activeSort === btn.id ? `${styles['sort-menu__icon']} ${styles['sort-menu__icon--active']}` : styles['sort-menu__icon']} icon={this.props.reverse[idx] && idx === 0 ? btn.reverseIcon : btn.icon}></FontAwesomeIcon>{idx !== 0 && <FontAwesomeIcon className={this.props.activeSort === btn.id ? `${styles['sort-menu__sort-icon']} ${styles['sort-menu__sort-icon--active']}` : styles['sort-menu__sort-icon']} icon={this.props.reverse[idx] ? faArrowDown : faArrowUp}></FontAwesomeIcon>}</SortButton>
                    )
                })}
            </Container>
        )
    }
}

export default SortMenu