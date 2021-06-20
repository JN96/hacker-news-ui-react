import {Utility} from '../../utils/Utility';

describe('Utility.transformData()', () => {
  it('should format the data into manageable chunks', function() {
    const mockData = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45
    ];

    const expectedData = [
      {page: 1, storyIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]},
      {page: 2, storyIds: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]},
      {page: 3, storyIds: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45]}];

    const test = Utility.transformData(mockData);

    expect(test).toEqual(expectedData);
  });

  describe('Utility.formatDateAndTime()', () => {
    it('should return the formatted date and time', function() {
      const expectedDateAndTime = {
        formattedTime: '18:52:18',
        formattedDate: '20/06/2021'
      };

      const dateAndTime = Utility.formatDateAndTime(1624211538);

      expect(dateAndTime).toEqual(expectedDateAndTime);
    });
  });
});
