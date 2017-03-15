/**
 * created by waweru
 * @docs:
 *    contains data-source constants ana application constants
*/


/**
 * @whatsthis: 
 *    basically a map that is used to know what the content from the data sources mean
 * @docs:
 *    headers are a representation of the questions in the questionnaire: length<17>[1...17]
 *    category are the various sections of the questionnaires: length<2>[1,2]
 *    choice_types represent the various choices a respondant chose as the valueable answer: length<2>[1,2]
 */
export interface ICHOICES{
   [id: number]: { display: string; value: number }[];
}
export let CHOICES = {
    1: [
        { display: 'Yes', value: 1 },
        { display: 'Undecided', value: 2 },
        { display: 'No', value: 3 }
    ],
    2: [
        { display: 'Good', value: 1 },
        { display: 'Fair', value: 2 },
        { display: 'Unsatisfactory', value: 3 }
    ]
};
export interface IDATA_SOURCE {
    category: string[];
    question: { que: string; choices: string | null }[];
    gender: string[],
    congregation: {
        [id: string]: string;
    }
}
export const DATA_SOURCE: IDATA_SOURCE = {
    category: [
        `Conduct of the Church Service`,
        `Management of Church Groups`
    ],
    question: [
        { que: `In the Last 12 Months, the messages from the pulpit have been:`, choices: '1' } ,
        { que: `The Sermons were:`, choices: '1' },
        { que: `The Ministry of Praise in Worship was:`, choices: '1' },
        { que: `The Management of time during the Sunday Services was:`, choices: '2' },
        { que: `The attention given to the Church School Children by the leadership is:`, choices: '2' },
        { que: `The attention given to the Teens by the leadership is:`, choices: '2' },
        { que: `The attention given to the Youth Ministry by the leadership is:`, choices: '2' },
        { que: `The attention given to the Men Ministry by the leadership is:`, choices: '2' },
        { que: `The attention given to the Women Ministry by the leadership is`, choices: '2' },
        { que: `Rate the attention given to the following emerging groups:`, choices: '2' },
        { que: `The pastoral commitment and the attention to the Parishioners by the Parish Minister is:`, choices: '2' },
        { que: `The pastoral commitment and the attention to the District members by the District Elders is:`, choices: '2' },
        { que: `The focus and attention given to Mission and Evangelism in the Parish is:`, choices: '2' },
        { que: `Rate the Performance of our Ministries (groups):`, choices: '2' },
        { que: `The overall performance of the Parish is:`, choices: '2' },
        { que: `The pace of development of the Church project is:`, choices: '2' },
        { que: `Any additional information / recommendation`, choices: null }   
    ],
    congregation: { 
        'nakuru-west': 'Nakuru West Congregation', 
        'mwangaza': 'Mwangaza Congregation' 
    },
    gender: [ 
        'male', 
        'female' 
    ]
};

/**
 * @whatsthis: 
 *    basically has all the app related or program related constant values and configuration settings
 */
export interface IAPP {
    name: string;
    version: string;
    description: string;
    author: string;
}
export const APP: IAPP = {
    name: 'PCEA QUESTIONNAIRE DASHBOARD',
    version: '1.0.0',
    description: `Basically its an application whose purpose is to be: data wrangler, decoder and visualizer 
        for the members survey done at PCEA Nakuru West Parish`,
    author: 'John Waweru <wambugu.john.waweru@outlook.com>'
};

// console.log(DATA_SOURCE.question.length) // #testing

export const currentFile = 'nakuru-west.unity.csv';
/*
[ 'mwangaza.eden.csv',
  'mwangaza.githiga.csv',
  'mwangaza.kiwanja.csv',
  'mwangaza.mlima.csv',
  'mwangaza.zaburi.csv',
  'nakuru-west.baraka.csv',
  'nakuru-west.berea.csv',
  'nakuru-west.bethany.csv'
  'nakuru-west.bethel.csv',
  'nakuru-west.bethlehem.cs
  'nakuru-west.bethsaida.cs
  'nakuru-west.emmanuel.csv
  'nakuru-west.galilee.csv'
  'nakuru-west.jerusalem.cs
  'nakuru-west.judea.csv',
  'nakuru-west.macedonia.cs
  'nakuru-west.nazareth.csv
  'nakuru-west.neema.csv',
  'nakuru-west.shalom.csv',
  'nakuru-west.town.csv',
  'nakuru-west.unity.csv' ]
*/