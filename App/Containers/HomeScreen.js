import React, { Component } from 'react'
import {
  ScrollView,
  Text,
  Image,
  View,
  RefreshControl,
  ListView,
  TouchableWithoutFeedback,
  ActivityIndicator,
  StyleSheet
} from 'react-native'
import ClosableListView from '../Components/ClosableListView'
import { Images, Colors, ColorSet, ApplicationStyles } from '../Themes'
import { connect } from 'react-redux'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import TwoStateButton from '../Components/TwoStateButton'
import ImagePicker from 'react-native-image-picker'
import SpotActions from '../Redux/SpotsRedux'
import LoginActions from '../Redux/LoginRedux'
import UserActions from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation'
import RoundButton from '../Components/RoundButton'


const MessageBarManager = require('react-native-message-bar').MessageBarManager

const styles = StyleSheet.create({
  ...ApplicationStyles.screen,

  screen: {
    backgroundColor: ColorSet.Background,
    flex: 1
  },
  homeSection: {
    borderBottomColor: ColorSet.Border,
    borderBottomWidth: 0.5,
    height: 80,
    justifyContent: 'center'
  },
  profilePicture: {
    width: 46,
    height: 46,
    borderRadius: 23,
    left: 20,
    position: 'absolute'
  },
  profileName: {
    color: ColorSet.TextTitle,
    left: 76,
    fontSize: 15,
    letterSpacing: 0.3
  },
  profileStatus: {
    color: ColorSet.Text,
    left: 76,
    top: 2,
    fontSize: 10
  },
  postButton: {
    overflow: 'hidden',
    right: 20,
    position: 'absolute'
  },
  pastConsultationsRow: {
    backgroundColor: ColorSet.Background,
    flex: 1,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: ColorSet.Border
  },
  pastConsultationsRowPicture: {
    width: 160,
    height: 100,
    borderRadius: 18,
    position: 'absolute'
  },
  pastConsultationsRowName: {
    left: 175,
    color: ColorSet.Title,
    fontSize: 12,
    top: -1,
    letterSpacing: 0.3
  },
  pastConsultationsRowDate: {
    left: 175,
    color: ColorSet.Text,
    fontSize: 9
  },
  pastConsultationsRowArrowIcon: {
    position: 'absolute',
    color: ColorSet.Arrow,
    right: 16
  }
})

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
  }

  state: {
    dataSource: Object,
    isLoading: boolean,
    refreshing: boolean
  }

  constructor (props) {
    super(props)
    const dataObjects = []
    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})
    this.state = {
      dataSource: ds.cloneWithRows(dataObjects),
      isLoading: false,
      refreshing: false
    }
  }

  componentWillMount () {
    this.fillSpots()
  }

  componentDidMount () {
    this.props.me()
  }

  componentWillReceiveProps (newProps) {
    const {spots} = newProps

    console.log(JSON.stringify(spots, null, 4))

    this.setState({
      isLoading: false,
      refreshing: false
    })

    if (spots.list && typeof spots.list === 'object') {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(spots.list)
      })
    }
  }

  _onPressRow (rowData) {
    const navigate = this.props.navigation.navigate
    navigate('DetailsScreen', {
      url: rowData.photo
    })
  }

  logout () {
    this.props.logout()
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'LaunchScreen' })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  }

  renderRow (rowData) {
    return (
      <TouchableWithoutFeedback onPress={() => this._onPressRow(rowData)}>
        <View style={styles.pastConsultationsRow}>
          <Image
            source={rowData && rowData.photo ? {uri: rowData.photo, isStatic: true} : Images.background}
            style={styles.pastConsultationsRowPicture} />
          <Text style={styles.pastConsultationsRowName}>{rowData && rowData.user && rowData.user.name}</Text>
          <Text style={styles.pastConsultationsRowDate}>{rowData && rowData.createdAt}</Text>
          <MaterialCommunityIcons name='chevron-right' size={20} style={styles.pastConsultationsRowArrowIcon} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  postPicture = () => {
    const { createSpot } = this.props

    const options = {
      title: 'Choose a picture',
      chooseFromLibraryButtonTitle: 'From phone gallery',
      takePhotoButtonTitle: 'Use camera',
      cameraType: 'front',
      mediaType: 'photo',
      allowsEditing: true,
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5
    }
    ImagePicker.showImagePicker(options, (response) => {
      this.refs.loadingButton.toggle()
      if (response.error) {
        MessageBarManager.showAlert({
          title: 'Erreur',
          alertType: 'error',
          message: 'Veuillez sélectionner une autre image'
        })
      } else if (!response.didCancel) {
        let type = response.type ? response.type : response.uri.substr(response.uri.lastIndexOf('.') + 1).toLowerCase()
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(JSON.stringify(position, null, 4))
            console.log(JSON.stringify({photo: 'data:image/' + type + ';base64,' + response.data, location: [position.coords.latitude, position.coords.longitude]}, null, 4))
            createSpot({photo: 'data:image/' + type + ';base64,' + response.data, location: [position.coords.latitude, position.coords.longitude]})
          },
          (error) => {
            console.log(error)
            MessageBarManager.showAlert({
              title: 'Erreur',
              alertType: 'error',
              message: 'Vérifiez vos paramètres de géolocalisation'
            })
          }
        )
      }
    })
  }

  fillSpots () {
    const {getSpots} = this.props

    navigator.geolocation.getCurrentPosition(
      (position) => {
        getSpots({latitude: position.coords.latitude, longitude: position.coords.longitude})
      },
      (error) => {
        console.log(error)
        this.setState({
          isLoading: false,
          refreshing: false
        })
        MessageBarManager.showAlert({
          title: 'Erreur',
          alertType: 'error',
          message: 'Vérifiez vos paramètres de géolocalisation'
        })
      }
    )
  }

  onRefresh = () => {
    this.setState({refreshing: true})
    this.fillSpots()
  }

  render () {
    const { refreshing, isLoading } = this.state

    const Refresh = (<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />)
    const LoadingIndicator = (<ActivityIndicator size='small' animating color={Colors.snow} />)

    return (

      <View style={styles.screen}>
        <ScrollView refreshControl={Refresh}>

          {isLoading && LoadingIndicator}

          <View style={styles.homeSection}>
            <RoundButton
              text='Logout'
              onPress={() => this.logout()}
            />
            <Text style={styles.profileName}>{(this.props.user.data && this.props.user.data.name) || 'Loading...'}</Text>
            <Text style={styles.profileStatus}>{(this.props.user.data && this.props.user.data.email) || 'Loading...'}</Text>
            <View style={styles.postButton}>
              <TwoStateButton
                ref='loadingButton'
                activeText={<MaterialCommunityIcons name='camera' size={25} />}
                inactiveText={<MaterialCommunityIcons name='loading' size={25} />}
                activeColor={ColorSet.Primary}
                inactiveColor={ColorSet.Secondary}
                active
                onPress={this.postPicture}
              />
            </View>
          </View>

          <View>
            <ClosableListView
              title='Près de chez vous'
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              pageSize={15}
              emptyMessage='Pas de photos disponibles'
            />
          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    token: state.login.token,
    user: state.user,
    spots: state.spots
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    me: (params) => dispatch(UserActions.userRequest(params)),
    createSpot: (params) => dispatch(SpotActions.spotCreate(params)),
    getSpots: (params) => dispatch(SpotActions.spotList(params)),
    logout: () => {
      dispatch(LoginActions.logout())
      dispatch(UserActions.userRemove())
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
