import { getCustomRepository, Repository } from "typeorm"
import { User } from "../entities/User"
import {UsersRepository} from "../repositories/UsersRepository"


class UsersService{
    private usersRepository: Repository<User>

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository)
    }

    async create(email : string){
        //Verify if user exist
        const userExists = await this.usersRepository.findOne({email})
        
        //if exist, return id
        if(userExists){
            return userExists
        }

        //if don't, create it
        const user = this.usersRepository.create({
            email
        })

        await this.usersRepository.save(user)
        return user
    }

    async findByEmail(email: string) {
        const user = await this.usersRepository.findOne({ email });
    
        return user;
      }
}

export {UsersService}