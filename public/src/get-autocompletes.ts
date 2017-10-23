export default (data, text) => data.filter( 
  (f) => text != '' && f.toLowerCase().indexOf(text.toLowerCase()) >= 0
);