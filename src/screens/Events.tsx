import { View, FlatList, Dimensions, Image, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Card, Text, Searchbar, Button, IconButton } from 'react-native-paper'
import { defaultImg, eventList } from '../data/events'
import { Drawer } from 'react-native-drawer-layout';
import DatePicker from 'react-native-date-picker'
import Carousel from 'react-native-reanimated-carousel';
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import RNPickerSelect from 'react-native-picker-select'
const citySet = [...new Set(eventList.map(i => i.location))];
const typeSet = [...new Set(eventList.map(i => i.type))];

const Events = ({navigation}: any) => {
  const width = Dimensions.get('window').width;
  dayjs.locale('tr');
  
  const [events, setEvents] = useState(eventList);
  const [cities, setCities] = useState("");
  const [types, setTypes] = useState("");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState<Date | null>()
  const [endDate, setEndDate] = useState<Date | null>()
  const [openSidebar, setOpenSidebar] = useState(false)
  const [open, setOpen] = useState(false) // for start date modal
  const [open2, setOpen2] = useState(false) // for end date modal

  function searchByName(text: string) {
    text = text.trim().toLocaleLowerCase();
    setSearchText(text)
    filterEvents(text) // using text instead of searchtext due to async issues
  }

  function filterEvents(text?: string) {
    let filteredEvents = eventList.filter(item => (text ? item.name.toLocaleLowerCase().includes(text): 1) &&
    (startDate ? dayjs(item.date, "DD-MM-YYYY").isAfter(dayjs(startDate, "DD-MM-YYYY")) : 1)
    && (endDate ? dayjs(item.date, "DD-MM-YYYY").isBefore(dayjs(endDate, "DD-MM-YYYY")) : 1)
    && (cities ? item.location === cities : 1) && (types ? item.type === types: 1))
    setEvents(filteredEvents) 
  }

  function clearFilters () {
    setCities("")
    setTypes("")
    setStartDate(null)
    setEndDate(null)
    let filteredEvents = searchText ? eventList.filter(item => item.name.toLocaleLowerCase().includes(searchText)) : eventList
    setEvents(filteredEvents)
  }

  return (
    <Drawer
      open={openSidebar}
      onOpen={() => setOpenSidebar(true)}
      onClose={() => setOpenSidebar(false)}
      renderDrawerContent={() => {
        return (
        <View style={{padding: "3%"}} >
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 22}}>Filtreler</Text>
          <IconButton size={32} icon='close' onPress={()=> setOpenSidebar(!openSidebar)}/>
        </View>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text>{startDate && dayjs(startDate).format('DD MMMM dddd')}</Text>
          <Button onPress={() => setOpen(true)} mode="outlined" style={{ marginBottom: '2%', marginLeft: 5, width: "45%" }}>
            Başlangıç
          </Button>
        </View>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text>{endDate && dayjs(endDate).format('DD MMMM dddd')}</Text>
          <Button onPress={() => setOpen2(true)} mode="outlined" style={{ marginBottom: '2%', marginLeft: 5, width: "45%" }}>
            Bitiş
          </Button>
        </View>
        <DatePicker
          modal
          open={open}
          date={startDate ? startDate : new Date()}
          onConfirm={(date: Date) => {
            setOpen(false)
            setStartDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
          mode="date"
        />
        <DatePicker
          modal
          open={open2}
          date={endDate ? endDate : new Date()}
          onConfirm={(date: Date) => {
            setOpen2(false)
            setEndDate(date)
          }}
          onCancel={() => {
            setOpen2(false)
          }}
          mode="date"
        />
        <RNPickerSelect
        placeholder={{label: 'Select city', value: null}}
        items={citySet.map( city => ({label: city, value: city}))}
        onValueChange={(e) => setCities(e)}
        value={cities}
        />
        <RNPickerSelect
        placeholder={{label: 'Select type', value: null}}
        items={typeSet.map( type => ({label: type, value: type}))}
        onValueChange={(e) => setTypes(e)}
        value={types}
        />
        <View style={{display: 'flex', flexDirection: 'row', marginTop: "3%", justifyContent: 'flex-end', gap:5}}>
          <Button mode="contained-tonal" onPress={() => clearFilters()}>Temizle</Button>
          <Button onPress={() => filterEvents(searchText)} mode="contained">Ara</Button> 
        </View>
        </View>
        );
      }}
    >
      <View style={{padding: "3%"}}>
      <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingBottom: '2%'}}>
        <IconButton size={32} icon='menu' onPress={()=> setOpenSidebar(!openSidebar)}/>
        <Searchbar
        value={searchText}
        placeholder="Search"
        onChangeText={text => searchByName(text)}
        style={{backgroundColor: "white", flex: 1}}  
        />
      </View>
      {eventList.length > 0 ? (
      <FlatList
        ListHeaderComponent={
        <>
        <View style={{backgroundColor: "white", padding: "2%", borderRadius: 10, height: 250, marginVertical: 10}}>
        <Text style={{fontSize: 20, fontWeight: "bold"}}>Popular Events</Text>
        <Carousel
        loop={true}
        pagingEnabled={true}
        width={width}
        height={200}
        autoPlay={true}
        autoPlayInterval={2000}
        data={eventList}
        scrollAnimationDuration={1000}
        onSnapToItem={(index) => console.log('current index:', index)}
        renderItem={({ index }) => (
          <Pressable onPress={() => navigation.navigate("Event", {event: eventList[index]})}>
          <Image    
            style={{height: 150, width: "90%", borderRadius: 5, marginTop: 10}}
            source={{
            uri: eventList[index].images.length == 0 ? defaultImg : eventList[index].images[0],
            }}
          />   
          <Text style={{ fontSize: 18,  marginTop: 10 }}>{eventList[index].name}</Text>
          </Pressable>       
        )}
        />
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <Text style={{fontSize: 20, fontWeight: "bold"}}>Events</Text>
          <Button onPress={() => navigation.navigate("PastEvents")}>See past events</Button>
        </View>
        </>}
        showsVerticalScrollIndicator={false}
        data={events}
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
          </Card>
          </>
        }
      /> ) : (
        <Text style={{fontSize: 18, alignSelf: 'center', fontWeight: 'bold'}}>No events found</Text>
      )}
    </View>
    </Drawer>
        
  )
}

export default Events