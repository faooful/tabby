import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'

import styles from 'src/home/components/MoodboardPreview.css'

export default class MoodboardPreview extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string
  };

  render() {
    const { className, photo, title, date } = this.props
    
    const computedClass = classNames(className, styles.MoodboardPreview)

    return (
      <div className={computedClass}>
        <img src={photo} height="200" width="200" />
        <p>{title}</p>
        <p>{date}</p>
      </div>
    )
  }
}
