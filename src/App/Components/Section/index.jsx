import React from "react";
import './section.css';
import Heading from '../Heading/index'
// import { useData } from "../Hooks/useData";

const Section = (props) => {

    const type = props.sectionType.toLowerCase();

    return (
        <section id={props.sectionId ?? type} className={`info ${['git', 'github'].includes(type) ? 'info--profile' : ''} js-${props.sectionType} ${props.sectionId ? '' : 'hide'}`}>
            {props.sectionHeading ? <Heading text={props.sectionHeading} /> : ''}

            <SectionContent sectionType={type} gitData={props.gitData} />
        </section>
    );

};

const SectionContent = ({ sectionType, gitData }) => {

    switch (sectionType) {
        case 'help':

            return (
                <div className="info__content">
                    <ul className="generic-list generic-list--help">
                        <li className="list__item">
                            <h3>help</h3>
                        </li>
                        <li className="list__item">
                            <h3>about</h3>
                        </li>
                        <li className="list__item">
                            <h3>projects</h3>
                        </li>
                        <li className="list__item">
                            <h3>skills</h3>
                        </li>
                        <li className="list__item">
                            <h3>contact</h3>
                        </li>
                        <li className="list__item">
                            <h3>repos</h3>
                        </li>
                        <li className="list__item">
                            <h3>github</h3>
                        </li>
                        <li className="list__item">
                            <h3>download-resume</h3>
                        </li>
                        <li className="list__item">
                            <h3>clear</h3>
                        </li>
                    </ul>
                </div>
            );
            
        case 'about':

            return (
                <div className="info__content">
                    <p>&gt;_Hello! I guess you&#39;re here to read a little more about who I am and what I do.</p>
                    <p>&gt;_My name is Maijla Ikiz, I am a 24 y/o <s>nerd</s> full-stack web developer + designer by day and average video game enthusiast by night :&#41;</p>
                    <p>&gt;_I am currently a third year Communication &amp; Multimedia Design student at the Amsterdam University of Applied Sciences. In the meantime I have also been working as a part-time web developer @ <a target="_blank" rel="noopener noreferrer" title="https://activo.nl" href="https://activo.nl">Activo</a> for over 4 years now.</p>
                </div>
            );

        case 'skills': 

            return (
                <div className="info__content">
                    <ul className="skills">
                        <li className="skill__item">
                            <p>Apex Legends</p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="100">
                                    <span className="blue">[</span>
                                    <span className="js-level">----------</span>
                                    <span className="blue">]</span>
                                </span>
                                <p className="skill__level__percentage js-level-percentage">0%</p>
                            </div>
                        </li>
                        <li className="skill__item">
                            <p>UI/UX design</p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="80">
                                    <span className="blue">[</span>
                                    <span className="js-level">----------</span>
                                    <span className="blue">]</span>
                                </span>
                                <p className="skill__level__percentage js-level-percentage">0%</p>
                            </div>
                        </li>
                        <li className="skill__item">
                            <p>React.js <span className="yellow">(NEW)</span></p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="30">
                                    <span className="blue">[</span>
                                    <span className="js-level">----------</span>
                                    <span className="blue">]</span>
                                </span>
                                <p className="skill__level__percentage js-level-percentage">0%</p>
                            </div>
                        </li>
                        <li className="skill__item">
                            <p>HMTL/CSS</p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="90">
                                    <span className="blue">[</span>
                                    <span className="js-level">----------</span>
                                    <span className="blue">]</span>
                                </span>
                                <p className="skill__level__percentage js-level-percentage">0%</p>
                            </div>
                        </li>
                        <li className="skill__item">
                            <p>Javascript</p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="80">
                                    <span className="blue">[</span>
                                    <span className="js-level">----------</span>
                                    <span className="blue">]</span>
                                </span>
                                <p className="skill__level__percentage js-level-percentage">0%</p>
                            </div>
                        </li>
                        <li className="skill__item">
                            <p>Node.js</p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="50">
                                    <span className="blue">[</span>
                                    <span className="js-level">----------</span>
                                    <span className="blue">]</span>
                                </span>
                                <p className="skill__level__percentage js-level-percentage">0%</p>
                            </div>
                        </li>
                        <li className="skill__item">
                            <p>PHP</p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="50">
                                    <span className="blue">[</span>
                                    <span className="js-level">----------</span>
                                    <span className="blue">]</span>
                                </span>
                                <p className="skill__level__percentage js-level-percentage">0%</p>
                            </div>
                        </li>
                        <li className="skill__item">
                            <p>SQL</p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="50">
                                    <span className="blue">[</span>
                                    <span className="js-level">----------</span>
                                    <span className="blue">]</span>
                                </span>
                                <p className="skill__level__percentage js-level-percentage">0%</p>
                            </div>
                        </li>
                    </ul>
                </div>
            );

        case 'projects':

            return (
                <div className="info__content">
                    <ul className="generic-list">
                        <li className="list__item">
                            <h3>&gt;_<strong>This site!</strong> <span>~A terminal themed portfolio site made in React (for the first time) to expand my skillset.</span></h3>
                            <ul className="list__item__tags">
                                <li className="tag tag--red">
                                    HTML
                                </li>
                                <li className="tag tag--purple">
                                    CSS
                                </li>
                                <li className="tag tag--blue">
                                    JS
                                </li>
                                <li className="tag tag--blue">
                                    React.js
                                </li>
                            </ul>
                        </li>
                        <li className="list__item">
                            <a href="https://www.cmd-amsterdam.nl/portfolio/cmd-online/" target="_blank" rel="noopener noreferrer">
                                <h3>&#128279; WSL Personal Hub <span>~a browser-based single-page women's football application, designed to keep you up-to-date with your favorite teams in the FA Women's Super League.</span></h3>
                            </a>
                            <ul className="list__item__tags">
                                <li className="tag tag--red">
                                    HTML
                                </li>
                                <li className="tag tag--purple">
                                    CSS
                                </li>
                                <li className="tag tag--blue">
                                    JS
                                </li>
                            </ul>
                        </li>
                        <li className="list__item">
                            <a href="https://www.cmd-amsterdam.nl/portfolio/cmd-online/" target="_blank" rel="noopener noreferrer">
                                <h3>&#128279; CMD Online <span>~A browser based matching application that helps teachers of CMD create well-balanced project teams based on skills of students.</span></h3>
                            </a>
                            <ul className="list__item__tags">
                                <li className="tag tag--yellow">
                                    GDA 2022 Nominee
                                </li>
                                <li className="tag tag--red">
                                    HTML
                                </li>
                                <li className="tag tag--purple">
                                    CSS
                                </li>
                                <li className="tag tag--blue">
                                    JS
                                </li>
                                <li className="tag tag--green">
                                    Node.js
                                </li>
                            </ul>
                        </li>
                        <li className="list__item">
                            <a href="https://www.cmd-amsterdam.nl/portfolio/hacking-simulator-1-0/" target="_blank" rel="noopener noreferrer">
                                <h3>&#128279; Hacking Simulator <span>~A Cyberpunk 2077 inspired “simulator” I made in JS for a school assignment.</span></h3>
                            </a>
                            <ul className="list__item__tags">
                                <li className="tag tag--yellow">
                                    GDA 2021 Nominee
                                </li>
                                <li className="tag tag--red">
                                    HTML
                                </li>
                                <li className="tag tag--purple">
                                    CSS
                                </li>
                                <li className="tag tag--blue">
                                    JS
                                </li>
                                <li className="tag tag--green">
                                    Node.js
                                </li>
                            </ul>
                        </li>
                        <li className="list__item">
                            <h3>&gt;_<strong>Activibes</strong> <span>~A tool used at work to let other know how you're feeling everyday in order to improve team awareness and closeness.</span></h3>
                            <ul className="list__item__tags">
                                <li className="tag tag--red">
                                    HTML
                                </li>
                                <li className="tag tag--purple">
                                    CSS
                                </li>
                                <li className="tag tag--blue">
                                    JS
                                </li>
                                <li className="tag tag--green">
                                    Node.js
                                </li>
                                <li className="tag">
                                    Work related
                                </li>
                            </ul>
                        </li>
                        <li className="list__item">
                            <h3>&gt;_<strong>Actiscan</strong> <span>~Web application that helps standholders scan leads via QR codes and form connections while being at an event.</span></h3>
                            <ul className="list__item__tags">
                                <li className="tag tag--red">
                                    HTML
                                </li>
                                <li className="tag tag--purple">
                                    CSS
                                </li>
                                <li className="tag tag--blue">
                                    JS
                                </li>
                                <li className="tag tag--green">
                                    Node.js
                                </li>
                                <li className="tag">
                                    Work related
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            );

        case 'repos':
            
            return (
                <div className="info__content">
                    <ul className="generic-list">

                        { gitData.repos.map((val, k) => {
                            return (
                                <li key={k} className="list__item">
                                    <a href="https://www.cmd-amsterdam.nl/portfolio/cmd-online/" target="_blank" rel="noopener noreferrer">
                                        <h3>&#128279; {val.name} <span>{val.description ? '~' + val.description : ''}</span></h3>
                                    </a>
                                    <ul className="list__item__tags">
                                        
                                        {val.topics.length ? val.topics.map((topic, topicK) => {
                                            return (
                                                <li key={topicK} className={`tag tag--` + topic.toLowerCase()}>
                                                    {topic.toUpperCase()}
                                                </li>
                                            );
                                        }) : <li className={val.language ? `tag tag--` + val.language.toLowerCase() : `tag` }>
                                            {val.language ?? 'no data'}
                                        </li> }
                                    </ul>
                                </li>
                            );
                        }) }


                    </ul>
                </div>
            );

        case 'contact': 

            return(
                <div className="info__content">
                    <p>&gt;_Want to get in touch? Cool! You can contact me by sending me an <a href="mailto:planet1109@hotmail.com" target="_blank">e-mail</a>, and I will get back to you as soon as possible.</p>
                    <p>&gt;_You might be curious about my socials as well. Don't worry, I've got you covered!</p>

                    <ul className="generic-list generic-list--link">
                        <li className="list__item">
                            <a href="https://www.linkedin.com/in/maijla-ikiz-775bab178/" target="_blank">
                                <h3>&#128279; LinkedIn</h3>
                            </a>
                        </li>
                        <li className="list__item">
                            <a href="https://github.com/noyamirai" target="_blank">
                                <h3>&#128279; Github</h3>
                            </a>
                        </li>
                    </ul>
                </div>
            );
    
        case 'unknown': 
            return(
                <p>command not found. type "help" to see available commands.</p>
            );
        
        case 'error': 
            return(
                <p>task failed succesfully :D! (try again)</p>
            );
        
        case 'git': case 'github':

            return (
                <div className='info__content'>
                    <picture>
                        <img src={gitData.profile.avatar_url} alt="Profile picture" />
                    </picture>

                    <div>
                        <h3>{gitData.profile.name} <a className='link' href='https://github.com/noyamirai' target={'_blank'}>@{gitData.profile.login}</a></h3>
                        <p>{gitData.profile.bio}</p>

                        <ul className='profile-details'>
                            <li className='list__item list__item--location'>
                                {gitData.profile.location}
                            </li>
                            <li className='list__item list__item--lang'>
                                Most used lang: {gitData.profile.most_used_language}
                            </li>
                            <li className='list__item list__item--repos'>
                                {gitData.profile.public_repos} repos
                            </li>
                        </ul>
                    </div>
                </div>
            );
        
        case 'hello': case 'hi':
            return (
                <p>hi there :)!</p>
            );
        case 'stinky':
            return (
                <p>you stinky</p>
            );
        case 'hehe':
            return (
                <p>hehehe</p>
            );
        case 'download-resume':
            return (
                <p>My resume should be downloaded shortly! In case it didn't download, you can use this <a href="/maijla_ikiz-resume.pdf" target="_blank" download>link</a> to start the download manually.</p>
            );

        default:
            break;
    }

};

export default Section;