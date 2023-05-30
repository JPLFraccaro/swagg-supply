const { faker } = require('@faker-js/faker')

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
        if (!this.categories) {
          reject('no categories found')
        } else {
          resolve(this.categories)
        }
      },1000)
    })
  }

  async findOne(id){
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('category not found')
    }
    return this.categories.find(item => item.id === id)
  }

  async update(id, changes){
    const index = this.categories.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('category not found')
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
      throw new Error('category not found')
    }
    this.categories.splice(index, 1)
    return id
  }
}

module.exports = CategoriesService
