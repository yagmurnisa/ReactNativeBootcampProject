import { View, FlatList } from 'react-native'
import React from 'react'
import { Card, Text } from 'react-native-paper'
import { defaultImg, eventList } from '../data/events'
import dayjs from 'dayjs'

const EventsByLocation = ({route, navigation}: any) => {
    const location = route.params.location;
    return (
        <View style={{backgroundColor: "white", paddingHorizontal: "3%", paddingVertical: "2%"}}>
        <Text style={{fontSize: 20, marginBottom: 10}}>Events In {location}</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={eventList}
          renderItem={({item}) => {if (item.location == location) {
            return (
          <>
            <Card onPress={() => navigation.navigate("Event", {event: item})}
            key={item.id}
            style={{ marginBottom: 10, backgroundColor: "white"}}>
            <Card.Cover style={{margin: 10}} source={{ uri: item.images.length == 0 ? defaultImg : item.images[0]}}/>
            <Card.Title
            title={item.name}
            titleStyle={{fontSize: 20}}
            subtitle={`${item.location}, ${dayjs(item.date).format("DD-MM-YYYY")}`}
            subtitleStyle={{fontSize:16}}
            />
            <Card.Content style={{marginTop: 5}}>
              <Text style={{fontSize: 16}} variant="bodyMedium">{item.description}</Text>
            </Card.Content>
          </Card>
          </> )
        }
          else {
            return (
                <View></View>
            )
          }
          }}
          /> 
        </View>
    )
}

export default EventsByLocation