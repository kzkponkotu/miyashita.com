var NOIMAGE_LINK='https://placehold.it/512x288?text=NO+IMAGE',newsVm=new Vue({el:'#news',data:function data(){return{newsList:Array(10).fill({title:'',url:'#',date:'',image:''})}},created:function created(){var a=this;fetch('https://news.miyashita.com/atom.xml').then(function(b){return b.text()}).then(function(b){return new DOMParser().parseFromString(b,'application/xml')}).then(function(b){var c=[],d=b.querySelectorAll('entry'),e=!0,f=!1,g=void 0;try{for(var i,h=d[Symbol.iterator]();!(e=(i=h.next()).done);e=!0){var j=i.value,k=new DOMParser().parseFromString(j.querySelector('content').textContent,'text/html'),l=k.querySelector('img'),m=k.querySelector('iframe[src*="youtube"]'),n=m&&m.getAttribute('src').split('/').pop().match(/^(.*)(?:\?|$)/)[1],o=l?l.getAttribute('src'):m?'https://i.ytimg.com/vi/'+n+'/mqdefault.jpg':NOIMAGE_LINK,p={title:j.querySelector('title').textContent,url:j.querySelector('link').getAttribute('href'),date:moment(j.querySelector('updated').textContent).format('YYYY/MM/DD'),image:/^https?:/.test(o)?o:'https://news.miyashita.com/'+o};c.push(p)}}catch(j){f=!0,g=j}finally{try{!e&&h.return&&h.return()}finally{if(f)throw g}}a.newsList=c}).catch(function(b){return console.error(b)})}});