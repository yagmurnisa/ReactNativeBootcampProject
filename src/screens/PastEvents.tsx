import { FlatList } from 'react-native'
import React, {useState} from 'react'
import { defaultImg, pastEvents } from '../data/events';
import { Card, Text, Button } from 'react-native-paper';
import dayjs from 'dayjs';

const PastEvents = ({navigation}: any) => {
  return (
    <FlatList
      ListHeaderComponent={
      <Button onPress={() => navigation.navigate("Events")}>See events</Button>}
        showsVerticalScrollIndicator={false}
        data={pastEvents}
        renderItem={({item}) =>
          <>
          <Card onPress={() => navigation.navigate("Event", {event: item})}
          key={item.id}
          style={{marginTop: 10, marginBottom: 5, backgroundColor: "white"}}>
            <Card.Cover style={{margin: 10}}source={{ uri: item.images.length == 0 ? defaultImg : item.images[0]}}/>
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
          </>}
        />
  )
}

export default PastEvents