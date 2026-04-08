---
title: 角色与权限
index: true
category:
  - 用户手册
order: 4
next:
  text: 工作流
  link: /zh/UserManual/StandardModules/workflow.md
---
# 一、角色类型
### 1.功能介绍
支持对用户角色进行分类和管理的功能，可以根据公司的业务需求进行灵活定制，如管理员、普通用户、访客等。

### 2.操作方法
+ 筛选：根据实际场景需求，输入或选择相应的筛选条件，即可对角色类型进行筛选。
+ 新增：点击「创建」，输入所需的配置信息并保存，即可成功创建新的角色类型。
+ 删除：选中某一角色类型后，点击「删除」，即可将该角色类型删除。
+ 导入：支持利用文件导入角色类型信息，可下载导入模板，当信息填写完整后上传文件完成导入
+ 导出：支持导出角色类型，可以选择使用预设的导出模板，也可以根据实际需求自定义导出字段
+ 编辑：点击「编辑」，即可对角色类型的相关信息进行更新或修改。
+ 详情：点击「详情」，可查看所选角色类型的详细信息。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jslx.png)

# 二、角色管理
### 1.功能介绍
角色管理是权限系统中的核心基础功能，负责具体角色的创建、维护与管理。它支持对角色进行细致的权限配置，以确保每个角色都拥有合适的访问和操作权限。

:::info 注意

要想使资源管理权限生效，首先该角色需要具备“管理中心”的访问权限

:::

在权限配置中，包括四大权限，分别为资源访问权限、资源管理权限、字段权限与数据权限

+ 资源访问权限：获得访问权限的角色可以访问选定的应用程序或菜单的权限

:::info 注意

若仅对二级菜单进行了权限授权，而未对相应的一级菜单进行授权，则即使拥有二级菜单的权限，也无法进行访问。

:::

+ 资源管理权限：获得管理权限的角色能够进一步将管理权限授权给其他用户，可以向下分配

:::info 注意

+ 如果为应用授予了管理权限，则该应用下的所有菜单也会被授予管理权限。此外，也可以单独为某个应用下的特定菜单授予管理权限
+ 平台采用了父子节点独立管理的权限控制方式，为用户提供了更大的灵活性。鉴于父子节点不联动的特点，系统特别增设了“全选”功能，以简化权限配置过程，避免逐一勾选的繁琐操作，从而显著提高权限配置的效率。
+ 当我们在“系统权限”中为应用或菜单对权限进行调整时，所做的更改会同步至在“角色管理”的权限配置。而所在“角色管理”中对权限进行修改，系统不会将更改同步至“系统权限”的权限配置。

:::

:::tip 举例

在“系统权限”菜单中选择了某个应用，并在该应用的“访问权限”权限组中添加了一个名为“测试专用”的角色。随后，进入“角色管理”中的“权限配置”模块进行修改操作，看看会产生什么效果。

+ 首先，我们在“系统权限”中为“资源-地址库-地区”添加“测试专用”角色。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl1.png)

+ 然后，进入“角色管理”模块，找到“测试专用”角色并点击「权限配置」，此时可以看到该角色在“资源-地址库-地区”已经拥有访问权限。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl2.png)

+ 接着，在“角色管理”中进行修改操作，比如勾选“国家分组”的访问权限。完成后，返回“系统权限”查看。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl3.png)

+ 发现，刚刚添加的“测试专用”角色已经从“系统权限”中移除。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl4.png)

这是因为系统不会将角色维度的权限修改同步回菜单维度，而是直接移除该角色，以确保权限配置的准确性和一致性。

:::

+ 字段权限：可以查看并管理某个角色所有的模型及其字段权限。系统提供了两个便于查找的搜索框：
    - 搜索框 1：允许用户根据模型的编码或名称进行快速搜索，方便定位特定的模型。
    - 搜索框 2：用户可以根据权限状态筛选模型，选择显示角色拥有权限的模型或查看系统中全部模型。

使用这两个搜索框可以快速查找并修改相关模型或字段的权限，包括其读权限与写权限。

+ 数据权限：指为特定角色设定数据权限项，可依据实际需求过滤模型中的字段，让不同角色的用户可以获取到不同的信息。

:::info 注意

数据权限项可在「管理中心-角色与权限-数据权限项」中进行管理与维护

:::

:::warning 提示

系统提供两种为角色设置数据权限的途径：

+ 在「角色管理」中，可在“权限配置-数据权限”中为特定角色配置数据权限项
+ 在「数据权限」中，可为为一个或多个用户快速配置数据权限项

:::

### 2.操作方法
+ 筛选：根据实际场景需求，输入或选择相应的筛选条件，即可对具体角色进行筛选。
+ 新增：点击「创建」，输入所需的配置信息并保存，即可成功创建新的具体角色。
+ 编辑：点击「编辑」，即可对具体角色的相关信息进行更新或修改。
+ 禁用/启用：角色不再使用时，点击「禁用」即可停用；需重新使用时，点击「启用」即可恢复。
+ 用户管理：点击「用户管理」或选中角色后点击「绑定用户」，可为选中角色统一配置多个用户
+ 权限配置：点击「权限配置」，可查看和配置该角色的各类权限

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/jsgl5.png)

# 三、系统权限
### 1.功能介绍
在权限管理中可以为应用或菜单配置权限，包括管理权限与访问权限

+ 管理权限：赋予选定角色对当前应用/菜单的全面管理权限，包括向下分配权限的能力，确保角色能够充分管理和维护应用/菜单。
+ 访问权限：允许选定角色访问当前应用/菜单，确保其能够执行相应的操作和功能。访问权限可配置多个权限组，不同权限组可授权给不同角色。

:::info 注意

+ 当拥有了应用的管理权限时，该应用下的所有菜单也会被授予管理权限。此外，也可以单独为某个应用下的特定菜单授予管理权限。
+ 当为某一菜单指定了具备该资源管理权限的角色后，即便该角色并未拥有菜单所属应用的管理权限，仍然可以在管理中心为该菜单进一步分配下属权限。
+ 拥有访问权限并不代表拥有管理权限，同理，拥有管理权限也不代表拥有访问权限。这两种权限需要单独授权。二者并无直接关系。

:::

+ 收集权限项：当平台提供的各大设计器（包括模型设计器、界面设计器、流程设计器、集成设计器、数据可视化、微流设计器）中有增加或升级功能，可一键为用户设计器赋予新功能权限。

:::info 注意

仅平台设计器支持收集权限项，其他应用或模块暂不支持。

:::

### 2.操作方法
+ 应用
    - 配置管理权限：选中应用，在“管理应用”中添加相应的角色，被添加的角色即拥有了该应用的管理权限
    - 配置访问权限：选中应用，在“访问应用”中添加相应的角色，被添加的角色即拥有了该应用的访问权限

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/xt1.png)

+ 菜单
    - 配置管理权限：选中菜单，在“管理资源”中添加相应的角色，被添加的角色即拥有了该菜单的管理权限
    - 配置访问权限：
        * 添加：选中菜单，为其添加权限组，在权限组中可为其设置菜单中的动作权限、字段权限、数据权限，配置完成后点击「确定」即可添加添加一个权限组，在该权限组中添加角色，被添加的角色即拥有了权限组中配置的权限。
        :::info 注意
        1. 动作权限：可自定义该权限组包含菜单下有哪些动作的操作权限。未遵循Oinone的Action研发规范的Action将不受权限管控。
        2. 字段权限：可自定义菜单关联主模型的字段权限。需特别注意的是，只有先关闭“全部”选项中的对应开关，下列字段的特定权限设置才会生效。

        ![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/xtqx-zdqx.png)

        3. 数据权限：可自定义过滤条件来设置当前权限组拥有的数据权限，若未设置，将视为拥有全部数据权限。在此处自动生成的数据权限项，可在绑定的角色（角色管理-权限配置-数据权限）中查看

        :::
        * 编辑：支持对已有权限组的相关信息与权限进行更新与修改
        * 删除：支持删除不再需要的权限组
        * 禁用/启用：权限组不再使用时，关闭开关即可停用；需重新使用时，打开开关即可恢复。


![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/xt2.png)

+ 批量授权：点击「批量设置」，选择单个或多个应用或菜单为其添加角色，以授予相应的访问权限。完成添加操作后点击「取消批量」

:::info 注意

+ 批量授权仅能为应用或菜单添加访问权限
+ 在批量授权的过程中，平台会自动创建一个默认权限组，这个权限组赋予了用户管理所有数据以及当前菜单下所有管理权限的能力。
+ 默认权限组只会在首次创建时遵循当时的动作权限规则。如果后续再次进行批量操作，则不会再重新创建默认权限组，而是利用首次创建的默认权限组，沿用之前的动作权限。

:::

+ 收集新权限：点击「收集新权限」，即可为设计器增加新功能权限

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/xt3.png)

# 四、数据权限
### 1.功能介绍
可以为角色设定数据权限项，可依据实际需求过滤模型中的字段，让不同角色的用户可以获取到不同的信息。

:::info 注意

+ 角色可在「管理中心-角色与权限-角色管理」中进行管理与维护
+ 数据权限项可在「管理中心-角色与权限-数据权限项」中进行管理与维护

:::

### 2.操作方法
+ 筛选：根据实际场景需求，输入或选择相应的筛选条件，即可对数据权限进行筛选。
+ 新增：点击「创建」，输入所需的配置信息并保存，即可成功创建新的数据权限。
+ 编辑：点击「编辑」，即可对数据权限的相关信息进行更新或修改。
+ 详情：点击「详情」，可查看所选数据权限的详细信息。
+ 禁用/启用：当数据权限不再使用时，点击「禁用」即可停用；需重新使用时，点击「启用」即可恢复。
+ 删除：选中某一数据权限后，点击「删除」，即可将该数据权限删除。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sjqx.png)

# 五、数据权限项
### 1.功能介绍
可以为模型中的字段配置特定的过滤条件，从而确定其数据权限范围。

### 2.操作方法
+ 筛选：根据实际场景需求，输入或选择相应的筛选条件，即可对数据权限进行筛选。
+ 新增：点击「创建」，输入所需的配置信息并保存，即可成功创建新的数据权限。
+ 编辑：点击「编辑」，即可对数据权限的相关信息进行更新或修改。
+ 详情：点击「详情」，可查看所选数据权限的详细信息。
+ 删除：选中某一数据权限后，点击「删除」，即可将该数据权限删除。

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/sjqxx.png)

# 六、角色权限示例
配置一个“管理员”角色，该角色含有以下功能：

+ 管理权限向下分配能力：管理员可以向下分配管理权限，包括向其他角色授予或取消某应用、菜单或首页的管理权限。
+ 访问权限：管理员被授予访问权限，可以访问平台中指定的应用、菜单或首页。

:::info 注意

管理员必须拥有“管理中心”的管理权限与访问权限

:::

1. 创建一个名为“管理员”的角色

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/1751506733584-40b33d48-f747-451d-a8bd-62e2d85e97b0-20250703103110668.png)

2. 将“管理员”角色绑定给某一用户，使其拥有对应权限

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/1751506950254-f77fa006-1506-4cdf-8a1c-fee125244fda-20250703103117248.png)

3. 为“管理员”分配某一应用的管理权限（访问权限同理）

+ 方法一：通过系统权限分配权限

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/1751507358794-e885479d-697c-4c7a-ab4e-c4264d6a0a8c.png)![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/1751507422796-ccd22d8c-99cb-4649-a9ef-2c2cd55fcbea.png)

+ 方法二：通过角色管理-权限配置分配权限

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/1751507645341-2614432b-2fe7-4d37-8baa-b30acb994071.png)

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/1751507911213-faca67d5-7ea0-4847-986f-19bd6802fc9d.png)

:::warning 提示

两种权限配置方法均可完成权限设置，您可根据实际使用习惯选择：

+ 新增角色时，通过「角色管理 - 权限配置」操作更高效；
+ 若角色配置已基本定型，仅需新增应用或菜单权限，使用「系统权限」操作更快捷。

:::

4. 登录“管理员”所属用户，可继续向下分配管理权限和访问权限

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/standard%20module/Management%20Center/Roles%20and%20Permissions/1751509717168-a68e9938-9bb0-44d4-9da8-016bba8129f2.png)

至此，成功完成对“管理员”的角色权限配置，“管理员”可依循相同步骤，继续向下分配权限

