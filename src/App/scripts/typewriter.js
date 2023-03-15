class Typewriter {

    processParagraphs = async (paragraphs, index) => {
        // console.log('attempting paragraph index: ' + index);
        // console.log(index);
        // console.log(paragraphs.length);

        // All elements have been animated
        if (index >= paragraphs.length) {
            console.log('DONE PROCESSING');
            return true;
        }

        // console.log('we have permission for do-while!');

        const paragraph = paragraphs[index];
        paragraph.classList.remove('hide');

        let result;  

        // Will continue calling startType() until resolve has finished:true
        do {
            // console.log('attempt...');
            // console.log(result);
            // console.log((result && result.skip ? true : false));
            // console.log('startType()');
            
            result = await this.startType(
                (result && result.string ? result.string : paragraph.innerHTML),
                paragraph, 
                (result && result.typed ? result.typed: ''), 
                (result && result.nIndex ? result.nIndex: 0), 
                (result && result.skip ? true : false)
            );

        } while (!result.finished);

        // Finished
        // console.log('FINISHEDDDD');
        // console.log(result);

        // Recursion
        index++;
        return this.processParagraphs(paragraphs, index);
    }

    startType(string, textEl, typed, index, skip = false) {
        return new Promise(resolve => {

            if (index < string.length) {
                // console.log('typing!');

                const char = string.charAt(index);
                typed += char;

                let resultObj = {
                    finished: false,
                    string: string,
                    typed: typed,
                    nIndex: index,
                    skip: false
                }

                // moving onto next char (complete html entity)
                if (skip && char !== ';') {
                    // console.log('STILL HTML ENTITY');
                    index++;
                    resultObj.skip = true;
                    resultObj.nIndex = index;

                    resolve(resultObj);
                    return;
                }

                // If its HTML entity -> don't display until its completed (;)
                if (char === '&') {
                    // console.log('HTML ENTITY');
                    index++;
                    resultObj.skip = true;
                    resultObj.nIndex = index;

                    resolve(resultObj);
                    return;
                }

                // console.log('NORMAL TEXT/END OF ENTITY');

                textEl.innerHTML = typed;
                index++;

                resultObj.nIndex = index;
                resultObj.skip = false;

                setTimeout(function() {
                    resolve(resultObj)
                }, 55);
            }

            if (index === string.length) {
                // console.log('done typing, go next');
                resolve({finished:true})
                return;                
            }

        })
    }

}

export default Typewriter