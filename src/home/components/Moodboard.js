import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { autobind } from 'core-decorators'
import spreadImages from '../../utils/spreadImages'

import styles from 'src/home/components/Moodboard.css'

export default class Moodboard extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props)

    this.state = {
      images: [],
      draggedImageIndex: -1,
      mouseImageOffsetX: 0,
      mouseImageOffsetY: 0,
      dragging: false,
      imageSpreadTimeout: null
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

  @autobind
  addImage(image, width, height) {
    this.setState({
      images: [
        ...this.state.images,
        { image, width, height, x: 0, y: 0 }
      ]
    })
  }

  @autobind
  updateDraggedImage(x, y) {
    const { images, draggedImageIndex } = this.state
    const { image, width, height } = images[draggedImageIndex]
    this.setState({
      images: [
        ...images.slice(0, draggedImageIndex),
        { image, width, height, x, y },
        ...images.slice(draggedImageIndex + 1, images.length)
      ]
    })
  }

  drawImageOnCanvas(imageUrl) {
    const { addImage, redraw } = this
    const image = new Image()
    image.onload = function () {
      const maxLength = 400
      const reductionFactor = Math.max((this.width > this.height) ?
        this.width / maxLength :
        this.height / maxLength, 1)
      const width = this.width / reductionFactor
      const height = this.height / reductionFactor
      addImage(image, width, height)
      redraw()
    }
    image.src = imageUrl
  }

  @autobind
  redraw() {
    const context = this.getContext()
    context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let i = 0; i < this.state.images.length; i++) {
      const image = this.state.images[i]
      context.drawImage(image.image, image.x, image.y, image.width, image.height)
    }
  }

  @autobind
  handleMouseMove(e) {
    const { mouseImageOffsetX, mouseImageOffsetY, dragging } = this.state
    if (dragging) {
      const imageX = e.offsetX - mouseImageOffsetX
      const imageY = e.offsetY - mouseImageOffsetY
      this.updateDraggedImage(imageX, imageY)
      this.redraw()
    }
  }

  @autobind
  handleMouseDown(e) {
    for (let i = this.state.images.length - 1; i > -1; i--) {
      const { x, y, width, height } = this.state.images[i]
      if (e.offsetX >= x && e.offsetX <= x + width &&
          e.offsetY >= y && e.offsetY <= y + height) {
        this.setState({
          dragging: true,
          mouseImageOffsetX: e.offsetX - x,
          mouseImageOffsetY: e.offsetY - y,
          draggedImageIndex: i
        })
        return
      }
    }
  }

  @autobind
  handleMouseUp() {
    this.setState({ dragging: false })
  }

  @autobind
  handleImageSpreading() {
    const { images, imageSpreadTimeout } = this.state
    if (imageSpreadTimeout) {
      clearTimeout(imageSpreadTimeout)
    }
    const newImages = spreadImages(images, this.canvas)
    this.animateImageSpreading(images, newImages)
  }

  @autobind
  setImageSpreadTimeout(imageSpreadTimeout) {
    this.setState({ imageSpreadTimeout })
  }

  @autobind
  animateImageSpreading(before, after) {
    const { redraw, animateImageSpreading, setImageSpreadTimeout } = this
    const imageSpreadTimeout = setTimeout(() => {
      let finished = 0
      for (let i = 0; i < before.length; i++) {
        const xDifference = after[i].x - before[i].x
        const yDifference = after[i].y - before[i].y
        const widthDifference = after[i].width - before[i].width
        const heightDifference = after[i].height - before[i].height
        if (xDifference === 0 && yDifference === 0 &&
            widthDifference === 0 && heightDifference === 0) {
          finished++
          continue
        }
        before[i].x += 0.05 * xDifference
        before[i].y += 0.05 * yDifference
        before[i].width += 0.05 * widthDifference
        before[i].height += 0.05 * heightDifference
        if (Math.abs(after[i].x - before[i].x) < 1 &&
            Math.abs(after[i].y - before[i].y) < 1 &&
            Math.abs(after[i].width - before[i].width) < 1 &&
            Math.abs(after[i].height - before[i].height) < 1) {
          before[i].x = after[i].x
          before[i].y = after[i].y
          before[i].width = after[i].width
          before[i].height = after[i].height
          finished++
        }
      }
      redraw()
      if (finished < before.length) {
        animateImageSpreading(before, after)
      }
    }, 17)
    setImageSpreadTimeout(imageSpreadTimeout)
  }

  render() {
    const computedClass = classNames(this.props.className, styles.Moodboard)

    return (
      <div className={computedClass}>
        <button onClick={this.handleImageSpreading}>Spread images</button>
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
