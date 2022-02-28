<template>
  <div class="searchFrom">
    <div class="header">
      <slot name="title"></slot>
    </div>

    <my-form :formData="formData" :labelWidth="labelWidth"></my-form>

    <div class="footer">
      <div v-if="isShowDefaultBtns">
        <el-row type="flex" justify="end" class="footer-btns">
          <el-button>清空</el-button>
          <el-button type="primary">查询</el-button>
          <slot name="footer"></slot>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  defineComponent,
  ref,
  computed,
  onMounted,
  watch,
  defineProps
} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import myForm from '@/components/my-form.vue'

const props = defineProps({
  formData: Object,
  labelWidth: String,
  isShowDefaultBtns: Boolean
})
</script>

<style lang="scss" scoped>
.searchFrom {
  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  .header {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
  }
  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }
  .footer-btns {
    margin-right: 10px;
  }
}
</style>
