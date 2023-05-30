const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class CategoriesService {

  constructor(){
    this.categories = []
    this.generate()
  }

  generate(){
    const limit = 3
    for (let i = 0; i < limit; i++) {
      this.categories.push({
        id: faker.string.uuid(),
        category: faker.commerce.department()
      })
    }
  }

  async create(data){
    if (data.id) {
      throw boom.conflict('no manual ID allowed')
    }
    const newCategory = {
      id: faker.string.uuid(),
      ...data
    }
    this.categories.push(newCategory)
    return newCategory
  }

  async find(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=> {
        if (this.categories[0]) {
          resolve(this.categories)
        } else {
          reject('there is no category')
        }
      }, 1000)
    })
  }

  async findOne(id){
    const category = this.categories.find(item => item.id === id)
    if (!category) {
      throw boom.notFound('product not found')
    }
    return category
  }

  async update(id, changes){
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    const category = this.categories[index]
    this.categories[index] = {
      ...category,
      ...changes
    }
    return this.categories[index]
  }

  async delete(id){
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('product not found')
    }
    this.categories.splice(index, 1)
    return id
  }
}

module.exports = CategoriesService
