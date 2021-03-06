import woven from 'woven-js/client'; // need to add npm module
// import functions from './woven_functions/functions'
import wovenWorker from 'worker-loader?inline=true&name=woven-worker.js!babel-loader!woven-Loader!./woven_functions/functions.js';
// import wovenWorker from 'woven-loader!./woven_functions/functions.js'

woven.connect(wovenWorker);

window.onload = function() {
  // Add 10 functionality
  const add10Button = document.getElementById('add-10-btn');
  const numbers = Array.from(document.getElementsByClassName('number'));
  add10Button.onclick = function() {
    numbers.forEach(node => {
      let num = Number(node.innerHTML);
      woven.run('addTen', num)  
        .then(newNum => node.innerHTML = newNum);
    });
  }

  // Fib functionality
  function calcFib(num) {
    woven.run('nthFib', num)
      .then((fib) => {
        const li = document.createElement('li');
        li.textContent = fib;
        fibList.appendChild(li);
      });
  }

  const fibList = document.getElementById('fib-list');
  const fibNumber = document.getElementById('fib-number');
  const fibButton = document.getElementById('calc-fib');

  fibButton.addEventListener('click', () => calcFib(fibNumber.value || 8));
}


// setTimeout(woven.run('addTen', 20).then(output => console.log('output from run function is ', output)), 1000);

// woven.run('addTen', 30)
//   .then(output => console.log('output from run function is ', output));
