/**
 * To learn more about Link Resolving check out the Prismic documentation
 * https://prismic.io/docs/vuejs/beyond-the-api/link-resolving
 */

export default function (doc, category, hash=null, pagination=null) {

  if(doc.link_type != 'Media'){
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

    if(doc.type==='blog_post'&&hash===null) {
      return `${locale}/blog/${category.uid}/${doc.uid}/`;
    }

    if(doc.type==='blog_post'&&hash!==null) {
      return `${locale}/blog/${category.uid}/${doc.uid}/#${theHash}`;
    }

    if(doc.type==='page'||doc.type==='blog') {
      if(doc.uid==='homepage') {
        return `${locale}/${theHash}`
      } else {
        return `${locale}/${doc.uid}/${theHash}`
      }
    }

    if (doc.type === 'top_menu') {
      return `${locale}/`
    }

    if (doc.type === 'web') {
      return doc.uid
    }
  } else{
    return doc.url;
  }



  return '/not-found'
}