import React from 'react'
import '../Header/header.css'
import spiderLogo from '../assets/spider-logo.svg'
import UtilsClass from '../scripts/utils.js';
import TypewriterClass from '../scripts/typewriter.js';

const Utils = new UtilsClass();
const Typewriter = new TypewriterClass();

const Header = ({ lastLog }) => {

    const [rendered, setRenderedStatus] = React.useState(false);

    React.useEffect(() => {
        setRenderedStatus(true);

        if (rendered) {
            init();
        }

    }, [rendered]);

    return (
        <header className='header'>
            <img className='header__logo' src={spiderLogo} alt="Spider Logo" />

            <p className='js-typeWriter js-lastlog hide'>Last Login: {lastLog} on console</p>
            <p className='js-typeWriter hide'>Type "help" to see available commands</p>
        </header>
    );
}

const init = () => {

    const typeWriterText = document.querySelectorAll('.js-typeWriter');
    const inputField = document.getElementById("promptInputField");

    setTimeout(() => {
        Typewriter.processParagraphs(typeWriterText, 0).then(() => {

            // When done animating paragraphs -> show prompt form
            setTimeout(() => {
                const currentTimeIndicator = document.querySelector('.js-current_time');
                currentTimeIndicator.innerHTML = Utils.getCurrentTime();

                const firstForm = document.querySelector('form');
                firstForm.classList.remove('hide');

                inputField.focus();
            }, 550);

        });
    }, 600);

}

export default Header;