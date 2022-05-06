//calender dates limited by 2 weeks to match with the api weather prediction limit
// Date entry and exit defined in order to select a date first then the exit date will  display days only after the entry date.

function dateEntry () {
    const today = new Date();
    let allowed = new Date((today.getTime() + (14 * (1000 * 60 * 60 * 24))));
    let maxiumumAllowed = new Date(allowed)
    let userisoString = document.getElementById("startDate");
    userisoString.min = today.toISOString().split("T")[0]; // changed time to iso string removed time
    userisoString.max = maxiumumAllowed.toISOString().split("T")[0]; // 
    console.log(today)
   }
   function dateExit () {
        document.getElementById('startDate').addEventListener('blur', callback)
        function callback() {
        let newStartDate = document.getElementById("startDate").value;
        let newEndDate = document.getElementById("endDate").min = newStartDate;
    }
}
dateExit(); window.onload = dateEntry();

export {dateExit, dateEntry}