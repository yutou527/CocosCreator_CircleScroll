"use strict";
cc._RF.push(module, '3f4fcf9D5NOdaDTsR5+HiNz', 'CircleScroll');
// Scripts/CircleScroll.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var TYPES = cc.Enum({
    SIN: 0,
    CIRCLE: 1,
});
var CircleScroll = /** @class */ (function (_super) {
    __extends(CircleScroll, _super);
    function CircleScroll() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = 0;
        _this.radius = 200;
        return _this;
    }
    CircleScroll.prototype.start = function () {
        var _this = this;
        if (this.type == TYPES.CIRCLE) {
            this.node.anchorY = 0.5;
            this.content.getComponent(cc.Layout).enabled = false;
        }
        if (this.type == TYPES.SIN) {
            this.node.anchorY = 1;
        }
        this.node.on('scrolling', function (e) {
            _this.resetX();
        });
        this.maxOffset = this.getMaxScrollOffset().y;
        this.anglePer = 2 * Math.PI / this.content.children.length;
        this.resetX();
    };
    CircleScroll.prototype.resetX = function () {
        var _this = this;
        switch (this.type) {
            case TYPES.SIN:
                this.content.children.forEach(function (c, i) {
                    var y = _this.node.convertToNodeSpaceAR(c.convertToWorldSpaceAR(cc.v2(0, 0))).y;
                    var pi = Math.PI * -(y) / _this.node.height;
                    var x = Math.sin(pi);
                    c.x = x * _this.radius;
                });
                break;
            case TYPES.CIRCLE:
                this.content.children.forEach(function (c, i) {
                    var offset = _this.getScrollOffset(); //this.node.convertToNodeSpaceAR(c.convertToWorldSpaceAR(cc.v2(0, 0))).y;
                    //将offsety 转换为角度
                    var ang = (2 * Math.PI) * offset.y / _this.maxOffset + _this.anglePer * i;
                    c.x = _this.radius * Math.cos(ang);
                    c.y = _this.radius * Math.sin(ang) - offset.y;
                });
                break;
        }
    };
    CircleScroll.prototype.update = function (dt) {
        _super.prototype.update.call(this, dt);
    };
    __decorate([
        property({
            type: TYPES,
        })
    ], CircleScroll.prototype, "type", void 0);
    __decorate([
        property({
            type: cc.Integer
        })
    ], CircleScroll.prototype, "radius", void 0);
    CircleScroll = __decorate([
        ccclass
    ], CircleScroll);
    return CircleScroll;
}(cc.ScrollView));
exports.default = CircleScroll;

cc._RF.pop();