// https://gist.github.com/xanf/192635af3008d8e800b0#53-lazy-fetch
var lazyFetch = (function createLazyFetch(){
    var result = {};

    function removeItem(url) {
        delete result[url];
    }

    return function lazyFetchFn(url){
        return new Promise(function(resolve, reject) {
            if (result[url] === undefined) {
                result[url] = fetch(url).then(r => r.json());
                setTimeout(removeItem, 3000, url);
            }
            resolve(result[url]);
        });
    }
})();


lazyFetch('https://pokeapi.co/api/v2/pokemon/1').then(r => console.log(r));
//видим запрос в Network вкладке
lazyFetch('https://pokeapi.co/api/v2/pokemon/2').then(r => console.log(r));
// видим запрос в Network вкладке
lazyFetch('https://pokeapi.co/api/v2/pokemon/2').then(r => console.log(r));
// НЕ ВИДИМ запрос в network вкладке