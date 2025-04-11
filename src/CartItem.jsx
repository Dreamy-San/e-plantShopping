import React from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector from react-redux
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  function calculateTotalAmount() {
    return cart.reduce((total, item) => {
      const itemCost = parseFloat(item.cost.substring(1)); // Extract numeric value from cost
      return total + itemCost * item.quantity; // Add item's total cost to the total amount
    }, 0).toFixed(2); // Keep two decimal places
  }

  function handleContinueShopping(e) {
    console.log("Continue Shopping button clicked"); // Debugging log
    e.preventDefault();
   // alert("Continue Shopping button clicked"); // Debugging alert
    onContinueShopping(e); // Call the parent function to navigate back to the plant listing page
  }

  function handleIncrement(item) {
    console.log("Increment button clicked"); // Debugging log
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); // Increment quantity
    console.log("Increment button finished"); // Debugging log
  }

  function handleDecrement(item) {
    console.log("Dispatching decrement for:", item);
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); // Decrement quantity
    } else {
      dispatch(removeItem({ name: item.name })); // Remove item if quantity drops to 0
    }
  }

  function handleRemove(item) {
    console.log("Handle Remove:", item);
    dispatch(removeItem({ name: item.name })); // Dispatch removeItem action to delete the item
  }

  function calculateTotalCost(item) {
    const itemCost = parseFloat(item.cost.substring(1)); // Extract numeric value from cost
    return (itemCost * item.quantity).toFixed(2); // Multiply by quantity and keep two decimal places
  }

  function handleCheckoutShopping(e) {
    alert('Functionality to be added for future reference'); // Placeholder for checkout functionality
  }

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={() => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
}

export default CartItem;