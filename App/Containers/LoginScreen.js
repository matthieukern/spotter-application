import React from 'react'
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Styles from './Styles/LoginScreenStyle'
import {Images, Colors} from '../Themes'
import LoginActions from '../Redux/LoginRedux'
import RoundedButton from '../Components/RoundedButton'
import { NavigationActions } from 'react-navigation'

const MessageBarManager = require('react-native-message-bar').MessageBarManager

type LoginScreenProps = {
  dispatch: () => any,
  loginRequest: () => void,
  loginFailure: () => void,
  initLogin: () => void,
  login: {
    token: String,
    email: String,
    fetching: boolean,
    error: Object
  }
}

class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login'
  }

  props: LoginScreenProps

  state: {
    email: string,
    password: string,
    errorStyle: {
      height: number
    }
  }

  constructor (props: LoginScreenProps) {
    super(props)
    this.state = {
      email: '',
      password: '',
      errorStyle: {
        height: 0
      }
    }
  }

  componentWillReceiveProps (newProps) {
    const {login} = newProps
    login.error && MessageBarManager.showAlert({
      alertType: 'error',
      title: 'Erreur',
      message: login.error.message.message || 'Une erreur est survenue'
    })

    if (login.token) {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'HomeScreen' })
        ]
      })
      this.props.navigation.dispatch(resetAction)
    }
  }

  componentWillMount () {
  }

  componentDidMount () {
    console.log(JSON.stringify(this.props, null, 4))
    this.props.initLogin()
  }

  componentWillUnmount () {}

  handlePressLogin = () => {
    let { email, password } = this.state
    Keyboard.dismiss()
    this.props.loginRequest(email, password)
  }

  handleChangeEmail = (text) => {
    this.setState({ email: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  _onPressRegister () {
    const navigate = this.props.navigation.navigate
    navigate('RegisterScreen')
  }

  render () {
    const { email, password } = this.state
    const { fetching } = this.props.login
    const editable = !fetching
    const textInputStyle = editable ? Styles.textInput : Styles.textInputReadonly
    const LoginButton = (<RoundedButton style={Styles.loginButtonStyle} onPress={this.handlePressLogin}
                                        text='Sign in' />)

    return (
      <View style={Styles.mainContainer}>
        <ScrollView contentContainerStyle={{justifyContent: 'center'}}
                    style={[Styles.container, this.state.container]}>
          <Image source={Images.logo} style={[Styles.topLogo, this.state.topLogo]} />
          <ActivityIndicator size='small' animating={fetching} color={Colors.snow} />
          <View style={Styles.form}>
            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>Email</Text>
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
                onChangeText={this.handleChangeEmail.bind(this)}
                underlineColorAndroid='transparent'
                onSubmitEditing={() => this.refs.password.focus()}
                placeholder={'Email'} />
            </View>

            <View style={Styles.row}>
              <Text style={Styles.rowLabel}>Password</Text>
              <TextInput
                ref='password'
                style={textInputStyle}
                value={password}
                editable={editable}
                keyboardType='default'
                returnKeyType='go'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry
                onChangeText={this.handleChangePassword}
                underlineColorAndroid='transparent'
                onSubmitEditing={this.handlePressLogin}
                placeholder={'Password'} />
            </View>
          </View>
          <TouchableOpacity onPress={this._onPressRegister.bind(this)}>
            <Text style={Styles.register}>Register</Text>
          </TouchableOpacity>
          { LoginButton }
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest: (email, password) => dispatch(LoginActions.loginRequest(email, password)),
    initLogin: () => dispatch(LoginActions.logout())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
