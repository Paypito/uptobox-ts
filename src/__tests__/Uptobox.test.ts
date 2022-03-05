import { Uptobox } from '../Uptobox';

jest.setTimeout(500000000);
/** Keep this secret */
let TOKEN = '';
let uptobox = new Uptobox();
uptobox.setToken(TOKEN);

test('downloadFile', async () => {
  if (TOKEN != '') {
    expect(await uptobox.downloadFile('https://uptobox.com/440wj3fzmojq?aff_id=267639')).toBe('File saved');
  }
});
