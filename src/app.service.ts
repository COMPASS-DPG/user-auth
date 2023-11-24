import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): string {
    return "WPCAS survey service running successfully";
  }
}
