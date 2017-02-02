import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'

import styles from 'src/home/components/Moodboard.css'

export default class Moodboard extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  render() {
    const computedClass = classNames(this.props.className, styles.Moodboard)

    return (
      <div className={computedClass}>
        <canvas className={styles.moodboardCanvas}></canvas>
      </div>
    )
  }
}
