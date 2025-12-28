import { _decorator, Component, instantiate, Node, Prefab } from "cc";
const { ccclass, property } = _decorator;

@ccclass("hpControl")
export class hpControl extends Component {
  @property(Prefab)
  hpPrefab: Prefab | null = null;

  HP: number = 3; // 初始生命值

  start() {
    if (!this.hpPrefab) return;
    for ( let v of Array(this.HP)) {
      const hpNode = instantiate(this.hpPrefab);
      this.node.addChild(hpNode);
    }
    console.log("hp 加载完成")
  }

  update(deltaTime: number) {}

  reduceHp() { 
    this.node.children[this.HP-1].destroy(); // 减血，更新画面
    return --this.HP;
  }
}
