<template>
  <el-header>
    <el-dropdown>
      <el-icon style="margin-right: 15px"></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>View</el-dropdown-item>
          <el-dropdown-item>Add</el-dropdown-item>
          <el-dropdown-item>Delete</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>Tom</span>
  </el-header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";

export default defineComponent({});
</script>

<style lang="sass"></style>
