
var config = {
	  apiKey: "AIzaSyDcKPDYBjWpmnB3HO2k30mTcicxoTkty0I",
	  authDomain: "sakpha-793a9.firebaseapp.com",
	  databaseURL: "https://sakpha-793a9.firebaseio.com",
	  projectId: "sakpha-793a9",
	  storageBucket: "sakpha-793a9.appspot.com",
	  messagingSenderId: "654158830966"
	};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();
var orderRef = firebase.database().ref('orders');

// --- CLICKED on button's ID: confirmOrderBtn ---
$("#confirmOrderBtn").click(function(e) {

	var currentDate = new Date();

	var dateStamp = Math.floor(Date.now());
	var date = currentDate.getDate();
	var month = currentDate.getMonth(); //Be careful! January is 0 not 1
	var year = currentDate.getFullYear();
	var hour = currentDate.getHours();
	var minute = currentDate.getMinutes(); //Be careful! January is 0 not 1
	var second = currentDate.getSeconds();

	//var utcDate = new Date(Date.UTC(year, month, date-1, hour-7, minute, second));
	var dateString = date + "-" +(month + 1) + "-" + year;
	var timeString = hour + ":" +(minute)+ ":" + second;

	var customerID = $("#customerID").val();
	var tagID = $("#tagID").val();


	//alert(dateString);

	if(customerID == ""){
		alert("โปรดระบุเบอร์โทรศัพท์ของ ลูกค้า");
		return;
	}else if(!parseInt(customerID)){
		alert("โปรดระบุเบอร์โทรศัพท์ด้วย 0-9");
		return;
	}else if(tagID == ""){
		alert("แสกน Tag ไม่สำเร็จ");
		return;
	}

	var orderData = {
		price: 0,
		date: dateString,
    	time: timeString,
  	};

  	var orderDetail = {
  		total: 0
  	};

  	// Write the new post's data simultaneously in the posts list and the user's post list.
  	var updateOrderData = {};
  	var updateOrderDetail = {};

  	updateOrderData['/orders/' + customerID + '/' + tagID] = orderData;
  	firebase.database().ref().update(updateOrderData);

 	updateOrderDetail['/orders/' + customerID + '/' + tagID + '/detail'] = orderDetail;
 	firebase.database().ref().update(updateOrderDetail);
  

    alert( "Success" );
  	location.href = "shop-order-take-success.html";
});

// Call UID of user
/**
firebase.auth().onAuthStateChanged(function(user) {
 	alert(user.uid);
});



orderRef.on('child_added', function(data) {
  alert(data.key);
  alert(data.val());
});

orderRef.on('child_changed', function(data) {
  alert(data.val());
});
*/