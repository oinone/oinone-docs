---
title: Git guidelines
index: true
category:
  - 贡献手册
  - 研发贡献
order: 1
prev:
  text: 贡献者许可协议模板
  link: /zh-cn/Contribute/cla.md
---
#### 1. **代码提交规范**

```markdown
# Oinone 代码提交规范
- **分支命名**：
  - `feature/[模块名]-[功能简述]`（如 `feature/auth-oauth2-support`）
  - `bugfix/[Issue编号]-[问题简述]`（如 `bugfix/#123-login-error`）
- **Commit Message格式**：
```

[类型]: [模块] 描述
示例:
feat(auth): 新增OAuth2.0认证支持
fix(core): 修复线程池内存泄漏问题 (#456)

```markdown
- **类型标签**：`feat|fix|docs|style|refactor|test|chore`
```

#### 2. **Issue模板示例**

```markdown
# Bug Report
## 环境
- Oinone版本: [如v1.2.0]
- 部署方式: [单体/微服务]
- 复现步骤:
  1. [步骤1]
  2. [步骤2]
## 预期行为
[描述应有表现]
## 实际行为
[描述错误现象]

# Feature Request
## 需求背景
[说明业务场景或痛点]
## 建议方案
[可描述技术实现思路]
```

#### 3. **PR审核流程**

```markdown
# Oinone PR审核规则
1. **准入条件**：
   - 通过基础CI测试（单元测试覆盖率≥80%）。
   - 关联至少一个Issue编号。
2. **审核流程**：
   - **初审**：社区维护者检查代码风格、文档完整性。
   - **技术复审**：核心委员会成员（2人以上）验证架构合理性。
   - **合并决策**：需至少2个“Approve”方可合并。
3. **争议处理**：
   - 技术分歧提交至社区委员会投票，需3日内给出结论。
```

