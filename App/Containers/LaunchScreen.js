import React, { Component } from 'react'
import { View, Platform } from 'react-native'
import { NavigationActions } from 'react-navigation'
import Permissions from 'react-native-permissions'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { isLoggedIn } from '../Redux/LoginRedux'
import { connect } from 'react-redux'

class LaunchScreen extends Component {
  componentDidMount () {
    if (Platform.OS === 'android') {
      Permissions.request('camera')
      Permissions.request('microphone')
    }

    let screen = ''
    if (this.props.login && isLoggedIn(this.props.login)) { screen = 'HomeScreen' } else { screen = 'LoginScreen' }
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: screen })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render () {
    return (
      <View style={styles.mainContainer}>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
    token: state.login.token,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
