const { httpGet } = require('./mock-http-interface');

/**
 * Retrieve our favourite Arnie quotes 
 * @param {*} urls Array of urls to the Arnie Quote Rest API 
 * @returns Promise of all found Arnie Quotes 
 */
const getArnieQuotes = async (urls) => {

  const arnieQuoteApiPromises = urls.map((url) => httpGet(url));

  return Promise.all(arnieQuoteApiPromises).then((responses) => {
    const arnieQuotes = [];
    for (const response of responses) {

      //Cater for malformed response objects from the server 
      const responseBody = response.body ?? null;
      const message = JSON.parse(responseBody)?.message ?? 'NOT FOUND'
      let category = 'Arnie Quote';

      if (response?.status !== 200) {
        category = 'FAILURE';
      }

      arnieQuotes.push({ [category]: message })
    }
    return arnieQuotes;
  });

};

module.exports = {
  getArnieQuotes,
};
