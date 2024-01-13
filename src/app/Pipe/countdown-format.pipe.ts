import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'countdownFormat'
})
export class CountdownFormatPipe implements PipeTransform {
  transform(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = seconds % 60;

    const formattedTime: string = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    return formattedTime;
  }
}
