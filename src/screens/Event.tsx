import { View , ScrollView, FlatList, Image} from 'react-native'
import React, { useState } from 'react'
import { Avatar, Card, IconButton, Text, TextInput } from 'react-native-paper'

const Event = ({route, navigation}: any) => {
  const event = route.params.event;
return (
  <View style={{backgroundColor: "white"}}>
    <View style={{padding: "3%", backgroundColor: "white"}}>
      <Text style={{fontSize:22}}>{event.name}</Text>
      <Text style={{fontSize:16}}>{`${event.location}, ${event.date}`}</Text>
      <Image
      style={{height: 300, borderRadius: 5, marginTop: 10}}
        source={{
          uri: event.images[0],
        }}
      />
      <Text style={{marginTop: 10, fontSize:16}}>{event.description}</Text>
    </View>
  </View>
)
}
export default Event