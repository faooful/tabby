import React, { PureComponent } from 'react'
import Moodboard from 'src/home/components/Moodboard.js'
import MoodboardPreview from 'src/home/components/MoodboardPreview.js'

import styles from 'src/home/components/HomePage.css'

export default class HomePage extends PureComponent {
  renderPreview(photo, title, date) {
    return (
      <MoodboardPreview className={styles.moodboardPreview} photo={photo} title={title} date={date} />
    )
  }

  render() {
    const previewList = [
      {
        photo: 'http://lorempixel.com/400/200/',
        title: 'Exploration board',
        date: '13/01/2016' // TODO this should be an actual timestamp
      },
      {
        photo: 'http://lorempixel.com/400/200/',
        title: 'Icon inspiration',
        date: '16/01/16'
      }
    ]

    return (
      <div className={styles.HomePage}>
        <div className={styles.boardsPanel}>
          <p className={styles.subHeading}>BOARDS<span className={styles.titleLine}></span></p>
          <div className={styles.previewList}>
            {previewList.map((item, i) => {
              return this.renderPreview(item.photo, item.title, item.date)
            })}
          </div>
        </div>
        <div className={styles.moodboardContainer}>
          <Moodboard className={styles.currentMoodboard} />
        </div>
      </div>
    )
  }
}
