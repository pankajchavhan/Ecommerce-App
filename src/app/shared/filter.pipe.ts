import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value:any[],filterstring:string, propName:string):any[] {
    const result:any =[];
    if(!value || filterstring == ''|| propName == ''){
      return value;
    }
    value.forEach((a:any)=>{
      if(a[propName].trim().toLowerCase().includes(filterstring.toLowerCase())){
        result.push(a);
      }

    })
    return result;
  }

}
