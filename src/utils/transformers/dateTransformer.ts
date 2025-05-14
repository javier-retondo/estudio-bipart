import moment from 'moment';

export class DateTransformerClass<T> {
   private UTC: number = 0;
   constructor(
      private data: T,
      UTC: number = 0,
      private format: string,
   ) {
      this.UTC = UTC - 3;
   }

   public transform(): T {
      return this.recursiveTransform(this.data);
   }

   private recursiveTransform(data: any): any {
      data = data.toJSON ? data.toJSON() : data;
      if (Array.isArray(data)) {
         return data.map((item) => this.recursiveTransform(item)); // Recorre Arrays
      } else if (data && typeof data === 'object') {
         for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
               const value = data[key];

               if (value instanceof Date) {
                  data[key] = moment(value).utcOffset(this.UTC).format(this.format);
               } else if (typeof value === 'object' && value !== null) {
                  data[key] = this.recursiveTransform(value);
               }
            }
         }
      }
      return data;
   }
}
