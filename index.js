'use strict';

/**
 * template2env is a single function that accepts a string (and an optional object of options) as a parameter and returns an interpolated string with varaibles replaced by matching environment variables (located in `process.env`).
 *
 * It will throw if a matching variable is not found in `process.env` and will return the string that was passed if nothing was found to interpolate.
 * @param  {string} str
 * @param  {object} opts
 * @return {string}
 * @throws {Error} If no `match` is found in `process.env`
 */
function temp2env(str, opts) {
  const startToken = opts && opts.start || '${', // declare start token
    endToken = opts && opts.end || '}'; // declare end token

  let start, end, match, result, tail;

  str = str || ''; // str defaults to empty string

  start = str.indexOf(startToken); // beginning of var
  end = str.indexOf(endToken, start); // end of var
  match = ''; // init match
  result = start > 0 ? str.slice(0, start) : str;
  tail = ''; // init result

  // loop over string
  while (start !== -1 && end !== -1) {
    // grab match
    match = str.substring(start + startToken.length, end);

    // reset start at start of next startToken
    start = str.indexOf(startToken, end);

    if (process.env[match]) {
      // if there's a new var
      tail = start > 0
        ? str.slice(end + endToken.length, start)
        : str.slice(end + endToken.length);

      // concat results
      result += process.env[match] + tail;
    } else {
      // throw if match isn't an environment var
      throw new Error(match + ' is not an environment variable');
    }

    // set end of next var
    end = str.indexOf(endToken, start);
  }

  return result;
}

module.exports = temp2env;
