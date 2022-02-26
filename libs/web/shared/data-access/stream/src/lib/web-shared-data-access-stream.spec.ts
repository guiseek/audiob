import { webSharedDataAccessStream } from './web-shared-data-access-stream';

describe('webSharedDataAccessStream', () => {
  it('should work', () => {
    expect(webSharedDataAccessStream()).toEqual(
      'web-shared-data-access-stream'
    );
  });
});
