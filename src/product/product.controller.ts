import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {

    constructor(private readonly productService : ProductService){}

    @Get()
    getAll(){
        return this.productService.getAll();
    }

    @Get('/details')
    getAllWithDetails(){
        return this.productService.getAllWithDetails();
    }

    //GET http://localhost:3000/products/list?page=1&limit=2
    @Get('/list')
    list(
        @Query('page') page : number,
        @Query('limit') limit : number
    ) {
        return this.productService.list(page, limit);
    }

    @Get('/:productId') //Must Be : below details and list or it can cosnider /list and /details are ids
    findOne(@Param('productId') productId: string){ 
        return this.productService.findOne(productId);
    }

    @Post()
    create(@Body() body){
        return this.productService.create(body);
    }

    @Put('/:productId') // /edit/:id
    edit(
        @Param('productId') productId: string,
        @Body() body
    ) {
        return this.productService.edit(productId, body);
    }

    @Delete('/:productId') // /delete/:id
    delete(@Param('productId') productId: string){
        return this.productService.delete(productId);
    }
}
