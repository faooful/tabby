import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { autobind } from 'core-decorators'

import styles from 'src/home/components/Moodboard.css'

export default class Moodboard extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props)

    this.state = {
      image: null,
      imageX: 0,
      imageY: 0,
      mouseImageOffsetX: 0,
      mouseImageOffsetY: 0,
      imageWidth: 0,
      imageHeight: 0,
      dragging: false
    }
  }

  componentWillMount() {
    chrome.extension.onMessage.addListener(message => {
      this.drawImageOnCanvas(message.url)
    })
  }

  componentDidMount() {
    this.canvas.addEventListener('mousemove', this.handleMouseMove, false)
    this.canvas.addEventListener('mousedown', this.handleMouseDown, false)
    this.canvas.addEventListener('mouseup', this.handleMouseUp, false)
  }

  getContext() {
    return this.canvas.getContext('2d')
  }

  drawImageOnCanvas(imageUrl) {
    const context = this.getContext()
    const setDimensions = (imageWidth, imageHeight) =>
      this.setState({ imageWidth, imageHeight })
    const image = new Image()
    this.setState({ image })
    image.onload = function () {
      const maxLength = 400
      const reductionFactor = Math.max((this.width > this.height) ?
        this.width / maxLength :
        this.height / maxLength, 1)
      const width = this.width / reductionFactor
      const height = this.height / reductionFactor
      setDimensions(width, height)
      context.drawImage(image, 0, 0, width, height)
    }
    image.src = imageUrl
  }

  @autobind
  handleMouseMove(e) {
    const context = this.getContext()
    const { image, imageWidth, imageHeight, mouseImageOffsetX, mouseImageOffsetY } = this.state
    if (this.state.dragging) {
      this.setState({ imageX: e.offsetX, imageY: e.offsetY })
      context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      context.drawImage(image, e.offsetX - mouseImageOffsetX, e.offsetY - mouseImageOffsetY, imageWidth, imageHeight)
    }
  }

  @autobind
  handleMouseDown(e) {
    const { imageX, imageY, imageWidth, imageHeight } = this.state
    if (e.offsetX >= imageX && e.offsetX <= imageX + imageWidth &&
        e.offsetY >= imageY && e.offsetY <= imageY + imageHeight) {
      this.setState({
        dragging: true,
        mouseImageOffsetX: e.offsetX - imageX,
        mouseImageOffsetY: e.offsetY - imageY
      })
    }
  }

  @autobind
  handleMouseUp() {
    this.setState({ dragging: false })
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
