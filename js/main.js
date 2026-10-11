// ================================
// Smart Pharmacy - Main JavaScript
// ================================


// ================================
// Authentication
// ================================

// Show / Hide Login Password
function togglePassword(inputId = "loginPassword", button = null) {

    const password = document.getElementById(inputId);

    if (!password) {
        return;
    }

    if (password.type === "password") {
        password.type = "text";

        if (button) {
            button.textContent = "🙈";
        }

    } else {
        password.type = "password";

        if (button) {
            button.textContent = "👁️";
        }
    }
}


// Show / Hide Register Password
function toggleRegisterPassword(inputId = "password", button = null) {

    const password = document.getElementById(inputId);

    if (!password) {
        return;
    }

    if (password.type === "password") {
        password.type = "text";

        if (button) {
            button.textContent = "🙈";
        }

    } else {
        password.type = "password";

        if (button) {
            button.textContent = "👁️";
        }
    }
}


// ================================
// Registration
// ================================

document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const terms =
                document.getElementById("terms").checked;


            // ================================
            // Validation
            // ================================

            if (
                !name ||
                !email ||
                !phone ||
                !password ||
                !confirmPassword
            ) {

                alert("Please fill in all fields.");

                return;
            }


            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
            ) {

                alert("Please enter a valid email address.");

                return;
            }


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;
            }


            if (password.length < 6) {

                alert(
                    "Password must contain at least 6 characters."
                );

                return;
            }


            if (password !== confirmPassword) {

                alert("Passwords do not match.");

                return;
            }


            if (!terms) {

                alert(
                    "Please accept the Terms & Conditions."
                );

                return;
            }


            // ================================
            // Save User Details
            // ================================

            localStorage.setItem(
                "userName",
                name
            );

            localStorage.setItem(
                "userEmail",
                email
            );

            localStorage.setItem(
                "userPhone",
                phone
            );

            localStorage.setItem(
                "userPassword",
                password
            );


            // Save user in users array
            // for Admin Users page

            let users =
                JSON.parse(
                    localStorage.getItem("users")
                ) || [];


            const existingUser =
                users.find(
                    user =>
                        user.email.toLowerCase() ===
                        email.toLowerCase()
                );


            if (existingUser) {

                alert(
                    "An account with this email already exists."
                );

                return;
            }


            users.push({

                id: Date.now(),

                name: name,

                email: email,

                phone: phone,

                city:
                    localStorage.getItem("userCity") ||
                    "N/A",

                status: "Active"

            });


            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );


            alert(
                "Registration successful! Please login."
            );


            window.location.href =
                "login.html";

        });

    }


    // ================================
    // Common User + Admin Login
    // ================================

    const loginForm =
        document.getElementById("loginForm");


    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const loginValueElement =
                    document.getElementById("loginEmail");


                const passwordElement =
                    document.getElementById("loginPassword");


                if (
                    !loginValueElement ||
                    !passwordElement
                ) {

                    alert(
                        "Login fields were not found."
                    );

                    return;
                }


                const loginValue =
                    loginValueElement.value.trim();

                const password =
                    passwordElement.value;


                if (
                    loginValue === "" ||
                    password === ""
                ) {

                    alert(
                        "Please enter your login details."
                    );

                    return;
                }


                // =====================================
                // ADMIN LOGIN
                // =====================================

                const adminEmail =
                    "admin@smartpharmacy.com";

                const adminPassword =
                    "admin123";


                if (
                    loginValue.toLowerCase() ===
                    adminEmail.toLowerCase() &&
                    password === adminPassword
                ) {

                    localStorage.setItem(
                        "adminLoggedIn",
                        "true"
                    );

                    localStorage.setItem(
                        "adminUsername",
                        "admin"
                    );


                    alert(
                        "Admin login successful!"
                    );


                    window.location.href =
                        "admin/dashboard.html";

                    return;
                }


                // =====================================
                // USER LOGIN
                // =====================================

                const userEmail =
                    localStorage.getItem(
                        "userEmail"
                    );

                const userPhone =
                    localStorage.getItem(
                        "userPhone"
                    );

                const userPassword =
                    localStorage.getItem(
                        "userPassword"
                    );


                const emailMatch =
                    userEmail &&
                    loginValue.toLowerCase() ===
                    userEmail.toLowerCase();


                const phoneMatch =
                    userPhone &&
                    loginValue === userPhone;


                const passwordMatch =
                    userPassword &&
                    password === userPassword;


                if (
                    (emailMatch || phoneMatch) &&
                    passwordMatch
                ) {

                    localStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );


                    localStorage.setItem(
                        "loggedInUser",
                        loginValue
                    );


                    alert(
                        "Login successful!"
                    );


                    window.location.href =
                        "index.html";

                    return;
                }


                // =====================================
                // INVALID LOGIN
                // =====================================

                alert(
                    "Invalid email/phone or password."
                );

            }
        );

    }

});
// ================================
// Home Page
// ================================

function searchMedicine() {

    const searchInput =
        document.getElementById("homeSearch");


    if (!searchInput) {
        return;
    }


    const search =
        searchInput.value.trim();


    if (search === "") {

        alert("Please enter a medicine name.");

        return;
    }


    window.location.href =
        "medicines.html?search=" +
        encodeURIComponent(search);

}


// ================================
// Cart
// ================================

function addToCart(name, price) {

    // IMPORTANT:
    // Use "cart" everywhere in the application.
    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart.push({

        name: name,

        price: Number(price),

        quantity: 1

    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(name + " added to cart!");

}


// =========================================
// MEDICINE SEARCH & FILTER
// =========================================

function filterMedicines() {

    const searchInput =
        document.getElementById("medicineSearch");

    const categoryInput =
        document.getElementById("categoryFilter");

    if (!searchInput || !categoryInput) {
        return;
    }

    const searchText =
        searchInput.value.toLowerCase().trim();

    const category =
        categoryInput.value;

    const medicines =
        document.querySelectorAll(".medicine-card");

    medicines.forEach(function (medicine) {

        const name =
            (medicine.dataset.name || "").toLowerCase();

        const medicineCategory =
            medicine.dataset.category || "";

        const matchesSearch =
            name.includes(searchText);

        const matchesCategory =
            category === "all" ||
            medicineCategory === category;

        if (matchesSearch && matchesCategory) {

            medicine.style.display = "block";

        } else {

            medicine.style.display = "none";

        }

    });

}


// =========================================
// MEDICINE DETAILS
// =========================================

let quantity = 1;


// =========================================
// CHANGE QUANTITY
// =========================================

function changeQuantity(amount) {

    quantity += amount;

    if (quantity < 1) {
        quantity = 1;
    }

    const quantityElement =
        document.getElementById("quantity");

    if (quantityElement) {

        quantityElement.textContent =
            quantity;

    }

}


// =========================================
// MEDICINE DATA
// =========================================

const medicineData = {

    // -------------------------------------
    // MEDICINES
    // -------------------------------------

    1: {
        name: "Paracetamol 500mg",
        category: "Medicines",
        pack: "10 Tablets",
        price: 25,
        image: "💊",
        description:
            "Paracetamol 500mg tablets are commonly used for temporary relief from mild to moderate pain and fever."
    },

    2: {
        name: "Ibuprofen 400mg",
        category: "Medicines",
        pack: "10 Tablets",
        price: 55,
        image: "💊",
        description:
            "Ibuprofen 400mg tablets are commonly used for temporary relief from pain and inflammation."
    },

    3: {
        name: "Amoxicillin 500mg",
        category: "Medicines",
        pack: "10 Capsules",
        price: 95,
        image: "💊",
        description:
            "Amoxicillin 500mg is a prescription antibiotic used to treat certain bacterial infections."
    },


    // -------------------------------------
    // VITAMINS & SUPPLEMENTS
    // -------------------------------------

    4: {
        name: "Vitamin C Tablets",
        category: "Vitamins & Supplements",
        pack: "30 Tablets",
        price: 120,
        image: "🍊",
        description:
            "Vitamin C tablets are commonly used as a dietary supplement to support normal immune function."
    },

    5: {
        name: "Multivitamin Tablets",
        category: "Vitamins & Supplements",
        pack: "30 Tablets",
        price: 180,
        image: "🍊",
        description:
            "Multivitamin tablets provide a combination of vitamins used as a dietary supplement."
    },

    6: {
        name: "Calcium Tablets",
        category: "Vitamins & Supplements",
        pack: "30 Tablets",
        price: 150,
        image: "🍊",
        description:
            "Calcium tablets are commonly used as a dietary supplement to support normal bone health."
    },


    // -------------------------------------
    // FIRST AID
    // -------------------------------------

    7: {
        name: "Adhesive Bandage",
        category: "First Aid",
        pack: "10 Strips",
        price: 40,
        image: "🩹",
        description:
            "Adhesive bandages are used to protect minor cuts, scratches and wounds."
    },

    8: {
        name: "Cotton Roll",
        category: "First Aid",
        pack: "100g",
        price: 60,
        image: "🩹",
        description:
            "Cotton rolls are commonly used for basic wound care, cleaning and dressing."
    },

    9: {
        name: "Antiseptic Liquid",
        category: "First Aid",
        pack: "100ml",
        price: 85,
        image: "🧴",
        description:
            "Antiseptic liquid is commonly used for cleaning minor cuts, wounds and maintaining basic hygiene."
    },


    // -------------------------------------
    // PERSONAL CARE
    // -------------------------------------

    10: {
        name: "Handwash",
        category: "Personal Care",
        pack: "250ml",
        price: 90,
        image: "🧴",
        description:
            "Handwash is used for regular hand cleaning and maintaining personal hygiene."
    },

    11: {
        name: "Hand Sanitizer",
        category: "Personal Care",
        pack: "200ml",
        price: 75,
        image: "🧴",
        description:
            "Hand sanitizer is used for convenient hand hygiene when soap and water are not immediately available."
    },

    12: {
        name: "Moisturizing Lotion",
        category: "Personal Care",
        pack: "200ml",
        price: 160,
        image: "🧴",
        description:
            "Moisturizing lotion is used to help keep the skin soft and hydrated."
    },


    // -------------------------------------
    // BABY CARE
    // -------------------------------------

    13: {
        name: "Baby Diapers",
        category: "Baby Care",
        pack: "10 Pieces",
        price: 220,
        image: "🍼",
        description:
            "Baby diapers are designed to provide comfortable and convenient protection for babies."
    },

    14: {
        name: "Baby Wipes",
        category: "Baby Care",
        pack: "80 Wipes",
        price: 120,
        image: "🍼",
        description:
            "Baby wipes are designed for gentle cleaning and everyday baby care."
    },

    15: {
        name: "Baby Lotion",
        category: "Baby Care",
        pack: "200ml",
        price: 150,
        image: "🍼",
        description:
            "Baby lotion is designed for gentle moisturizing and everyday baby skin care."
    },


    // -------------------------------------
    // MEDICAL DEVICES
    // -------------------------------------

    16: {
        name: "Digital Thermometer",
        category: "Medical Devices",
        pack: "Digital",
        price: 250,
        image: "🩺",
        description:
            "A digital thermometer is used to measure body temperature."
    },

    17: {
        name: "Digital BP Monitor",
        category: "Medical Devices",
        pack: "Automatic",
        price: 1200,
        image: "🩺",
        description:
            "A digital blood pressure monitor is used to measure blood pressure at home."
    },

    18: {
        name: "Glucose Meter",
        category: "Medical Devices",
        pack: "Digital",
        price: 650,
        image: "🩺",
        description:
            "A glucose meter is used to measure blood glucose levels."
    },


    // -------------------------------------
    // DENTAL CARE
    // -------------------------------------

    19: {
        name: "Toothpaste",
        category: "Dental Care",
        pack: "100g",
        price: 100,
        image: "🦷",
        description:
            "Toothpaste is used for regular dental cleaning and oral hygiene."
    },

    20: {
        name: "Toothbrush",
        category: "Dental Care",
        pack: "Soft Bristle",
        price: 60,
        image: "🦷",
        description:
            "A soft-bristle toothbrush is designed for regular brushing and everyday oral care."
    },

    21: {
        name: "Mouthwash",
        category: "Dental Care",
        pack: "250ml",
        price: 140,
        image: "🦷",
        description:
            "Mouthwash is used as part of regular oral hygiene and mouth cleaning."
    }

};


// =========================================
// GET CURRENT MEDICINE
// =========================================

function getCurrentMedicine() {

    const urlParams =
        new URLSearchParams(window.location.search);

    const medicineId =
        urlParams.get("id");

    if (!medicineId) {
        return null;
    }

    return medicineData[medicineId] || null;

}


// =========================================
// LOAD MEDICINE DETAILS
// =========================================

function loadMedicineDetails() {

    const detailName =
        document.getElementById("detailName");

    if (!detailName) {
        return;
    }

    const medicine =
        getCurrentMedicine();

    if (!medicine) {

        detailName.textContent =
            "Medicine Not Found";

        const description =
            document.getElementById("detailDescription");

        if (description) {

            description.textContent =
                "The selected product could not be found.";

        }

        return;
    }


    const category =
        document.getElementById("detailCategory");

    const pack =
        document.getElementById("detailPack");

    const price =
        document.getElementById("detailPrice");

    const description =
        document.getElementById("detailDescription");

    const packInfo =
        document.getElementById("detailPackInfo");

    const categoryInfo =
        document.getElementById("detailCategoryInfo");

    const image =
        document.getElementById("detailImage");


    // Product name
    detailName.textContent =
        medicine.name;


    // Category
    if (category) {

        category.textContent =
            medicine.category;

    }


    // Pack
    if (pack) {

        pack.textContent =
            medicine.pack;

    }


    // Price
    if (price) {

        price.textContent =
            "₹" + medicine.price;

    }


    // Description
    if (description) {

        description.textContent =
            medicine.description;

    }


    // Pack information
    if (packInfo) {

        packInfo.textContent =
            medicine.pack;

    }


    // Category information
    if (categoryInfo) {

        categoryInfo.textContent =
            medicine.category;

    }


    // Product image
    if (image) {

        image.textContent =
            medicine.image;

    }

}


// =========================================
// ADD PRODUCT DETAILS TO CART
// =========================================

function addDetailsToCart() {

    const medicine =
        getCurrentMedicine();

    if (!medicine) {

        alert("Product details not found.");

        return;
    }


    // Same "cart" key used by
    // Cart and Checkout
    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push({

        name: medicine.name,

        price: Number(medicine.price),

        quantity: quantity

    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    alert(
        medicine.name +
        " added to cart!"
    );

}


// =========================================
// MEDICINE CARD → DETAILS
// =========================================

document.addEventListener(
    "click",
    function (event) {

        const card =
            event.target.closest(
                ".medicine-card"
            );

        if (!card) {
            return;
        }


        // Add button should only
        // add product to cart
        if (
            event.target.closest("button")
        ) {
            return;
        }


        const medicineId =
            card.getAttribute("data-id");

        if (!medicineId) {
            return;
        }


        window.location.href =
            "medicine-details.html?id=" +
            medicineId;

    }
);


// =========================================
// BUY NOW
// =========================================

function buyNow() {

    const medicine =
        getCurrentMedicine();

    if (!medicine) {

        alert("Product details not found.");

        return;
    }


    let cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    cart.push({

        name: medicine.name,

        price: Number(medicine.price),

        quantity: quantity

    });


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    window.location.href =
        "checkout.html";

}

// ================================
// Cart Page
// ================================

function loadCart() {

    const cartItems =
        document.getElementById("cartItems");

    const emptyCart =
        document.getElementById("emptyCart");

    const cartSummary =
        document.getElementById("cartSummary");


    if (!cartItems || !emptyCart || !cartSummary) {
        return;
    }


    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = "";

        emptyCart.style.display = "block";

        cartSummary.style.display = "none";

        return;
    }


    emptyCart.style.display = "none";

    cartSummary.style.display = "block";


    cartItems.innerHTML = "";


    let subtotal = 0;


    cart.forEach(function (item, index) {

        const price =
            Number(item.price) || 0;

        const itemQuantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * itemQuantity;


        subtotal += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <div class="cart-item-icon">
                    💊
                </div>

                <div>

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${price} each
                    </p>

                </div>

            </div>


            <div class="cart-quantity">

                <button
                    type="button"
                    onclick="updateCartQuantity(${index}, -1)"
                >
                    −
                </button>

                <span>
                    ${itemQuantity}
                </span>

                <button
                    type="button"
                    onclick="updateCartQuantity(${index}, 1)"
                >
                    +
                </button>

            </div>


            <div class="cart-item-total">

                <strong>
                    ₹${itemTotal}
                </strong>

                <button
                    type="button"
                    class="remove-cart-btn"
                    onclick="removeFromCart(${index})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    // Delivery charge
    const delivery =
        subtotal >= 499 ? 0 : 40;


    const total =
        subtotal + delivery;


    document.getElementById("cartSubtotal").textContent =
        "₹" + subtotal;


    document.getElementById("cartDelivery").textContent =
        delivery === 0 ? "FREE" : "₹" + delivery;


    document.getElementById("cartTotal").textContent =
        "₹" + total;

}


// ================================
// Update Cart Quantity
// ================================

function updateCartQuantity(index, change) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + change;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}


// ================================
// Remove From Cart
// ================================

function removeFromCart(index) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) {
        return;
    }


    cart.splice(index, 1);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    loadCart();

}


// ================================
// Checkout
// ================================

function loadCheckout() {

    const checkoutItems =
        document.getElementById("checkoutItems");


    if (!checkoutItems) {
        return;
    }


    // IMPORTANT:
    // Checkout now uses the SAME "cart" key.
    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p style="color:#777;">
                Your cart is empty.
            </p>
        `;


        document.getElementById("checkoutSubtotal").textContent =
            "₹0";

        document.getElementById("checkoutDelivery").textContent =
            "₹0";

        document.getElementById("checkoutTotal").textContent =
            "₹0";


        return;
    }


    let subtotal = 0;


    checkoutItems.innerHTML = "";


    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;

        const itemQuantity =
            Number(item.quantity) || 1;

        const itemTotal =
            price * itemQuantity;


        subtotal += itemTotal;


        checkoutItems.innerHTML += `

            <div class="checkout-item">

                <span class="checkout-item-name">
                    ${item.name} × ${itemQuantity}
                </span>

                <span class="checkout-item-price">
                    ₹${itemTotal}
                </span>

            </div>

        `;

    });


    const delivery =
        subtotal >= 499 ? 0 : 40;


    const total =
        subtotal + delivery;


    document.getElementById("checkoutSubtotal").textContent =
        "₹" + subtotal;


    document.getElementById("checkoutDelivery").textContent =
        delivery === 0 ? "FREE" : "₹" + delivery;


    document.getElementById("checkoutTotal").textContent =
        "₹" + total;

}


// ================================
// Place Order
// ================================

function placeOrder() {

    const name =
        document.getElementById("checkoutName").value.trim();

    const phone =
        document.getElementById("checkoutPhone").value.trim();

    const address =
        document.getElementById("checkoutAddress").value.trim();

    const city =
        document.getElementById("checkoutCity").value.trim();

    const pincode =
        document.getElementById("checkoutPincode").value.trim();


    const payment =
        document.querySelector(
            'input[name="payment"]:checked'
        );


    // Validation
    if (
        !name ||
        !phone ||
        !address ||
        !city ||
        !pincode
    ) {

        alert("Please fill in all delivery details.");

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        return;
    }


    if (!/^[0-9]{6}$/.test(pincode)) {

        alert("Please enter a valid 6-digit pincode.");

        return;
    }


    if (!payment) {

        alert("Please select a payment method.");

        return;
    }


    // SAME CART KEY
    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        alert("Your cart is empty.");

        window.location.href = "medicines.html";

        return;
    }


    // Calculate total
    let subtotal = 0;


    cart.forEach(function (item) {

        const price =
            Number(item.price) || 0;

        const itemQuantity =
            Number(item.quantity) || 1;

        subtotal +=
            price * itemQuantity;

    });


    const delivery =
        subtotal >= 499 ? 0 : 40;


    const total =
        subtotal + delivery;


    // Create order
    const order = {

        orderId:
            "ORD" + Date.now(),

        customerName:
            name,

        phone:
            phone,

        address:
            address,

        city:
            city,

        pincode:
            pincode,

        paymentMethod:
            payment.value,

        items:
            cart,

        subtotal:
            subtotal,

        delivery:
            delivery,

        total:
            total,

        orderDate:
            new Date().toLocaleString(),

        status:
            "Placed"

    };


    // Get existing orders
    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];


    orders.push(order);


    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    // Clear cart after successful order
    localStorage.removeItem("cart");


    alert(
        "Order placed successfully!\n\nOrder ID: " +
        order.orderId
    );


    window.location.href =
        "orders.html";

}


// ================================
// Orders Page
// ================================

function loadOrders() {

    const ordersList =
        document.getElementById("ordersList");

    const noOrders =
        document.getElementById("noOrders");


    if (!ordersList || !noOrders) {
        return;
    }


    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];


    if (orders.length === 0) {

        ordersList.innerHTML = "";

        noOrders.style.display = "block";

        return;
    }


    noOrders.style.display = "none";

    ordersList.innerHTML = "";


    // Show newest order first
    const displayOrders =
        [...orders].reverse();


    displayOrders.forEach(function (order) {

        let itemsHTML = "";


        order.items.forEach(function (item) {

            const price =
                Number(item.price) || 0;

            const itemQuantity =
                Number(item.quantity) || 1;

            const itemTotal =
                price * itemQuantity;


            itemsHTML += `

                <div class="order-item">

                    <span>
                        ${item.name} × ${itemQuantity}
                    </span>

                    <span class="order-item-price">
                        ₹${itemTotal}
                    </span>

                </div>

            `;

        });


        ordersList.innerHTML += `

            <div class="order-card">

                <div class="order-header">

                    <div>

                        <h3>
                            ${order.orderId}
                        </h3>

                        <p class="order-date">
                            ${order.orderDate}
                        </p>

                    </div>

                    <span class="order-status">
                        ${order.status}
                    </span>

                </div>


                <div class="order-items">

                    ${itemsHTML}

                </div>


                <div class="order-details">

                    <p class="order-address">

                        <strong>
                            Delivery Address:
                        </strong>
                        <br>

                        ${order.address},
                        ${order.city} -
                        ${order.pincode}

                    </p>


                    <p>

                        <strong>
                            Payment:
                        </strong>

                        ${
                            order.paymentMethod === "cod"
                            ? "Cash on Delivery"
                            : "UPI"
                        }

                    </p>


                    <div class="order-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ₹${order.total}
                    </strong>

                </div>

                ${order.status !== "Cancelled" ? `

                    <button
                        type="button"
                        class="cancel-order-btn"
                        onclick="cancelOrder('${order.orderId}')"
                    >
                        Cancel Order
                    </button>

                ` : ""}

                </div>

            </div>

        `;

    });

}

// =========================================
// CANCEL ORDER
// =========================================

function cancelOrder(orderId) {

    const confirmCancel = confirm(
        "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) {
        return;
    }


    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];


    const orderIndex =
        orders.findIndex(function (order) {

            return order.orderId === orderId;

        });


    if (orderIndex === -1) {

        alert("Order not found.");

        return;
    }


    // Change order status
    orders[orderIndex].status = "Cancelled";


    // Save updated orders
    localStorage.setItem(
        "orders",
        JSON.stringify(orders)
    );


    alert("Order cancelled successfully.");


    // Refresh orders page
    loadOrders();

}

// ================================
// Contact Form
// ================================

function submitContactForm() {

    const name =
        document.getElementById("contactName").value.trim();

    const email =
        document.getElementById("contactEmail").value.trim();

    const message =
        document.getElementById("contactMessage").value.trim();


    if (!name || !email || !message) {

        alert("Please fill in all fields.");

        return;
    }


    alert(
        "Thank you! Your message has been submitted."
    );


    document.getElementById("contactName").value = "";

    document.getElementById("contactEmail").value = "";

    document.getElementById("contactMessage").value = "";

}

// =========================================
// PROFILE
// =========================================

function loadProfile() {

    const profileName =
        document.getElementById("profileName");

    if (!profileName) {
        return;
    }

    const name =
        localStorage.getItem("userName") || "User";

    const email =
        localStorage.getItem("userEmail") || "Not available";

    const phone =
        localStorage.getItem("userPhone") || "Not available";


    profileName.textContent = name;

    document.getElementById("profileFullName").textContent =
        name;

    document.getElementById("profileEmail").textContent =
        email;

    document.getElementById("profilePhone").textContent =
        phone;
}


// =========================================
// LOGOUT
// =========================================

function logoutUser() {

    const confirmLogout =
        confirm("Are you sure you want to logout?");

    if (!confirmLogout) {
        return;
    }

    localStorage.removeItem("isLoggedIn");

    alert("You have been logged out.");

    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", function () {

    loadMedicineDetails();

    loadCart();

    loadCheckout();

    loadOrders();

    loadProfile();

});
// =========================================================
// SMART PHARMACY - MAIN JAVASCRIPT
// =========================================================


// =========================================================
// LOGIN ROLE SELECTION
// =========================================================

function selectLoginRole(role) {
    const roleSelection = document.getElementById("roleSelection");
    const userSection = document.getElementById("userLoginSection");
    const adminSection = document.getElementById("adminLoginSection");

    if (!roleSelection || !userSection || !adminSection) return;

    roleSelection.style.display = "none";

    if (role === "user") {
        userSection.style.display = "block";
        adminSection.style.display = "none";
    } else {
        adminSection.style.display = "block";
        userSection.style.display = "none";
    }
}

function backToRoleSelection() {
    const roleSelection = document.getElementById("roleSelection");
    const userSection = document.getElementById("userLoginSection");
    const adminSection = document.getElementById("adminLoginSection");

    if (!roleSelection || !userSection || !adminSection) return;

    roleSelection.style.display = "block";
    userSection.style.display = "none";
    adminSection.style.display = "none";
}

function toggleLoginPassword(id, button) {
    const input = document.getElementById(id);

    if (!input) return;

    if (input.type === "password") {
        input.type = "text";
        if (button) button.textContent = "🙈";
    } else {
        input.type = "password";
        if (button) button.textContent = "👁️";
    }
}


// =========================================================
// ADMIN AUTH
// =========================================================

function adminLogout() {
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminUsername");
    window.location.href = "../login.html";
}

function checkAdminAuth() {
    const path = window.location.pathname.toLowerCase();

    // Only protect pages inside /admin/
    if (!path.includes("/admin/")) return;

    if (localStorage.getItem("adminLoggedIn") !== "true") {
        window.location.href = "../login.html";
    }
}


// =========================================================
// INITIAL PRODUCTS
// =========================================================

const defaultAdminProducts = [
    {
        id: 1,
        name: "Paracetamol 500mg",
        category: "Medicines",
        price: 25,
        stock: 50,
        pack: "10 Tablets",
        description: "Used for temporary relief of fever and mild pain."
    },
    {
        id: 2,
        name: "Ibuprofen 400mg",
        category: "Medicines",
        price: 55,
        stock: 35,
        pack: "10 Tablets",
        description: "Used for temporary relief of pain and inflammation."
    },
    {
        id: 3,
        name: "Amoxicillin 500mg",
        category: "Medicines",
        price: 95,
        stock: 20,
        pack: "10 Capsules",
        description: "Prescription antibiotic used to treat certain bacterial infections."
    },
    {
        id: 4,
        name: "Vitamin C Tablets",
        category: "Vitamins & Supplements",
        price: 120,
        stock: 40,
        pack: "30 Tablets",
        description: "Vitamin C supplement for daily nutritional support."
    },
    {
        id: 5,
        name: "Multivitamin Tablets",
        category: "Vitamins & Supplements",
        price: 180,
        stock: 30,
        pack: "30 Tablets",
        description: "Daily multivitamin supplement."
    },
    {
        id: 6,
        name: "Calcium Tablets",
        category: "Vitamins & Supplements",
        price: 150,
        stock: 25,
        pack: "30 Tablets",
        description: "Calcium supplement for daily nutritional support."
    },
    {
        id: 7,
        name: "Adhesive Bandage",
        category: "First Aid",
        price: 40,
        stock: 60,
        pack: "10 Strips",
        description: "Adhesive strips for covering minor cuts and wounds."
    },
    {
        id: 8,
        name: "Cotton Roll",
        category: "First Aid",
        price: 60,
        stock: 45,
        pack: "100g",
        description: "Soft cotton roll suitable for basic first aid use."
    },
    {
        id: 9,
        name: "Antiseptic Liquid",
        category: "First Aid",
        price: 85,
        stock: 15,
        pack: "100ml",
        description: "Antiseptic solution for general first aid purposes."
    },
    {
        id: 10,
        name: "Handwash",
        category: "Personal Care",
        price: 90,
        stock: 50,
        pack: "250ml",
        description: "Liquid handwash for everyday hand hygiene."
    },
    {
        id: 11,
        name: "Hand Sanitizer",
        category: "Personal Care",
        price: 75,
        stock: 55,
        pack: "200ml",
        description: "Hand sanitizer for convenient hand hygiene."
    },
    {
        id: 12,
        name: "Moisturizing Lotion",
        category: "Personal Care",
        price: 160,
        stock: 20,
        pack: "200ml",
        description: "Moisturizing lotion for everyday skin care."
    },
    {
        id: 13,
        name: "Baby Diapers",
        category: "Baby Care",
        price: 220,
        stock: 30,
        pack: "10 Pieces",
        description: "Comfortable disposable diapers for babies."
    },
    {
        id: 14,
        name: "Baby Wipes",
        category: "Baby Care",
        price: 120,
        stock: 35,
        pack: "80 Wipes",
        description: "Gentle wipes suitable for baby care."
    },
    {
        id: 15,
        name: "Baby Lotion",
        category: "Baby Care",
        price: 150,
        stock: 18,
        pack: "200ml",
        description: "Gentle lotion for baby skin care."
    },
    {
        id: 16,
        name: "Digital Thermometer",
        category: "Medical Devices",
        price: 250,
        stock: 12,
        pack: "Digital",
        description: "Digital thermometer for temperature measurement."
    },
    {
        id: 17,
        name: "Digital BP Monitor",
        category: "Medical Devices",
        price: 1200,
        stock: 8,
        pack: "Automatic",
        description: "Automatic digital blood pressure monitor."
    },
    {
        id: 18,
        name: "Glucose Meter",
        category: "Medical Devices",
        price: 650,
        stock: 10,
        pack: "Digital",
        description: "Digital glucose monitoring device."
    },
    {
        id: 19,
        name: "Toothpaste",
        category: "Dental Care",
        price: 100,
        stock: 45,
        pack: "100g",
        description: "Everyday toothpaste for dental hygiene."
    },
    {
        id: 20,
        name: "Toothbrush",
        category: "Dental Care",
        price: 60,
        stock: 40,
        pack: "Soft Bristle",
        description: "Soft-bristle toothbrush for daily dental care."
    },
    {
        id: 21,
        name: "Mouthwash",
        category: "Dental Care",
        price: 140,
        stock: 25,
        pack: "250ml",
        description: "Mouthwash for daily oral hygiene."
    }
];


// =========================================================
// PRODUCT STORAGE
// =========================================================

function getAdminProducts() {
    let products = JSON.parse(localStorage.getItem("adminProducts"));

    if (!Array.isArray(products)) {
        products = defaultAdminProducts;
        localStorage.setItem("adminProducts", JSON.stringify(products));
    }

    return products;
}

function saveAdminProducts(products) {
    localStorage.setItem("adminProducts", JSON.stringify(products));
}


// =========================================================
// PRODUCT STATUS
// =========================================================

function getProductStatus(stock) {
    stock = Number(stock);

    if (stock <= 0) {
        return '<span class="admin-status status-out-stock">Out of Stock</span>';
    }

    if (stock <= 10) {
        return '<span class="admin-status status-low-stock">Low Stock</span>';
    }

    return '<span class="admin-status status-in-stock">In Stock</span>';
}


// =========================================================
// PRODUCTS
// =========================================================

function loadAdminProducts() {
    const table = document.getElementById("adminProductsTable");

    if (!table) return;

    const products = getAdminProducts();

    table.innerHTML = "";

    if (products.length === 0) {
        table.innerHTML =
            '<tr><td colspan="6" style="text-align:center;">No products found.</td></tr>';
        return;
    }

    products.forEach(product => {
        table.innerHTML += `
            <tr
                data-name="${product.name.toLowerCase()}"
                data-category="${product.category.toLowerCase()}"
            >
                <td>
                    <strong>${product.name}</strong><br>
                    <small>${product.pack}</small>
                </td>
                <td>${product.category}</td>
                <td>₹${Number(product.price).toFixed(2)}</td>
                <td>${product.stock}</td>
                <td>${getProductStatus(product.stock)}</td>
                <td>
                    <button
                        class="admin-btn admin-btn-small"
                        onclick="editAdminProduct(${product.id})">
                        Edit
                    </button>

                    <button
                        class="admin-btn admin-btn-small admin-btn-danger"
                        onclick="deleteAdminProduct(${product.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function filterAdminProducts() {
    const searchInput = document.getElementById("adminProductSearch");
    const categoryInput = document.getElementById("adminProductCategory");
    const table = document.getElementById("adminProductsTable");

    if (!table) return;

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const category = categoryInput
        ? categoryInput.value.toLowerCase()
        : "all";

    table.querySelectorAll("tr").forEach(row => {
        const name = row.dataset.name || "";
        const rowCategory = row.dataset.category || "";

        const searchMatch = name.includes(search);
        const categoryMatch =
            category === "all" || rowCategory === category;

        row.style.display =
            searchMatch && categoryMatch ? "" : "none";
    });
}

function openProductModal() {
    const modal = document.getElementById("productModal");

    if (!modal) return;

    const form = document.querySelector("#productModal form");
    const title = document.getElementById("productModalTitle");
    const editId = document.getElementById("editProductId");

    if (form) form.reset();
    if (title) title.textContent = "Add Product";
    if (editId) editId.value = "";

    modal.classList.add("show");
}

function closeProductModal() {
    const modal = document.getElementById("productModal");

    if (modal) {
        modal.classList.remove("show");
    }
}

function editAdminProduct(id) {
    const product = getAdminProducts().find(
        item => Number(item.id) === Number(id)
    );

    if (!product) return;

    document.getElementById("productModalTitle").textContent =
        "Edit Product";

    document.getElementById("editProductId").value = product.id;
    document.getElementById("productName").value = product.name;
    document.getElementById("productCategory").value = product.category;
    document.getElementById("productPrice").value = product.price;
    document.getElementById("productStock").value = product.stock;
    document.getElementById("productPack").value = product.pack;
    document.getElementById("productDescription").value =
        product.description;

    document.getElementById("productModal").classList.add("show");
}

function saveAdminProduct(event) {
    event.preventDefault();

    const id = document.getElementById("editProductId").value;
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = Number(document.getElementById("productPrice").value);
    const stock = Number(document.getElementById("productStock").value);
    const pack = document.getElementById("productPack").value.trim();
    const description =
        document.getElementById("productDescription").value.trim();

    if (!name || !category || price <= 0 || stock < 0 || !pack) {
        alert("Please fill all required product details.");
        return;
    }

    const products = getAdminProducts();

    if (id) {
        const index = products.findIndex(
            product => Number(product.id) === Number(id)
        );

        if (index !== -1) {
            products[index] = {
                ...products[index],
                name,
                category,
                price,
                stock,
                pack,
                description
            };
        }
    } else {
        products.push({
            id: Date.now(),
            name,
            category,
            price,
            stock,
            pack,
            description
        });
    }

    saveAdminProducts(products);
    closeProductModal();
    loadAdminProducts();
    loadAdminDashboard();

    alert(id
        ? "Product updated successfully."
        : "Product added successfully."
    );
}

function deleteAdminProduct(id) {
    const products = getAdminProducts();

    const product = products.find(
        item => Number(item.id) === Number(id)
    );

    if (!product) return;

    if (!confirm(`Are you sure you want to delete "${product.name}"?`)) {
        return;
    }

    saveAdminProducts(
        products.filter(
            item => Number(item.id) !== Number(id)
        )
    );

    loadAdminProducts();
    loadAdminDashboard();
}


// =========================================================
// ORDERS
// =========================================================

function getAdminOrders() {
    const orders = JSON.parse(localStorage.getItem("orders"));
    return Array.isArray(orders) ? orders : [];
}

function saveAdminOrders(orders) {
    localStorage.setItem("orders", JSON.stringify(orders));
}

function getOrderStatusOptions(currentStatus) {
    const statuses = [
        "Placed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ];

    return statuses.map(status => `
        <option value="${status}"
            ${status === currentStatus ? "selected" : ""}>
            ${status}
        </option>
    `).join("");
}

function loadAdminOrders() {
    const table = document.getElementById("adminOrdersTable");

    if (!table) return;

    const orders = getAdminOrders();

    table.innerHTML = "";

    if (orders.length === 0) {
        table.innerHTML =
            '<tr><td colspan="7" style="text-align:center;">No orders found.</td></tr>';
        return;
    }

    orders.slice().reverse().forEach(order => {
        table.innerHTML += `
            <tr
                data-order-id="${String(order.orderId).toLowerCase()}"
                data-customer="${String(order.customerName || "").toLowerCase()}"
                data-status="${String(order.status || "Placed").toLowerCase()}"
            >
                <td><strong>${order.orderId}</strong></td>
                <td>${order.customerName || "N/A"}</td>
                <td>${order.orderDate || "N/A"}</td>
                <td>
                    ${order.paymentMethod === "upi"
                        ? "UPI"
                        : "Cash on Delivery"}
                </td>
                <td>₹${Number(order.total || 0).toFixed(2)}</td>
                <td>
                    <select
                        class="admin-filter-select"
                        onchange="updateAdminOrderStatus('${order.orderId}', this.value)">
                        ${getOrderStatusOptions(order.status || "Placed")}
                    </select>
                </td>
                <td>
                    <button
                        class="admin-btn admin-btn-small"
                        onclick="viewAdminOrder('${order.orderId}')">
                        View
                    </button>
                </td>
            </tr>
        `;
    });
}

function updateAdminOrderStatus(orderId, newStatus) {
    const orders = getAdminOrders();

    const order = orders.find(
        item => item.orderId === orderId
    );

    if (!order) return;

    order.status = newStatus;

    saveAdminOrders(orders);
    loadAdminOrders();
    loadAdminDashboard();

    alert(`Order ${orderId} updated to ${newStatus}.`);
}

function filterAdminOrders() {
    const searchInput = document.getElementById("adminOrderSearch");
    const statusInput = document.getElementById("adminOrderStatus");
    const table = document.getElementById("adminOrdersTable");

    if (!table) return;

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    const status = statusInput
        ? statusInput.value.toLowerCase()
        : "all";

    table.querySelectorAll("tr").forEach(row => {
        const orderId = row.dataset.orderId || "";
        const customer = row.dataset.customer || "";
        const rowStatus = row.dataset.status || "";

        const searchMatch =
            orderId.includes(search) ||
            customer.includes(search);

        const statusMatch =
            status === "all" || rowStatus === status;

        row.style.display =
            searchMatch && statusMatch ? "" : "none";
    });
}

function viewAdminOrder(orderId) {
    const order = getAdminOrders().find(
        item => item.orderId === orderId
    );

    if (!order) return;

    const modal = document.getElementById("orderModal");
    const modalId = document.getElementById("orderModalId");
    const details = document.getElementById("adminOrderDetails");

    if (!modal || !details) return;

    if (modalId) {
        modalId.textContent = order.orderId;
    }

    const itemsHTML = Array.isArray(order.items)
        ? order.items.map(item => `
            <div class="admin-info-box">
                <strong>${item.name}</strong><br>
                Quantity: ${item.quantity || 1}<br>
                Price: ₹${Number(item.price || 0).toFixed(2)}
            </div>
        `).join("")
        : "";

    details.innerHTML = `
        <div class="admin-info-box">
            <strong>Customer</strong><br>
            ${order.customerName || "N/A"}<br>
            ${order.phone || "N/A"}
        </div>

        <div class="admin-info-box">
            <strong>Delivery Address</strong><br>
            ${order.address || "N/A"}<br>
            ${order.city || ""} - ${order.pincode || ""}
        </div>

        <div class="admin-info-box">
            <strong>Payment</strong><br>
            ${order.paymentMethod === "upi"
                ? "UPI"
                : "Cash on Delivery"}
        </div>

        <h3>Order Items</h3>

        ${itemsHTML}

        <div class="admin-info-box">
            <strong>
                Total: ₹${Number(order.total || 0).toFixed(2)}
            </strong>
        </div>
    `;

    modal.classList.add("show");
}

function closeOrderModal() {
    const modal = document.getElementById("orderModal");

    if (modal) {
        modal.classList.remove("show");
    }
}


// =========================================================
// USERS
// =========================================================

function getAdminUsers() {
    const users = JSON.parse(localStorage.getItem("users"));

    if (Array.isArray(users)) {
        return users;
    }

    const name = localStorage.getItem("userName");
    const email = localStorage.getItem("userEmail");
    const phone = localStorage.getItem("userPhone");

    if (name || email || phone) {
        return [{
            name: name || "N/A",
            email: email || "N/A",
            phone: phone || "N/A",
            city: localStorage.getItem("userCity") || "N/A",
            status: "Active"
        }];
    }

    return [];
}

function loadAdminUsers() {
    const table = document.getElementById("adminUsersTable");

    if (!table) return;

    const users = getAdminUsers();

    table.innerHTML = "";

    if (users.length === 0) {
        table.innerHTML =
            '<tr><td colspan="5" style="text-align:center;">No registered users found.</td></tr>';
        return;
    }

    users.forEach(user => {
        table.innerHTML += `
            <tr
                data-name="${String(user.name || "").toLowerCase()}"
                data-email="${String(user.email || "").toLowerCase()}"
            >
                <td>${user.name || "N/A"}</td>
                <td>${user.email || "N/A"}</td>
                <td>${user.phone || "N/A"}</td>
                <td>${user.city || "N/A"}</td>
                <td>
                    <span class="admin-status status-in-stock">
                        ${user.status || "Active"}
                    </span>
                </td>
            </tr>
        `;
    });
}

function filterAdminUsers() {
    const searchInput = document.getElementById("adminUserSearch");
    const table = document.getElementById("adminUsersTable");

    if (!table) return;

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    table.querySelectorAll("tr").forEach(row => {
        const name = row.dataset.name || "";
        const email = row.dataset.email || "";

        row.style.display =
            name.includes(search) || email.includes(search)
                ? ""
                : "none";
    });
}


// =========================================================
// CONTACT MESSAGES
// =========================================================

function getAdminMessages() {
    const messages =
        JSON.parse(localStorage.getItem("contactMessages"));

    return Array.isArray(messages) ? messages : [];
}

function saveAdminMessages(messages) {
    localStorage.setItem(
        "contactMessages",
        JSON.stringify(messages)
    );
}

function loadAdminMessages() {
    const table =
        document.getElementById("adminMessagesTable");

    if (!table) return;

    const messages = getAdminMessages();

    table.innerHTML = "";

    if (messages.length === 0) {
        table.innerHTML =
            '<tr><td colspan="6" style="text-align:center;">No messages found.</td></tr>';
        return;
    }

    messages.slice().reverse().forEach(message => {
        table.innerHTML += `
            <tr
                data-name="${String(message.name || "").toLowerCase()}"
                data-email="${String(message.email || "").toLowerCase()}"
            >
                <td>${message.name || "N/A"}</td>
                <td>${message.email || "N/A"}</td>
                <td>${message.message || ""}</td>
                <td>${message.date || "N/A"}</td>
                <td>
                    <span class="admin-status status-in-stock">
                        ${message.status || "Unread"}
                    </span>
                </td>
                <td>
                    <button
                        class="admin-btn admin-btn-small"
                        onclick="markAdminMessageRead(${message.id})">
                        Mark Read
                    </button>

                    <button
                        class="admin-btn admin-btn-small admin-btn-danger"
                        onclick="deleteAdminMessage(${message.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}

function filterAdminMessages() {
    const searchInput =
        document.getElementById("adminMessageSearch");

    const table =
        document.getElementById("adminMessagesTable");

    if (!table) return;

    const search = searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";

    table.querySelectorAll("tr").forEach(row => {
        const name = row.dataset.name || "";
        const email = row.dataset.email || "";

        row.style.display =
            name.includes(search) || email.includes(search)
                ? ""
                : "none";
    });
}

function markAdminMessageRead(id) {
    const messages = getAdminMessages();

    const message = messages.find(
        item => Number(item.id) === Number(id)
    );

    if (!message) return;

    message.status = "Read";

    saveAdminMessages(messages);
    loadAdminMessages();
}

function deleteAdminMessage(id) {
    if (!confirm("Are you sure you want to delete this message?")) {
        return;
    }

    const messages = getAdminMessages();

    saveAdminMessages(
        messages.filter(
            item => Number(item.id) !== Number(id)
        )
    );

    loadAdminMessages();
}


// =========================================================
// DASHBOARD
// =========================================================

function loadAdminDashboard() {
    const products = getAdminProducts();
    const orders = getAdminOrders();
    const users = getAdminUsers();

    const totalProducts =
        document.getElementById("totalProducts");

    const totalOrders =
        document.getElementById("totalOrders");

    const totalUsers =
        document.getElementById("totalUsers");

    const totalRevenue =
        document.getElementById("totalRevenue");

    if (totalProducts) {
        totalProducts.textContent = products.length;
    }

    if (totalOrders) {
        totalOrders.textContent = orders.length;
    }

    if (totalUsers) {
        totalUsers.textContent = users.length;
    }

    const revenue = orders
        .filter(order => order.status !== "Cancelled")
        .reduce(
            (sum, order) => sum + Number(order.total || 0),
            0
        );

    if (totalRevenue) {
        totalRevenue.textContent =
            `₹${revenue.toFixed(2)}`;
    }

    loadRecentOrders();
    loadLowStockProducts();
}

function loadRecentOrders() {
    const container =
        document.getElementById("dashboardRecentOrders");

    if (!container) return;

    const orders = getAdminOrders();

    if (orders.length === 0) {
        container.innerHTML =
            '<p style="color:#777;">No orders available.</p>';
        return;
    }

    container.innerHTML = orders
        .slice()
        .reverse()
        .slice(0, 5)
        .map(order => `
            <div class="admin-info-box">
                <strong>${order.orderId}</strong><br>
                ${order.customerName || "Customer"}<br>
                ₹${Number(order.total || 0).toFixed(2)}<br>
                <small>${order.status || "Placed"}</small>
            </div>
        `)
        .join("");
}

function loadLowStockProducts() {
    const container =
        document.getElementById("dashboardLowStock");

    if (!container) return;

    const lowStock = getAdminProducts().filter(
        product => Number(product.stock) <= 10
    );

    if (lowStock.length === 0) {
        container.innerHTML =
            '<p style="color:#777;">No low-stock products.</p>';
        return;
    }

    container.innerHTML = lowStock
        .map(product => `
            <div class="admin-info-box">
                <strong>${product.name}</strong><br>
                Stock: ${product.stock}
            </div>
        `)
        .join("");
}


// =========================================================
// USER REGISTRATION
// =========================================================

document.addEventListener("DOMContentLoaded", function () {

    const registerForm =
        document.getElementById("registerForm");

    if (registerForm) {

        registerForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const password =
                document.getElementById("password").value;

            const confirmPassword =
                document.getElementById("confirmPassword").value;

            const terms =
                document.getElementById("terms").checked;

            if (!name || !email || !phone ||
                !password || !confirmPassword) {
                alert("Please fill in all fields.");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            if (!/^[0-9]{10}$/.test(phone)) {
                alert("Please enter a valid 10-digit phone number.");
                return;
            }

            if (password.length < 6) {
                alert("Password must contain at least 6 characters.");
                return;
            }

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            if (!terms) {
                alert("Please accept the Terms & Conditions.");
                return;
            }

            let users =
                JSON.parse(localStorage.getItem("users")) || [];

            const existingUser = users.find(
                user =>
                    user.email &&
                    user.email.toLowerCase() === email.toLowerCase()
            );

            if (existingUser) {
                alert("An account with this email already exists.");
                return;
            }

            localStorage.setItem("userName", name);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userPhone", phone);
            localStorage.setItem("userPassword", password);

            users.push({
                id: Date.now(),
                name: name,
                email: email,
                phone: phone,
                city: "N/A",
                status: "Active"
            });

            localStorage.setItem(
                "users",
                JSON.stringify(users)
            );

            alert("Registration successful! Please login.");

            window.location.href = "login.html";
        });
    }


    // =====================================================
    // USER LOGIN
    // =====================================================

    const userLoginForm =
        document.getElementById("userLoginForm");

    if (userLoginForm) {

        userLoginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const login =
                document.getElementById("userLoginEmail").value.trim();

            const password =
                document.getElementById("userLoginPassword").value;

            const email =
                localStorage.getItem("userEmail");

            const phone =
                localStorage.getItem("userPhone");

            const savedPassword =
                localStorage.getItem("userPassword");

            if (
                (email && login.toLowerCase() === email.toLowerCase()) ||
                (phone && login === phone)
            ) {
                if (password === savedPassword) {

                    localStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );

                    window.location.href = "index.html";
                    return;
                }
            }

            alert("Invalid email/phone or password.");
        });
    }


    // =====================================================
    // ADMIN LOGIN
    // =====================================================

    const adminLoginForm =
        document.getElementById("adminLoginForm");

    if (adminLoginForm) {

        adminLoginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const email =
                document.getElementById("adminLoginEmail").value.trim();

            const password =
                document.getElementById("adminLoginPassword").value;

            if (
                email.toLowerCase() ===
                "admin@smartpharmacy.com" &&
                password === "admin123"
            ) {

                localStorage.setItem(
                    "adminLoggedIn",
                    "true"
                );

                localStorage.setItem(
                    "adminUsername",
                    "admin"
                );

                window.location.href =
                    "admin/dashboard.html";

            } else {

                alert("Invalid admin email or password.");

            }
        });
    }


    // =====================================================
    // ADMIN PAGES
    // =====================================================

    checkAdminAuth();

    loadAdminProducts();
    loadAdminOrders();
    loadAdminUsers();
    loadAdminMessages();
    loadAdminDashboard();

});