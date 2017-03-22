
//<![CDATA[
// Script modificado por @Kseso para las necesidades propas de mi blog
// EsCss.blogspot.com tras los cambios y problemas surgidos en el feed de Blogger
// En base a script adaptado por José M. Acuña
// Por favor, no enlaces a este script por lo problemas que podrían surgir para ti y para mi
// Guárda tu copia y enlaza a ella.
// Gracias.

var conf = {
 sortBy:   'datenewest',  // orderlabel - titleasc - titledesc - dateoldest - datenewest
 lastPost: 0,             // nº post con resalte
 date:     1,             // 0:no date /  1:date
 newPost: '',             // texto de resalte
 newtab:   1              // 0:no target / 1:target: _blank
}
 
var postTitle=[],postUrl=[],postDate=[],postLabels=[],postBaru=[],tocLoaded=false,postFilter="",numberfeed="";
function reverse(s) {
  return s.split('/').reverse().join('/');
}
function loadtoc(a){
 if("entry" in a.feed){
  var d=a.feed.entry.length,c="",n,e,m,j,f;
  numberfeed=d;
  ii=0;
  for(var h=0;h<d;h++){
   n=a.feed.entry[h];
   e=n.title.$t;
   m=n.published.$t.substring(0,10);
   for(var g=0;g<n.link.length;g++){
    if(n.link[g].rel=="alternate"){
     j=n.link[g].href;
     break;
    }
   }
   if(conf.sortBy != 'orderlabel'){
    postTitle[ii]=e;
   }
   if("category" in n){
    for(var g=0;g<n.category.length;g++){
     c=n.category[g].term;
     f=c.lastIndexOf(";");
     if(f!=-1){
      c=c.substring(0,f);
     }
     postLabels[ii]=c;
     if(conf.sortBy == 'orderlabel'){
      postTitle[ii]=e;
     }
     postDate[ii]=m;
     postUrl[ii]=j;
     if(h<parseInt(conf.lastPost,10)){
      postBaru[ii]=true;
     }else{
      postBaru[ii]=false;
     }
     ii=ii+1;
    }
   }
  }
 }
 sortlabel();
 tocLoaded=true;
 displayToc();
}
function c(e,g){
 var f=postTitle[e];
 postTitle[e]=postTitle[g];
 postTitle[g]=f;
 f=postDate[e];
 postDate[e]=postDate[g];
 postDate[g]=f;
 f=postUrl[e];
 postUrl[e]=postUrl[g];
 postUrl[g]=f;
 f=postLabels[e];
 postLabels[e]=postLabels[g];
 postLabels[g]=f;
 f=postBaru[e];
 postBaru[e]=postBaru[g];
 postBaru[g]=f;
}
function e(f,h){
 var g=postTitle[f];
 postTitle[f]=postTitle[h];
 postTitle[h]=g;
 g=postDate[f];
 postDate[f]=postDate[h];
 postDate[h]=g;
 g=postUrl[f];
 postUrl[f]=postUrl[h];
 postUrl[h]=g;
 g=postLabels[f];
 postLabels[f]=postLabels[h];
 postLabels[h]=g;
 g=postBaru[f];
 postBaru[f]=postBaru[h];
 postBaru[h]=g;
}
function sortPosts(d){
 for(var b=0;b<postTitle.length-1;b++){
  for(var a=b+1;a<postTitle.length;a++){
   if(d=="titleasc"){
    if(postTitle[b]>postTitle[a]){c(b,a);}
   }
   if(d=="titledesc"){
    if(postTitle[b]<postTitle[a]){c(b,a);}
   }
   if(d=="dateoldest"){
    if(postDate[b]>postDate[a]){c(b,a);}
   }
   if(d=="datenewest"){
    if(postDate[b]<postDate[a]){c(b,a);}
   }
   if(d=="orderlabel"){
    if(postLabels[b]>postLabels[a]){c(b,a);}
   }
  }
 }
}
function sortPosts2(d,c){
 for(var b=d;b<c-1;b++){
  for(var a=b+1;a<c;a++){
   if(postTitle[b]>postTitle[a]){
    e(b,a);
   }
  }
 }
}
function sortlabel(){
 lastPost=10;
 sortPosts(conf.sortBy);
 var a=0,b=0,temp,aux,firsti;
 while(b<postTitle.length){
  temp=(conf.sortBy == 'orderlabel')?postLabels[b]:postTitle[b];
  aux=(conf.sortBy == 'orderlabel')?postLabels:postTitle;
  firsti=a;
  do{a=a+1;if(a>aux.length)return;}
  while(aux[a]==temp);
  b=a;
  sortPosts2(firsti,a);
  if(b>postTitle.length){break}
 }
}
function displayToc(){
 var a=0,b=0,tab='',temp,aux,firsti;
 if(conf.newtab){
  tab = '_blank';
 }
 
 while(b<postTitle.length){
  temp=(conf.sortBy == 'orderlabel')?postLabels[b]:postTitle[b];
  
  if(conf.sortBy == 'orderlabel'){
   document.write('<p><a href="/search/label/'+temp+'" target="'+tab+'">'+temp+'</a></p>');
  }
  aux=(conf.sortBy == 'orderlabel')?postLabels:postTitle;
  firsti=a;
  do{
   if(a>aux.length) return;
   if(postTitle[a]){   
    document.write("<li><h2>");      
    document.write('<a href="' + postUrl[a].replace('http://','https://') +'" target="'+tab+'">'+postTitle[a]);
    if(conf.date){
     document.write('&nbsp;<span>'+reverse(postDate[a].replace(/-/g,"/"))+'</span>');
    }
    if(postBaru[a]==true){
     document.write(' <strong><em>' + conf.newPost + '</em></strong>')
    }
    document.write("</a></h2></li>");
   }
   a=a+1;
  } while(aux[a]==temp);
  b=a;
  sortPosts2(firsti,a);
  if(b>postTitle.length){break;}
 }
}
//]]>
