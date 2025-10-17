// ----------------------------
// SITE SCRIPT (burger + cart + checkout + login)
// ----------------------------
document.addEventListener("DOMContentLoaded", () => {

  /* ----------------------------
     BURGER MENU (for mobile nav)
  ---------------------------- */
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close nav when clicking any link (better UX)
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        burger.classList.remove("active");
        navLinks.classList.remove("active");
      }
    });
  }

  /* ----------------------------
     ADD TO CART FUNCTIONALITY
  ---------------------------- */
  const cartButtons = document.querySelectorAll(".add-to-cart");

  cartButtons.forEach(button => {
    button.addEventListener("click", () => {
      const productItem = button.closest(".product-item");
      if (!productItem) return;

      const name = productItem.dataset.name || "Unnamed Item";
      const price = productItem.dataset.price || "0";
      const img = productItem.dataset.img || "";

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price, img });
      localStorage.setItem("cart", JSON.stringify(cart));

      alert(`${name} has been added to your cart! 🛒`);
    });
  });

  /* ----------------------------
     LOAD CART ON PAYMENT PAGE
  ---------------------------- */
  const orderList = document.getElementById("orderList");
  const totalPriceElement = document.getElementById("totalPrice");

  if (orderList) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    orderList.innerHTML = "";

    if (cart.length === 0) {
      orderList.innerHTML = "<li>Your cart is empty.</li>";
      totalPriceElement.textContent = "Total: $0";
    } else {
      cart.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `
          <img src="${item.img}" alt="${item.name}" style="width:50px;height:50px;border-radius:6px;vertical-align:middle;margin-right:10px;">
          ${item.name} - $${item.price}
        `;
        orderList.appendChild(li);
        total += parseFloat(item.price);
      });
      totalPriceElement.innerHTML = `<strong>Total:</strong> $${total.toFixed(2)}`;
    }
  }

  /* ----------------------------
     CLEAR CART BUTTON
  ---------------------------- */
  const clearBtn = document.getElementById("clearCart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      alert("Your cart has been cleared!");
      location.reload();
    });
  }

  /* ----------------------------
     CONFIRM PURCHASE (checkout)
  ---------------------------- */
  const checkoutForm = document.getElementById("checkoutForm");
  if (checkoutForm) {
    checkoutForm.addEventListener("submit", function (e) {
      e.preventDefault();
      localStorage.removeItem("cart");
      alert("✅ Thank you! Your order has been placed.");
      window.location.href = "index.html";
    });
  }

  /* ----------------------------
     LOGIN FORM
  ---------------------------- */
  const loginForm = document.querySelector(".login-box form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("✅ You have logged in successfully!");
      loginForm.reset();
    });
  }
});
