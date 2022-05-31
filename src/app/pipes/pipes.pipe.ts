import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: "sort"
})
export class ArraySortPipe  implements PipeTransform {
  transform(array: any, field: string): any[] {
    if (!Array.isArray(array)) {
      return;
    }
    array.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return -1;
      } else if (a[field] > b[field]) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }
}

@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], propertyName: string): any[] {
    if (propertyName)
      return value.sort((a: any, b: any) => b[propertyName].localeCompare(a[propertyName]));
    else
      return value;
  }
}


@Pipe({
  name: 'filter'
})
@Injectable()
export class FilterPipe implements PipeTransform {

 transform(items: any[], args: any[]): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    //return items.filter(item => item.codigo.indexOf(args[0].codigo) !== -1);
    //return items.map(function(e) { return e; }).indexOf(args['search'].toLowerCase());
    //  return items.filter(item => item.detalles.toLowerCase().indexOf(args['search'].toLowerCase()) !== -1);
     if(!items) return [];
    if(!args['search']) return items;
    var searchText = args['search'].toLowerCase();
    return items.filter( it => {
    return it.name.es.toLowerCase().includes(searchText) || 
    it.name.en.toLowerCase().includes(searchText) || 
    it.description.es.toLowerCase().includes(searchText) || 
    it.description.en.toLowerCase().includes(searchText) ||
    it.ref.toLowerCase().includes(searchText) 
    });
  }
}

@Pipe({
  name: 'filter2'
})
@Injectable()
export class Filter2Pipe implements PipeTransform {

 transform(items: any[], args: any[]): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    //return items.filter(item => item.codigo.indexOf(args[0].codigo) !== -1);
    //return items.map(function(e) { return e; }).indexOf(args['search'].toLowerCase());
    //  return items.filter(item => item.detalles.toLowerCase().indexOf(args['search'].toLowerCase()) !== -1);
     if(!items) return [];
    if(!args['search']) return items;
    var searchText = args['search'].toLowerCase();
    return items.filter( it => {
    return it.name.toLowerCase().includes(searchText) || 
    it.location.toLowerCase().includes(searchText) 
    });
  }
}


@Pipe({
  name: 'filterOrder'
})
@Injectable()
export class FilterOrderPipe implements PipeTransform {

 transform(items: any[], args: any[]): any {
    // filter items array, items which match and return true will be kept, false will be filtered out
    //return items.filter(item => item.codigo.indexOf(args[0].codigo) !== -1);
    //return items.map(function(e) { return e; }).indexOf(args['search'].toLowerCase());
    //  return items.filter(item => item.detalles.toLowerCase().indexOf(args['search'].toLowerCase()) !== -1);
     if(!items) return [];
    if(!args['search']) return items;
    var searchText = args['search'].toLowerCase();
    return items.filter( it => {
    return it.orderId.toLowerCase().includes(searchText) || 
    it.status.toLowerCase().includes(searchText) 
    
    });
  }
}

@Pipe({
  name: "phone"
})
export class PhonePipe {
  transform(rawNum) {
    const countryCodeStr = "";//rawNum.slice(0,3);
    const areaCodeStr = rawNum.slice(3,6);
    const midSectionStr = rawNum.slice(6,9);
    const lastSectionStr = rawNum.slice(9);
    return `${countryCodeStr} (${areaCodeStr})${midSectionStr}-${lastSectionStr}`;
  }
}