var usetube = require("usetube");
let str = "Marta song deep forest \n Idan Raichel \n Nils Frahm \n Uzi Navon \n";
str = str.replace(/,/g, '<br>')
let list = str.split("\n");

async function fetchId(item) { let result = await usetube.searchVideo(item); 
console.log(result);
return result;}
let idList = []

// idList = Promise.all(
//   list.map(function(item) 
//   {console.log(list)
//   return Promise.all(fetchId(item))}
//   ))


// await console.log(idList)
const fun = await usetube.searchVideo(list[0])
console.log(fun.videos[0].id)