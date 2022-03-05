import Const from './Const';
import axios from 'axios';

export default class Api {
  /**
   * Get a download link for an uptobox file
   * @param {string} token
   * @param {string} fileCode
   * @param {string} password - Only required for files with password
   * @returns The waitingToken for non-premium users and the file download link for premium user in a promise
   */
  static getWaitingToken = async (token: string, fileCode: string, password?: string) => {
    let url = Const.URL + `api/link?token=${token}&file_code=${fileCode}`;
    if (password !== undefined) url = url.concat(`&password=${password}`);
    return await axios({ method: 'GET', url });
  };

  /**
   * Get a download link for an uptobox file
   * @param {string} token
   * @param {string} fileCode
   * @param {string} waitingToken - Only required for non premium accounts
   * @returns The file download link in a promise
   */
  static getDownloadLink = async (token: string, fileCode: string, waitingToken: string) => {
    const url = Const.URL + `api/link?token=${token}&file_code=${fileCode}&waitingToken=${waitingToken}`;
    return await axios({ method: 'GET', url });
  };
}
