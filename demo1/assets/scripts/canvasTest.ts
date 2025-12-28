import { _decorator, Component, Node, EventTouch } from "cc";
const { ccclass, property } = _decorator;

@ccclass("canvasTest")
export class canvasTest extends Component {
  start() {
    this.node.on(Node.EventType.TOUCH_START, (event: EventTouch) => {
      console.log("canvas touchPos:", event.getUILocation(), event.getLocation());
    });
  }

  update(deltaTime: number) {}
}
