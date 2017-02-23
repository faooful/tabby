import React, { PureComponent, PropTypes } from 'react'
import { connect } from 'react-redux'
import { autobind } from 'core-decorators'
import Moodboard from 'src/home/components/Moodboard.js'
import MoodboardPreview from 'src/home/components/MoodboardPreview.js'
import { setImageState } from '../../home/actions'

import styles from 'src/home/components/HomePage.css'

@connect()
export default class HomePage extends PureComponent {
  static propTypes = {
    dispatch: PropTypes.func
  }

  renderPreview(photo, title, date) {
    return (
      <MoodboardPreview className={styles.moodboardPreview} photo={photo} title={title} date={date} />
    )
  }

  @autobind
  handleImageSpreading() {
    this.props.dispatch(setImageState('SPREADING'))
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
          <p className={styles.subHeading}>
            BOARDS
            <span className={styles.titleLine}></span>
            <img
              className={styles.spreadImagesIcon}
              onClick={this.handleImageSpreading}
              src='https://cdn1.iconfinder.com/data/icons/venetian-red-to-beautify-your-website/512/Arrow_Arrows_Expand-512.png' />
          </p>
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
