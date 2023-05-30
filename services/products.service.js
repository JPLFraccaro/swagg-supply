const { faker } = require('@faker-js/faker')

class ProductsService {

  constructor(){
    this.products = []
    this.generate()
  }

  generate(){
    const limit = 3
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        details: faker.commerce.productDescription(),
        image: faker.image.url(),
        price: parseInt(faker.commerce.price(), 10)
      })
    }
  }

  async create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  async find(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=> {
        if (!this.products) {
          reject('non product found')
        } else {
          resolve(this.products)
        }
      },1000)
    })
  }

  async findOne(id){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }
    return this.products.find(item => item.id === id)
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }
    const product = this.products[index]
    this.products[index] = {
      ...product,
      ...changes
    }
    return this.products[index]
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }
    this.products.splice(index, 1)
    return id
  }
}

module.exports = ProductsService
