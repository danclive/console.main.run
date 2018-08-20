export function clone(Obj) {
    var buf;
    if (Obj instanceof Array) {
        buf = [];
        var i = Obj.length;
        while (i--) {
            buf[i] = clone(Obj[i])
        }

        return buf;
    } else if (Obj instanceof Object) {
        buf = {};
        for (var k in Obj) {
            buf[k] = clone(Obj[k]);
        }

        return buf;
    } else {
        return Obj;
    }
} 