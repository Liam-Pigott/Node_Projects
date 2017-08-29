/*
    private - accessible within the class
    public - accessible anywhere
    protected - accessible by classes that inherit from this class
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var User = (function () {
    function User(name, email, age) {
        this.name = name;
        this.email = email;
        this.age = age;
        console.log('User created: ' + this.name);
    }
    User.prototype.register = function () {
        console.log(this.name + ' is now registered');
    };
    User.prototype.payInvoice = function () {
        console.log(this.name + ' has paid invoice');
    };
    return User;
}());
/*
let john = new User('John Doe', 'jdoe@gmail.com', 45);
console.log(john.age)
john.register();

*/
var Member = (function (_super) {
    __extends(Member, _super);
    function Member(id, name, email, age) {
        var _this = _super.call(this, name, email, age) || this;
        _this.id = id;
        return _this;
    }
    Member.prototype.payInvoice = function () {
        _super.prototype.payInvoice.call(this);
    };
    return Member;
}(User));
var mike = new Member(1, 'Mike Smith', 'msmith@gmail.com', 25);
mike.payInvoice();
