import React from 'react'
import '../Header/header.css'
import spiderLogo from '../assets/spider-logo.svg'
import TypewriterClass from '../scripts/typewriter.js';

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
                const firstForm = document.querySelector('form');
                firstForm.classList.remove('hide');

                inputField.focus();
            }, 550);

        });
    }, 600);

}

export default Header;