import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject, Subscriber} from 'rxjs';
import {of} from 'rxjs/observable/of';
import 'rxjs/add/operator/map';

export interface Product {
  id?: number;
  data?: any;
  // lang?: string;
  qty?:number;
}

@Injectable()
export class ShoppingCartService {

  private itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  private itemsInCart: Product[] = [];

  constructor() {
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  public addToCart(item: Product, qty: number) {
    const productExistInCart = this.itemsInCart.find(({id}) => id === item.id); 
    if(!productExistInCart){
      this.itemsInCartSubject.next([...this.itemsInCart, item]);
      return;
    }else{
      productExistInCart.qty += qty
      // this.itemsInCartSubject.next([...this.itemsInCart, productExistInCart]);
    }   
  }

  // addProductToCart(item: Product, qty?:number) {
  //   const productExistInCart = this.itemsInCart.find(({id}) => id === item.id); // find product by name
  //   if (!productExistInCart) {
  //     this.itemsInCart.push({...item, qty: qty}); // enhance "porduct" opject with "num" property
  //     return;
  //   }
  //   productExistInCart.qty += qty;
  // }

  // removeProduct(id:string) {
  //   this.itemsInCart = this.itemsInCart.filter(({id}) => id !== id)
  //  }

  public removeFromCart(item: Product) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _.id !== item.id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  // public getItemsInCart(){
  //   return this.itemsInCart;
  // }

  public getTotalAmount(): Observable<number> {
    return this.itemsInCartSubject.map((items: Product[]) => {
      return items.reduce((prev, curr: Product) => {
        return prev + curr.data.price * curr.qty;
      }, 0);
    });
  }

  clearCart() {
    this.itemsInCartSubject = new BehaviorSubject([]);;
    this.itemsInCart = [];
  }

}