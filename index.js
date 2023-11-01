import data from './rawBooks.json' assert { type: 'json' };
console.log("Percentage of books read:" + 100*(data.reduce((accumulator, element) => {
    if(element['read?'] == "Yes"){
        return accumulator + 1;
    }
    else{
        return accumulator;
    }
}, 0))/(data.length));

console.log("Average Time to read:" + ((data.reduce((accumulator, element) => {
    if(element['Time on TBR (days)'] == "N/A" || element['Date Bought'] == "" || element['Date Read'] == ""){
        return accumulator;
    }
    else{
        return accumulator + element['Time on TBR (days)'];
    }
}, 0))/(data.reduce((accumulator, element) => {
    if(element['Time on TBR (days)'] == "N/A" || element['Date Bought'] == "" || element['Date Read'] == ""){
        return accumulator;
    }
    else{
        return accumulator+1;
    }
}, 0))));
let favGenre = "";
let numOfAppearences = 0;
let genreToAppearences = new Map();
data.forEach((element) => {
    if(genreToAppearences.has(element['category'])){
        genreToAppearences.set(element['category'], genreToAppearences.get(element['category']) + 1);
    }
    else{
        genreToAppearences.set(element['category'], 1);
    }
})
genreToAppearences.forEach((value, key) => {
    if(value > numOfAppearences){
        numOfAppearences = value;
        favGenre = key;
    }
});
console.log("Favorite Category/Genre:" + favGenre);
let favAuthor = "";
numOfAppearences = 0;
let authorToAppearences = new Map();
data.forEach((element) => {
    if(authorToAppearences.has(element['author'])){
        authorToAppearences.set(element['author'], authorToAppearences.get(element['author']) + 1);
    }
    else{
        authorToAppearences.set(element['author'], 1);
    }
})
authorToAppearences.forEach((value, key) => {
    if(value > numOfAppearences){
        numOfAppearences = value;
        favAuthor = key;
    }
});
console.log("Favorite Author:" + favAuthor);

console.log("Percentage of favorite genre read:" + 100*(data.reduce((accumulator, element) => {
    if(element['category'] == favGenre && element['read?'] == "Yes"){
        return accumulator + 1;
    }
    else{
        return accumulator;
    }
}, 0))/(genreToAppearences.get(favGenre)));

// fetch('./rawBooks.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));