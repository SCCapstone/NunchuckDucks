

export function getDate() {
    var today = new Date();
    console.log(today);
    var dd = String(today.getUTCDate()).padStart(2, "0");
    var mm = String(today.getUTCMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = String(today.getUTCFullYear());

    var date = yyyy + "-" + mm  + "-" + dd;
    return date;
}