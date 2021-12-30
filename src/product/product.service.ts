import { Injectable } from '@nestjs/common';
import { combineLatest, map, Observable, of } from 'rxjs';
import { categories, products, suppliers } from 'src/db';
import { IProduct } from './product.model';

@Injectable()
export class ProductService {

    private products = products;
    private categories = categories;
    private suppliers = suppliers;

    getAll() : Observable<IProduct[]>{
        return of(this.products);
    }

    findOne(productId : string) : Observable<IProduct>{
        return this.getAll().pipe(
            map(products => products.find(p => p.id === productId))
        )
        
    }

    getAllWithDetails() : Observable<IProduct[]>{
        return combineLatest([
            of(this.products), 
            of(this.categories), 
            of(this.suppliers)]).pipe(
                map(([p, c, s]) => 
                    p.map(pp =>({
                        ...pp,
                        category : c.find(cc => pp.categoryId === cc.id)?.name,
                        suppliers : s.filter(ss => pp.supplierIds?.includes(ss.id)) 
                    }) as IProduct)
                )
            );
    }

    list(page: number, limit : number) : Observable<IProduct[]>{

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;

        let list = this.products.slice(startIndex, endIndex); 

        return of(list);
    }

    create(newProduct: IProduct) :Observable<IProduct[]>{ 
        this.products.push(newProduct);
        return of(this.products);
    }

    edit(productId : string, updatedProuct: IProduct)  : Observable<IProduct[]>{
        const updatedProductsList = this.products.map(product => {
            if(product.id === productId){
                product = { ...product, ...updatedProuct}
                return product; //avoid null
            }
            else return product //avoid null
        })

        return of(updatedProductsList);
    }

    delete(productId : string) : Observable<IProduct[]>{
        this.products.map(product => {
            if(product.id === productId){
                this.products.splice(this.products.indexOf(product), 1); 
                return;
            }
        })
        return of(this.products); 
    }
}
