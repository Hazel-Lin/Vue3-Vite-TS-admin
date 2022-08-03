### 筛选项组件封装 My-Search

#### 指引介绍
该组件包括三个部分：标题 + 表单项 + 表单按钮。其中，标题可选并且可选择是否使用默认按钮 `清空`和`查询`
渲染输入配置项中的每一个表单项，包含常用表单项：
* input
* select
* date-picker
选择某一天
选择一段时间

#### 使用
el-form
labelWidth：控制标签的长度

el-form-item
formData： 渲染表单的配置数据

formData-item：表单项中的每一项内容
type：表单类型
label：表单名称
placeholder：占位符
clearable: 是否清空
disabled： 是否禁用
补充：筛选项是否必填
