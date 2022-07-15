let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

//получение содержимого корзины из локального хранилища либо создаем пустой массив
let basket = JSON.parse(localStorage.getItem("data")) || [];

//console.log(basket);

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  //считаем общее кол-во в элементов корзине
  cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
  //console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
};
calculation();

//функция генерации карточек товара из корзины
let generateCartItems = () => {
  if (basket.length !== 0) {
    return shoppingCart.innerHTML = basket.map((x)=>{
//      console.log(x);
      let {id, item} = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      //destructuring obj
      let {img, name, price} = search;
      return `
      <div class="cart-item">
	<img width="100" src=${img} alt="" />
	<div class="details">
	  <div class="title-price-x">
	  <h4 class="title-price">
	    <p>${name}</p>
	    <p class="cart-item-price">${price}руб.</p>
	  </h4>
	  <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>

	  </div>
	    <div class="buttons">
	      <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
	      <div id="${id}" class="quantity">
	      ${item}

	      </div>
	      <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
	    </div>
	  <div class="cart-buttons">
	  </div>
	  <h3>${item*search.price}руб.</h3>
	</div>
      </div>
      `;
    })
    .join("");
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Корзина пуста</h2>
    <a href="index.html">
      <button class="HomeBtn">Вернуться назад</button>
    </a>
    `;
  };
};

generateCartItems();

//функция прибавления
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1
    });
  } else {
    search.item +=1;
  }
  //console.log(basket);
  update(selectedItem.id);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
//функция убавления
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0)  return;
  else {
    search.item -=1;
  }
  //console.log(basket);
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !==0 );
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
//функция обновления
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};
//удаление одной карточки товара
let removeItem = (id) => {
  let selectedItem = id;
//  console.log(selectedItem.id);
  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  calculation();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

//очистка корзины
let clearCart = () => {
  basket = [];
  generateCartItems();
  calculation();
  localStorage.setItem("data", JSON.stringify(basket));
}
//функция подсчета и отображения общего кол-ва
let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket.map((x) => {
      let {item, id} = x;
      let search = shopItemsData.find((y) => y.id === id) || [];
      return item * search.price;
    }).reduce((x,y) => x+y,0);
    console.log(amount);
    label.innerHTML = `
    <h2>Общая сумма : ${amount}руб.</h2>
    <button class="checkout">Купить</button>
    <button onclick="clearCart()" class="removeAll">Очистить</button>
    `;
  } else return
};

totalAmount();

