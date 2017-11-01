export default (haystack, needle) => {
  const output = [];
  let index;
  let offset = 0;
  while ((index = haystack.indexOf(needle)) >= 0) {
    const start = index + offset;
    const end = start + needle.length;
    output.push([start, end]);
    haystack = haystack.slice(end);
    offset = end;
  }
  return output;
};