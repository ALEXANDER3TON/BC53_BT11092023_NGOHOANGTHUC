function checkEmpty(value, idErr, message) {
  if (value.trim() === "") {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  } else {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  };
};

function checkEmail(value, idErr, message) {
  const reMail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  var email = reMail.test(value);
  if (email) {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  };
};

function checkPass(value, idErr, message) {
  const rePass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$/;
  var testPass = rePass.test(value);
  if (testPass) {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  };
};

function checkDuplicate(value, ds, idErr, message) {
  var index = ds.findIndex(function (nv) {
    return nv.account == value;
  });

  if (index != -1) {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  } else {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  };
};

function checkString(value, idErr, message) {
  const reString =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/g;

  var testString = reString.test(value);
  if (testString) {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  };
};

function checkLimit(value, min, max, idErr, message) {
  if (value >= min && value <= max) {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  };
};
function checkAcount(value, min, max, idErr, message) {
  var length = value.length;
  if (length >= min && length <= max) {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  };
};

function checkNumber(value, idErr, message) {
  const reNumber = /^[0-9]+$/;
  var checkNum = reNumber.test(value);
  if (checkNum) {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  };
};

function checkEmptyNum(value, idErr, message){
  if(value == 0){
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  } else {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  }
}

function checkDate(value, idErr, message){
  const reDate = /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;

  var date = reDate.test(value);
  if(date){
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  } else {
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  };
};

function checkOption(value, idErr, message){
  
  if(value === "Chọn chức vụ"){
    getEle(idErr).innerHTML = message;
    getEle(idErr).style.display = "block";
    return false;
  } else {
    getEle(idErr).innerHTML = "";
    getEle(idErr).style.display = "none";
    return true;
  }
}
