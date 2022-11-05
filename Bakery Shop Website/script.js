const buttons    = document.querySelectorAll("[data-filter]");
const cards      = document.querySelectorAll("[data-item]");
const search_box = document.querySelector("[data-search-box]");

const popup_modal_container = document.querySelector("[data-popup-modal-container]");
const modal_left_arrow      = document.querySelector("[data-modal-left-arrow]");
const modal_right_arrow     = document.querySelector("[data-modal-right-arrow]");
const modal_image           = document.querySelector("[data-modal-image]");
const modal_close_button    = document.querySelector("[data-modal-close-button]");

const name_and_price = document.querySelectorAll(".name-and-price");
const store_bakery_images = document.querySelectorAll("[data-store-bakery-images]");
const trashIcons = document.querySelectorAll(".fa-trash");
const total_price1 = document.querySelector("#total-price1");
const total_price2 = document.querySelector("#total-price2");
const number_of_items_in_cart = document.getElementById("number-of-items-in-cart");
const cart = document.querySelector(".cart");
	// <div class="cart-item">
	//	 	<img src="img/sweets-1.jpeg">
	//	 	<div>
	// 			<p>Cart Item</p>
	// 			<span>$</span>
	// 			<span>10.99</span>
	// 		</div>
	// 		<i class="fas fa-trash"></i>
	// </div>


function addToCart(imgSrc, itemName, price) {
	// CREATE A SINGLE CART ITEM OUTER DIV AND GIVE IT A CLASS OF .CART-ITEM
	const cartItem = document.createElement("div");
	cartItem.classList.add("cart-item");
	// CREATE A IMAGE AND GIVE IT A SRC ATTRIBUTE AND APPEND IT TO THE CART ITEM DIV
	const image = document.createElement("img");
	image.src = imgSrc;
	cartItem.appendChild(image);
	// CREATE A DIV THAT CONTAIN THE ITEM NAME AND PRICE
	const nameAndPrice = document.createElement("div");
	// CREATE A P ELEMENT WITH ITEM NAME THEN APPEND TO NAMEANDPRICE DIV
	const p = document.createElement("p");
	p.appendChild(document.createTextNode(itemName));
	nameAndPrice.appendChild(p);
	// CREATE A SPAN ELEMENT WITH A $ SIGN AND THEN APPEND IT TO THE NAMEANDPRICE DIV
	const dollarSign = document.createElement("span");
	dollarSign.appendChild(document.createTextNode("$"));
	nameAndPrice.appendChild(dollarSign);
	// CREATE A SPAN WITH THE PRICE OF THE ITEM AND THEN APPEND IT TO THE NAMEANDPRICE DIV
	const priceSpan = document.createElement("span");
	priceSpan.appendChild(document.createTextNode(price));
	nameAndPrice.appendChild(priceSpan);
	// APPEND THE NAMEANDPRICE DIV TO THE CARTITEM OUTER MAIN DIV
	cartItem.appendChild(nameAndPrice);
	// CREATE A i ELEMENT WITH THE CLASSES fas AND fa-trash TO CREATE TRASH ICON AND THEN APPEND IT TO THE CARTITEM DIV
	const trash = document.createElement("i");
	trash.classList.add("fas", "fa-trash");
	trash.setAttribute("onclick", "removeParentOf(this)");
	cartItem.appendChild(trash);
	// APPEND CARTITEM TO THE CART AS A NEW ITEM
	document.getElementById("cart-list").appendChild(cartItem);
	total_price1.innerText = Number(total_price1.innerText) + Number(price);
	total_price2.innerText = Number(total_price2.innerText) + Number(price);
	number_of_items_in_cart.innerText = Number(number_of_items_in_cart.innerText) + 1;
}
function removeParentOf(element){
	const removedElementPrice = Number(element.previousElementSibling.children[2].innerText);
	total_price1.innerText = Number(total_price1.innerText) - removedElementPrice;
	total_price2.innerText = Number(total_price2.innerText) - removedElementPrice;
	number_of_items_in_cart.innerText = Number(number_of_items_in_cart.innerText) - 1;
	element.parentElement.remove();
}

function filter(item) {
	if(item.toLowerCase().trim() === "all") {
		cards.forEach(item => item.style.display = "initial");
	} else {
		cards.forEach(card => item.toLowerCase().trim() === card.dataset.item ? card.style.display = "initial" : card.style.display = "none")
	}
}



buttons.forEach(button => {
	button.addEventListener("click", event => {
		filter(button.dataset.filter);
	});
});

search_box.addEventListener("keypress", event => {
  if(event.which === 13 || event.keyCode === 13 || event.key === "Enter" || event.code === "Enter") { // I used different statements because I found that all of them work and I liked to write them all for future reference! [small note: Example, if you press the j/J letter, the event.code will equal "keyJ".]
		filter(search_box.value);
	}
});

store_bakery_images.forEach(image => { 
	image.addEventListener("click", event => {
		popup_modal_container.style.display = "initial";
		modal_image.src = event.target.src;
	});
});

modal_close_button.addEventListener("click", event => {
	popup_modal_container.style.display = "none";
});

modal_left_arrow.addEventListener("click", event => {
	let image_filter_arr = Array.from(cards).map(element => element.style.display !== "none" ? element.firstElementChild.src.match(/img.+/i)[0] : undefined).filter(element => element !== undefined);
	let updated_image_index = image_filter_arr.indexOf(modal_image.src.match(/img.+/i)[0]) - 1;
	modal_image.src = updated_image_index < 0 ? image_filter_arr[image_filter_arr.length - 1] : image_filter_arr[updated_image_index];
});

modal_right_arrow.addEventListener("click", event => {
	let image_filter_arr = Array.from(cards).map(element => element.style.display !== "none" ? element.firstElementChild.src.match(/img.+/i)[0] : undefined).filter(element => element !== undefined);
	let updated_image_index = image_filter_arr.indexOf(modal_image.src.match(/img.+/i)[0]) + 1;
	modal_image.src = updated_image_index > image_filter_arr.length - 1 ? image_filter_arr[0] : image_filter_arr[updated_image_index];
});


name_and_price.forEach(element => {
	element.addEventListener("click", e => {
		addToCart(e.target.previousElementSibling.getAttribute("src"), e.target.children[0].innerText, e.target.children[1].innerText.match(/\w/g).join(""));
	});
})

document.getElementById("cart-info").addEventListener("click", e => {
	cart.classList.toggle("show");
});
