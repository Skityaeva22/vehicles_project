<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserIcon from "@/assets/icons/UserIcon.vue";
import VehiclesIcon from "@/assets/icons/VehiclesIcon.vue";
import SettingsIcon from "@/assets/icons/SettingsIcon.vue";
import MenuPicture from "@/assets/pictures/MenuPicture.vue";
import { ROUTER_NAMES } from "@/shared/router/routes";

const route = useRoute();
const router = useRouter();
const activePage = ref("");

function handleGoTo(name) {
  activePage.value = name;
  router.push({ name });
}

onMounted(() => {
  if (route.path.includes("vehicles")) activePage.value = ROUTER_NAMES.VEHICLES;
});
</script>

<template>
  <ElMenu :default-active="activePage" @select="handleGoTo">
    <h2 class="menu-header">Demo Test</h2>
    <ElMenuItem :index="ROUTER_NAMES.MAIN">
      <ElIcon :size="24">
        <UserIcon />
      </ElIcon>
      <span class="item-text">Profile</span>
    </ElMenuItem>
    <ElMenuItem :index="ROUTER_NAMES.VEHICLES">
      <ElIcon :size="24">
        <VehiclesIcon />
      </ElIcon>
      <span class="item-text">Vechicles</span>
    </ElMenuItem>
    <ElMenuItem :index="ROUTER_NAMES.MAIN">
      <ElIcon :size="24">
        <SettingsIcon />
      </ElIcon>
      <span class="item-text">Setting</span>
    </ElMenuItem>
    <MenuPicture style="margin-top: auto" />
  </ElMenu>
</template>

<style scoped lang="scss">
.el-menu {
  display: flex;
  flex-direction: column;
  height: 100vh !important;
  width: 256px;
  background-color: #282828;
}

.menu-header {
  display: flex;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 24px;
  line-height: 24px;
  width: 256px;
  padding-bottom: 40px;
  padding-top: 10px;
}

.item-text {
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
}
</style>
