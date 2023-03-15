import React from "react";
import '../Prompt/prompt.css';

import UtilsClass from '../scripts/utils';
const Utils = new UtilsClass();

const Prompt = (props) => {

    const [currentTime, setCurrentTime] = React.useState();

    React.useEffect(() =>{

        const newTime = Utils.getCurrentTime();
        setCurrentTime(newTime);

    }, [])

    return (
        <form className={props.formId ? '' : 'hide'} onSubmit={props.submitHandler} method="POST" id={props.formId ?? 'prompt-form'}>
            <fieldset className="prompt">
                <div>
                    <label className="prompt__label" htmlFor="term-prompt"><span className="blue">guest</span><span className="green">@term.noya:</span><span className="blue">~</span></label>
                    <div className="growing-input js-growingInputContainer">
                        <input className="prompt__input" type="text" name="user_prompt" id={props.inputId ?? 'promptInputField'} placeholder="help" autoFocus autoComplete="off" />
                    </div>
                </div>

                <p className="prompt__time js-current_time">{ currentTime }</p>
            </fieldset>
        </form>
    );
}

export default Prompt;