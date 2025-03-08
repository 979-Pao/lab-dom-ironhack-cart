/*
// ITERATION 1

function updateSubtotal(product) {
  console.log('Calculating subtotal, yey!');
  const price = product.querySelector('.price span')
  const quantity = product.querySelector('.quantity span')
  //... your code goes here
}

function calculateAll() {
  // code in the following two lines is added just for testing purposes.
  // it runs when only iteration 1 is completed. at later point, it can be removed.
  const singleProduct = document.querySelector('.product');
  updateSubtotal(singleProduct);
  // end of test

  // ITERATION 2
  //... your code goes here

  // ITERATION 3
  //... your code goes here
}

// ITERATION 4

function removeProduct(event) {
  const target = event.currentTarget;
  console.log('The target in remove is:', target);
  //... your code goes here
}

// ITERATION 5

function createProduct() {
  //... your code goes here
}

window.addEventListener('load', () => {
  const calculatePricesBtn = document.getElementById('calculate');
  calculatePricesBtn.addEventListener('click', calculateAll);

  //... your code goes here
});
*/
function updateSubtotal(product) {
  const price = parseFloat(product.querySelector('.price span').innerText);
  const quantity = product.querySelector('.quantity input').value;
  const subtotal = price * quantity;
  product.querySelector('.subtotal span').innerText = subtotal.toFixed(2);
  return subtotal;
}

function calculateAll() {
  const products = document.querySelectorAll('.product');
  let total = 0;
  products.forEach(product => total += updateSubtotal(product));
  document.querySelector('#total-value span').innerText = total.toFixed(2);
}

function removeProduct(event) {
  const productRow = event.currentTarget.closest('.product');
  productRow.remove();
  calculateAll();
}

function createProduct() {
  const nameInput = document.querySelector('.create-product input[type="text"]');
  const priceInput = document.querySelector('.create-product input[type="number"]');
  const name = nameInput.value.trim();
  const price = parseFloat(priceInput.value).toFixed(2);

  if (!name || price <= 0 || isNaN(price)) return;

  const tableBody = document.querySelector('#cart tbody');
  const newRow = document.createElement('tr');
  newRow.classList.add('product');
  newRow.innerHTML = `
    <td class="name"><span>${name}</span></td>
    <td class="price">$<span>${price}</span></td>
    <td class="quantity"><input type="number" value="0" min="0" placeholder="Quantity" /></td>
    <td class="subtotal">$<span>0</span></td>
    <td class="action"><button class="btn btn-remove">Remove</button></td>
  `;

  tableBody.appendChild(newRow);
  newRow.querySelector('.btn-remove').addEventListener('click', removeProduct);
  nameInput.value = '';
  priceInput.value = 0;
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('calculate').addEventListener('click', calculateAll);
  document.querySelectorAll('.btn-remove').forEach(button => button.addEventListener('click', removeProduct));
  document.getElementById('create').addEventListener('click', createProduct);
});
