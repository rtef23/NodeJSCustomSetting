//define format func
Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/yyyy/g, d.getFullYear())
            .replace(/yy/g, (d.getFullYear() % 100))
            .replace(/MM/g, (d.getMonth() + 1).zf(2))
            .replace(/dd/g, d.getDate().zf(2))
            .replace(/E/g, weekName[d.getDay()])
            .replace(/HH/g, d.getHours().zf(2))
            .replace(/hh/g, (((d.getHours() % 12) == 0)?12:(d.getHours() % 12)).zf(2))
            .replace(/mm/g, d.getMinutes().zf(2))
            .replace(/ss/g, d.getSeconds().zf(2))
            .replace(/a\/p/g, (d.getHours() < 12)? "오전" : "오후");
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};
