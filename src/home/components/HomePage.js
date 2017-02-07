import React, { PureComponent } from 'react'
import Moodboard from 'src/home/components/Moodboard.js'
import MoodboardPreview from 'src/home/components/MoodboardPreview.js'

import styles from 'src/home/components/HomePage.css'

export default class HomePage extends PureComponent {
  renderPreview(title) {
    return (
      <MoodboardPreview className={styles.moodboardPreview} title={title} />
    )
  }
  render() {
    const previewList = [ 'Exploration board', 'Icon inspiration' ]
    return (
      <div className={styles.HomePage}>
        <div className={styles.boardsPanel}>
          <p className={styles.subHeading}>BOARDS</p>
          <div className={styles.previewList}>
            {previewList.map(this.renderPreview)}
          </div>
        </div>
        <div className={styles.moodboardContainer}>
          <Moodboard className={styles.currentMoodboard} />
        </div>
      </div>
    )
  }
}
