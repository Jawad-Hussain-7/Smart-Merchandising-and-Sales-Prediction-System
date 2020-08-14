import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet
} from 'react-native';

import { responsiveFontSize, responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
var similarity = require('compute-cosine-similarity');
var Jaccard = require("jaccard-index");
var jaccard = Jaccard();
import { tokenize, getWords, getBagOfWords, getSimilarity } from '../../Utility/recommendation'
import * as firebase from 'firebase'
import 'firebase/firestore'

export default class Tags extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cSim: null, jSim: null
    }
  }

  componentWillMount = async () => {
    /*var x = [5, 23, 2, 5, 9], y = [3, 21, 2, 5, 14];
    var s = similarity(x, y);
    this.setState({ cSim: s })
    y = [3, null, 5]
    var item1 = ["user1", "user2"];
    var item2 = ["user2", "user3", "user4"];
    var index = jaccard.index(x, y);
    this.setState({ jSim: index })
    var string1 = 'Julie loves me more than Linda loves me'
    var string2 = 'Jane likes me more than Julie loves me'
    let words = getWords([string1, string2])
    console.log(words.words)
    console.log(getBagOfWords(string1, words))
    console.log(getBagOfWords(string2, words))*/
    let obj1, objArr = []
    await firebase.firestore().collection('Ads').where('Category', '==', "Electronics")
      .where("Type", '==', 'Sale').get().then(async snashot => {
        let i = 0
        await snashot.docs.forEach(doc => {
          console.log(doc.data())
          if (i == 0) {
            obj1 = doc.data()
            i++
          }
          else
            objArr.push(doc.data())
        })
      })
      objArr.forEach(obj => {
        console.log(getSimilarity(obj1, obj ,obj1["Category"]))
      })
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{this.state.cSim}</Text>
        <Text>{this.state.jSim}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
});  