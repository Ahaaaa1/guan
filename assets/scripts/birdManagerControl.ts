import { _decorator, Component, director, find, instantiate, Label, Node, Prefab, tween, UITransform, Vec2, Vec3 } from "cc";
import { birdControl } from "./birdControl";
import { hpControl } from "./hpControl";
const { ccclass, property } = _decorator;

@ccclass("birdManagerControl")
export class birdManagerControl extends Component {
  @property(Prefab)
  birdPrefab: Prefab | null = null;
  @property(Label)
  scoreLabel: Label | null = null;
  @property(Node)
  gameover: Node | null = null;
  @property(hpControl)
  hpControl: hpControl | null = null;

  // 画布高度和小鸟高度
  canvasHeight: number = 0;
  birdHeight: number = 0;
  // 分数
  score: number = 0;
  // 小鸟生成计时器
  tim: number = 0;

  start() {
    this.canvasHeight = find("Canvas").getComponent(UITransform).height;
    this.birdHeight = this.birdPrefab?.data.getComponent(UITransform).height || 0;

    this.schedule(this.spawnBird, 1);
  }

  update(deltaTime: number) {}

  spawnBird() {
    if (!this.birdPrefab) return;
    const birdNode = instantiate(this.birdPrefab);
    this.node.addChild(birdNode);
    // 回调定义
    birdNode.getComponent(birdControl).addScoreCallback = () => {
      this.scoreLabel.string = `score ${++this.score}`;
      console.log("加分回调，当前分数:", this.score);
    }
    birdNode.getComponent(birdControl).dieCallback = () => {
      if (this.hpControl?.reduceHp() > 0) return;
      this.gameover.active = true;
      this.unschedule(this.spawnBird);
      this.node.destroyAllChildren();
    }
    // 传递飞行坐标
    const startPos = new Vec3(Math.random() * 160 - 80, -78); // 出生x: -80 ~ 80
    birdNode.setPosition(startPos);
    const targetPos = new Vec3(Math.random() * 250 - 125, this.canvasHeight / 2 + this.birdHeight / 2); // 目标x: -125 ~ 125
    birdNode.getComponent(birdControl).fly(startPos, targetPos);
  }

  backMenu () {
    director.loadScene("menu");
  }
}
