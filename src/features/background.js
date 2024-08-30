
function setLoaderRed() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.style.color = 'black';
    loader.style.backgroundColor = 'red';
    console.log('Le chargeur est maintenant rouge avec un fond noir.');
  }
}

export default setLoaderRed;
