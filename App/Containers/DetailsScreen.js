import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  }})

class DetailsScreen extends Component {
  static navigationOptions = {
    title: 'Photo'
  }

  constructor (props) {
    super(props)
    console.log(JSON.stringify(props.navigation.state.params.url, null, 4))
  }

  render () {
    return (
      <View style={styles.imageContainer}>
        <Image
          source={{uri: this.props.navigation.state.params.url, isStatic: true}}
          style={styles.image} />
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsScreen)
