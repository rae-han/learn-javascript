var _Person_instances, _Person_sayBye;
var Person = /** @class */ (function () {
    function Person(name) {
        _Person_instances.add(this);
        this.name = name;
    }
    Person.prototype.sayHi = function () {
        return "Hi! ".concat(this.name);
    };
    Person.sayHello = function () {
        return "Hello ".concat(this.name);
    };
    return Person;
}());
_Person_instances = new WeakSet(), _Person_sayBye = function _Person_sayBye() {
    return "Bye ".concat(this.name);
};
