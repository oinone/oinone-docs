---
title: Best Practices of AI Coding When Oinone Meets Qoder (Backend)
index: true
category:
  - R&D Manual
  - AI Coding Practical Combat
order: 2
next:
  text: Tutorial
  link: /zh/DevManual/Tutorials/README.md
---
# I. Mindset

We are having `AI` do work for us, not verifying its intelligence. AI may seem quite stupid in some aspects, so we don't need to dwell on it. Manually correcting it will be faster and also beneficial for the subsequent learning of `AI`. At the same time, we need to provide it with a normal workflow and avoid problems as much as possible. We are programming in tandem with AI, not being hands-off managers. Of course, the more you know how to cooperate, the more AI can do.

## (I) Experience in programming in tandem with AI

1. Engineering environment: Errors may occur due to engineering dependencies. Although we have the source code in the `.qoder` directory and AI will automatically scan the code and add dependencies, it is very time-consuming and prone to errors when scanning a large number of files. If we do it manually, it will reduce the understanding cost of `AI`. Just like beginners, they usually get stuck in environment setup, and `AI` is the same. If the environment is set up properly, then `AI` will also give you better feedback.
2. Don't expect to complete a task in one go. Break large tasks into small ones and layer the tasks. Finally, execute them in batches according to the layers. For example, first create models and menus, and then write `service` and `Action`.
3. Don't expect perfection in one go. Perfect code is the result of multiple task superpositions. For example, after the `Action` is executed normally, let it check all `Action` according to the `Oinone` specification (such as naming conventions, input and output parameter specifications). Finally, let the `Action` create proxy models and modify and add new `Action` according to the unique interaction of `Oinone` (for example, if there are multiple model input parameters, they can be merged into the proxy model or transfer model, and the corresponding methods can be placed in the transfer model).

# II. What we have

That is, under `.qoder`, we have the workflow (`commands`, `skills`) of the open-source `opsx`, the `rules` we have accumulated, and the open-source `source` of `Oinone` (documentation `oinone-docs`, source code `oinone-pamirs`).

<table border="1" cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;">
  <thead>
    <tr>
      <th>Materials</th>
      <th>Sub-materials</th>
      <th>Description</th>
      <th>Remarks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3" valign="top">commands</td>
      <td>opsx-new</td>
      <td>Do work</td>
      <td>Regular operations (for beginners)</td>
    </tr>
    <tr>
      <td>opsx-verify</td>
      <td>Verify</td>
      <td>Regular checks (for beginners)</td>
    </tr>
    <tr>
      <td>opsx-explore</td>
      <td>Explore</td>
      <td>May have miraculous effects</td>
    </tr>
    <tr>
      <td rowspan="7" valign="top">rules</td>
      <td>project_rules</td>
      <td>Default rules</td>
      <td>Basic rules</td>
    </tr>
    <tr>
      <td>oinone-action-service-rules</td>
      <td>Basic rules for action-service</td>
      <td>Used for secondary improvement work after the generation of action and service</td>
    </tr>
    <tr>
      <td>oinone-action-ux-rules</td>
      <td>Analyze the jump logic from the input parameters of the action. Complete the default jump logic and transfer model</td>
      <td>Make the Action comply with the front-end and back-end interaction specifications of Oinone</td>
    </tr>
    <tr>
      <td>oinone-exception-rules</td>
      <td>Exception specifications</td>
      <td>Execute at the end</td>
    </tr>
    <tr>
      <td>oinone-business-data-init-rules</td>
      <td>Test data initialization</td>
      <td>Test data initialization</td>
    </tr>
    <tr>
      <td>oinone-dataPermission-extends-rules</td>
      <td>An example of business permission extension</td>
      <td>An example of business permission extension</td>
    </tr>
    <tr>
      <td>oinone-menu-rules</td>
      <td>Menu organization</td>
      <td>Arrange the default menu in the business order and add icons to the menu</td>
    </tr>
    <tr>
      <td rowspan="2" valign="top">source</td>
      <td>oinone-docs</td>
      <td>Documentation</td>
      <td>Oinone documentation helps AI understand quickly</td>
    </tr>
    <tr>
      <td>oinone-pamirs</td>
      <td>Kernel source code</td>
      <td>The source code helps AI identify the deep principles and will be more professional in answering single questions</td>
    </tr>
  </tbody>
</table>

Remarks: If there is an example project in the project, the effect will be better. The example project should be added as a sub-module, and AI will give priority to referring to the example project.

# III. Working methods

## (I) Basic configuration

### 1. Configuration of Oinone

+ (Required) Install the `Qoder` plugin of Oinone [oinone-pamirs-plugin-1.0.1.vsix.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/oinone-pamirs-plugin-1.0.1.vsix%20(3).zip)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1770108891617-8461168b-f404-4aaa-ae03-e3499d24bbc5-20260325101634222.png)

+ (Optional) Manually install `docker` 
+ (Optional) Use the Oinone plugin to install middleware (currently available for the Mac environment. For the Windows environment, please refer to the [Official Documentation](/en/DevManual/Tutorials/setup-guide.html) of Oinone)

| Middleware        | Username and password                                            |
| ------------- | ----------------------------------------------------- |
| MySQL         | root/oinone123, and there is also an application user oinone/oinone123         |
| Redis         | requirepass: oinone123, database index: 0               |
| MiniIO        | User: oinone, Password: oinone123                         |
| ElasticSearch | User: elastic, Password: oinone123 (xpack.security is enabled) |
| Zookeeper     | No account and password (no authentication by default)                              |
| RocketMQ      | No account and password (ACL is not enabled by default)                          |

### 2. Configuration of Qoder

**Step 1**: Download ` `.qoder` `[qoder.zip](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/qoder.zip)

**Step 2**: Copy ``.qoder`` to the root directory of the project.

**Step 3**: Download the `Oinone` source code.

Run the `.qoder/source/git-clone.sh` script:

```plain
sh .qoder/source/git-clone.sh
```

This script will automatically clone the following repositories:

+ `https://gitee.com/oinone/oinone-pamirs.git` (Oinone framework source code)
+ `https://gitee.com/oinone/oinone-docs.git` (Oinone official documentation)

**Step 4**: Configure the `Qoder` project rules.

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1774359807226-4d849b77-5599-4027-8e59-156a3dff3545-20260325101642173.png)

### 3. Which model is better to choose in `Qoder`

Normally, open the agent and select the Auto mode. If you want to save tokens, you can refer to this: use the world's top models for planning and lightweight models for execution.

## (II) Operation examples (actual operations should follow the workflow)

The basic operation method is to drag the workflow file, `prd` or `tasks` into the AI dialog box, for example:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1774360168340-47d085d3-dbb8-4f6e-988b-b7511803c4bd-20260325101647083.png)

Normally, it will generate an outline (`proposal`), product requirement understanding (`specs`), detailed design (`design`), and task list (`tasks`). As follows:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1769748899535-7bc940a1-4f28-42e2-bfce-55409bf14d38-20260325101654047.png)

Once you have the tasks, you can start executing them. You can execute them in batches according to the task code or stage. As follows:

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/VibeCodingPracticalCombat/Qoder/1774360317351-d5ea8062-0cf9-4be2-ba41-9ec4142d2273-20260325101657629.png)

# IV. Workflow

## (I) Explore design solutions with AI (optional)

Use the workflow `opsx-explore`, which can let AI do a good job in project planning and complete project setup. To reduce the difficulty for AI, you can manually check the dependencies of the established project. For example, add the following dependencies to the api project:

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

## (II) Let AI generate design documents and task lists based on the PRD

Use the workflow `opsx-new`, which can let AI do a good job in detailed design and task lists. This check is very important to ensure that the detailed design is correct and the task list is complete.

### 1. Produce detailed design and task list

`opsx-new.md`, `prd.md` Please help me with the detailed design and task list for the "xxx version".

### 2. Preliminary check of the detailed design and tasks (reduce the probability of errors in the generated code)

+ `opsx-new.md` `tasks.md` `oinone-action-service-rules` Please check whether the actions and services corresponding to the tasks comply with the specifications and make adjustments.
+ `opsx-new.md` `tasks.md` `oinone-action-ux-rules` Please check whether the actions and services corresponding to the tasks comply with the specifications and make adjustments.

### 3. Manually check again

## (III) Execute in batches according to the task list

Use the workflow `opsx-new` to control the amount of code produced each time. If it's too long, AI will act stupid. It is recommended to execute in layers in the following order, and each layer can be executed in batches:

### 1. Create models and menus

In this step, you need to drag `opsx-new.md` and `tasks.md` into the dialog box, and then enter: Start DEV-1.

### 2. Create Action and Service

In this step, you need to drag `opsx-new.md` and `tasks.md` into the dialog box, and then enter: Start DEV-2.

### 3. Optimize Action and Service

In this step, you need to drag `opsx-new.md`, `tasks.md` and the `oinone-action-service-rules` rules into the dialog box. The message is: Please check whether the code corresponding to the tasks for actions and services complies with the specifications and make code adjustments.

### 4. Optimize Action according to the interaction

In this step, you need to drag `opsx-new.md`, `tasks.md` and the `oinone-action-ux-rules` rules into the dialog box. The message is: Please check whether the Action complies with the Oinone Action development specifications.

## (IV) Verify the execution results

### 1. Overall check

Use the workflow `opsx-verify`, and at the same time drag the `tasks` to be verified into the `qoder` dialog box.

### 2. Single-point check

If an error is found, we can select the line and add it to the dialog box, and then select the corresponding rule file to let it check other similar situations.

## (V) Additional tasks that can be executed at the end

### 1. Menu

`oinone-menu-rules.md`, please adjust according to the Oinone menu rules.

### 2. Check exception handling

`opsx-verify` `oinone-exception-rules.md`, fix the code according to the Oinone exception specifications.

### 3. Business data initialization

`tasks.md` `oinone-business-data-init-rules.md`, help me initialize the business test data.

# V. Common problems

## (I) Incorrect file path creation

This seemingly stupid behavior can be considered as an accidental mistake by `AI`. You can manually delete or move the files.

## (II) Incomplete work, i.e., AI being lazy

Not all files are modified correctly. Since the context of AI is limited, try to include `tasks.md` or execute it several times.

## (II) Implementation errors or non-compliance with specifications

There must be scenarios that are not covered. You can give the requirements to `AI` and let it correct them first. Then let it precipitate the rules into a new `oinone-xxx-rules.md`. If you want to adjust and merge the rules into the original rule file, you need to let AI check for conflicts with the content of the original rule file. After going through these processes, using AI will become smoother.

How to determine whether to use a new rule file or merge it into the original rule file mainly depends on whether the rules need to exist independently. Don't expect AI to understand everything at once, especially domestic models. If the context is too long, it's easy to make mistakes. The core of AI's work efficiency is to make it do things right, not how fast it can do them. For example, `oinone-action-service-rules` is a basic rule to let AI finish writing the business logic. At this time, the created `action` does not comply with the Oinone specifications. `oinone-action-ux-rules` lists the specifications of `Action` under various front-end interaction scenarios on this basis to further correct the specifications of `action`. `oinone-action-exception-rules` is the final exception handling specification.