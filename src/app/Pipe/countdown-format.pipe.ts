import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdownFormat'
})
export class CountdownFormatPipe implements PipeTransform {
  transform(seconds: number): string {
    
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = (seconds % 60);

    const formattedTime: string = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  }
  // transform(milliseconds: number): string {
  //   const minutes = Math.floor(milliseconds / 60000);
  //   const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  //   return `${minutes}:${(parseInt(seconds) < 10 ? '0' : '') + seconds}`;
  // }
}
