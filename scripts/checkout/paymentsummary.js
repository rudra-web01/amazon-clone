import { cart } from "../../data/cart.js";
import { getProducts, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { addOrders, orders } from "../../data/orders.js";





export function renderPaymentSummary()
{
    let productPrice=0;
    let shippingPrice=0;
    cart.forEach((cartItem)=>{
    
        const product=getProducts(cartItem.productId);
        productPrice+= product.price * cartItem.quantity;

        const deliveryOption=getDeliveryOption(cartItem.deliveryOptionId);
        shippingPrice+=deliveryOption.price;
    });
    const totalBeforeTax= productPrice+shippingPrice;
    const taxPrice= totalBeforeTax*0.1;
    const totalPrice= totalBeforeTax+ taxPrice;

    const paymentsummaryHTML= `

    <div class="payment-summary-title">
        Order Summary
    </div>


    <div class="payment-summary-row">
    <div>Items (${cart.reduce((total, item) => total + item.quantity, 0)}):</div>
    <div class="payment-summary-money">${productPrice}</div>
    </div>

    <div class="payment-summary-row">
    <div>Shipping &amp; handling:</div>
    <div class="payment-summary-money">${shippingPrice}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
    <div>Total before tax:</div>
    <div class="payment-summary-money">${totalBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
    <div>Estimated tax (10%):</div>
    <div class="payment-summary-money">${taxPrice}</div>
    </div>

    <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">${totalPrice}</div>
    </div> 

    <button class="place-order-button button-primary js-place-order">
    Place your order
    </button>

`;

document.querySelector('.js-payment-summary').innerHTML= paymentsummaryHTML;

document.querySelector('.js-place-order').addEventListener('click',async()=>{
    try{
        const response=await fetch('https://supersimplebackend.dev/orders',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cart: cart
        })
    });
    const order=await response.json()
    addOrders(order);


    }catch(error){
        console.log('unexpected error. try again later.');
        
    }

    window.location.href= 'orders.html';




    
});

    
}