import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Element } from './interfaces/element.interface';
import { CreateElementDTO } from './DTO/create-element.dto';

@Injectable()
export class ElementService {
    constructor(@InjectModel('Element') private readonly elementModel: Model<Element>) {}

    //fetch all elements
    async getAllElements(): Promise<Element[]>{
        const elements = await this.elementModel.find().exec();
        return elements;
    }

    //get a single element
    async getElement(elementID): Promise<Element>{
        const element = await this.elementModel.findById(elementID).exec();
        return element;
    }

    //add an element
    async addElement(createElementDTO: CreateElementDTO): Promise<Element>{
        //New was added in because error
        const newElement = await new this.elementModel(createElementDTO);
        return newElement.save();
    }

    //update existing element
    async updateElement(elementID, createElementDTO: CreateElementDTO): Promise<Element>{
        const updatedElement = await this.elementModel
            .findByIdAndUpdate(elementID, createElementDTO, {new: true});
        return updatedElement;
    }

    //delete an element (shouldn't do this. But for the sake of learning)
    async deleteElement(elementID): Promise<any>{
        const deletedElement = await this.elementModel.findByIdAndDelete(elementID);
        return deletedElement;
    }

}
