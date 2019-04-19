const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const doc = fs.createWriteStream('vente.csv');

doc.write(`Profession,entreprise,lieux,description  \r`)


request('https://www.indeed.fr/emplois?q=vendeuse&l=Vend%C3%A9e', (error, response, html) => {

if (!error && response.statusCode == 200){
    const $ = cheerio.load(html);

   $('.jobsearch-SerpJobCard').each((i, el) => {
       const Profession = $(el)
       .find('.title')
       .text()
        .replace(/\s\s+/g,'');
        const entreprise = $(el)
        .find('.company')
        .text()
        .replace(/\s\s+/g,'');
        const lieux = $(el)
        .find('.location')
        .text()
        .replace(/\s\s+/g,'');
        const description = $(el)
        .find('.summary')
        .text()
        .replace(/\s\s+/g,'');

        doc.write(`${Profession},${entreprise},${lieux},${description} \r`);
      

        console.log(Profession+'  '+'  '+entreprise+'  '+' '+lieux+'  '+' '+description);
         
       
       
   });
}
});