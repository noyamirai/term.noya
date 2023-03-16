class Storage {
    getLastLog = () => {
        let lastLogDate = this.retrieveLastVisit();
        lastLogDate = lastLogDate.replace(/,/g, '');

        return lastLogDate;
    }

    retrieveLastVisit = () => {

        let lastVisit = localStorage.getItem("lastVisit");

        if(lastVisit === null){
            this.logVisit();

            let newVisit = localStorage.getItem("lastVisit");
            return newVisit;
        }
        
        return lastVisit;
    }

    logVisit = () => {
        // Get the current date and time
        let currentDate = new Date();

        // Convert the date and time to a string in the desired format
        let dateString = currentDate.toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });

        // Save the date and time to local storage
        localStorage.setItem("lastVisit", dateString);
        return true;
    }
}

export default Storage;