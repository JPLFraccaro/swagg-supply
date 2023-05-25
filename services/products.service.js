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
  create(data){
    const newProduct = {
      id: faker.string.uuid(),
      ...data
    }
    this.products.push(newProduct)
    return newProduct
  }

  find(){
    return this.products
  }

  findOne(id){
    return this.products.find(item => item.id === id)
  }

  update(id, changes){
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

  delete(id){
    const index = this.products.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('product not found')
    }
    this.products.splice(index, 1)
    return id

  }

}

module.exports = ProductsService
