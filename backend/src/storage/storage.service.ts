import { HttpService } from '@nestjs/axios';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createId } from '@paralleldrive/cuid2';
import { AxiosResponse } from 'axios';
import { createWriteStream, ReadStream } from 'fs';
import { join } from 'path';
import { PUBLIC_DIR } from 'src/constants';

@Injectable()
export class StorageService {
  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async downloadFile(url: string): Promise<{
    filename: string;
    path: string;
  }> {
    const filename = `${createId()}.jpg`;
    const writer = createWriteStream(join(PUBLIC_DIR, filename));
    // if theres a problem with the url, the error will be thrown here
    try {
      const { data }: AxiosResponse<ReadStream> = await this.http.axiosRef({
        url,
        method: 'GET',
        responseType: 'stream',
      });

      data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () =>
          resolve({
            filename,
            path: `${this.configService.get('app.url')}/public/${filename}`,
          }),
        );
        writer.on('error', reject);
      });
    } catch (e) {
      console.error(e);
      throw new UnprocessableEntityException('Invalid image url');
    }
  }
}
