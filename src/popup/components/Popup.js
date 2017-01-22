/* eslint-disable no-undef */

import React, { PureComponent } from 'react'
import { autobind } from 'core-decorators'

import styles from 'src/popup/components/Popup.css'

export default class Popup extends PureComponent {
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
    const { clipboard } = this.state
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
