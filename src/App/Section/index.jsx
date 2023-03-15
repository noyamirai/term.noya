import React from "react";
import './section.css';
import Heading from '../Heading/index'

const Section = (props) => {

    const type = props.sectionType.toLowerCase();

    return (
        <section id={props.sectionId ?? type} className={`info ${['git', 'github'].includes(type) ? 'info--profile' : ''} js-${props.sectionType} ${props.sectionId ? '' : 'hide'}`}>
            {props.sectionHeading ? <Heading text={props.sectionHeading} /> : ''}

            <SectionContent sectionType={type} />
        </section>
    );

};

const SectionContent = ({ sectionType }) => {

    const [gitData, setGithubData] = React.useState(false);

    React.useEffect(() => {
        const fetchData = async (params) => {
            const response = await fetch(`https://api.github.com/${params}`);

            if (response.ok) {
                console.log('RESPONSE OK!!');

                // Convert the response to JavaScript Object
                const data = await response.json();

                return data;
            } else {
                // If the response is not successful, throw an error with the HTTP status code
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }

        const getData = async () => {

            let fetches = [];
            fetches.push(await fetchData('users/noyamirai'));
            fetches.push(await fetchData('users/noyamirai/repos'));

            const result = await Promise.all(fetches).then((data) => {

                const repos = data[1].filter((item) => {
                    if (['term.noya', 'WSLH', 'cmd-online', 'discord.github.io'].includes(item.name)) {
                        return item;
                    }
                })

                return { profile: data[0], repos: repos };
            });

            let languages = {};

            for (let i = 0; i < result.repos.length; i++) {
                const repo = result.repos[i];

                if (repo.language) {
                    // key exists in object -> increase count
                    if ((repo.language in languages)) {
                        languages[repo.language] = languages[repo.language] + 1;

                        // key doesnt exist -> create and set count to 1
                    } else {
                        languages[repo.language] = 1;
                    }
                }
            }

            const mostUsedLang = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b);
            result.profile.most_used_language = mostUsedLang;

            return result;
        }

        if (['git', 'github', 'repos'].includes(sectionType)) {

            const data = localStorage.getItem('gitProfile');

            if (data === null) {

                getData().then((result) => {
                    localStorage.setItem('gitProfile', JSON.stringify(result));
                    setGithubData(result);
                });

            } else {
                const jsonData = JSON.parse(data);
                setGithubData(jsonData);
            }
        }
    }, [])
    
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
                            <h3>git</h3>
                        </li>
                        <li className="list__item">
                            <h3>github</h3>
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
                            <p>React.js</p>
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

        case 'repos':

            if (gitData) {
            
                return (
                    <div className="info__content">
                        <ul className="generic-list">

                            { gitData.repos.map((val, k) => {
                                return (
                                    <li key={k} className="list__item">
                                        <a href="https://www.cmd-amsterdam.nl/portfolio/cmd-online/">
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
            }

            break;

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

            if (gitData) {

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
                                    Most used lang: Javascript
                                </li>
                                <li className='list__item list__item--repos'>
                                    {gitData.profile.public_repos} repos
                                </li>
                            </ul>
                        </div>
                    </div>
                );
            }

            break;
        
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

        default:
            break;
    }

};

export default Section;