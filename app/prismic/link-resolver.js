/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc,hash) {
  var lang = 'de';
  if (doc.lang == 'en-gb') {
    lang = 'en';
  }

  var locale = '';
  if (lang == 'en') {
    locale = '/en';
  }

  var theHash = '';

  if(hash){
    theHash = hash;
  }

  if (doc.isBroken) {
    return '/not-found'
  }

  if (doc.type === 'homepage') {
    return `${locale}/${theHash}`
  }

  if (doc.type === 'page') {
    return `${locale}/${doc.uid}${theHash}`
  }

  if (doc.type === 'usecases') {
    if(lang == 'en'){
      return `${locale}/usecases/${doc.uid}${theHash}`
    } else{
      return `/loesungen/${doc.uid}${theHash}`
    }
    
  }

  if (doc.type === 'top_menu') {
    return `${locale}/`
  }

  if (doc.type === 'blog') {
    return `${locale}/blog${theHash}`
  }

  if (doc.type === 'posts') {
    return `${locale}/blog/${doc.uid}${theHash}`
  }

  if (doc.type === 'post_category') {
    var newID = encodeURIComponent(doc.uid).replace('%20','-');

    return `${locale}/blog/category/${newID}${theHash}`
  }

  if (doc.type === 'web') {

    return doc.uid
  }

  

  return '/not-found'
}