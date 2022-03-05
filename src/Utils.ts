import Const from './Const';
import axios from 'axios';
import * as fs from 'fs';
import * as stream from 'stream';
import { promisify } from 'util';

export default class Utils {
  static getFileCode = (fileLink: string) => {
    if (this.isUptoboxLink(fileLink)) {
      return new URL(fileLink).pathname.slice(1);
    } else {
      return null;
    }
  };

  private static isUptoboxLink = (fileLink: string) => {
    return fileLink.includes(Const.URL);
  };

  static saveFile = async (link: string) => {
    const finished = promisify(stream.finished);
    const fileName = link.substring(link.lastIndexOf('/') + 1);
    const writer = fs.createWriteStream(fileName);
    const response = await axios({ method: 'GET', url: link, responseType: 'stream' });
    await response.data.pipe(writer);
    return await finished(writer);
  };
}
