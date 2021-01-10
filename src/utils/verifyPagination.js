/*
 Assures that the page and limit provided through query strings are in range.
 Page = [ 1, nr_of_pages ]
 Limit = [ 1, nr_of_entries ]
 If not, normalizes them.
 */
module.exports = (limit, page, count) => {
  limit = (limit > 0) ? parseInt(limit) : 1000;
  page = (page > 0) ? parseInt(page) : 1;

  // If the provided page is greater than the last page, return results from the last page
  if (page > Math.ceil(count/limit))
    page = Math.ceil(count/limit);

  // If the provided limit is greater than the number of entries, return all the entries
  if (limit > count)
    limit = count;

  return {
    limit,
    page
  }
};
