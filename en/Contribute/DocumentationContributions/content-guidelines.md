---
title: Content Guidelines
index: true
category:
  - Contribution Manual
  - Documentation Contribution
order: 1
prev:
  text: Documentation Contribution
  link: /en/Contribute/DocumentationContributions/README.md
next:
  text: Software Licenses and Agreements
  link: /en/software-licenses.md
---

#### **Ⅰ、Documentation Types and Corresponding Templates**

##### **1. User Guides (for End Users)**

**Template Example** (Markdown format):

``` markdown
# [Feature Name] User Guide
## Overview
- **Function Positioning**: One-sentence description of purpose (e.g., "Used to implement cross-department approval process configuration").
- **Application Scenarios**: List typical usage scenarios (e.g., "Financial reimbursement, procurement applications").

## Quick Start
### Prerequisites
- Oinone version ≥ v6.0.0
- Installed [Dependent Module]

### Operation Steps
1. **Step 1**: Access the feature entry
   - Path: `Console > Process Management > New Process`
2. **Step 2**: Configure process rules
   ``` yaml
   # Example configuration
   nodes:
     - type: approval
       role: finance
3. **Step 3**: Save and publish
```

##### **2. Technical White Papers (for Developers/Architects)**

##### **3. API Documentation (for Integration Developers)**

#### **Ⅱ、Documentation Contribution Process**

##### **1. Contribution Flowchart**

![](https://oinone-jar.oss-cn-zhangjiakou.aliyuncs.com/welcome-document/Development/CommonSolutions/fbb9cab2c5882cefa4327414b952426d.svg)

##### **2. Step-by-Step Process Description**

**Step 1: Create an Issue**

+ **Template Selection**: Choose the "Documentation Improvement" template on the Issue page of the Gitee/GitHub repository.
+ **Filling Specifications**:

``` markdown
## Documentation Type
[User Guide/Technical White Paper/API Documentation]

## Modification Scope
- New: [Title of the new document]
- Revision: [Original document path]

## Requirement Background
[E.g., "Users feedback that the existing approval process documentation lacks screenshot instructions"]
```

**Step 2: Claim the Task**

+ Community maintainers mark the Issue as `To be Claimed`, and contributors reply "/assign" in the comments to claim it.
+ After claiming, the Issue status changes to `In Progress`, and it will be automatically released if no PR is submitted within 48 hours.

**Step 3: Write Documentation**

+ **Branch Rules**: Pull a new branch from the `main` branch, named `docs/[Issue Number]-[Brief Description]` (e.g., `docs/#45-auth-guide`).
+ **Local Validation**:
  - Use Markdown validation tools (such as Markdownlint) to ensure format compliance.
  - Run the documentation site generator for preview (such as VuePress).

**Step 4: Submit a PR**

+ **Title Format**: `docs: [Type] [Brief Description]` (e.g., `docs: User Guide Add Approval Process Configuration Instructions`).
+ **Associate Issue**: Mark `Fixes #45` in the PR description.

**Step 5: Review and Merge**

+ **Initial Review (within 24 hours)**:
  - **Format Check**: Table alignment, code block syntax, no broken links.
  - **Content Check**: Technical accuracy, term consistency (e.g., consistently use "module" instead of "component").
+ **Final Review (within 48 hours)**:
  - Core maintainers verify technical details and may require supplementary diagrams or test cases if necessary.
+ **Merge Rules**:
  - At least 1 maintainer approval (2 for large documents).
  - Automatically trigger CI checks (spelling verification, link validity).

#### **Ⅲ、Review Standards and Tools**

##### **1. Review Checklist**

| **Category**                                               | **Standard**                                                     |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| **Accuracy** | All technical descriptions are consistent with code behavior, without ambiguous expressions. |
| **Completeness** | User guides should cover the complete chain of "prerequisites-operation steps-examples-FAQ". |
| **Readability** | Paragraph length ≤ 5 lines, complex processes with flowcharts (PlantUML/Mermaid). |
| **Internationalization** | Chinese documents need to provide a glossary (Chinese-English comparison) for future translation. |


##### **2. Recommended Tools**

+ **Markdown Validation**: VS Code plugins `Markdown All in One` + `markdownlint`.
+ **Drawing Tools**: PlantUML (flowcharts), Draw.io (architecture diagrams).
+ **Local Preview**: VuePress local server for real-time rendering.