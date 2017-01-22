import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { autobind } from 'core-decorators'

import styles from 'src/home/components/HomePage.css'

export default class HomePage extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const { className } = this.props
    const computedClassName = classNames(styles.HomePage, className)

    return (
      <div className={styles.boardsPanelContainer}>
        <p className={styles.subHeading}>BOARDS</p>
      </div>
    )
  }
}
