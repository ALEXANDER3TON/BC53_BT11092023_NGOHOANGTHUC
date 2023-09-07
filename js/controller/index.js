function getEle(selector) {
  return document.querySelector(selector);
}

function resetForm() {
  getEle("#tknv").value.disabled = false;
  getEle("#name").value = "";
  getEle("#email").value = "";
  getEle("#password").value = "";
  getEle("#datepicker").value = "";
  getEle("#luongCB").value = "";
  getEle("#chucvu").value = "";
  getEle("#gioLam").value = "";
}

function renderTable(arrList) {
  var htmlString = "";
  if (arrList.length == 0) {
    return htmlString;
  } else {
    for (var i = 0; i < arrList.length; i++) {
      var nhanVien = arrList[i];
      htmlString += `<tr>
          <td>${nhanVien.account}</td>
          <td>${nhanVien.name}</td>
          <td>${nhanVien.mail}</td>
          <td>${nhanVien.workDay}</td>
          <td>${nhanVien.regency}</td>
          <td>${nhanVien.totalSalary()}</td>
          <td>${nhanVien.employRank()}</td>
          <td>
          <div class="d-flex">
          <button class='btn btn-warning' data-toggle="modal" data-target="#myModal"onclick="editEmploy('${
            nhanVien.account
          }')" > Edit </button>
          <button class='btn btn-danger'onclick="deletEmploy('${
            nhanVien.account
          }')"> Delete </button>
          </div>
          </td>
          </tr>`;
  
      getEle("#tableDanhSach").innerHTML = htmlString;
    }
  }
  
}

getEle("#btnThemNV").onclick = function inputEmploy() {
  var account = getEle("#tknv").value;
  var name = getEle("#name").value;
  var mail = getEle("#email").value;
  var pass = getEle("#password").value;
  var workDay = getEle("#datepicker").value;
  var basicSalary = +getEle("#luongCB").value;
  var regency = getEle("#chucvu").value;
  var workHour = +getEle("#gioLam").value;

  var nv = new nhanvien(
    account,
    name,
    mail,
    pass,
    workDay,
    basicSalary,
    regency,
    workHour
  );

  console.log(nv);

  var valid = true;

  if (valid) {
    dsnv._addEmploy(nv);
    console.log(dsnv.employ);
    var data = JSON.stringify(dsnv.employ);
    localStorage.setItem("DSNV", data);
    console.log(dsnv.employ);
    renderTable(dsnv.employ);
  }
};

var dsnv = new DSNV();
var dataJson = localStorage.getItem("DSNV");
console.log(dataJson);
if (dataJson !== null) {
  dsnv.employ = JSON.parse(dataJson);

  for (var i = 0; i < dsnv.employ.length; i++) {
    dsnv.employ = JSON.parse(dataJson).map(function (item) {
      return new nhanvien(
        item.account,
        item.name,
        item.mail,
        item.pass,
        item.workDay,
        item.basicSalary,
        item.regency,
        item.workHour
      );
    });
  }
  console.log(dsnv.employ);
  renderTable(dsnv.employ);
}

function editEmploy(account) {
  var nv = dsnv._fillInfo(account);
  console.log(nv);
  if (nv) {
    getEle("#tknv").disabled = true;
    getEle("#name").value = nv.name;
    getEle("#email").value = nv.mail;
    getEle("#password").value = nv.pass;
    getEle("#datepicker").value = nv.workDay;
    getEle("#luongCB").value = nv.basicSalary;
    getEle("#chucvu").value = nv.regency;
    getEle("#gioLam").value = nv.workHour;
  }
}

getEle("#btnCapNhat").onclick = function updateEmploy(account) {
  var account = getEle("#tknv").value;
  var name = getEle("#name").value;
  var mail = getEle("#email").value;
  var pass = getEle("#password").value;
  var workDay = getEle("#datepicker").value;
  var basicSalary = +getEle("#luongCB").value;
  var regency = getEle("#chucvu").value;
  var workHour = +getEle("#gioLam").value;

  var nv = new nhanvien(
    account,
    name,
    mail,
    pass,
    workDay,
    basicSalary,
    regency,
    workHour
  );

  dsnv._update(nv);
  renderTable(dsnv.employ);
  resetForm();
  console.log(nv);
};

function deletEmploy(account) {
  dsnv._delete(account);
  data = JSON.stringify(dsnv.employ);
  renderTable(dsnv.employ);
  localStorage.setItem("DSNV", data);
}

getEle("#btnTimNV").onclick = function findRankEmploy(rank) {
  dsnv._access(rank);
  renderTable(dsnv.employ);
};
