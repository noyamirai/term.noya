import UtilsClass from '../scripts/utils';

class PromptHandler {

    constructor () {
        this.defaultPrompts = ['help', 'about', 'projects', 'skills', 'contact', 'clear'];
        this.sillyPrompts = ['hi', 'hello', 'stinky', 'hehe'];
    }

    checkSubmission = async (inputContainer, currentInput, userPrompt) => {
        const isValid = this.isValidPrompt(userPrompt);

        if (!isValid)
            return false;

        console.log('submission accepted:', userPrompt);

        if (userPrompt == 'clear') {
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

            const promptEl = inputContainer.closest('.prompt');

            // set new time
            const Utils = new UtilsClass();
            const currentTimeLabel = promptEl.querySelector('.js-current_time');
            currentTimeLabel.innerHTML = Utils.getCurrentTime();

            // scroll to top of page
            window.scrollTo(0, 0);

            return {createSection: false, insertPrompt: false};
        }

        const promptType = this.getPromptType(userPrompt);

        inputContainer.classList.add('disabled');

        currentInput.disabled = true;
        currentInput.style.width = 'auto';

        // removes focus
        currentInput.blur();

        if (promptType == 'default') {
            return await this.handleDefaultPrompt(userPrompt);
        } else {
            return false;
            // return await this.handleSillyPrompt(userPrompt);
        }

    }

    handleDefaultPrompt = async (userPrompt) => {

        return new Promise ((resolve) => {

            const allPromptInputs = document.querySelectorAll('form');

            setTimeout(() => {

                // If it is the first prompt submission (aka only one form element)
                if (allPromptInputs.length == 1) {

                    const sectionToShow = document.querySelector('.js-' + userPrompt);
                    const otherSections = document.querySelectorAll('section:not(.js-' + userPrompt + ')');
                    
                    // Always 'first try' on load
                    if (sectionToShow) {
                        sectionToShow.classList.remove('hide');

                    // After clear we're back to only one prompt, but initially loaded sections don't exist anymore
                    } else {
                        console.log('reveal section + insert new prompt component');
                        // revealSection(userPrompt).then(() => {
                        //     // Add new prompt only after a new section has been added into view
                        //     insertPromptPartial();
                        //     displayPrevData(previousPrompts);
                        // });

                        resolve({createSection: true, insertPrompt: true});

                    }

                    // Delete initial sections to avoid html clutter
                    otherSections.forEach(section => {
                        section.remove();
                    });

                // After x prompt submissions
                } else if (allPromptInputs.length > 1) {
                    console.log('reveal section + insert new prompt component');
                    // revealSection(userPrompt).then(() => {
                    //     // Add new prompt only after a new section has been added into view
                    //     insertPromptPartial();
                    //     displayPrevData(previousPrompts);
                    // });

                    resolve({createSection: true, insertPrompt: true});
                }
                
                console.log('create new prompt');
                console.log('display prev prompt');

                // // Create new prompt
                // insertPromptPartial();

                // // el.innerHtml resets form data so retrieve previous prompts and display in respective forms
                // displayPrevData(previousPrompts);

                resolve({createSection: false, insertPrompt: true});

            }, 350);
            
            
        });
    }

    handleSillyPrompt = () => {
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