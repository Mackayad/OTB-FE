import React from 'react'

import styles from '../../styles/components/sort/sort-button.module.sass'

class SortButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            classNames: [styles['sort-menu__button']]
        }

        if(this.props.isActive) {
            this.state.classNames.push(styles['sort-menu__button--active'])
        }
    }

    handleClick = () => {
        this.props.onButtonClick(this.props.id)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.isActive !== this.props.isActive) {
            this.setState({
                classNames: [styles['sort-menu__button']]
            })
    
            if(this.props.isActive) {
                this.setState({
                    classNames: [styles['sort-menu__button'], styles['sort-menu__button--active']]
                })
            }
        }
    }

    render() {
        const { classNames } = this.state
        return (
            <div onClick={this.handleClick} className={classNames.join(' ')}>
                {this.props.children}
            </div>
        )
    }
}

export default SortButton