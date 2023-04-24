/**
 * function to create a filename for an image
 * @returns name
 */
export default function getPictureFileName() {
  //username/dd--mm-yyyy-timeInMilliseconds
  /*TODO add folder of person's username*/
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = String(today.getFullYear());
  var time = String(today.getTime());

  var name = mm + "-" + dd + "-" + yyyy + "-" + time + ".png";
  return name;
}
