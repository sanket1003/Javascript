


function loadData(url, changeImage) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            changeImage(this);
        }

    };
    xhttp.open('GET', url, true);
    xhttp.send();
}

// fucntion  to show the confirmation details of the order

function confirmation(xhttp){
    var source = localStorage.getItem("src");
    var JSONRes = JSON.parse(xhttp.responseText);
    var imagePath = [];
    for (var i = 0; i < JSONRes.allProducts.length; i++) {
        imagePath.push(JSONRes.allProducts[i].image_path);
    }
    var index = imagePath.indexOf(source);

    var buyerOrderId = Math.floor((Math.random() * 10000000000) + 1);
    var guitarPrice = parseInt((JSONRes.allProducts[index].price).slice(1));
    var shipPrice = parseInt((JSONRes.allProducts[index].shipping_details).slice(-2));
    var buyerPrice = guitarPrice + shipPrice;

    var order_object = JSON.parse(localStorage.getItem("order_details"));

    document.getElementById("confirmationImage").src = imagePath[index];
    document.getElementById("confirmationName").innerHTML = order_object.fname + " " + order_object.lName;
    document.getElementById("confirmationEmail").innerHTML = order_object.email;
    document.getElementById("confirmationPhone").innerHTML = order_object.phone;
    document.getElementById("confirmationID").innerHTML = "#" + buyerOrderId;
    document.getElementById("confirmationAddress").innerHTML = order_object.address;
    document.getElementById("confirmationPrice").innerHTML = "$"+buyerPrice;

    



}

loadData('json/guitardata.json',confirmation);


document.getElementById("gotohome").onclick = function(){

    localStorage.clear();
    localStorage.reload();

}

document.getElementById("orderpage").onclick = function(){
    alert("Your are about to navigate to the order page");
}

document.getElementById("indexpage").onclick = function(){
    alert("Your are about to navigate to the home page");
}