import dayjs from 'dayjs'
export const allEvents = [
    {
        id:1,
        name: "Tarkan Konseri",
        location: "İzmir",
        type: "Konser",
        description: '18 Şubat izmir Tarkan konseri',
        date: new Date("2024-02-18"),
        tickets: 200,
        images: ['https://img.freepik.com/free-photo/rear-view-large-group-music-fans-front-stage-during-music-concert-by-night-copy-space_637285-623.jpg','https://img.freepik.com/free-photo/light-beam-crowd-people_1409-7694.jpg']
    },
    {
        id:2,
        name: "Manga Konseri",
        location: "İstanbul",
        type: "Konser",
        description: '19 Şubat İstanbul Manga konseri',
        date: new Date("2024-02-19"),
        tickets: 0,
        images: ['https://img.freepik.com/free-photo/light-beam-crowd-people_1409-7694.jpg']
    },
    {
        id:3,
        name: "Hadise Konseri",
        location: "İstanbul",
        type: "Konser",
        description: '21 şubat istanbul hadise konseri',
        date: new Date("2024-02-21"),
        tickets: 200,
        images: ['https://img.freepik.com/free-photo/rear-view-large-group-music-fans-front-stage-during-music-concert-by-night-copy-space_637285-623.jpg']
    },
    {
        id:4,
        name: "Resim Sergisi",
        location: "Ankara",
        type: "Sergi",
        description: '23 şubat ankara resim sergisi',
        date: new Date("2024-02-23"),
        tickets: 0,
        images: ['https://img.freepik.com/free-vector/abstract-art-concept-illustration_114360-5605.jpg']
    },
    {
        id:5,
        name: "Tiyatro",
        location: "İzmir",
        type: "Tiyatro",
        description: '24 şubat izmir tiyatro',
        date: new Date("2024-02-24"),
        tickets: 50,
        images: ['https://img.freepik.com/free-vector/theater-empty-stage-with-red-curtains-spotlights_107791-13513.jpg']
    },
    {
        id:6,
        name: "Konser",
        location: "İzmir",
        type: "Konser",
        description: '24 şubat izmir konser',
        date: new Date("2024-02-24"),
        tickets: 0,
        images: []
    }
]

export const defaultImg = 'https://img.freepik.com/premium-photo/people-concert_31965-3617.jpg'

export const eventList = allEvents.filter(item => dayjs(item.date, "DD-MM-YYYY").isAfter(dayjs(new Date(), "DD-MM-YYYY")) || dayjs(item.date, "DD-MM-YYYY").isSame(dayjs(new Date(), "DD-MM-YYYY")))

export const pastEvents = allEvents.filter(item => dayjs(item.date, "DD-MM-YYYY").isBefore(dayjs(new Date(), "DD-MM-YYYY")))

export type  EventList = {
    id: number;
    name: string;
    location: string;
    type: string;
    description: string;
    date: Date;
    images: string[];
  }[]
