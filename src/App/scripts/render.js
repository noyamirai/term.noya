class Render {

    renderCommentHeadings = () => {
        const commentHeadings = document.querySelectorAll('.comment:not(.comment__rendered)');

        if (commentHeadings.length > 0) {
            commentHeadings.forEach((headingContainer) => {
                this.setCommentHeading(headingContainer);
            });
        }
    }

    getHashtags = (charCount) => {
        let result = '';

        for (let i = 0; i < charCount; i++) {
            result += '#';
        }

        return result;
    }

    setCommentHeading = (headingContainer) => {

        const heading = headingContainer.querySelector('.comment__heading');
        const hashtags = headingContainer.querySelectorAll('.comment__hashtags');

        heading.innerHTML = heading.textContent.replace(/ /g, '&#x2022;');
        heading.innerHTML = '#&#x2022;' + heading.textContent + '&#x2022;#';

        const charCount = heading.textContent.length;
        const hashtagString = this.getHashtags(charCount);

        headingContainer.classList.add('comment__rendered');

        // Set hashtags
        hashtags.forEach(spanEl => {
            spanEl.textContent = hashtagString;
        });

    }


    getPercentageBars = (percentage) => {

        let result = '';
        const nPercentage = percentage/10;

        for (let i = 1; i <= 10; i++) {

            if (i <= nPercentage) {
                if (i == 1)
                    result += '<span class="green">';

                result += '=';

                if (i == nPercentage)
                    result += '</span>';
            } else {
                result += '-';
            }
        }

        return result;
    }

    setPercentageBars = () => {
        const skillIndicators = document.querySelectorAll('.js-skill-level-container');

        skillIndicators.forEach(container => {
            const levelBar = container.querySelector('.js-level');
            const assignedLevel = parseInt(container.dataset.percentage);
            const levelBarContent = this.getPercentageBars(assignedLevel);
            const percentageText = container.nextElementSibling;

            percentageText.innerHTML = assignedLevel + '%';
            levelBar.innerHTML = levelBarContent; 
        });
    }
    
    disablePrompt = (inputContainer, currentInput) => {
        // User submitted unknown prompt
      inputContainer.classList.add('disabled');
      currentInput.disabled = true;

      // removes focus
      currentInput.blur();
      inputContainer.classList.remove('typing');
        currentInput.style.width = 'auto';
    }
}

export default Render;