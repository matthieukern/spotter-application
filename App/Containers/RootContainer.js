import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'

// Styles
import styles from './Styles/RootContainerStyles'
import MB from 'react-native-message-bar'
const MessageBar = MB.MessageBar
const MessageBarManager = MB.MessageBarManager

class RootContainer extends Component {
  componentDidMount () {
    // if redux persist is not active fire startup action
    MessageBarManager.registerMessageBar(this.refs.alert)
    if (!ReduxPersist.active) {
      this.props.startup()
    }
  }

  componentWillUnmount () {
    MessageBarManager.unregisterMessageBar()
  }

  render () {
    return (
      <View style={styles.applicationView}>
        <StatusBar barStyle='light-content' />
        <ReduxNavigation />
        <MessageBar ref='alert' />
      </View>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)
