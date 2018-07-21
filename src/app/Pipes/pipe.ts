import {Pipe, PipeTransform } from '@angular/core';
/*// import * as _ from 'lodash';

// @Pipe({
//   name: 'filter'
// })
// export class FilterPipe implements PipeTransform {
//   transform(items: Array<any>, filter: any): Array<any> {
//     return items.filter(item => {
//       for (let key in item ) {
//         if (('' + item[key]).includes(filter)) {
//           return true;
//         }
//       }
//       return false;
//     });
//   }
// }

    import {Pipe, PipeTransform} from 'angular2/core';
 */
    @Pipe({name: 'category'})
    export class FilterPipe implements PipeTransform {
      transform(categories: any, searchText: any): any {
         if(searchText == null) return categories;

        return categories.filter(function(employee){
          return employee.first_name.toLowerCase().indexOf(searchText) > -1;
        })
      }
    }