import { _decorator, Component, Node, Vec3, tween, EventTouch, Animation, Tween } from "cc";
const { ccclass, property } = _decorator;

@ccclass("birdControl")
export class birdControl extends Component {
  speed: number = 100;
  dieY: number = -78;
  // 加分回调
  addScoreCallback: Function;
  // 游戏结束回调
  dieCallback: Function;  

  start() {
    this.node.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
  }

  update(deltaTime: number) {}

  fly(startPos: Vec3, targetPos: Vec3) {
    const flyVec = targetPos.clone().subtract(startPos); // 起点到终点的向量
    if (flyVec.x > 0) this.node.setScale(-1, 1, 1);
    const flyDistance = flyVec.length();
    tween(this.node)
      .to(flyDistance / this.speed, { position: targetPos })
      .call(() => this.dieCallback && this.dieCallback())
      .start();
  }

  onTouchStart(event: EventTouch) {
    // console.log("touchPos:", event.getUILocation());
    Tween.stopAllByTarget(this.node);
    this.addScoreCallback && this.addScoreCallback();
    const ani = this.getComponent(Animation);
    ani.play("die");
    tween(this.node)
      .to((this.node.y - this.dieY) / 100, { position: new Vec3(this.node.x, this.dieY, 0) })
      .call(() => {
        this.node.destroy(); // 播放完动画后销毁节点
      })
      .start();
  }
}
