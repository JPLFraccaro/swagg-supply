const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

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
        blockedImage: faker.datatype.boolean(),
        price: parseInt(faker.commerce.price(), 10)
      })
    }
  }

  async create(data){
    if (data.id) {
      throw boom.conflict('no manual ID allowed')
    }
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
        if (this.products[0]) {
          resolve(this.products)
        } else {
          reject(boom.notFound('there is no product'))
        }
      }, 1000)
    })
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id)
    if (!product) {
      throw boom.notFound('product not found')
    }
    if (product.blockedImage) {
      throw boom.conflict('product image is blocked')
    }
    return product
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')
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
      throw boom.notFound('product not found')
    }
    this.products.splice(index, 1)
    return id
  }
}

module.exports = ProductsService
