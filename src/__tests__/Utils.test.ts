import Utils from '../Utils';

const goodUrls = {
  withAffiliate: 'https://uptobox.com/0q9unv2f7cst?aff_id=267639',
  withoutAffiliate: 'https://uptobox.com/0q9unv2f7cst',
};

const badUrls = {
  badOne: 'https://google.com/',
  badTwo: 'https://uptobox.org/0q9unv2f7cst',
};

test('getFileCode', () => {
  expect(Utils.getFileCode(goodUrls.withAffiliate)).toBe('0q9unv2f7cst');
  expect(Utils.getFileCode(goodUrls.withoutAffiliate)).toBe('0q9unv2f7cst');
  expect(Utils.getFileCode(badUrls.badOne)).toBe(null);
  expect(Utils.getFileCode(badUrls.badTwo)).toBe(null);
});
