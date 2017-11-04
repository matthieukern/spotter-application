// @flow

import { StyleSheet } from 'react-native'
import { ColorSet, Colors, Metrics } from '../../Themes'

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: ColorSet.Secondary,
    paddingTop: 70,
    flex: 1
  },
  form: {
    backgroundColor: Colors.snow,
    margin: Metrics.baseMargin,
    borderRadius: 4
  },
  row: {
    paddingVertical: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin
  },
  rowLabel: {
    color: Colors.charcoal
  },
  textInput: {
    height: 40,
    color: Colors.coal
  },
  textInputReadonly: {
    height: 40,
    color: Colors.steel
  },
  loginRow: {
    paddingBottom: Metrics.doubleBaseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    flexDirection: 'row'
  },
  loginText: {
    textAlign: 'center',
    color: Colors.silver
  },
  topLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    height: Metrics.images.large,
    width: Metrics.screenWidth
  },
  sentence: {
    paddingHorizontal: Metrics.doubleBaseMargin,
    // flexDirection: 'row',
    // alignItems: 'center',
    textAlign: 'center'
  },
  loginButtonStyle: {
    backgroundColor: ColorSet.Attention
  },
  register: {
    fontSize: 12,
    color: Colors.ember,
    marginVertical: Metrics.baseMargin,
    paddingHorizontal: Metrics.doubleBaseMargin,
    // flexDirection: 'row',
    // alignItems: 'center',
    textAlign: 'center'

  }
})
