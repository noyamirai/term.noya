import { useState, useEffect } from "react";

export const useData = (params) => {
    const [gitData, setGitData] = useState();

    useEffect(() => {
        const dataFetch = async () => {

            let fetches = [];
            params.forEach(param => {
                fetches.push(fetch(`https://api.github.com/${param}`))
            });

            const result = (
                await Promise.all(fetches)
            ).map((r) => r.json());

            const gitDataResult = await Promise.all(
                result
            );

            const repos = gitDataResult[1].filter((item) => {
                if (['term.noya', 'WSLH', 'cmd-online', 'discord.github.io'].includes(item.name)) {
                    return item;
                }
            })

            gitDataResult[1] = repos;  
            
            
            setGitData({ profile: gitDataResult[0], repos: gitDataResult[1] });


        };

        dataFetch();
    }, []);

    return { gitData };
};

// const getData = async () => {

//     let fetches = [];
//     fetches.push(await fetchData('users/noyamirai'));
//     fetches.push(await fetchData('users/noyamirai/repos'));

//     const result = await Promise.all(fetches).then((data) => {

//         const repos = data[1].filter((item) => {
//             if (['term.noya', 'WSLH', 'cmd-online', 'discord.github.io'].includes(item.name)) {
//                 return item;
//             }
//         })

//         return { profile: data[0], repos: repos };
//     });

//     let languages = {};

//     for (let i = 0; i < result.repos.length; i++) {
//         const repo = result.repos[i];

//         if (repo.language) {
//             // key exists in object -> increase count
//             if ((repo.language in languages)) {
//                 languages[repo.language] = languages[repo.language] + 1;

//                 // key doesnt exist -> create and set count to 1
//             } else {
//                 languages[repo.language] = 1;
//             }
//         }
//     }

//     const mostUsedLang = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b);
//     result.profile.most_used_language = mostUsedLang;

//     return result;
// }