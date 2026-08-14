import { renderOrderSummary } from './checkout/OrderSummary.js';
import { renderPaymentSummary } from './checkout/paymentsummary.js';
import { loadCart } from '../data/cart.js';
import { loadProducts,loadProductsFetch } from '../data/products.js';


//import '../data/cart-class.js';
//import '../data/backend-practice.js';


async function loadPage(){

    try{
        await loadProductsFetch();
        const value=await new Promise((resolve)=>{
            loadCart(()=>{
            resolve('value3');
        });
    });

    } catch(error){
        console.log('unexpected error');
        
    }


    

    renderOrderSummary();
    renderPaymentSummary();

    
}
loadPage();


/*
Promise.all([
    loadProductsFetch(),

new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });
    })

]).then((values)=>{
    console.log(values);
    
    renderOrderSummary();
    renderPaymentSummary();
});
*/


/*
new Promise((resolve)=>{

    
    loadProducts(()=>{

        resolve('vlaue1');
    });

    
}).then((value)=>{

    console.log(value);
    

    return new Promise((resolve)=>{
        loadCart(()=>{
            resolve();
        });

    });

}).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})*/





/*

loadProducts(()=>{
    loadCart(()=>{
        renderOrderSummary();
        renderPaymentSummary();
    });
});
*/
