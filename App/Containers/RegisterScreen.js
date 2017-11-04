// @flow

import React from 'react'
import {
  View,
  ScrollView,
  TextInput,
  Keyboard,
  ActivityIndicator
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/RegisterScreenStyle'
import {Colors, Metrics} from '../Themes'
import {isLoggedIn} from '../Redux/LoginRedux'
import UserActions from '../Redux/UserRedux'
import LoginActions from '../Redux/LoginRedux'
import RoundedButton from '../Components/RoundedButton'
import { NavigationActions } from 'react-navigation'

const MessageBarManager = require('react-native-message-bar').MessageBarManager

type RegisterScreenProps = {
  dispatch: () => any,
  fetching: boolean,
  register: () => any,
  email: String,
  user: Object,
  removeUser: () => any
}

class RegisterScreen extends React.Component {
  static navigationOptions = {
    title: 'Register'
  }

  props: RegisterScreenProps

  state: {
    name: string,
    email: string,
    password: string,
    passwordConfirmation: string,
    birthDate: string,
    phone: string,
    container: {
      height: number,
      paddingTop: number
    },
    topLogo: {
      marginBottom: number
    },
    keyboardOpen: boolean,
    registerButtonStyle: Object,
    registerButtonLayoutHeight: number,
  }

  constructor (props: RegisterScreenProps) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      phone: '',
      visibleHeight: Metrics.screenHeight,
      colorFemale: Colors.silver,
      colorMale: Colors.charcoal,
      container: {
        paddingTop: 15,
        minHeight: Metrics.screenHeight
      }
    }
  }

  componentWillReceiveProps (newProps) {
    // Did the login attempt complete?
    const {user, login} = newProps

    console.log(JSON.stringify(newProps, null, 2))

    if (login.token) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'HomeScreen' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }

    if (user.error) {
      MessageBarManager.showAlert({
        title: 'Erreur',
        message: user.error.message,
        alertType: 'error'
      })
    } else {
      if (user.payload) this.props.loginRequest(user.payload.email, user.payload.password)
    }
  }

  componentDidMount () {
    const { removeUser } = this.props
    removeUser()
  }

  handlePressRegister = () => {
    let { name, email, password, phone, passwordConfirmation } =
      this.state

    const errors = [
      {
        value: (name === ''),
        message: 'Missing name'
      },
      {
        value: (email === ''),
        message: 'Missing email'
      },
      {
        value: (password !== passwordConfirmation),
        message: 'Missing password'
      },
      {
        value: (phone === ''),
        message: 'Missing phone number'
      }
    ]

    for (var error of errors) {
      if (error.value) {
        console.log(error.message)
        return MessageBarManager.showAlert({
          alertType: 'error',
          title: 'Erreur',
          message: error.message
        })
      }
    }

    this.props.register({
      name,
      email,
      password,
      phone
    })
  }
  render () {
    const {
      name,
      email,
      password,
      passwordConfirmation,
      phone
    } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly

    return (
      <View style={Styles.mainContainer} keyboardDismissMode='on-drag'>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}} style={[Styles.container, this.state.container]}>
          <ActivityIndicator size='small' animating={fetching} color={Colors.snow} />
          <View style={Styles.form}>
            <View style={Styles.row}>
              <TextInput
                ref='firstName'
                style={textInputStyle}
                value={name}
                defaultValue={name}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                maxLength={30}
                autoCorrect={false}
                onChangeText={(name) => this.setState({ name })}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.email.focus()}
                placeholder='Name' />
            </View>

            <View style={Styles.row}>
              <TextInput
                ref='email'
                style={textInputStyle}
                value={email}
                defaultValue={email}
                editable={editable}
                keyboardType='email-address'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(email) => this.setState({ email })}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.phone.focus()}
                placeholder={'Email'} />
            </View>

            <View style={Styles.row}>
              <TextInput
                ref='phone'
                style={textInputStyle}
                value={phone}
                defaultValue={phone}
                editable={editable}
                keyboardType='phone-pad'
                returnKeyType='done'
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={(phone) => this.setState({ phone })}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder={'Phone'} />
            </View>

            <View style={Styles.row}>

              <TextInput
                ref='password'
                style={textInputStyle}
                value={password}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={(password) => this.setState({ password })}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.passwordConfirmation.focus()}
                placeholder={'Password'} />
            </View>

            <View style={Styles.row}>

              <TextInput
                ref='passwordConfirmation'
                style={textInputStyle}
                value={passwordConfirmation}
                editable={editable}
                keyboardType='default'
                returnKeyType='next'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={(passwordConfirmation) => this.setState({ passwordConfirmation })}
                underlineColorAndroid='transparent'
                onSubmitEditing={Keyboard.dismiss}
                placeholder={'Confirm'} />
            </View>

          </View>

          <View>
            <RoundedButton style={Styles.register} onPress={this.handlePressRegister} text={'register'} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fetching: state.user.fetching,
    email: state.login.email,
    isLogged: isLoggedIn(state.login),
    user: state.user,
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: (payload) => dispatch(UserActions.userCreate(payload)),
    removeUser: () => dispatch(UserActions.userRemove()),
    loginRequest: (email, password) => dispatch(LoginActions.loginRequest(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
