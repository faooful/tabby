import React, { PureComponent } from 'react'
import Moodboard from 'src/home/components/Moodboard.js'
import MoodboardPreview from 'src/home/components/MoodboardPreview.js'

import styles from 'src/home/components/HomePage.css'

export default class HomePage extends PureComponent {
  renderPreview(title, date) {
    return (
      <MoodboardPreview className={styles.moodboardPreview} title={title} date={date} />
    )
  }
  render() {
    const previewTitleList = [ 'Exploration board', 'Icon inspiration' ]
    const previewDateList = [ 'Created 13/01/16', 'Created 16/01/16' ]
    return (
      <div className={styles.HomePage}>
        <div className={styles.boardsPanel}>
          <p className={styles.subHeading}>BOARDS</p>
          <div className={styles.previewList}>
            {previewTitleList.map(this.renderPreview)}
            {previewDateList.map(this.renderPreview)}
          </div>
        </div>
        <div className={styles.moodboardContainer}>
          <Moodboard className={styles.currentMoodboard} />
        </div>
      </div>
    )
  }
}
