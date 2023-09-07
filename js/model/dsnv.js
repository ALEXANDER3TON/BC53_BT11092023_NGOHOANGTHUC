function DSNV() {
    this.employ = [];
    this._addEmploy = function (nv) {
        this.employ.push(nv);
    };

    this._find = function(account) {
        var index = -1;

        for(var i = 0; i < this.employ.length; i++){
            var nv = this.employ[i];
            if(nv.account === account) {
                index = i;
                break;
            }
        }
        return index;
    }


    this._fillInfo = function(account) {
        var index = dsnv._find(account);
        if(index !== -1){
            var nv = this.employ[index];
            return nv;
        }
    }

    this._update = function(nhanVien) {
        var index = dsnv._find(nhanVien.account);
        if(index !== -1){
            this.employ[index] = nhanVien;
        }
    }

    this._delete = function(account) {
        var index = dsnv._find(account);
        
        if(index !== -1){
            this.employ.splice(index, 1);
        }

        console.log("index",index);
        console.log("this.employ",this.employ);
    }

    this._access = function(nhanVien) {
        var index = dsnv._find(nhanVien.rank)
        if(index !== -1){
            var nv = this.employ[index];
            return nv;
        }
    }

}

