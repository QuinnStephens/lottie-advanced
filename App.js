import React, { Component } from 'react'
import {
  Animated,
  Dimensions,
  ImageBackground,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import LottieView from 'lottie-react-native'

const backgroundImage = require('./assets/sky.jpg')
const animation = require('./assets/skyline.json')

export default class App extends Component<{}> {

  constructor(props) {
    super(props)
    this.state = {
      progress: new Animated.Value(0),
      progressAtStartOfPan: new Animated.Value(0)
    }
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        this.setState({ progressAtStartOfPan: this.state.progress })
      },
      onPanResponderMove: (evt, gestureState) => {
        const { dx, dy } = gestureState
        this.onPan({ dx, dy })
      },
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ progressAtStartOfPan: this.state.progress })
      }
    })
  }

  render() {
    return (  
      <View 
        style={{ flex: 1 }}
        {...this.panResponder.panHandlers}>
        <ImageBackground
          source={backgroundImage}
          style={{ flex: 1 }}>
          <LottieView 
            progress={ this.state.progress }
            style={{ height: '100%', width: '100%'}}
            source={animation} 
            loop={true}
            />
        </ImageBackground>
      </View>
    )
  }

  onPan({dx, dy}) {
    const { width } = Dimensions.get('window')
    const proportionateDelta = dx / width
    let progressValue = this.state.progressAtStartOfPan._value - proportionateDelta
    progressValue = Math.min(Math.max(progressValue, 0), 1)
    const progress = new Animated.Value(progressValue)
    this.setState({ progress })
  }
}
