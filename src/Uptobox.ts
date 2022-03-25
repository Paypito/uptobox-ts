import axios from 'axios';
import Api from './Api';
import Utils from './Utils';
import * as cheerio from 'cheerio';

export class Uptobox {
  private token: string | undefined;

  /**
   * Set the Uptobox user's token
   * @param {string} token
   */
  setToken = (token: string) => {
    this.token = token;
  };

  /**
   * Download a file from a Uptobox link
   * @param {string} link URL of the file
   * @returns The download status result
   */
  downloadFile = async (link: string) => {
    if (this.token === undefined) return 'Token is empty';
    const fileCode = Utils.getFileCode(link);
    if (fileCode == null) return 'Bad URL';
    const response = await Api.getWaitingToken(this.token, fileCode);
    switch (response.data?.statusCode) {
      case 7: {
        return 'Invalid parameter';
      }
      case 39: {
        return 'You have to wait 30 minutes';
      }
      case 16: {
        // Not Premium
        const fileUrl = await this.waitDownloadLink(fileCode, response.data.data.waitingToken);
        if (fileUrl !== undefined) {
          await Utils.saveFile(fileUrl);
          return 'File saved';
        }
        return 'Error while downloading';
      }
      case 0: {
        // Premium
        try {
          await Utils.saveFile(response.data.data.dlLink);
          return 'File saved';
        } catch (error) {
          return 'Error while downloading';
        }
      }
      default: {
        return 'An error occurred';
      }
    }
  };

  /**
   * Get the remaining time before you can start a download (the minimum is 30 for the connected state and 60 for the guests)
   * @param {string} fileLink URL of the file
   * @param {boolean} userConnected Specifies whether you want to retrieve the time remaining in the connected state or not
   * @returns The remaining number of seconds before a download can be started
   */
  getRemainingTime = async (fileLink: string, userConnected: boolean = true) => {
    const resp = await axios({ method: 'GET', url: fileLink });
    const $ = cheerio.load(resp.data);
    const time = parseInt($('.time-remaining').attr('data-remaining-time') as string, 10);
    return userConnected ? Math.max(30, time - 5400) : time;
  };

  private waitDownloadLink = async (fileCode: string, waitingToken: string) => {
    await new Promise((r) => setTimeout(r, 32000));
    const responseDownload = await Api.getDownloadLink(this.token as string, fileCode, waitingToken);
    return responseDownload.data.data.dlLink;
  };
}
