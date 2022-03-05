import Api from './Api';
import Utils from './Utils';

export class Uptobox {
  token: string | undefined;

  /**
   * Set the Uptobox user's token
   * @param {string} token
   */
  setToken = (token: string) => {
    this.token = token;
  };

  /**
   * Download a file from a Uptobox link
   * @param link URL of the file
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

  private waitDownloadLink = async (fileCode: string, waitingToken: string) => {
    await new Promise((r) => setTimeout(r, 32000));
    const responseDownload = await Api.getDownloadLink(this.token as string, fileCode, waitingToken);
    return responseDownload.data.data.dlLink;
  };
}
