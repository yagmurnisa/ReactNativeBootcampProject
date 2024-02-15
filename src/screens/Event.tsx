import { View, Image, Dimensions, Linking, Share } from 'react-native'
import React from 'react'
import { IconButton, Text, Button } from 'react-native-paper'
import Carousel from 'react-native-reanimated-carousel';
import dayjs from 'dayjs';
import { defaultImg } from '../data/events';

const Event = ({route, navigation}: any) => {
  const width = Dimensions.get('window').width;
  const event = route.params.event;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "Simply Share Anything across all social media platforms, isn't it awesome",
      });
      if (result.action === Share.sharedAction) {

        console.log(result);
        
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {

    }
  };
  return (
  <View style={{backgroundColor: "white", paddingVertical: "2%"}}>
    <View style={{paddingHorizontal: "3%"}}>
      <Text style={{fontSize:20}}>{event.name}</Text>
      <Text style={{fontSize:16}}>{`${event.location}, ${dayjs(event.date).format("DD-MM-YYYY")}`}</Text>
    </View>    
      {event.images.length <= 0 ? (
        <Image
        style={{height: 300, width: "90%", borderRadius: 5, marginTop: 10}}
        source={{
        uri: defaultImg,
        }}
      /> 
      ) : (
      <Carousel
        mode="parallax"
        loop={false}
        pagingEnabled={true}
        width={width}
        height={width / 2}
        autoPlay={false}
        data={event.images}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <Image
            style={{height: 300, width: "100%", borderRadius: 5, marginTop: 10}}
            source={{
            uri: event.images[index],
            }}
          />          
        )}
      /> )}
      <View style={{paddingHorizontal: "3%"}}>
        <Text style={{marginVertical: 10, fontSize:16}}>{event.description}</Text>
        {event.tickets == 0 ? <Text style={{ fontSize:16}}>Ücretsiz</Text> : 
        <View>
        <Text style={{ fontSize:16}}>Bilet Ücreti {event.tickets} TL</Text>
        <Button
        onPress={() => Linking.openURL(event.link)}
        >Bilet al</Button>
        </View>}
        <IconButton size={32} icon='share' onPress={()=> onShare()}/>
      </View>
  </View>
)
}
export default Event