//JAVASCCRIPT  file for the guitar appilcation






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




//function to change the image to the previous image
function prevImage(xhttp) {
    var imageSource = document.getElementById("guitarImage").getAttribute('src');

    var JSONRes = JSON.parse(xhttp.responseText);
    var imagePath = [];
    for (var i = 0; i < JSONRes.allProducts.length; i++) {
        imagePath.push(JSONRes.allProducts[i].image_path);
    }
    var index = imagePath.indexOf(imageSource);
    if (index == 0) {
        document.getElementById("guitarImage").src = imagePath[6];
        console.log(imagePath[6]);
        document.getElementById("productDetails").innerHTML = JSONRes.allProducts[6].product_description;
        document.getElementById("shippingDetails").innerHTML = JSONRes.allProducts[6].shipping_details;
        document.getElementById("custReview").innerHTML = JSONRes.allProducts[6].customer_reviews;
        localStorage.setItem("src",imagePath[6]);
    } else {
        document.getElementById("guitarImage").src = imagePath[index - 1];
        console.log(imagePath[index - 1]);
        document.getElementById("productDetails").innerHTML = JSONRes.allProducts[index - 1].product_description;
        document.getElementById("shippingDetails").innerHTML = JSONRes.allProducts[index - 1].shipping_details;
        document.getElementById("custReview").innerHTML = JSONRes.allProducts[index - 1].customer_reviews;
        localStorage.setItem("src",imagePath[index - 1]);
    }

}

//function to change image to the next image.
function nextImage(xhttp) {
    var imageSource = document.getElementById("guitarImage").getAttribute('src');

    var JSONRes = JSON.parse(xhttp.responseText);
    var imagePath = [];
    for (var i = 0; i < JSONRes.allProducts.length; i++) {
        imagePath.push(JSONRes.allProducts[i].image_path);
    }
    var index = imagePath.indexOf(imageSource);
    if (index == 6) {
        document.getElementById("guitarImage").src = imagePath[0];
        console.log(imagePath[6]);
        document.getElementById("productDetails").innerHTML = JSONRes.allProducts[0].product_description;
        document.getElementById("shippingDetails").innerHTML = JSONRes.allProducts[0].shipping_details;
        document.getElementById("custReview").innerHTML = JSONRes.allProducts[0].customer_reviews;
        localStorage.setItem("src",imagePath[0]);
    } else {
        document.getElementById("guitarImage").src = imagePath[index + 1];
        console.log(imagePath[index + 1]);
        document.getElementById("productDetails").innerHTML = JSONRes.allProducts[index + 1].product_description;
        document.getElementById("shippingDetails").innerHTML = JSONRes.allProducts[index + 1].shipping_details;
        document.getElementById("custReview").innerHTML = JSONRes.allProducts[index + 1].customer_reviews;
        localStorage.setItem("src",imagePath[index + 1]);
    }


}
if(localStorage.getItem("src") == null){
    localStorage.setItem("src","images/product1.jpg");
}else{
    loadData('json/guitardata.json',loadDataFromStorage);
}


function loadDataFromStorage(xhttp){

   var source = localStorage.getItem("src");
    var JSONRes = JSON.parse(xhttp.responseText);
    var imagePath = [];
    for (var i = 0; i < JSONRes.allProducts.length; i++) {
        imagePath.push(JSONRes.allProducts[i].image_path);
    }
    var index = imagePath.indexOf(source);

    document.getElementById("guitarImage").src = imagePath[index];

    document.getElementById("productDetails").innerHTML = JSONRes.allProducts[index].product_description;
    document.getElementById("shippingDetails").innerHTML = JSONRes.allProducts[index].shipping_details;
    document.getElementById("custReview").innerHTML = JSONRes.allProducts[index].customer_reviews;

}


document.getElementById("orderpage").onclick = function(){
    alert("Your are about to navigate to the order page without selecting the guitar");
}

document.getElementById("confirmationpage").onclick = function(){
    alert("Your are about to navigate to the confirmation page without selecting the guitar");
}