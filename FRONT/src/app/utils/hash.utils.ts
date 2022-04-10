import {Md5} from 'ts-md5/dist/md5';

export class HashUtils {

  static hash(append: string): string {
    return Md5.hashStr(append);
  }

}
