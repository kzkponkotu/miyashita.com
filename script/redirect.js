var sush=new SUSH;Promise.all([fetch('/redirect.json').then(function(a){return a.json()}).catch(function(){return Promise.resolve({})}),fetch('https://news.miyashita.com/redirect.json').then(function(a){return a.json()}).catch(function(){return Promise.resolve({})})]).then(function(a){var b={};return a.forEach(function(c){return Object.assign(b,c)}),sush.flow([function(c){var d=c.id,e=c.stock;return{id:location.search.match(/p=(\d+)/)[1].toString(10),stock:e}},SUSH.$addObject(b),SUSH.$redirect({fallback:'/404/'})])});