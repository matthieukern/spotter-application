// @flow

import { StyleSheet } from 'react-native'
import { Fonts, Colors, Metrics } from '../../Themes/'
import { ColorSet } from '../../Themes/index'

export default StyleSheet.create({
  button: {
    width: 46,
    height: 46,
    borderRadius: 23,
    left: 20,
    position: 'absolute',
    backgroundColor: ColorSet.Secondary,
    justifyContent: 'center'
  },
  buttonText: {
    color: Colors.snow,
    textAlign: 'center',
    fontFamily: Fonts.type.bold,
    fontSize: 10,
    marginVertical: Metrics.baseMargin
  }
})
