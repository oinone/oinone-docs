---
title: 平台错误码（Error Codes）
index: true
category:
  - 研发手册
  - Reference
order: 6
next:
  text: 研发范式：研发流程
  link: /zh-cn/DevManual/R&DParadigm/R&D-paradigm-R&D-process.md
---
## 一、平台内置错误码

| 工程名                                | 区段开始 | 异常数据字典所在类                                           |
| ------------------------------------- | :------- | ------------------------------------------------------------ |
| pamirs-meta-model                     | 10001000 | pro.shushi.pamirs.meta.enmu.MetaExpEnumerate                 |
| pamirs-meta-dsl                       | 10002000 | pro.shushi.pamirs.meta.dsl.enumeration.DslExpEnumerate       |
| pamirs-framework-common               | 10003000 | pro.shushi.pamirs.framework.common.emnu.FwExpEnumerate       |
| pamirs-framework-configure-annotation | 10004000 | pro.shushi.pamirs.framework.configure.annotation.emnu.AnnotationExpEnumerate |
| pamirs-framework-compare              | 10005000 | pro.shushi.pamirs.framework.configure.db.enmu.MetadExpEnumerate |
| pamirs-framework-compute              | 10006000 | pro.shushi.pamirs.framework.compute.emnu.ComputeExpEnumerate |
| pamirs-framework-compare              | 10007000 | pro.shushi.pamirs.framework.compare.emnu.CompareExpEnumerate |
| pamirs-framework-faas                 | 10008000 | pro.shushi.pamirs.framework.faas.enmu.FaasExpEnumerate       |
| pamirs-framework-orm                  | 10009000 | pro.shushi.pamirs.framework.orm.enmu.OrmExpEnumerate         |
| pamirs-framework-data                 | 10010000 | pro.shushi.pamirs.framework.connectors.data.enmu.DataExpEnumerate |
| pamirs-connectors-data-dialect        | 10011000 | pro.shushi.pamirs.framework.connectors.data.dialect.enmu.DialectExpEnumerate |
| pamirs-connectors-data-sql            | 10012000 | pro.shushi.pamirs.framework.connectors.data.sql.enmu.SqlExpEnumerate |
| pamirs-connectors-data-ddl            | 10013000 | pro.shushi.pamirs.framework.connectors.data.ddl.enmu.DdlExpEnumerate |
| pamirs-connectors-data-infrastructure | 10014000 | pro.shushi.pamirs.framework.connectors.data.infrastructure.enmu.InfExpEnumerate |
| pamirs-connectors-data-tx             | 1001500  | pro.shushi.pamirs.framework.connectors.data.tx.enmu.TxExpEnumerate |
| pamirs-gateways-rsql                  | 10016000 | pro.shushi.pamirs.framework.gateways.rsql.enmu.RsqlExpEnumerate |
| pamirs-gateways-graph                 | 10017000 | pro.shushi.pamirs.framework.gateways.graph.enmu.GqlExpEnumerate |
| pamirs-boot-api                       | 10018000 | pro.shushi.pamirs.boot.common.enmu.BootExpEnumerate          |
| pamirs-boot-ui                        | 10019000 | pro.shushi.pamirs.boot.web.enmu.BootUxdExpEnumerate          |
| pamirs-boot-standard                  | 10020000 | pro.shushi.pamirs.boot.standard.enmu.BootStandardExpEnumerate |
| pamirs-meta-ui-model                  | 10021000 | pro.shushi.pamirs.boot.base.enmu.BaseExpEnumerate            |
| pamirs-distribution-id                | 10022000 | pro.shushi.pamirs.sid.enmu.SidExpEnumerate                   |
| pamirs-resource                       | 10023000 | pro.shushi.pamirs.resource.api.enmu.ExpEnumerate             |
| pamirs-sys-setting                    | 10024000 | pro.shushi.pamirs.sys.setting.enmu.HomePageExpEnumerate      |
| pamirs-third-party-map                | 10025000 | pro.shushi.pamirs.core.thirdParty.map.api.emun.ThirdPartyMapExpEnumerate |
| pamirs-file2                          | 10026000 | pro.shushi.pamirs.file.api.enmu.FileExpEnumerate             |
| pamirs-designer-metadata              | 10028000 | pro.shushi.pamirs.dmeta.enmu.DMetaExp                        |
| pamirs-channel                        | 10032000 | pro.shushi.pamirs.channel.enmu.ChannelExpEnumerate           |
| pamirs-tenants-ee                     | 10033000 | pro.shushi.pamirs.tenants.api.enmu.TenantsExp                |
| pamirs-resource                       | 10035000 | pro.shushi.pamirs.resource.api.enmu.ResourceEnumerate        |
| pamirs-eip2                           | 10036000 | pro.shushi.pamirs.eip.jdbc.enumeration.EipJdbcExpEnumeration |
| pamirs-paas                           | 10037000 | pro.shushi.pamirs.paas.enmu.PaasExp                          |
| pamirs-dataflow-designer              | 10038000 | DataflowDesignerExpEnumerate                                 |
| pamirs-apps                           | 10040000 | pro.shushi.pamirs.apps.api.enmu.AppsExpEnumerate             |
| pamirs-sso                            | 10041000 | pro.shushi.pamirs.sso.api.enmu.SsoExpEnumerate               |
| pamirs-metadata-manager               | 10042000 | pro.shushi.pamirs.metadata.manager.enmu.MetaManagerExp       |
| pamirs-connectors-event               | 10043000 | pro.shushi.pamirs.framework.connectors.event.enumeration.EventExpEnum |
| pamirs-expression                     | 10044000 | pro.shushi.pamirs.expression.enmu.ExpressionExpEnumerate     |
| pamirs-boot-ui                        | 10045000 | pro.shushi.pamirs.boot.web.enmu.SharedExpEnumerate           |
| pamirs-data-audit-ee                  | 10046000 | pro.shushi.pamirs.data.audit.api.enumeration.DataAuditExpEnumerate |
| pamirs-sequence-generator             | 10047000 | pro.shushi.pamirs.sequence.enmu.ExpEnumBid                   |
| pamirs-business                       | 10048000 | pro.shushi.pamirs.business.api.enumeration.BusinessExpEnumerate |
| pamirs-web                            | 10049000 | pro.shushi.pamirs.web.enmu.WebExpEnumerate                   |
| pamirs-trigger                        | 10050000 | pro.shushi.pamirs.trigger.enmu.TriggerExpEnumerate           |
| pamirs-eip2                           | 10051000 | pro.shushi.pamirs.eip.api.enmu.EipExpEnumerate               |
| pamirs-translate                      | 10052000 | pro.shushi.pamirs.translate.enmu.TranslateEnumerate          |
| pamirs-workflow                       | 10053000 | pro.shushi.pamirs.workflow.app.api.enumeration.WorkflowExpEnumerate |
| pamirs-cicd                           | 10054000 | pro.shushi.pamirs.cicd.api.enumeration.CicdExpEnumerate      |
| pamirs-eip-designer                   | 10055000 | pro.shushi.pamirs.designer.eip.enmu.EipDesignerExp           |
| pamirs-print-ee                       | 10056000 | pro.shushi.pamirs.print.api.exception.PdfDocumentErrorEnum   |
| pamirs-core-common                    | 10057000 | pro.shushi.pamirs.core.common.enmu.CommonExpEnumerate        |
| pamirs-flow-designer-base             | 10058000 | pro.shushi.pamirs.flow.designer.base.api.enumeration.WorkflowDesignerBaseExpEnumerate |
| pamirs-connectors-cdn                 | 10059000 | pro.shushi.pamirs.framework.connectors.cdn.enmu.CDNExpEnum   |
| pamirs-message                        | 10060000 | pro.shushi.pamirs.message.enmu.MessageExpEnumerate           |
| pamirs-data-visualization             | 10062000 | pro.shushi.pamirs.data.visualization.api.enumeration.DataVisualizationExpEnumerate |
| pamirs-third-party-communication      | 10063000 | pro.shushi.pamirs.core.thirdParty.communication.api.wechat.exception.WeChatAppExpEnumerate |
| pamirs-auth3                          | 10064000 | pro.shushi.pamirs.auth.api.enumeration.AuthExpEnumerate      |
| pamirs-model-designer                 | 10065000 | pro.shushi.pamirs.model.designer.enmu.ModelDesignerExp       |
| pamirs-third-party-communication      | 10066000 | pro.shushi.pamirs.core.thirdParty.communication.api.emun.ThirdPartyExpEnumerate |
| pamirs-data-designer                  | 10067000 | pro.shushi.pamirs.data.designer.api.enumeration.DataDesignerExp |
| pamirs-fusion                         | 10068000 | pro.shushi.pamirs.fusion.enmu.GeneratorCodeExp               |
| pamirs-ai-base                        | 10071000 | pro.shushi.pamirs.ai.enmu.AiExp                              |
| pamirs-ui-designer                    | 10072000 | pro.shushi.pamirs.ui.designer.exp.UiDesignerViewExpEnumerate |
| pamirs-print-designer                 | 10073000 | pro.shushi.pamirs.designer.print.api.enmu.PrintDesignerExpEnumerate |
| pamirs-designer-common                | 10074000 | pro.shushi.pamirs.designer.common.enmu.DesignerCommonExp     |
| pamirs-distribution                   | 10076000 | pro.shushi.pamirs.distribution.session.enmu.DistSessionExp   |


## 二、业务错误码

业务项目中定义错误码，建议参照功能模块规划，划分不同的编码段。

:::info 注意

实际业务项目中，建议错误码使用 30000000 以上编码。

:::















