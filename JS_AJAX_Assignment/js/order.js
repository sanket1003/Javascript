//function to get the information from the index.html page

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


function getIndexInfo(xhttp) {
    var source = localStorage.getItem("src");
    console.log("source found " + source);
    var JSONRes = JSON.parse(xhttp.responseText);
    var imagePath = [];
    for (var i = 0; i < JSONRes.allProducts.length; i++) {
        imagePath.push(JSONRes.allProducts[i].image_path);
    }
    var index = imagePath.indexOf(source);
    console.log(index);
    var available;
    if (JSONRes.allProducts[index].stock_availability === "true") {
        available = "In Stock";
        document.getElementById("orderAvailability").innerHTML = available;
        document.getElementById("orderPiece").innerHTML = "(" + JSONRes.allProducts[index].no_of_items + " piece available)";
    } else {
        available = "Out Of Stock";
        document.getElementById("orderAvailability").innerHTML = available;
        document.getElementById("orderAvailability").style.color = "red";
        document.getElementById("orderPiece").style.display = "none";

    }
  
   
    
    document.getElementById("orderImage").src = imagePath[index];
    document.getElementById("orderProductInfo").innerHTML = JSONRes.allProducts[index].product_description;
    document.getElementById("orderPrice").innerHTML = JSONRes.allProducts[index].price;

    document.getElementById("orderShippingDetails").innerHTML = JSONRes.allProducts[index].shipping_details;
    document.getElementById("orderCustomerReview").innerHTML = JSONRes.allProducts[index].customer_reviews;

}

loadData('json/guitardata.json', getIndexInfo);

//function to edit the purchase information
document.getElementById("editbutton").onclick = editInfo;

function editInfo() {

    document.getElementById("form").style.display = "block";
    document.getElementById("preview").style.display = "none";

    var editFname = document.getElementById("previewfname").innerHTML;
    var editLname = document.getElementById("previewlname").innerHTML;
    var editEmail = document.getElementById("previewemail").innerHTML;
    var editPhone = document.getElementById("previewphone").innerHTML;
    var editAddress = document.getElementById("previewaddress").innerHTML;
    var editCc = document.getElementById("previewcard").innerHTML;
    var editExpdate = document.getElementById("previewdate").innerHTML;
    var editCvv = document.getElementById("previewcvv").innerHTML;

    var add = editAddress.split(",");
    console.log(add);

    document.getElementById("fname").value = editFname;
    document.getElementById("lname").value = editLname;
    document.getElementById("email").value = editEmail;
    document.getElementById("phnumber").value = editPhone;
    document.getElementById("address").value = add[0].trim();
    document.getElementById("city").value = add[1].trim();
    document.getElementById("state").value = add[2].trim();
    document.getElementById("zip").value = add[3].trim();
    document.getElementById("cc").value = editCc;
    document.getElementById("expdate").value = editExpdate;
    document.getElementById("cvv").value = editCvv;


}




//function to review  purchase information in the order page
document.getElementById("review").onclick = reviewPurchase;

function reviewPurchase() {


    var fname = document.getElementById("fname").value;
    var lname = document.getElementById("lname").value;
    var email = document.getElementById("email").value;
    var phnumber = document.getElementById("phnumber").value;
    var add = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var zip = document.getElementById("zip").value;
    var cc = document.getElementById("cc").value;
    var expdate = document.getElementById("expdate").value;
    var cvv = document.getElementById("cvv").value;

    if (fname == "" || lname == "" || email == "" || phnumber == "" || add == "" || city == ""
        || state == "" || zip == "" || cc == "" || expdate == "" || cvv == "") {
        alert("Please enter required field");
    } else {

        document.getElementById("previewfname").innerHTML = fname;
        document.getElementById("previewlname").innerHTML = lname;
        document.getElementById("previewemail").innerHTML = email;
        document.getElementById("previewphone").innerHTML = phnumber;
        document.getElementById("previewaddress").innerHTML = add + ", " + city + ", " + state + ", " + zip;
        document.getElementById("previewcard").innerHTML = cc;
        document.getElementById("previewdate").innerHTML = expdate;
        document.getElementById("previewcvv").innerHTML = cvv;

        document.getElementById("form").style.display = "none";
        document.getElementById("preview").style.display = "block";
    }

}


//function to buy guitar  in the order page
document.getElementById("buyGuitar").onclick = buyGuitar;
function buyGuitar() {
    var buyerFname = document.getElementById("previewfname").innerHTML;
    var buyerLname = document.getElementById("previewlname").innerHTML;
    var buyerEmail = document.getElementById("previewemail").innerHTML;
    var buyerPhone = document.getElementById("previewphone").innerHTML;
    var buyerAddress = document.getElementById("previewaddress").innerHTML;
    console.log("name" + buyerFname);
  
    var order_details = {
        "fname": buyerFname,
        "lName": buyerLname,
        "email": buyerEmail,
        "phone": buyerPhone,
        "address": buyerAddress,
    }

    localStorage.setItem("order_details",JSON.stringify(order_details));
    location.href = "confirmation.html";
}

document.getElementById("indexpage").onclick = function(){
    alert("Your are about to navigate to the home page");
}

document.getElementById("confirmationpage").onclick = function(){
    alert("Your are about to navigate to the confirmation page without selecting the guitar");
}