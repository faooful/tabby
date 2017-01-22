import React, { PureComponent } from 'react'

import styles from 'src/home/components/HomePage.css'

export default class HomePage extends PureComponent {
  render() {
    return (
      <div className={styles.boardsPanelContainer}>
        <p className={styles.subHeading}>BOARDS</p>
      </div>
    )
  }
}
