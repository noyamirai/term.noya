import React from 'react'
import Header from './Components/Header/index'
import Prompt from './Components/Prompt/index'
import Section from './Components/Section/index';

import './App.css'

import StorageClass from './scripts/storage'
import RenderClass from './scripts/render'
import UtilsClass from './scripts/utils';
import PromptHandlerClass from './Components/Prompt/promptHandler'
import { useData } from './Hooks/useData';

const Storage = new StorageClass();
const RenderUI = new RenderClass();
const Utils = new UtilsClass();

function App() {
  const [rendered, setRenderedStatus] = React.useState(false);
  const [lastLog, setLastLog] = React.useState('now');
  const [extraComponents, setComponents] = React.useState([]);

  const { gitData } = useData(['users/noyamirai', 'users/noyamirai/repos']);

  const setPrompt = () => {
    const newFormId = Utils.getNewPromptId();
    setComponents((oldComponents) => [...oldComponents, <Prompt key={oldComponents.length} submitHandler={submitHandler} formId={`prompt-form-${newFormId}`} inputId={`promptInputField-${newFormId}`} />])
  }

  const setSection = (sectionType) => {
    const allSpecificSections = document.querySelectorAll('.js-' + sectionType);
    const nId = sectionType + '-' + (allSpecificSections.length + 1);
    const sectionHeading = Utils.getSectionHeading(sectionType);

    setComponents((oldComponents) => [...oldComponents, <Section key={oldComponents.length} sectionId={`js-${nId}`} sectionHeading={sectionHeading} sectionType={sectionType} gitData={gitData} />]);
  }

  const handleBeforeUnload = () => {
    Storage.logVisit();
  };

  React.useEffect(() => {
    setRenderedStatus(true);

    if (rendered && extraComponents.length == 0) {
      setLastLog(Storage.getLastLog());
      init();
    }

    RenderUI.renderCommentHeadings();
    RenderUI.setPercentageBars();

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
    
  }, [rendered, extraComponents]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const PromptHandler = new PromptHandlerClass();
    const inputContainer = e.target.querySelector('.js-growingInputContainer');
    const currentInput = inputContainer.querySelector('input');
    const value = currentInput.value;
    
    const status = await PromptHandler.checkSubmission(inputContainer, currentInput, value.toLocaleLowerCase());
    
    // unknown prompt or fetch went wrong
    if (!status || ((value.toLocaleLowerCase() == 'git' || value.toLocaleLowerCase() == 'github') && !gitData)) {
      RenderUI.disablePrompt(inputContainer, currentInput);

      const errorType = !gitData ? 'error' : 'unknown';

      setTimeout(() => {
        setSection(errorType);
        setPrompt();
      }, 350);

      return false;
    }

    if (status.createSection)
      setSection(value);
      
    if (status.insertPrompt)
      setPrompt();

    if (value.toLocaleLowerCase() == 'download-resume') {
      Utils.downloadPDF('maijla_ikiz-resume.pdf');
    }

  }

  return (
    <article>
      <div className='notice-wrapper notice-wrapper--top'>
        <a className="notice" href="/maijla_ikiz-resume.pdf" target="_blank">Resume.pdf</a>
      </div>

      <div className='notice-wrapper'>
        <a className="notice notice--resume" href="/maijla_ikiz-resume.pdf" target="_blank">Resume.pdf</a>
        <a className="notice" href="https://www.cmd-amsterdam.nl/portfolio/cmd-online/" target="_blank">GDA Nominee '22</a>
        <a className="notice" href="https://www.cmd-amsterdam.nl/portfolio/hacking-simulator-1-0/" target="_blank">GDA Nominee '21</a>
      </div>

      <Header lastLog={lastLog}/>
      <Prompt submitHandler={submitHandler}/>
      {extraComponents}
    </article>
  )
}

const init = () => {
  const articleElement = document.querySelector('article');
  const inputField = document.getElementById("promptInputField");

  inputField.focus();

  // SOURCE: chat.openai.com/chat
  // Listens to any input field, in this case theres always only one input field
  articleElement.addEventListener("input", function (e) {

    const inputContainer = e.target.parentElement;

    if (e.target.value != '') {
      inputContainer.classList.add('typing');

      e.target.style.width = 0;
      const width = e.target.scrollWidth;

      e.target.style.width = width + "px";

      return;
    }

    inputContainer.classList.remove('typing');

    // back to default
    e.target.style.width = 100 + "%";
  });

  // Whenever inputfield 'blurs', reset width of input field
  // NOTE: could be multiple so we need to target the most 'recently' added input
  articleElement.addEventListener('focusout', (e) => {
    const newestPromptInput = document.querySelector('form:last-of-type input');

    if (e.target.id == newestPromptInput.id) {
      const inputContainer = e.target.parentElement;

      if (e.target.value == '') {
        inputContainer.classList.remove('typing');
        e.target.style.width = 100 + "%";
      }
    }
  });
}



export default App
