// @flow

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './Styles/RoundButtonStyle'

type RoundButtonProps = {
  onPress: () => void,
  text?: string,
  children?: string,
  navigator?: Object
}

export default class RoundButton extends React.Component {
  props: RoundButtonProps

  getText () {
    const buttonText = this.props.text || this.props.children || ''
    return buttonText.toUpperCase()
  }

  render () {
    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
        <Text style={styles.buttonText}>{this.getText()}</Text>
      </TouchableOpacity>
    )
  }
}