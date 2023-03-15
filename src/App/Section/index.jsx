import React from "react";
import './section.css';
import Heading from '../Heading/index'

const Section = (props) => {

    const [currentType, setCurrentType] = React.useState(false);
    const [gitProfileData, setGithubProfileData] = React.useState(false);

    React.useEffect(() => {
        setCurrentType(props.sectionType);

        if (currentType && ['git', 'github'].includes(currentType)) {
            console.log('git requested, do we have data?');

            const data = localStorage.getItem('gitProfile');

            if (data === null) {
                console.log('doesnt exist! Fetch data');

                fetch('https://api.github.com/users/noyamirai')
                .then((res) => res.json())
                .then((result) => {
                    setGithubProfileData(result);
                    localStorage.setItem('gitProfile', JSON.stringify(result));
                });
            } else {
                const jsonData = JSON.parse(data);
                console.log(jsonData);
                setGithubProfileData(jsonData);
            }

        }

        return () => { setCurrentType(false);  }

    }, [currentType]);

    return (
        <section id={props.sectionId ?? props.sectionType} className={`info js-${props.sectionType} ${props.sectionId ? '' : 'hide'}`}>
            {props.sectionHeading ? <Heading text={props.sectionHeading} /> : ''}
            <SectionContent sectionType={props.sectionType} gitProfileData={gitProfileData}/>
        </section>
    );

};

const SectionContent = ({ sectionType, gitProfileData }) => {
    
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
                    <p>&gt;_I am currently a third year Communication &amp; Multimedia Design student at the Amsterdam University of Applied Sciences. In the meantime I have also been working as a part-time web developer @ <a target='_blank' title="https://activo.nl" href="https://activo.nl">Activo</a> for over 4 years now.</p>
                </div>
            );

        case 'skills': 

            return (
                <div className="info__content">
                    <ul className="skills">
                        <li className="skill__item">
                            <p>HMTL</p>
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
                            <p>CSS</p>
                            <div className="skill__level">
                                <span className="skill__level__indicator js-skill-level-container" data-percentage="60">
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
                            <a href="https://www.cmd-amsterdam.nl/portfolio/cmd-online/">
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
                            <h3>&gt;_Activibes <span>~A tool used at work to let other know how you're feeling everyday in order to improve team awareness and closeness.</span></h3>
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
                            </ul>
                        </li>
                        <li className="list__item">
                            <h3>&gt;_Actiscan <span>~Web application that helps standholders scan leads via QR codes and form connections while being at an event.</span></h3>
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
                            </ul>
                        </li>
                        <li className="list__item">
                            <a href="https://www.cmd-amsterdam.nl/portfolio/hacking-simulator-1-0/" target="_blank">
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
    
        case 'error': 
            return(
                <p>command not found. type "help" to see available commands.</p>
            );
        
        case 'git': case 'github': 
            return(
                <p>github stuff: {gitProfileData.name}</p>
            );
        
        default:
            break;
    }

};

export default Section;