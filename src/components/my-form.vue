<template>
  <div class="content">
    <el-form :label-width="labelWidth">
      <el-row :gutter="20">
        <template v-for="(item, index) in formData" :key="index">
          <el-col :span="6">
            <el-form-item :label="item.label">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="item.value"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select v-model="item.value" :placeholder="item.placeholder">
                  <el-option
                    v-for="item in item.selectOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
  </div>
</template>

<script setup lang="ts">
/**
 * 封装一个form表单选项作为基础数据配置
 * 包含input select等其他选项 查询与清空两个常用按钮
 * 其次可能会包含title 和 footer中的其他按钮选项
 */
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  defineProps
} from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  formData: Array,
  labelWidth: String
})
</script>

<style lang="scss" scoped>
.content{
  padding: 10px;
}
</style>
