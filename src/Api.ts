import Const from './Const';
import axios from 'axios';

export default class Api {
  /**
   * PREMIUM : Get a download link for an uptobox file
   * NORMAL : Get a waiting token for an uptobox file
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
   * Get a download link for an uptobox file with waiting token
   * @param {string} token
   * @param {string} fileCode
   * @param {string} waitingToken - Only required for non premium accounts
   * @returns The file download link in a promise
   */
  static getDownloadLink = async (token: string, fileCode: string, waitingToken: string) => {
    const url = Const.URL + `api/link?token=${token}&file_code=${fileCode}&waitingToken=${waitingToken}`;
    return await axios({ method: 'GET', url });
  };

  /**
   * Retrieve files's informations by providing the file codes.
   * @param {string[]} fileCodes
   * @returns {Promise<FileInfo[]>} Files informations
   */
  static getFilesInfo = async (...fileCodes: string[]) => {
    const url = Const.URL + `api/link/info?fileCodes=${fileCodes.join(',')}`;
    const resp = await axios({ method: 'GET', url });
    const list: any[] = await resp.data.data?.list;
    const fileInfos: FileInfo[] = [];
    list.map((item) =>
      fileInfos.push({
        fileCode: item?.file_code,
        fileName: item?.file_name,
        fileSize: item?.file_size,
        availableUts: item?.available_uts,
        needPremium: item?.need_premium,
      }),
    );
    return fileInfos;
  };

  /**
   * Get user's informations
   * @param {string} token
   * @returns {Promise<UserInfo>} User's informations
   */
  static getUserData = async (token: string) => {
    const url = Const.URL + `api/user/me?token=${token}`;
    const resp = await axios({ method: 'GET', url });
    const data = await resp.data.data;
    let userInfos: UserInfo;
    userInfos = {
      premium: data?.premium !== 0,
      login: data?.login,
      email: data?.email,
      point: data?.point,
      premiumExpire: new Date(data?.premium_expire) ?? null,
      securityLock: data?.securityLock !== 0,
      directDownload: data?.directDownload !== 0,
      sslDownload: data?.sslDownload !== 0,
      token: data?.token,
    };
    return userInfos;
  };
}
