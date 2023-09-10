function getEle(selector) {
  return document.querySelector(selector);
}

function inputEmploy() {
  var account = getEle("#tknv").value;
  var name = getEle("#name").value;
  var mail = getEle("#email").value;
  var pass = getEle("#password").value;
  var workDay = getEle("#datepicker").value;
  var basicSalary = +getEle("#luongCB").value;
  var regency = getEle("#chucvu").value;
  var workHour = +getEle("#gioLam").value;

  return (nv = new nhanvien(
    account,
    name,
    mail,
    pass,
    workDay,
    basicSalary,
    regency,
    workHour
  ));
}

var dsnv = new DSNV();
var dataJson = localStorage.getItem("DSNV");
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
  renderTable(dsnv.employ);
}

function resetBox() {
  getEle("#searchName").value = "";
}

function resetForm() {
  getEle("#tknv").disabled = false;
  getEle("#tknv").value = "";
  getEle("#name").value = "";
  getEle("#email").value = "";
  getEle("#password").value = "";
  getEle("#datepicker").value = "";
  getEle("#luongCB").value = "";
  getEle("#chucvu").value = "Chọn chức vụ";
  getEle("#gioLam").value = "";
  getEle(".sp-thongbao").style.display = "None";
};

getEle("#btnDong").onclick = function () {
  resetForm();
};
getEle("#btnThem").onclick = function () {
  resetForm();
};

function renderTable(arrList) {
  var htmlString = "";
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
  }
  getEle("#tableDanhSach").innerHTML = htmlString;
}

getEle("#btnThemNV").onclick = function addEmploy() {
  var nv = inputEmploy();

  var valid =
    checkEmpty(nv.account, "#tbTKNV", "Tài khoản không được để trống!") &&
    checkNumber(nv.account, "#tbTKNV", "Mã nhân viên chỉ bao gồm ký tự số!") &&
    checkAcount(nv.account, 4, 6, "#tbTKNV", "Mã Nhân viên bao gồm 4-6 ký tự!") &&
    checkDuplicate(nv.account, dsnv.employ, "#tbTKNV", "Tài Khoản đã tồn tại!");

  valid &=
    checkEmpty(nv.name, "#tbTen", "Họ và tên không được để trống!") &&
    checkString(nv.name, "#tbTen", "Họ và Tên chỉ bao gồm ký tự chữ!");

  valid &=
    checkEmpty(nv.mail, "#tbEmail", "Email không được để trống!") &&
    checkEmail(nv.mail, "#tbEmail", "Emai không đúng định dạng!");

  valid &=
    checkEmpty(nv.pass, "#tbMatKhau", "Mật khẩu không được để trống!") &&
    checkPass(
      nv.pass,
      "#tbMatKhau",
      "Mật khẩu gồm 6-10 ký tự, chứa ít nhất 1 ký tự in hoa, 1 ký tự số, 1 ký tự đặc biệt!"
    );

  valid &=
    checkEmpty(nv.workDay, "#tbNgay", "Ngày không được để trống!") &&
    checkDate(nv.workDay, "#tbNgay", "Ngày không đúng định dạng!");

  valid &=
    checkNumber(nv.basicSalary, "#tbLuongCB", "Vui lòng nhập số lương!") &&
    checkEmptyNum(nv.basicSalary, "#tbLuongCB", "Vui lòng nhập số lương!") &&
    checkLimit(
      nv.basicSalary,
      1000000,
      20000000,
      "#tbLuongCB",
      "Mức lương không nằm trong chính sách"
    );

  valid &= checkOption(nv.regency, "#tbChucVu", "Vui lòng chọn chức vụ");

  valid &=
    checkNumber(nv.workHour, "#tbGiolam", "Vui lòng nhập số giờ làm!") &&
    checkEmptyNum(nv.workHour, "#tbGiolam", "Vui lòng nhập số giờ làm!") &&
    checkLimit(nv.workHour, 80, 200, "#tbGiolam", "Số giờ làm không hợp lệ");

  if (valid) {
    dsnv._addEmploy(nv);
    var data = JSON.stringify(dsnv.employ);
    localStorage.setItem("DSNV", data);
    renderTable(dsnv.employ);
    resetForm();
  }

};

function editEmploy(account) {
  var nv = dsnv._fillInfo(account);
  console.log(nv);
  if (nv) {
    getEle("#tknv").disabled = true;
    getEle("#tknv").value = nv.account;
    getEle("#name").value = nv.name;
    getEle("#email").value = nv.mail;
    getEle("#password").value = nv.pass;
    getEle("#datepicker").value = nv.workDay;
    getEle("#luongCB").value = nv.basicSalary;
    getEle("#chucvu").value = nv.regency;
    getEle("#gioLam").value = nv.workHour;
  }

  getEle("#btnThemNV").style.visibility = 'hidden';
}

getEle("#btnCapNhat").onclick = function updateEmploy() {
  var nv = inputEmploy();

  var valid =
    checkEmpty(nv.name, "#tbTen", "Họ và tên không được để trống!") &&
    checkString(nv.name, "#tbTen", "Họ và Tên chỉ bao gồm ký tự chữ!");

  valid &=
    checkEmpty(nv.mail, "#tbEmail", "Email không được để trống!") &&
    checkEmail(nv.mail, "#tbEmail", "Emai không đúng định dạng!");

  valid &=
    checkEmpty(nv.pass, "#tbMatKhau", "Mật khẩu không được để trống!") &&
    checkPass(
      nv.pass,
      "#tbMatKhau",
      "Mật khẩu gồm 8-25 ký tự, chứa ít nhất 1 ký tự in hoa, 1 ký tự số, 1 ký tự đặc biệt!"
    );

  valid &=
    checkEmpty(nv.workDay, "#tbNgay", "Ngày không được để trống!") &&
    checkDate(nv.workDay, "#tbNgay", "Ngày không đúng định dạng!");

  valid &=
    checkNumber(nv.basicSalary, "#tbLuongCB", "Vui lòng nhập số lương!") &&
    checkEmptyNum(nv.basicSalary, "#tbLuongCB", "Vui lòng nhập số lương!") &&
    checkLimit(
      nv.basicSalary,
      1000000,
      20000000,
      "#tbLuongCB",
      "Mức lương không nằm trong chính sách"
    );

  valid &= checkOption(nv.regency, "#tbChucVu", "Vui lòng chọn chức vụ");

  valid &=
    checkNumber(nv.workHour, "#tbGiolam", "Vui lòng nhập số giờ làm!") &&
    checkEmptyNum(nv.workHour, "#tbGiolam", "Vui lòng nhập số giờ làm!") &&
    checkLimit(nv.workHour, 80, 200, "#tbGiolam", "Số giờ làm không hợp lệ");

  if (valid) {
    dsnv._update(nv);
    data = JSON.stringify(dsnv.employ);
    localStorage.setItem("DSNV", data);
    renderTable(dsnv.employ);
    resetForm();
  }
  
};


function deletEmploy(account) {
  dsnv._delete(account);
  data = JSON.stringify(dsnv.employ);
  localStorage.setItem("DSNV", data);
  renderTable(dsnv.employ);
}

getEle("#btnTimNV").onclick = function () {
  var textBox = getEle("#searchName").value.trim()?.toLowerCase();
  var result = [];
  if (textBox.length > 0) {
    result = dsnv.employ.filter(function (nv) {
      return nv.employRank().toLowerCase().includes(textBox);
    });
    if (result == 0) {
      renderTable(dsnv.employ);
    } else {
      renderTable(result);
    }
  } else {
    renderTable(dsnv.employ);
  }

  resetBox();
};

