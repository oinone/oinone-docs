---
title: Git Guidelines
index: true
category:
  - Contribution Manual
  - R&D Contribution
order: 1
prev:
  text: Contributor License Agreement Template
  link: /v6/en/Contribute/cla.md
---

#### 1. **Code Submission Specifications**

``` markdown
# Oinone Code Submission Specifications
- **Branch Naming**:
  - `feature/[module-name]-[feature-brief]` (e.g., `feature/auth-oauth2-support`)
  - `bugfix/[Issue-number]-[issue-brief]` (e.g., `bugfix/#123-login-error`)
- **Commit Message Format**:
```

[Type]: [Module] Description
Example:
feat(auth): Add OAuth2.0 authentication support
fix(core): Fix thread pool memory leak issue (#456)

``` markdown
- **Type Tags**: `feat|fix|docs|style|refactor|test|chore`
```

#### 2. **Issue Template Example**

``` markdown
# Bug Report
## Environment
- Oinone Version: [e.g., v1.2.0]
- Deployment Method: [monolithic/microservice]
- Reproduction Steps:
  1. [Step 1]
  2. [Step 2]
## Expected Behavior
[Describe the expected performance]
## Actual Behavior
[Describe the error phenomenon]

# Feature Request
## Requirement Background
[Explain the business scenario or pain point]
## Suggested Solution
[Can describe the technical implementation idea]
```

#### 3. **PR Review Process**

``` markdown
# Oinone PR Review Rules
1. **Admission Conditions**:
   - Pass basic CI tests (unit test coverage ≥80%).
   - Associate at least one Issue number.
2. **Review Process**:
   - **Initial Review**: Community maintainers check code style and documentation completeness.
   - **Technical Re-review**: Core committee members (more than 2 people) verify architectural rationality.
   - **Merger Decision**: At least 2 "Approve" are required for merging.
3. **Dispute Handling**:
   - Technical disputes are submitted to the community committee for voting, and a conclusion should be given within 3 days.
```