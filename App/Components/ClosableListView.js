import React, { Component } from 'react'
import { Text, View, StyleSheet, ListView, TouchableWithoutFeedback } from 'react-native'
import { ColorSet, Animatable } from '../Themes'
import Icon from 'react-native-vector-icons/FontAwesome'

const Styles = StyleSheet.create({
  header: {
    backgroundColor: ColorSet.BackgroundElement,
    justifyContent: 'center',
    height: 40
  },
  headerText: {
    color: ColorSet.Title,
    paddingLeft: 20,
    fontSize: 13,
    letterSpacing: 1.2
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 17,
    position: 'absolute'
  },
  arrow: {
    color: ColorSet.Arrow
  },
  emptyMessage: {
    color: ColorSet.Text,
    textAlign: 'center',
    paddingTop: 20,
    backgroundColor: 'transparent'
  }
})

type ClosableListViewProps = {
  title: string,
  dataSource: Object,
  renderRow: () => void,
  pageSize: number,
  height: number,
  horizontal: boolean,
  emptyMessage: string
}

export default class ClosableListView extends Component {

  props: ClosableListViewProps

  state: {
    display: boolean,
    animationFinished: boolean
  }

  constructor (props) {
    super(props)
    this.state = {
      display: true,
      animationFinished: false
    }
  }

  renderRow (rowData) {
    const { display } = this.state
    if (display) {
      return (
        display &&
        <View>
          { this.props.renderRow(rowData) }
        </View>
      )
    } else {
      return (
        <View />
      )
    }
  }

  noRowData () {
    return this.props.dataSource.getRowCount() === 0
  }

  animate () {
    if (this.state.display) {
      this.refs.arrowView.rotate90Left(350).then((end) => { this.setState({animationFinished: true}) })
      if (this.props.height) this.refs.listView.transitionTo({height: 0})
      else this.refs.listView.close(350)
    } else {
      this.refs.arrowView.rotate90LeftReverse(350)
      if (this.props.height) this.refs.listView.transitionTo({height: this.props.height})
      else this.refs.listView.open(350)
    }
  }

  toggle () {
    this.setState({display: !this.state.display, animationFinished: false})
    this.animate()
  }

  render () {
    return (
      <View>
        <TouchableWithoutFeedback onPress={() => { this.toggle() }} >
          <View style={Styles.header} >
            <Text style={Styles.headerText}>{this.props.title && this.props.title.toUpperCase()}</Text>
            <View style={Styles.arrowContainer} >
              <Animatable.View ref='arrowView'>
                <Icon name={'angle-down'} size={20} style={Styles.arrow} />
              </Animatable.View>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={{overflow: 'hidden'}}>
          <Animatable.View ref='listView' style={{height: this.props.height}}>
            { this.noRowData() && <Text style={Styles.emptyMessage}>{ this.props.emptyMessage }</Text> }
            <ListView
              key={!this.state.animationFinished}
              contentContainerStyle={Styles.listContent}
              dataSource={this.props.dataSource}
              renderRow={this.renderRow.bind(this)}
              enableEmptySections
              pageSize={this.props.pageSize}
              horizontal={this.props.horizontal}
            />
          </Animatable.View>
        </View>
      </View>
    )
  }
}
