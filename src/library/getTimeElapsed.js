/**
 * function to return the time difference between npw and when created
 * @param {String} createdAt 
 * @returns ans
 */
export function getTimeElapsed(createdAt) {
    var ans = ""; // the output
    if (createdAt == undefined) {
      // Checks that createdAt exists
      // Will not exist when DataStore is not connected to remote
      return ans;
    }
    var createdAtFormatted = createdAt.substring(0, 19); //gets rid of a few milliseconds to make it proper format
    var currDate = new Date(); // current date and time in UTC
    var dateUploaded = new Date(createdAtFormatted); // date and time of upload in UTC
  
    // Both dates are already in UTC, this just gets the time difference
    var diff = currDate.getTime() - dateUploaded.getTime();
    var minutesDifference = diff / (1000 * 60);
    var hoursDifference = Math.floor(minutesDifference / 60);
    var daysDifference = Math.floor(hoursDifference / 24);
    var monthsDifference = Math.floor(daysDifference / 30);
    var yearsDifference = Math.floor(monthsDifference / 12);
  
    if (minutesDifference < 1) {
      ans = "less than a minute ago";
    } else if (minutesDifference <= 60) {
      ans = Math.round(minutesDifference.toString()) + ` minute${minutesDifference === 1 ? "" : "s"} ago`;
    } else if (hoursDifference <= 24) {
      ans = Math.round(hoursDifference.toString()) + ` hour${hoursDifference === 1 ? "" : "s"} ago`;
    } else if (daysDifference <= 30) {
      ans = Math.round(daysDifference.toString()) + ` day${daysDifference === 1 ? "" : "s"} ago`;
    } else if (monthsDifference <= 12) {
      ans = Math.round(monthsDifference.toString()) + ` month${monthsDifference === 1 ? "" : "s"} ago`;
    } else {
      ans = Math.round(yearsDifference.toString()) + ` year${yearsDifference === 1 ? "" : "s"} ago`;
    }
    return ans;
  }
  