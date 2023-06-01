const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class OrdersService {

  constructor(){
    this.orders = []
    this.generate()
  }

  generateDescription(){
    const limit = 3
    let orderDescription = []
    for (let i = 0; i < limit; i++){
      orderDescription.push({
        productID: faker.string.uuid(),
        units: faker.number.int({ min: 1, max: 10 }),
        price: parseInt(faker.commerce.price(), 10)
      })
    }
    return orderDescription
  }

  generate(){
    const limit = 3
    for (let i = 0; i < limit; i++) {
      this.orders.push({
        id: faker.string.uuid(),
        orderDescription: this.generateDescription(),
        userID: faker.string.uuid(),
        paid: faker.datatype.boolean(),
        delivered: faker.datatype.boolean(),
        address: faker.location.streetAddress(true)
      })
    }
  }

  async create(data){
    if (data.id) {
      throw boom.conflict('no manual ID allowed')
    }
    const newOrder = {
      id: faker.string.uuid(),
      ...data
    }
    this.orders.push(newOrder)
    return newOrder
  }

  async find(){

    return new Promise((resolve,reject)=>{
      setTimeout(()=> {
        if (this.orders[0]) {
          resolve(this.orders)
        } else {
          reject('there is no order')
        }
      },1000)
    })
  }

  async findOne(id){
    const order = this.orders.find(item => item.id === id)
    if (!order) {
      throw boom.notFound('order not found')
    }
    return this.orders.find(item => item.id === id)
  }

  async update(id, changes){
    const index = this.orders.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('order not found')
    }
    const order = this.orders[index]
    this.orders[index] = {
      ...order,
      ...changes
    }
    return this.orders[index]
  }

  async delete(id){
    const index = this.orders.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('order not found')
    }
    this.orders.splice(index, 1)
    return id

  }
}

module.exports = OrdersService
