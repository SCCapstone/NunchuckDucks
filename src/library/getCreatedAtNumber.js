export default function getCreatedAtNumber(createdAtStr) {
  // The string is 2022-11-25T18:44:00.308Z; we want 20221125184400308
  createdAtStr =
    createdAtStr.substring(0, 4) +
    createdAtStr.substring(5, 7) +
    createdAtStr.substring(8, 10) +
    createdAtStr.substring(11, 13) +
    createdAtStr.substring(14, 16) +
    createdAtStr.substring(17, 19) +
    createdAtStr.substring(20, 23);
  var createdAtInt = parseInt(createdAtStr);
  return createdAtInt;
}
