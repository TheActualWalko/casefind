export default () => {
  document.addEventListener('click', (event)=>{
    return window.dispatchEvent(
      new CustomEvent(
        'sw-click',
        { detail: event.srcElement }
      )
    );
  });

  document.addEventListener('keydown', (event)=>{
    if (event.key === 'ArrowDown') {
      window.dispatchEvent(new CustomEvent('sw-down', { detail: event.srcElement }));
    } else if (event.key === 'ArrowUp') {
      window.dispatchEvent(new CustomEvent('sw-up', { detail: event.srcElement }));
    } else if(event.key === 'Enter') {
      window.dispatchEvent(new CustomEvent('sw-enter', { detail: event.srcElement }));
    }
  });
}