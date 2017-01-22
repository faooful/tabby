import React, { PureComponent, PropTypes } from 'react'
import classNames from 'classnames'
import { autobind } from 'core-decorators'

import styles from 'src/popup/components/Popup.css'

export default class Popup extends PureComponent {
  static propTypes = {
    className: PropTypes.string
  };

  constructor(props) {
    super(props)

    this.state = {
      clipboard: ''
    }
  }

  @autobind
  handleCopy() {
    chrome.tabs.getSelected(null, tab => {
      this.setState({ clipboard: `${this.state.clipboard}${tab.url}` })
    }).bind(this)
  }

  handleOpenHome() {
    chrome.tabs.create({ url: '/home.html' })
  }

  render() {
    const { className } = this.props
    const { clipboard } = this.state
    const computedClassName = classNames(styles.Popup, className)

    return (
      <div className={styles.popupContainer}>
        <div className={styles.popupButtonContainer}>
          <div className={styles.popupButton} onClick={this.handleCopy}>ADD TO TABBY</div>
          <div className={styles.popupButton} onClick={this.handleOpenHome}>HOME</div>
        </div>
        <textarea className={styles.clipboard} value={clipboard}></textarea>
      </div>
    )
  }
}
