import { _decorator, Component, director, Node } from "cc";
const { ccclass, property } = _decorator;

@ccclass("menuControl")
export class menuControl extends Component {
  start() {}

  update(deltaTime: number) {}

  startBtnClick () {
    director.loadScene("scene");
  }
}
