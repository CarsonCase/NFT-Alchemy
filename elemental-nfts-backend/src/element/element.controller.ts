import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { ElementService } from './element.service';
import { CreateElementDTO } from './DTO/create-element.dto';


@Controller('element')
export class ElementController {
    constructor (private elementService: ElementService){}

    //add an element
    @Post('/create')
    async addElement(@Res() res, @Body() createElementDTO: CreateElementDTO) {
        const element = await this.elementService.addElement(createElementDTO);
        return res.status(HttpStatus.OK).json({
            message: "Element has been created successfully",
            element
        });
    }

    // Retrieve elements list
    @Get('elements')
    async getAllElements(@Res() res) {
        const elements = await this.elementService.getAllElements();
        return res.status(HttpStatus.OK).json(elements);
    }

    @Get('elements/:elementID')
    async getElement(@Res() res, @Param('elementID') elementID:string) {
        const element = await this.elementService.getElement(elementID);
        if(!element) throw new NotFoundException(elementID +" not found");
        return res.status(HttpStatus.OK).json({element});
    }

    @Put('/update')
    async updateElement(@Res() res, @Query('elementID') elementID, @Body() createElementDTO: CreateElementDTO) {
        const element = await this.elementService.updateElement(elementID, createElementDTO);
        if (!element) throw new NotFoundException('Element does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Element has been successfully updated',
            element
        });
    }

    // Delete an element (again. Shouldn't do but just for learning nestjs)
    @Delete('/delete')
    async deleteElement(@Res() res, @Query('elementID') elementID) {
        const element = await this.elementService.deleteElement(elementID);
        if (!element) throw new NotFoundException('Customer does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Element has been deleted',
            element
        });
    }

}


