const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')

class UsersService {

  constructor(){
    this.users = []
    this.generate()
  }

  generate(){
    const limit = 3
    for (let i = 0; i < limit; i++) {
      this.users.push({
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        pass: faker.string.alphanumeric(13),
        bio: faker.person.bio(),
        image: faker.image.avatar()
      })
    }
  }

  async create(data){
    if (data.id) {
      throw boom.conflict('no manual ID allowed')
    }
    const newUser = {
      id: faker.string.uuid(),
      ...data
    }
    this.users.push(newUser)
    return newUser
  }

  async find(){
    return new Promise((resolve,reject)=>{
      setTimeout(()=> {
        if (this.users[0]) {
          resolve(this.users)
        } else {
          reject('no user found')
        }
      }, 1000)
    })
  }

  async findOne(id){
    const user = this.users.find(item => item.id === id)
    if (!user) {
      throw boom.notFound('user not found')
    }
    return user
  }

  async update(id, changes){
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('user not found')
    }
    const user = this.users[index]
    this.users[index] = {
      ...user,
      ...changes
    }
    return this.users[index]
  }

  async delete(id){
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw boom.notFound('user not found')
    }
    this.users.splice(index, 1)
    return id
  }
}

module.exports = UsersService
