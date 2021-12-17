export default ({ app }, inject) => {


  inject('newline',function(string){
    if(string){
      return string.replace(/\n/g, "<br />");
    }
    
  });
}