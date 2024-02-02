import { View, FlatList, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Card, Text, Searchbar, RadioButton, Button, IconButton } from 'react-native-paper'
import { eventList } from '../data/events'
import DatePicker from 'react-native-date-picker'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
const cities = [...new Set(eventList.map(i => i.location))];
const eventTypes = [...new Set(eventList.map(i => i.type))];

const Events = ({navigation}: any) => {
  dayjs.locale('tr')
  const [events, setEvents] = useState(eventList);
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState(new Date())
  const [openSidebar, setOpenSidebar] = useState(false)
  const [open, setOpen] = useState(false)
  const [endDate, setendDate] = useState(new Date())
  const [open2, setOpen2] = useState(false)

  function searchByName(text: string) {
    text = text.trim().toLocaleLowerCase();
    let filtered = eventList.filter(i => i.name.toLocaleLowerCase().includes(text))
    setSearchText(text)
    setEvents(filtered)
  }

  function searchByCity(text: string) {
    setValue2(text)
    let filtered = eventList.filter(i => i.location == text)
    setEvents(filtered)
  }

  function searchByType(text: string) {
    setValue(text)
    let filtered = eventList.filter(i => i.type == text)
    setEvents(filtered)
  }

  function searchByDate() {
    console.log(startDate)
    console.log(endDate)
    let startDateWithFormat = dayjs(startDate).format("DD-MM-YYYY")
    console.log(startDateWithFormat)
    let endDateWithFormat = dayjs(endDate).format("DD-MM-YYYY")
    console.log(endDateWithFormat)
    console.log(dayjs("21-02-2024", "DD-MM-YYYY"));
    console.log(dayjs(new Date('21-02-2024'), "DD-MM-YYYY").isAfter(startDateWithFormat))
    let filteredEvents = eventList.filter(item => dayjs(item.date, "DD-MM-YYYY").isAfter(startDateWithFormat) && dayjs(item.date, "DD-MM-YYYY").isBefore(endDateWithFormat))
    console.log(filteredEvents)
    setEvents(filteredEvents)                
  }

  return (
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
      <ScrollView style={{display: openSidebar ? 'flex': 'none', position: "absolute", top: 0, left: 0, zIndex: 1, backgroundColor: "white", padding: 10, width: '70%', height: '100%'}}>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontSize: 24}}>Filtreler</Text>
          <IconButton size={32} icon='close' onPress={()=> setOpenSidebar(!openSidebar)}/>
        </View>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text>{dayjs(startDate).format('DD MMMM dddd')}</Text>
          <Button onPress={() => setOpen(true)} mode="outlined" style={{ marginBottom: '2%', marginLeft: 5, width: "45%" }}>
            Başlangıç
          </Button>
        </View>
        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Text>{dayjs(endDate).format('DD MMMM dddd')}</Text>
          <Button onPress={() => setOpen2(true)} mode="outlined" style={{ marginBottom: '2%', marginLeft: 5, width: "45%" }}>
            Bitiş
          </Button>
        </View>
        <DatePicker
          modal
          open={open}
          date={startDate}
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
          date={endDate}
          onConfirm={(date: Date) => {
            setOpen2(false)
            setendDate(date)
          }}
          onCancel={() => {
            setOpen2(false)
          }}
          mode="date"
        />
        <Text>Cities</Text>
        <RadioButton.Group onValueChange={value => searchByCity(value)} value={value2}>
        {cities.map((city, index)=>
        <RadioButton.Item  label={city} key={index} value={city} />
        )}
        </RadioButton.Group>
        <Text>Type</Text>
        <RadioButton.Group onValueChange={value => searchByType(value)} value={value}>
        {eventTypes.map((type, index)=>
        <RadioButton.Item  label={type} key={index} value={type} />
        )}
        </RadioButton.Group>
        <View style={{display: 'flex', flexDirection: 'row', marginTop: "3%", justifyContent: 'flex-end', gap:5}}>
          <Button mode="contained-tonal" onPress={() => setEvents(eventList)}>Temizle</Button>
          <Button onPress={() => searchByDate()} mode="contained">Ara</Button> 
        </View>
      </ScrollView>
      <FlatList
        data={events}
        renderItem={({item}) =>
          <>
          <Card onPress={() => navigation.navigate("Event", {event: item})}
          key={item.id}
          style={{marginTop: 10, marginBottom: 5, backgroundColor: "white"}}>
            <Card.Cover style={{margin: 10}}source={{ uri: item.images[0]}}/>
            <Card.Title
            title={item.name}
            titleStyle={{fontSize: 22}}
            subtitle={`${item.location}, ${item.date}`}
            subtitleStyle={{fontSize:16}}
            />
            <Card.Content style={{marginTop: 5}}>
              <Text style={{fontSize: 16}} variant="bodyMedium">{item.description}</Text>
            </Card.Content>
          </Card>
          </>
        }
      /> 
    </View>
  )
}

export default Events