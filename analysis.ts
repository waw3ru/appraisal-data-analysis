/**
 * created by waweru
*/

import * as _ from 'lodash'
import * as fs from 'fs'
import * as crypto from 'crypto';
import { currentFile } from './constants';

//#note: extract data from the munched json files 
// let filenames: string[] = fs.readdirSync('analysed-docs');
let dataObj = {}
dataObj[currentFile] = JSON.parse(fs.readFileSync(`analysed-docs/${currentFile}.json`, { encoding: 'utf-8' }));

//#note: format the data in order to show congregation/district instead of filename as the master key
let churchAppraisal = {};
for (let district in dataObj) {
    let data: string[] = district.split('.');
    // console.log(data);
    churchAppraisal[`${data[0]}::${data[1]}`] = dataObj[district];
}

//#note: analyse data
let analysisPreparation = (dataObj: any) => {
    
    let model: any = {};

    let questions: any = {...dataObj[1].next, ...dataObj[2].next};
    delete questions[17]; // remove last question
    
    //#note: serialize data to a list of answers which reference a question
    let consolidatedQuestions: any[] = [];
    for (let question in questions) {
        let cache = questions[question];

        if (cache.hasSubQuestions) {
            let something = {};
            for (let sub in cache.next) {
                consolidatedQuestions.push(
                    { _ref: question, sub, answers: cache.next[sub].answers, choices: cache.choice_types }
                )
            }
        }
        else {
            consolidatedQuestions.push({
                _ref: question,
                sub: null,
                answers: cache.next.answers,
                choices: cache.choice_types
            });
        }
    }

    //#note: data ready for frequency analysis
    // console.log(consolidatedQuestions.length)
    return consolidatedQuestions;
}

let finalCopy: any = {};
for (let data in churchAppraisal) {
    let cache = analysisPreparation(churchAppraisal[data]);
    finalCopy[data] = cache;
}

//#note: output all files to as json
// let analysedData = JSON.stringify(finalCopy);
// fs.writeFileSync(`analysis/consolidated_results.json`, analysedData);

let analyse = (input: any) => {
    let output: any = {};
    for (let data in input) {
        output[data] = {};
        //#note: prepare question for analytics
        input[data].forEach((stats: any) => {
            output[ data ][ `${stats._ref}${ (stats.sub) ? `/${stats.sub}` : ''}` ] = {};
        })
        input[data].forEach((stats: any) => {
            let analytics = {};
            let answers = stats.answers;
            let choices = stats.choices;
            for (let i=0;i<choices.length;i++) {
                analytics[choices[i].display] = answers.filter((ans: string) => (
                    choices[i].value === parseInt(ans)
                )).length
            }
            analytics['totals-responses'] = answers.length;
            output[ data ][ `${stats._ref}${ (stats.sub) ? `/${stats.sub}` : ''}` ] = { ...analytics };
        });
    }

    fs.writeFileSync(`analysis/${crypto.randomBytes(3).toString('hex')}.json`, JSON.stringify(output), {
        encoding: 'utf-8'
    });
}

analyse(finalCopy);