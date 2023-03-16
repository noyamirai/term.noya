import { useState, useEffect } from "react";

export const useData = (params) => {
    const [gitData, setGitData] = useState();

    useEffect(() => {
        const getMostUsedLang = async (repos) => {
            let languages = {};

            for (let i = 0; i < repos.length; i++) {
                const repo = repos[i];

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

            return languages;
        }

        const dataFetch = async () => {

            let fetches = [];
            params.forEach(param => {
                fetches.push(fetch(`https://api.github.com/${param}`))
            });

            const result = (
                await Promise.all(fetches)
            ).map((r) => r.json());

            const jsonResult = await Promise.all(result).then((data) => {
                
                const repos = data[1].filter((item) => {
                    if (['term.noya', 'WSLH', 'cmd-online', 'discord.github.io'].includes(item.name)) {
                        return item;
                    }
                })

                return { profile: data[0], repos: repos };
            });

            const languages = await getMostUsedLang(jsonResult.repos);

            const mostUsedLang = Object.keys(languages).reduce((a, b) => languages[a] > languages[b] ? a : b);
            jsonResult.profile.most_used_language = mostUsedLang;
            
            setGitData(jsonResult);

        };
        
        dataFetch();
    }, []);

    return { gitData };
};
