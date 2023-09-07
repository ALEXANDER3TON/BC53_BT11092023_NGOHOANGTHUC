function nhanvien(
  _account,
  _name,
  _mail,
  _pass,
  _workDay,
  _basicSalary,
  _regency,
  _workHour,
) {
  this.account = _account;
  this.name = _name;
  this.mail = _mail;
  this.pass = _pass;
  this.workDay = _workDay;
  this.basicSalary = _basicSalary;
  this.regency = _regency;
  this.workHour = _workHour;

  // method

  this.totalSalary = function () {
    var salary = 0;
    if (this.regency === "Sếp") {
      salary = this.basicSalary * 3 * this.workHour;
    } else if (this.regency === "Trưởng phòng") {
      salary = this.basicSalary * 2 * this.workHour;
    } else {
      salary = this.basicSalary * this.workHour;
    }

    return salary.toLocaleString('vi', {style : 'currency', currency : 'VND'});
  };

  this.employRank = function () {
    var rank = "";
    if (this.workHour >= 192) {
      rank = "Nhân viên xuất sắc";
    } else if (this.workHour >= 176) {
      rank = "Nhân viên giỏi";
    } else if (this.workHour >= 160) {
      rank = "Nhân viên khá";
    } else {
      rank = "Nhân viên trung bình";
    }

    return rank;
  };
}
