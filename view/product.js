if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready()
}

function ready(){

let removeCartButton = document.getElementsByClassName('btn-danger')
for(let i = 0; i<removeCartButton.length;i++){
    let button = removeCartButton[i];
    button.addEventListener('click',removeCartItem)
}

let quntityInputs = document.getElementsByClassName ('cart-quantity-input')
for(let i = 0; i<quntityInputs.length;i++){
    let input = quntityInputs[i];
    input.addEventListener('change',quantityChange)
}

let addToCartButtons = document.getElementsByClassName('btn2')
for(let i = 0; i < addToCartButtons.length; i++){
let button = addToCartButtons[i];
button.addEventListener('click',addToCart);
}

document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)



}

function purchaseClicked(){
    alert('thank you for your purchase')
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while(cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}




function removeCartItem(event){
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal();
}



function quantityChange(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
    updateCartTotal()
}

function addToCart(event){
    
    let button = event.target; 
     let productItem = button.parentElement;
     let title = productItem.getElementsByTagName('h4')[0].innerText;
     let price = productItem.getElementsByTagName('h3')[0].innerText;
     let imageSrc = productItem.getElementsByTagName('img')[0].src;
     console.log(title,price,imageSrc)
     addProductToCart(title,price,imageSrc);
     updateCartTotal();
}


function addProductToCart(title,price,imageSrc){
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row')
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for(let i = 0; i < cartItemNames.length;i++){
      if(cartItemNames[i].innerText == title){
  alert('thi item is already added to this cart')
  return
      }
    }
    let cartRowContents = `
    <div class="cart-item cart-column">
    <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
    <span class="cart-item-title">${title}</span>
  </div>
  <span class="cart-price cart-column">${price}</span>
  <div class="cart-quantity cart-column">
    <input class="cart-quantity-input" type="number" value="1">
    <button class="btn btn-danger" type="button">REMOVE</button>
  </div>`
  
  cartRow.innerHTML += cartRowContents 
    cartItems.append(cartRow); 
   cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChange)
  }



function updateCartTotal(){
let cartItemContainer = document.getElementsByClassName('cart-items')[0];
 let cartRows = cartItemContainer.getElementsByClassName('cart-row');
 let total = 0;
for(let i = 0; i<cartRows.length;i++){
   let cartRow = cartRows[i];
   let priceElement = cartRow.getElementsByClassName('cart-price')[0];
   let quntityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
   let price = priceElement.innerText.replace('$','');
  let quntity = quntityElement.value;
  total += (price*quntity)

}
total = Math.round(total*100)/100
document.getElementsByClassName('cart-total-price')[0].innerText = '$'+total
}





// 
const parentNode = document.getElementsByClassName('row')[0];
// console.log(parentNode)

window.addEventListener('load',()=>{
    axios.get('http://localhost:3000/products').then((products)=>{
        console.log(products.data)
        products.data.forEach(product => {
            let productHtml = `<div class="col-4">
            <img src="${product.ImageURL}" alt="">
            <h4>${product.title}</h4><br>
            <h3>$ ${product.Price}</h3>
            <button class="btn2">Add TO Cart</button>
        </div>`
        parentNode.innerHTML +=productHtml
        });
    }).catch((err)=>{
        console.log(err);
    })
});

