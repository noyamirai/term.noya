class Utils {

    getCurrentTime = () => {

        const date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;

        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;

        return currentTime;
    }

    getSectionHeading = (sectionId) => {

        const headings = {
            'help': 'Command list',
            'about': 'Get to know me',
            'projects': 'Projects I am proud of',
            'skills': 'Things Im good at',
            'contact': 'Contact'
        }

        return headings[sectionId];
    }


    getNewPromptId = () => {
        const allFormElements = document.querySelectorAll('form');
        const index = 0;
        const firstId = allFormElements[index].id;
        let id;

        // First input prompt, standard id increase
        if (firstId == 'prompt-form') {
            id = allFormElements.length + 1;
        
        // Multiple prompts created
        } else {

            // Only one prompt on page due to clear
            // Get last part of id
            if (allFormElements.length == 1) {
                id = parseInt(allFormElements[index].id.split('-').pop().trim()) + 1;
            
            // get the last part of id from most recently inserted form
            } else {
                const lastFormElement = document.querySelector('form:last-of-type');
                id = parseInt(lastFormElement.id.split('-').pop().trim()) + 1;
            }
        }

        return id;
    }
    
}

export default Utils