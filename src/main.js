let shop = document.getElementById("shop");

//получение содержимого корзины из локального хранилища либо создаем пустой массив
let basket = JSON.parse(localStorage.getItem("data")) || [];

//функция генерации карточек товара 
let generateShop = () => {
  return (shop.innerHTML = shopItemsData.map((x) => {
    let {id, name, price, desc, img} = x;
    let search = basket.find((x)=>x.id === id) || [];
    return `
      <div id="products-id-${id}" class="item">
	<img width="220" src=${img} alt="">
	<div class="details">
	  <h3>${name}</h3>
	  <p>${desc}</p>
	  <div class="priceq">
	    <h2>${price}руб.</h2>
	    <div class="buttons">
	      <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
	      <div id="${id}" class="quantity">
	      ${search.item === undefined ? 0 : search.item}

	      </div>
	      <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
	    </div>
	  </div>
	</div>
    </div>
	`;
  }).join(""));
};

generateShop();

//document.getElementById("shop").innerHTML = '<p>asdasd</p>';

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
  localStorage.setItem("data", JSON.stringify(basket));
};
//функция вычитания
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
  localStorage.setItem("data", JSON.stringify(basket));
};
//обновление кол-ва
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  //console.log(search.item);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x)=>x.item).reduce((x,y)=>x+y,0);
  //console.log(basket.map((x)=>x.item).reduce((x,y)=>x+y,0));
};
calculation();
