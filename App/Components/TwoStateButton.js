import React, { Component } from 'react'
import { Text, View, StyleSheet, ListView, TouchableWithoutFeedback } from 'react-native'
import { ColorSet, Animatable } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

const Styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    height: 40,
    width: 80,
    borderRadius: 15,
    paddingLeft: 10,
    paddingRight: 10
  },
  text: {
    color: ColorSet.TextLight,
    textAlign: 'center',
    fontSize: 12
  }
})

type TwoStateButtonProps = {
  activeText: string,
  inactiveText: string,
  activeColor: string,
  inactiveColor: string,
  active: boolean,
  onPress: () => void
}

export default class TwoStateButton extends Component {

  props: TwoStateButtonProps

  state: {
    active: boolean
  }

  constructor (props) {
    super(props)
    this.state = {
      active: this.props.active
    }
  }

  animate () {
    if (this.state.active) {
      this.props.onPress()
      this.refs.DeactivableButton.flipLeft(700)
//      this.refs.DeactivableButtonText.flipLeft(700)
    } else {
      this.refs.DeactivableButton.flipLeftReverse(700)
//      this.refs.DeactivableButtonText.flipLeftReverse(700)
    }
  }

  toggle () {
    this.animate()
    this.setState({active: !this.state.active})
  }

  render () {
    return (
      <Animatable.View ref='DeactivableButton'>
        <TouchableWithoutFeedback onPress={() => { this.toggle() }} >
          <View style={[Styles.button, {backgroundColor: this.state.active ? this.props.activeColor : this.props.inactiveColor}]} >
            {this.state.active &&
            <Animatable.Text
              ref='DeactivableButtonText'
              style={Styles.text}>
              {this.state.active ? this.props.activeText : this.props.inactiveText}
            </Animatable.Text>
            }
            {!this.state.active &&
            <Animatable.Text
              ref='DeactivableButtonText'
              animation='rotate'
              duration={800}
              easing='ease-in-out-sine'
              iterationCount='infinite'
              style={Styles.text}>
              {this.state.active ? this.props.activeText : this.props.inactiveText}
            </Animatable.Text>
            }
          </View>
        </TouchableWithoutFeedback>
      </Animatable.View>
    )
  }
}
