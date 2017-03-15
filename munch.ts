/**
 * created by waweru
*/

import * as Parser from 'csv-parse';
import * as _ from 'lodash';
import * as fs from 'fs';
import { DATA_SOURCE, APP, ICHOICES, CHOICES, IDATA_SOURCE } from './constants';


let sourceDir = `source-docs/`;
let dist = `analysed-docs`;

/**
 * @docs: does data arrangement / munching for ease in analysis
 */
let munchData = (dataArr: any[]) => {
    let model: any = {};

    //#note: create catergories
    dataArr.forEach(data => model[data[0]] = {
        display: DATA_SOURCE.category[data[0]-1],
        next: {}
    });

    //#note: create questions
    dataArr.forEach(data => {
        if (_.isEmpty(data[2])) {
            model[ data[0] ].next[ data[1] ] = {
                display: DATA_SOURCE.question[ data[1]-1 ].que,
                choice_types: CHOICES[DATA_SOURCE.question[ data[1]-1 ].choices],
                next: {
                    answers: []
                }
            };
        }
        else {
            model[ data[0] ].next[ data[1] ] = {
                display: DATA_SOURCE.question[ data[1]-1 ].que,
                hasSubQuestions: true,
                next: {}
            };
        }
    }); 

    //#note: create sub questions
    dataArr.forEach(data => {
        if (!_.isEmpty(data[2])){
            model[ data[0] ].next[ data[1] ].next[ data[2].toLowerCase() ] = {
                answers: []
            };
        }
    });

    //#note: write answer to model
    let answers: any = [];
    dataArr.forEach(data => {     
        if (!_.isEmpty(data[2])){
            model[ data[0] ].next[ data[1] ].next[ data[2].toLowerCase() ].answers.push(data[3]);
        }
        else {
            model[ data[0] ].next[ data[1] ].next.answers.push(data[3]);
        }
    });

    //#note: return model for more processing
    return model;
}

let outputToFile = () => {
    
};

/**
 * @docs: parse the csv file
 */
let csvParser = Parser({ delimiter: ',' });
let parser = () => {
    let cache: any[] = [];
    let cursor: any;   

    //#note: parse data
    fs.readdirSync(sourceDir).forEach((file, index) => { 
        fs
        .createReadStream(`${sourceDir}/${file}`)
        .pipe(csvParser)
        .on('readable', () => {
            cache.push(csvParser.read());
        })
        .on('error', (err: any) => {
            console.error(err);
        })
        .on('finish', () => {
            cache.splice(0,1);
            cache.splice(cache.length-1,1);

            //#note: output the munched data to a file 
            let analysedData = JSON.stringify(munchData(cache));
            fs.writeFileSync(`${dist}/${file}.json`, analysedData);
        });
    });
}

parser();