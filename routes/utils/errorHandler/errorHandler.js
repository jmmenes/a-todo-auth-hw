function parsedErrorMessage(err) {
  let output;
  try {
    let objectKeys = Object.keys(err.keyPattern);
    let objectValue = Object.values(err.keyValue);

    output = `${objectKeys[0]} ${objectValue[0]} already exists`;
  } catch (err) {
    output = 'Something went wrong please contact support';
  }

  return output;
}

function errorHandler(err) {
  let message = '';

  if (err.code) {
    switch (err.code) {
      case 11000:
      case 11001:
        message = parsedErrorMessage(err);
        break;
      default:
        message = 'Something went wrong please contact support';
    }
  } else if (err.message) {
    return err.message;
  }

  return message;
}

module.exports = errorHandler;
