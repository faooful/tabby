import React, { PureComponent } from 'react'
import Moodboard from 'src/home/components/Moodboard.js'

import styles from 'src/home/components/HomePage.css'

export default class HomePage extends PureComponent {
  render() {
    return (
      <div className={styles.HomePage}>
        <div className={styles.boardsPanel}>
          <p className={styles.subHeading}>BOARDS</p>
        </div>
        <div className={styles.moodboardContainer}>
          <Moodboard className={styles.currentMoodboard} />
        </div>
      </div>
    )
  }
}
