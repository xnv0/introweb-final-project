// ----------------------------
// ADD TO CART FUNCTIONALITY
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Select all "Add to Cart" buttons
  const cartButtons = document.querySelectorAll(".add-to-cart");

  // Add click listener for each product
  cartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productItem = button.closest(".product-item");
      const name = productItem.dataset.name;
      const price = productItem.dataset.price;
      const img = productItem.dataset.img;

      // Get existing cart or create new one
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price, img });
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} has been added to your cart! 🛒`);
    });
  });

  // ----------------------------
  // LOAD CART ON PAYMENT PAGE
  // ----------------------------
  const orderList = document.getElementById("orderList");
  const totalPriceElement = document.getElementById("totalPrice");

  if (orderList) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    orderList.innerHTML = "";

    if (cart.length === 0) {
      orderList.innerHTML = "<li>Your cart is empty.</li>";
      totalPriceElement.textContent = "Total: $0";
      return;
    }

    // Show each item in the list
    cart.forEach(item => {
      const li = document.createElement("li");
      li.innerHTML = `
        <img src="${item.img}" alt="${item.name}" 
             style="width:50px;height:50px;border-radius:6px;vertical-align:middle;margin-right:10px;">
        ${item.name} - $${item.price}
      `;
      orderList.appendChild(li);
      total += parseFloat(item.price);
    });

    totalPriceElement.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
  }

  // ----------------------------
  // CLEAR CART BUTTON
  // ----------------------------
  const clearBtn = document.getElementById("clearCart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      alert("Your cart has been cleared!");
      location.reload();
    });
  }

  // ----------------------------
  // CONFIRM PURCHASE
  // ----------------------------
  const confirmBtn = document.getElementById("confirmPurchase");
  if (confirmBtn) {
    document.getElementById("checkoutForm").addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.removeItem("cart");
      alert("Thank you! Your order has been placed. You will be redirected to the homepage.");
      window.location.href = "index.html";
    });
  }

  // ----------------------------
  // LOGIN FORM (optional)
  // ----------------------------
  const loginForm = document.querySelector(".login-box form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("✅ You have logged in successfully!");
      loginForm.reset();
    });
  }
});
