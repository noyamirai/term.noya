import UtilsClass from '../../scripts/utils';

class PromptHandler {

    constructor () {
        this.defaultPrompts = ['help', 'about', 'projects', 'skills', 'contact', 'git', 'github', 'repos', 'clear', 'download-resume'];
        this.sillyPrompts = ['hi', 'hello', 'stinky', 'hehe'];
    }

    checkSubmission = async (inputContainer, currentInput, userPrompt) => {
        return new Promise ((resolve) => {

            const isValid = this.isValidPrompt(userPrompt);

            if (!isValid)
                resolve(false);

            console.log('submission accepted:', userPrompt);

            if (userPrompt == 'clear') {
                this.clearTerm(inputContainer);
                resolve({createSection: false, insertPrompt: false});
                return;
            }
            
            inputContainer.classList.add('disabled');

            currentInput.disabled = true;
            currentInput.style.width = 'auto';

            // removes focus
            currentInput.blur();

            setTimeout(() => {
                resolve({createSection: true, insertPrompt: true});            
            }, 350);

        });

    }

    clearTerm = (inputContainer) => {
        const articleElement = document.querySelector('article');

        // On clear -> 'reset' terminal
        const toRemove = articleElement.querySelectorAll('section, form:not(:last-of-type)');

        toRemove.forEach(element => {
            element.remove();
        });

        const currentInput = inputContainer.querySelector('input');
        currentInput.value = null;

        // remove focus
        currentInput.focus();
        inputContainer.classList.remove('typing');

        currentInput.style.width = 'auto';
        const promptEl = inputContainer.closest('.prompt');

        // set new time
        const Utils = new UtilsClass();
        const currentTimeLabel = promptEl.querySelector('.js-current_time');
        currentTimeLabel.innerHTML = Utils.getCurrentTime();

        // scroll to top of page
        window.scrollTo(0, 0);
    }

    getUserPrompt = (form) => {
        // Read the form data
        const data = Array.from(form.elements)
        .filter((input) => input.name)
        .reduce(
            (obj, input) => Object.assign(obj, { [input.name]: input.value }),
            {}
        );

        return data.user_prompt;
    }

    getPromptType = (prompt) => {
        prompt = prompt.toLowerCase();

        if (this.defaultPrompts.includes(prompt)) {
            return 'default';
        } else if (this.sillyPrompts.includes(prompt)) {
            return 'silly';
        }

        return 'default';
    }

    isValidPrompt = (userPrompt) => {
        userPrompt = userPrompt.toLowerCase();

        if (this.defaultPrompts.includes(userPrompt) || this.sillyPrompts.includes(userPrompt)) {
            return true;
        }

        return false;
    }

}

export default PromptHandler;