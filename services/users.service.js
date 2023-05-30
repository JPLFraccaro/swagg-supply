const { faker } = require('@faker-js/faker')

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
        if (!this.users) {
          reject('no user found')
        } else {
          resolve(this.users)
        }
      },1000)
    })
  }

  async findOne(id){
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('user not found')
    }
    return this.users.find(item => item.id === id)
  }

  async update(id, changes){
    const index = this.users.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('user not found')
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
      throw new Error('user not found')
    }
    this.users.splice(index, 1)
    return id
  }
}

module.exports = UsersService
