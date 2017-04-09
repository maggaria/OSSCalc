//generic functions not related to daemons.
function array_to_set(array) {
  var s = new Set();
  array.forEach(function(item) {
    s.add(item);
  })
  return s;
}

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
     }
   }
 }

 permute(inputArr)

 return result;
}

function onlyUnique(value, index, self) { 
  /*// usage example:
var a = ['a', 1, 'a', 2, '1'];
var unique = a.filter( onlyUnique ); // returns ['a', 1, 2, '1']*/
    return self.indexOf(value) === index;
}

function uniquePermute(input) {
  var all = permutator(input).filter(onlyUnique);
  var hash = {};
  var out = [];
  for (var i = 0, l = all.length; i < l; i++) {
    var key = all[i].join('|');
    if (!hash[key]) {
      out.push(all[i]);
      hash[key] = 'found';
    }
  }
  return out;
}
