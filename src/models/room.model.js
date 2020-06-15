import moment from 'moment'
import { formatMoney } from 'utils'


const RoomType = {
  0: "Phòng tiện nghi",
  1: "Căn hộ mini",
  2: "Căn hộ studio",
  3: "Giường tầng",
}

const RoomStatus = {
  0: 'empty',
  1: 'warn',
}

class RoomModel {
  constructor(data) {
    const { room, company, images = [], flash_sale, available_status = {} } = data
    const { address } = room

    // string
    this.id = data.id
    // string
    this.cover = data.image_thumb
    // number
    this.price = data.price
    // string
    this.priceStr = formatMoney(data.price)
    // number
    this.highPrice = data.highPrice
    // string
    this.name = room.name
    // string
    this.address = address.address
    // object
    this.location = {
      lat: address.lat,
      lng: address.long
    }
    // string
    this.path = address.path
    // number
    this.type = data.type_property
    // string
    this.typeStr = RoomType[data.type_property]
    // string
    this.status = available_status.status
    // string
    this.statusStr = RoomStatus[available_status.status]
    // number
    this.people = data.max_people
    // float
    this.area = room.area
    // object
    this.company = {
      name: company.name,
      avatar: company.image_thumb,
      email: company.email,
      phoneNumber: company.phone_number,
      webAddress: company.web_address,
    }
    // object
    if (flash_sale) {
      let day = moment(flash_sale.end_datetime).diff(new Date(), 'days')
      let hour = moment(flash_sale.end_datetime).diff(new Date(), 'hours')
      let minute = moment(flash_sale.end_datetime).diff(new Date(), 'minutes')
      let second = moment(flash_sale.end_datetime).diff(new Date(), 'second')

      this.deal = {
        startTime: flash_sale.start_datetime,
        endTime: flash_sale.end_datetime,
        explain: `Còn ${day} ngày ${hour - (day * 24)} giờ ${minute - (hour * 60)} phút ${second - (minute * 60)} giây`,
        price: flash_sale.price,
        priceStr: formatMoney(flash_sale.price),
      }
    } else {
      this.deal = null
    }

    // array
    this.images = images.map((img) => ({
      original: img.image,
      thumbnail: img.image_thumb,
      sizes: {
        width: 165,
        height: 100
      }
    }))

    // string
    this.description = data.description

    // string
    this.video = "https://www.youtube.com/watch?v=ysz5S6PUM-U"
    
    // boolean
    this.isLiked = data.is_liked

    //object
    this.discounts = data.discounts
  }

}

export {
  RoomModel,
}
