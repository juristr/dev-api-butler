import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  variable: number = 0;

  root(): string {
    // const oldNumber = this.variable;
    // this.variable = Math.random() * 100;
    return `Hi, ${this.variable}`;
  }

  setValue(val: number) {
    this.variable = val;
  }
}
