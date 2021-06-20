/**
 * Transforms the list into manageable chunks for making API calls and displaying data.
 *
 * @param data - array of ids
 * @returns [{page: 1, storyIds: 10}] - array of object with page number and 10 ids per object
 */
const transformData = (data) => {
  let pageNumber = 1;
  let transformedData = [];
  data.map((item, index, array) => {
    transformedData.push({
      page: pageNumber++,
      storyIds: array.splice(0, 15)
    });
  });
  return transformedData;
};

/**
 * Format date and time from the provided timestamp
 *
 * Intl.DateTimeFormat was not working with all timestamp value so I opted for a more manual approach...
 *
 * @param data
 * @returns {{formattedDate: string, formattedTime: string}}
 */
const formatDateAndTime = (data) => {
  let translatedDate = new Date(data * 1000);
  translatedDate.setMonth(translatedDate.getMonth() + 1); // JS date starts at 0 so add 1

  let hours = translatedDate.getHours() < 10 ? '0' + translatedDate.getHours() : translatedDate.getHours();
  let minutes = translatedDate.getMinutes() < 10 ? '0' + translatedDate.getMinutes() : translatedDate.getMinutes();
  let seconds = translatedDate.getSeconds() < 10 ? '0' + translatedDate.getSeconds() : translatedDate.getSeconds();

  let day = translatedDate.getDate() < 10 ? '0' + translatedDate.getDate() : translatedDate.getDate();
  let month = translatedDate.getMonth()  < 10 ? '0' + translatedDate.getMonth() : translatedDate.getMonth();
  let year = translatedDate.getFullYear();

  let formattedTime = `${hours}:${minutes}:${seconds}`;
  let formattedDate = `${day}/${month}/${year}`;

  return {formattedTime, formattedDate};
};

export const Utility = {formatDateAndTime, transformData};
