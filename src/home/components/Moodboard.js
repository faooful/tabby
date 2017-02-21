import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'

import styles from 'src/home/components/Moodboard.css'

export default class Moodboard extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  componentWillMount() {
    chrome.extension.onMessage.addListener(message => {
      this.drawImageOnCanvas(message.url)
    })
  }

  drawImageOnCanvas(imageUrl) {
    const context = this.canvas.getContext('2d')
    const image = new Image()
    image.onload = function () {
      const maxLength = 400
      const reductionFactor = Math.max((this.width > this.height) ?
        this.width / maxLength :
        this.height / maxLength, 1)
      const width = this.width / reductionFactor
      const height = this.height / reductionFactor
      context.drawImage(image, 0, 0, width, height)
    }
    image.src = imageUrl
  }

  render() {
    const computedClass = classNames(this.props.className, styles.Moodboard)

    return (
      <div className={computedClass}>
        <canvas
          className={styles.moodboardCanvas}
          width={window.innerWidth - 240}
          height={window.innerHeight}
          ref={canvas => (this.canvas = canvas)}
        ></canvas>
      </div>
    )
  }
}
