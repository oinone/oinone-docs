---
title: Oinone遇上Qoder的AI Coding最佳实践（后端）
index: true
category:
  - 研发手册
  - AI Coding 实战
order: 2
next:
  text: 教程
  link: /zh/DevManual/Tutorials/README.md
---
# 一、心态

我们是在让`AI`给我们干活，不是验证它聪明。AI在一些环节会显得很笨，所以我们不要纠结。手工纠正下会比较快，也会有益于`AI`后续学习。同时我们需要给他正常的工作流程，尽可能地规避问题。我们是跟与AI结队编程，不是甩手掌柜，当然你越知道怎么配合，AI能做的就会越多

## （一）与AI结队编程的经验

1. 工程环境：工程依赖导致报错，虽然我们在`.qoder`目录下放有源码，AI会自动扫描代码并增加依赖。但是非常耗时而且扫描的文件多了容易出错。如果我们自己手工做一下，就会降低`AI`的理解成本。跟初学者一样，通常会卡在环境搭建上，`AI`也一样。如果环境搭建好。那么`AI`也会给你更好的反馈
2. 不要指望一次完成，把大任务拆成小任务，同时把任务分层。最终按分层分批执行。比如先建模型与菜单、再写`service`与`Action`
3. 不要指望一次完美，完美的代码是多次任务叠加的效果。比如`Action` 正常执行完以后，再让对所有`Action`按`Oinone`规范再检查（如命名规范，入参出参数规范），最后还得让`Action`按`Oinone`特有的交互建代理模型与修改新增`Action`（如多个模型入参，可以合并进代理模型或传输模型，把对应的方法放到传输模型中）

# 二、我们有什么

也就是`.qoder`下面我们有开源`opsx`的工作流（`commands`、`skills`）、我们沉淀的`rules`、以及`Oinone`开源的`source`（文档`oinone-docs`、源码`oinone-pamirs`）

<table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;">
  <thead>
    <tr>
      <th>物料</th>
      <th>子物料</th>
      <th>说明</th>
      <th>备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3" valign="top">commands</td>
      <td>opsx-new</td>
      <td>干活</td>
      <td>常规操作（新手使用）</td>
    </tr>
    <tr>
      <td>opsx-verify</td>
      <td>校验</td>
      <td>常规检查（新手使用）</td>
    </tr>
    <tr>
      <td>opsx-explore</td>
      <td>探索</td>
      <td>可能有奇效</td>
    </tr>
    <tr>
      <td rowspan="7" valign="top">rules</td>
      <td>project_rules</td>
      <td>默认规则</td>
      <td>基础规则</td>
    </tr>
    <tr>
      <td>oinone-action-service-rules</td>
      <td>action- service的基础规则</td>
      <td>用于action和service生存后二次改进工作</td>
    </tr>
    <tr>
      <td>oinone-action-ux-rules</td>
      <td>从action的入参数分析出跳转逻辑。补齐默认跳转逻辑、传输模型</td>
      <td>让Action符合Oinone的前后端交互规范</td>
    </tr>
    <tr>
      <td>oinone-exception-rules</td>
      <td>异常规范</td>
      <td>放最后执行</td>
    </tr>
    <tr>
      <td>oinone-business-data-init-rules</td>
      <td>测试数据初始化</td>
      <td>测试数据初始化</td>
    </tr>
    <tr>
      <td>oinone-dataPermission-extends-rules</td>
      <td>业务权限扩展的一种示例</td>
      <td>业务权限扩展的一种示例</td>
    </tr>
    <tr>
      <td>oinone-menu-rules</td>
      <td>菜单规整</td>
      <td>让默认菜单按业务顺序排列，同时让菜单加上icon</td>
    </tr>
    <tr>
      <td rowspan="2" valign="top">source</td>
      <td>oinone-docs</td>
      <td>文档</td>
      <td>Oinone文档帮助AI快速理解</td>
    </tr>
    <tr>
      <td>oinone-pamirs</td>
      <td>内核源码</td>
      <td>源码方便AI识别深层原理，在单一问题回答会更专业</td>
    </tr>
  </tbody>
</table>

备注：如何工程中有示例工程效果更加，示例工程要作为子模块加进去，AI会优先参考示例工程

# 三、工作方式

## （一）基础配置

### 1、Oinone的配置

+ （必须）安装Oinone 的 `Qoder`插件 [oinone-pamirs-plugin-1.0.1.vsix.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/oinone-pamirs-plugin-1.0.1.vsix%20(3).zip)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1770108891617-8461168b-f404-4aaa-ae03-e3499d24bbc5-20260325101634222.png)

+ （可选）手工安装`docker` 
+ （可选）利用`Oinone`的插件安装中间件（目前提供 mac，windows环境请参考`Oinone`[官方文档](https://guide.oinone.top/zh/InstallOrUpgrade/Dev-ENV/)）

| 中间件        | 用户名密码                                            |
| ------------- | ----------------------------------------------------- |
| MySQL         | root/oinone123，另有应用用户 oinone/oinone123         |
| Redis         | requirepass: oinone123，数据库 index: 0               |
| MiniIO        | 用户: oinone，密码: oinone123                         |
| ElasticSearch | 用户: elastic，密码: oinone123（启用 xpack.security） |
| Zookeeper     | 无账号密码（默认无认证）                              |
| RocketMQ      | 无账号密码（默认未启用 ACL）                          |


### 2、Qoder的配置

**第一步**：下载` `.qoder` `[qoder.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/qoder.zip)

**第二步**： ``.qoder``拷贝工程根目录下

**第三步**：下载 `Oinone` 源码

运行 `.qoder/source/git-clone.sh` 脚本：

```plain
sh .qoder/source/git-clone.sh
```

该脚本会自动克隆以下仓库：

+ `https://gitee.com/oinone/oinone-pamirs.git` （Oinone 框架源码）
+ `https://gitee.com/oinone/oinone-docs.git` （Oinone 官方文档）

**第四步**：配置 `Qoder` 项目规则

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1774359807226-4d849b77-5599-4027-8e59-156a3dff3545-20260325101642173.png)

### 3、在`Qoder`选什么模型比较好

通常打开 智能体，选择 Auto 模式；如果想省token，可以参考：规划用全球顶尖模型，执行用轻量模型。

## （二）操作示例（实际操作按工作流程进行）

基础操作方式就是：把工作流文件、`prd`或`tasks`，拖到AI的对话框中，比如：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1774360168340-47d085d3-dbb8-4f6e-988b-b7511803c4bd-20260325101647083.png)

正常会生成概要（`proposal`）以及产品需求理解（`specs`）、详细设计（`design`）、任务清单（`tasks`）。如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1769748899535-7bc940a1-4f28-42e2-bfce-55409bf14d38-20260325101654047.png)

有了任务就可以开始执行了，可以执行按照：任务编码或阶段，进行分批执行。如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1774360317351-d5ea8062-0cf9-4be2-ba41-9ec4142d2273-20260325101657629.png)



# 四、工作流程

## （一）跟AI探索设计方案（可选）

使用工作流为：`opsx-explore`，可以让AI做好工程规划，并且完成工程搭建。为了减少AI的难度，可以认为检查建好的工程依赖，比如在 api工程中加上如下依赖

```plain
<dependency>
    <groupId>pro.shushi.pamirs</groupId>
    <artifactId>a</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.boot</groupId>
    <artifactId>pamirs-boot-standard</artifactId>
</dependency>
<dependency>
    <groupId>pro.shushi.pamirs.core</groupId>
    <artifactId>pamirs-user-api</artifactId>
</dependency>
```

## （二）让AI根据PRD生成设计文档与任务列表

使用工作流为：`opsx-new`，可以让AI做好详细设计和任务清单。这个检查很重要，要确保详细设计是对的，以及任务清单是完整的。

### 1、产出详细设计和任务清单

`opsx-new.md`，`prd.md` 请帮我做“xxx版本”的详细设计和任务清单

### 2、初步检查详细设计和任务（减少生成代码的错误概率）

+ `opsx-new.md``tasks.md` `oinone-action-service-rules`请检查任务对应的action和service是否符合规范，并进行调整
+ `opsx-new.md``tasks.md` `oinone-action-ux-rules`请检查任务对应的action和service是否符合规范，并进行调整

### 3、人为再检查一次

## （三）按任务列表分批执行

使用工作流为：`opsx-new`，控制每次产出代码量，太长AI就犯傻了。建议按下面顺序分层执行，每层中可以分批执行：

### 1、建模型与菜单

 这一步需要把`opsx-new.md`，`tasks.md` 拖入对话框，然后输入：开始DEV-1 

### 2、建Action与Service

 这一步需要把`opsx-new.md`，`tasks.md` 拖入对话框，然后输入：开始DEV-2

### 3、优化Action与Service

这一步需要把`opsx-new.md`，`tasks.md`和`oinone-action-service-rules`规则拖入对话框。话术：请检查任务对应的代码中针对action和service是否符合规范，并进行代码调整

### 4、根据交互优化Action

这一步需要把`opsx-new.md`，`tasks.md` 和 `oinone-action-ux-rules`规则拖入对话框。话术：请检查Action是否符合Oinone Action的开发规范

## （四）校验执行结果

### 1、整体检查

使用工作流为：`opsx-verify`，同时把需要校验的`tasks`也拖到`qoder`对话框中

### 2、单点检查

如果发现错误，我们可以选中行并添加到对话框，然后选中对应的规则文件，让它检查其他类似的情况



## （五）额外可以放最后执行

### 1、菜单

`oinone-menu-rules.md`，请按Oinone的菜单规则帮我调整

### 2、检查异常处理

`opsx-verify``oinone-exception-rules.md`，按Oinone的异常规范，修复代码

### 3、业务数据初始化

`tasks.md` `oinone-business-data-init-rules.md`，帮我初始化业务测试数据

# 五、常见问题

## （一）文件建错路径

这种看上去很傻的行为，你可以认为`AI`手抖的不小心。可以手动删除或者移动位置

## （二）做不全，即AI偷懒

没有把所有文件都改对，因为AI的上下文是有限制的，所以尽可能把`tasks.md`带上，或者多执行几遍。

## （二）有实现错误或者不符合规范的

一定会有场景没有覆盖到的，你可以把要求给他，让`AI`先改对。然后让他把规则沉淀到新的`oinone-xxx-rules.md`中，如果是想把规则调整合并到原规则文件中，则需要让AI检查与原规则文件内容的冲突。经历这些过程，那么用AI会越来越顺利。

如何判断是用新的规则文件，还是合并到原规则文件中，核心要看规则是不是需要独立存在的，不要让AI一下子都懂，特别是国内的模型，上下文太长容易做错，AI工作效率核心是让它做对，而不是做的有多快。比如`oinone-action-service-rules`是基础规则，它是为了让AI把业务逻辑写完。这时建的`action`并不符合`Oinone`的规范。`oinone-action-ux-rules`是在其基础上罗列了多种前端交互情况下`Action`的规范，进一步纠正`action`的规范。`oinone-action-exception-rules`是最后的异常处理规范。

