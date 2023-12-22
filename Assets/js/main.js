var prodName = document.getElementById("pname");
var prodPrice = document.getElementById("pprice");
var prodCategory = document.getElementById("pcategory");
var prodDesc = document.getElementById("pdesc");
var addProductBtn = document.querySelector("#addproduct");
var updateProductBtn = document.getElementById("updateproduct");
var iconremove = document.getElementsByClassName("form-control");
var productList = [];
var productListName = "productList";
if (localStorage.getItem(productListName) == null) {
    productList = [];

} else {
    productList = JSON.parse(localStorage.getItem(productListName))
    displayProduct(productList)
}

addProductBtn.addEventListener("click", function () {
    addProduct();
})
function addProduct() {
    if (validName() == true && validPrice() == true && validCategory() == true && validDesc() == true) {
        product =
        {
            name: prodName.value,
            price: prodPrice.value,
            category: prodCategory.value,
            desc: prodDesc.value,
        }

        productList.push(product);
        displayProduct(productList);
        localStorage.setItem(productListName, JSON.stringify(productList));
        clear();

    }
}

function displayProduct(list) {
    var blackBox = [];

    for (var i = 0; i < list.length; i++) {
        blackBox += `
        <tr>
            <td>${i + 1}</td>
            <td>${list[i].Newname ? list[i].Newname : list[i].name}</td>
            <td>${list[i].price}</td>
            <td>${list[i].category}</td>
            <td>${list[i].desc}</td>
            <td><button class="btn btn-success" onclick="editProduct(${i})">Edit</button></td>
            <td><button onclick="DelProduct(${i})" class="btn btn-danger">Delete</button></td>
        </tr>`;
    }

    document.getElementById("products").innerHTML = blackBox;
};
function DelProduct(index) {
    productList.splice(index, 1);
    localStorage.setItem(productListName, JSON.stringify(productList));
    displayProduct(productList);
}

function searchByName(term) {
    var foundedItems = [];
    for (var i = 0; i < productList.length; i++) {
        if (productList[i].name.toLowerCase().includes(term.toLowerCase()) == true) {
            productList[i].Newname = productList[i].name.toLowerCase().replace(term.toLowerCase(), `<span class="text-danger">${term}</span>`);
            foundedItems.push(productList[i])
        }
    }
    displayProduct(foundedItems);
};
function editProduct(x) {
    addProductBtn.classList.add("d-none");
    updateProductBtn.classList.replace("d-none", "d-block");

    // prodName.value = productList[x].name;
    // prodPrice.value = productList[x].price;
    // prodCategory.value = productList[x].category;
    // prodDesc.value = productList[x].desc;
    clear(productList[x]);
}
function clear(y) {
    prodName.value = y ? y.name : "";
    prodPrice.value = y ? y.price : "";
    prodCategory.value = y ? y.category : "";
    prodDesc.value = y ? y.desc : "";
    // iconremove.classList.replace("is-valid", "hide");
}
function updateValues(i) {
    if (validName() == true && validPrice() == true && validCategory() == true && validDesc() == true) {
        product =
        {
            name: prodName.value,
            price: prodPrice.value,
            category: prodCategory.value,
            desc: prodDesc.value,
        };
        productList.splice(i, 1, product);
        displayProduct(productList);
        localStorage.setItem(productListName, JSON.stringify(productList));
        clear();
        addProductBtn.classList.replace("d-none", "d-block");
        updateProductBtn.classList.replace("d-block", "d-none");

    }
}

prodName.addEventListener("input", function () {
    validName();
})
function validName() {
    var regexName = /^[A-Z][\w\s]{3,}$/;
    if (regexName.test(prodName.value) == true) {
        document.querySelector("#pname").classList.add("is-valid");
        document.querySelector("#pname").classList.remove("is-invalid");
        document.getElementById("invalidname").classList.add("d-none");
        prodName.style.borderColor = "var(--bs-border-color)";
        return true
    }
    else {
        prodName.style.border = "1px solid red";
        document.querySelector("#pname").classList.remove("is-valid");
        document.querySelector("#pname").classList.add("is-invalid");
        document.getElementById("invalidname").classList.remove("d-none");
        return false;
    }
}
prodPrice.addEventListener("input", function () {
    validPrice()
})

function validPrice() {
    var regexPrice = /^([1-9][0-9]{3}|10000)$/;
    if (regexPrice.test(prodPrice.value) == true) {
        document.querySelector("#pprice").classList.add("is-valid");
        document.querySelector("#pprice").classList.remove("is-invalid");
        document.getElementById("invalidprice").classList.add("d-none");
        prodPrice.style.borderColor = "var(--bs-border-color)";
        return true
    }
    else {
        prodPrice.style.border = "1px solid red";
        document.querySelector("#pprice").classList.remove("is-valid");
        document.querySelector("#pprice").classList.add("is-invalid");
        document.getElementById("invalidprice").classList.remove("d-none");
        return false;
    }
}
prodCategory.addEventListener("input", function () {
    validCategory();
})
function validCategory() {
    var regexCategory = /^(watch|mobile|screen)$/gi;
    if (regexCategory.test(prodCategory.value) == true) {
        document.querySelector("#pcategory").classList.add("is-valid");
        document.querySelector("#pcategory").classList.remove("is-invalid");
        document.getElementById("invalidcategory").classList.add("d-none");
        prodCategory.style.borderColor = "var(--bs-border-color)";
        return true
    }
    else {
        prodCategory.style.border = "1px solid red";
        document.querySelector("#pcategory").classList.remove("is-valid");
        document.querySelector("#pcategory").classList.add("is-invalid");
        document.getElementById("invalidcategory").classList.remove("d-none");
        return false;
    }
}
prodDesc.addEventListener("input", function () {
    validDesc();
})
function validDesc() {
    var regexDesc = /^[\w]{0,250}$/gmi;
    if (regexDesc.test(prodDesc.value) == true) {
        document.querySelector("#pdesc").classList.add("is-valid");
        document.querySelector("#pdesc").classList.remove("is-invalid");
        document.getElementById("invaliddesc").classList.add("d-none");
        prodDesc.style.borderColor = "var(--bs-border-color)";
        return true
    }
    else {
        prodDesc.style.border = "1px solid red";
        document.querySelector("#pdesc").classList.remove("is-valid");
        document.querySelector("#pdesc").classList.add("is-invalid");
        document.getElementById("invaliddesc").classList.replace("d-none", "d-block");
        return false;
    }
}



/* pcategory pdesc*/