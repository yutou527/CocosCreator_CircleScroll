

const { ccclass, property } = cc._decorator;
const TYPES = cc.Enum({
    SIN: 0, //SIN曲线
    CIRCLE: 1,//圆形
})

@ccclass
export default class CircleScroll extends cc.ScrollView {

    @property({
        type: TYPES,
    })
    type: number = 0;
    @property({
        type: cc.Integer
    })
    radius: number = 200;

    maxOffset: number;

    anglePer: number;

    start() {
        if (this.type == TYPES.CIRCLE) {
            this.node.anchorY = 0.5;
            this.content.getComponent(cc.Layout).enabled = false;
        }
        if (this.type == TYPES.SIN) {
            this.node.anchorY = 1;
        }
        this.node.on('scrolling', e => {
            this.resetX();
        });
        this.maxOffset = this.getMaxScrollOffset().y;
        this.anglePer = 2 * Math.PI / this.content.children.length;
        this.resetX();

    }
    resetX() {
        switch (this.type) {
            case TYPES.SIN:
                this.content.children.forEach((c, i) => {
                    let y = this.node.convertToNodeSpaceAR(c.convertToWorldSpaceAR(cc.v2(0, 0))).y;
                    let pi: number = Math.PI * -(y) / this.node.height;
                    let x = Math.sin(pi);
                    c.x = x * this.radius;
                })
                break;
            case TYPES.CIRCLE:

                this.content.children.forEach((c, i) => {
                    let offset = this.getScrollOffset();//this.node.convertToNodeSpaceAR(c.convertToWorldSpaceAR(cc.v2(0, 0))).y;
                    //将offsety 转换为角度
                    let ang = (2 * Math.PI) * offset.y / this.maxOffset + this.anglePer * i;
                    c.x = this.radius * Math.cos(ang);
                    c.y = this.radius * Math.sin(ang) - offset.y ;
                })
                break;
        }

    }
    update(dt) {
        super.update(dt);
    }
}
