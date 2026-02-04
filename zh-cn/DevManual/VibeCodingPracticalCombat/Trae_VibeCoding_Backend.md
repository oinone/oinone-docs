---
title: Oinone遇上Trae的VibeCoding最佳实践（后端）
index: true
category:
  - 研发手册
  - VibeCoding 实战
order: 1
prev:
  text: 研发手册
  link: /zh-cn/DevManual/README.md
next:
  text: 教程
  link: /zh-cn/DevManual/Tutorials/README.md
---
# 一、心态

我们是在让它给我们干活，不是验证它聪明。AI在一些环节会显得很笨，所以我们不要纠结。手工纠正下会比较快，也会有益于`AI`后续学习。同时我们需要给他正常的工作流程，尽可能地规避问题。我们是跟与AI结队编程，不是甩手掌柜，当然你越知道怎么配合，AI能做的就会越多

## （一）与AI结队编程的经验

1. 工程环境：工程依赖导致报错，虽然我们在`.trae`目录下放有源码，AI会自动扫描代码并增加依赖。但是非常耗时而且扫描的文件多了容易出错。如果我们自己手工做一下，就会降低`AI`的理解成本。跟初学者一样，通常会卡在环境搭建上，`AI`也一样。如果环境搭建好。那么`AI`也会给你更好的反馈
2. 不要指望一次完成，把大任务拆成小任务，同时把任务分层。最终按分层分批执行。比如先建模型与菜单、再写`service`与`Action`
3. 不要指望一次完美，完美的代码是多次任务叠加的效果。比如`Action` 正常执行完以后，再让对所有`Action`按`Oinone`规范再检查（如命名规范，入参出参数规范），最后还得让`Action`按`Oinone`特有的交互建代理模型与修改新增`Action`（如多个模型入参，可以合并进代理模型或传输模型，把对应的方法放到传输模型中）

# 二、我们有什么

也就是`.trae`下面我们有开源`opsx`的工作流（`commands`、`skills`）、我们沉淀的`rules`、以及`Oinone`开源的`source`（文档`oinone-docs`、源码`oinone-pamirs`）

<table border="1" style="border-collapse: collapse; width: 100%; text-align: left;">
  <thead>
    <tr>
      <th style="padding: 8px;">物料</th>
      <th style="padding: 8px;">子物料</th>
      <th style="padding: 8px;">说明</th>
      <th style="padding: 8px;">备注</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3" style="padding: 8px; vertical-align: top;">commands</td>
      <td style="padding: 8px;">opsx-new</td>
      <td style="padding: 8px;">干活</td>
      <td style="padding: 8px;">常规操作（新手使用）</td>
    </tr>
    <tr>
      <td style="padding: 8px;">opsx-verify</td>
      <td style="padding: 8px;">校验</td>
      <td style="padding: 8px;">常规检查（新手使用）</td>
    </tr>
    <tr>
      <td style="padding: 8px;">opsx-explore</td>
      <td style="padding: 8px;">探索</td>
      <td style="padding: 8px;">可能有奇效</td>
    </tr>
    <tr>
      <td rowspan="7" style="padding: 8px; vertical-align: top;">rules</td>
      <td style="padding: 8px;">project_rules</td>
      <td style="padding: 8px;">默认规则</td>
      <td style="padding: 8px;">基础规则</td>
    </tr>
    <tr>
      <td style="padding: 8px;">oinone-action-service-rules</td>
      <td style="padding: 8px;">action- service的基础规则</td>
      <td style="padding: 8px;">用于action和service生存后二次改进工作</td>
    </tr>
    <tr>
      <td style="padding: 8px;">oinone-action-ux-rules</td>
      <td style="padding: 8px;">从action的入参数分析出跳转逻辑。补齐默认跳转逻辑、传输模型</td>
      <td style="padding: 8px;">让Action符合Oinone的前后端交互规范</td>
    </tr>
    <tr>
      <td style="padding: 8px;">oinone-exception-rules</td>
      <td style="padding: 8px;">异常规范</td>
      <td style="padding: 8px;">放最后执行</td>
    </tr>
    <tr>
      <td style="padding: 8px;">oinone-business-data-init-rules</td>
      <td style="padding: 8px;">测试数据初始化</td>
      <td style="padding: 8px;">测试数据初始化</td>
    </tr>
    <tr>
      <td style="padding: 8px;">oinone-dataPermission-extends-rules</td>
      <td style="padding: 8px;">业务权限扩展的一种示例</td>
      <td style="padding: 8px;">业务权限扩展的一种示例</td>
    </tr>
    <tr>
      <td style="padding: 8px;">oinone-menu-rules</td>
      <td style="padding: 8px;">菜单规整</td>
      <td style="padding: 8px;">让默认菜单按业务顺序排列，同时让菜单加上icon</td>
    </tr>
    <tr>
      <td rowspan="2" style="padding: 8px; vertical-align: top;">source</td>
      <td style="padding: 8px;">oinone-docs</td>
      <td style="padding: 8px;">文档</td>
      <td style="padding: 8px;">Oinone文档帮助AI快速理解</td>
    </tr>
    <tr>
      <td style="padding: 8px;">oinone-pamirs</td>
      <td style="padding: 8px;">内核源码</td>
      <td style="padding: 8px;">源码方便AI识别深层原理，在单一问题回答会更专业</td>
    </tr>
  </tbody>
</table>

备注：如何工程中有示例工程效果更加，示例工程要作为子模块加进去，AI会优先参考示例工程

# 三、工作方式
## （一）基础配置
### 1、Oinone的配置

+ （必须）安装Oinone 的 `trae`插件 [oinone-pamirs-plugin-1.0.1.vsix.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Trae_VibeCoding_Backend/oinone-pamirs-plugin-1.0.1.vsix.zip)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Trae_VibeCoding_Backend/1770108891617-8461168b-f404-4aaa-ae03-e3499d24bbc5.png)

+ （可选）手工安装`docker` 
+ （可选）利用`Oinone`的插件安装中间件（目前提供 mac，windows环境请参考`Oinone`官方文档[https://guide.oinone.top/zh-cn/InstallOrUpgrade/Dev-ENV/](https://guide.oinone.top/zh-cn/InstallOrUpgrade/Dev-ENV/)）

| 中间件        | 用户名密码                                            |
| ------------- | ----------------------------------------------------- |
| MySQL         | root/oinone123，另有应用用户 oinone/oinone123         |
| Redis         | requirepass: oinone123，数据库 index: 0               |
| MiniIO        | 用户: oinone，密码: oinone123                         |
| ElasticSearch | 用户: elastic，密码: oinone123（启用 xpack.security） |
| Zookeeper     | 无账号密码（默认无认证）                              |
| RocketMQ      | 无账号密码（默认未启用 ACL）                          |


### 2、Trae的配置

**第一步**：下载`.trae`[.trae.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Trae_VibeCoding_Backend/trae.zip)

**第二步**： `.trae`拷贝工程根目录下

**第三步**：下载 `Oinone` 源码

运行 `.trae/source/git-clone.sh` 脚本：

```plain
sh .trae/source/git-clone.sh
```

该脚本会自动克隆以下仓库：

+ `https://gitee.com/oinone/oinone-pamirs.git` （Oinone 框架源码）
+ `https://gitee.com/oinone/oinone-docs.git` （Oinone 官方文档）

**第四步**：配置 `Trae` 项目规则

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Trae_VibeCoding_Backend/1769753589312-a6ab78c0-5d7a-45a1-b8dc-371b186b29f6.png)

### 3、在`Trae`选什么模型比较好

选择 `GLM-4.7`，打开 `MAX-MODE` 模式， 选择`Builder with MCP`模式

## （二）操作示例（实际操作按工作流程进行）

基础操作方式就是：把工作流文件、`prd`或`tasks`，拖到AI的对话框中，比如：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Trae_VibeCoding_Backend/1769748880248-24d4f38a-0225-484e-a7cf-1c0ed5de50ef.png)

正常会生成概要（`proposal`）以及产品需求理解（`specs`）、详细设计（`design`）、任务清单（`tasks`）。如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Trae_VibeCoding_Backend/1769748899535-7bc940a1-4f28-42e2-bfce-55409bf14d38.png)

有了任务就可以开始执行了，可以执行按照：任务编码或阶段，进行分批执行。如下：

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Trae_VibeCoding_Backend/1769749141154-484686ef-3e7f-47f2-bc75-03bb9a40ca2c.png)



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

使用工作流为：`opsx-verify`，同时把需要校验的`tasks`也拖到`trae`对话框中

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

