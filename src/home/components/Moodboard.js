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
      images: [],
      draggedImageIndex: -1,
      mouseImageOffsetX: 0,
      mouseImageOffsetY: 0,
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
    for (let i = 0; i < this.state.images.length; i++) {
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
