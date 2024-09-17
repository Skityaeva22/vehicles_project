<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import NavigationMenu from "./NavigationMenu.vue";
import NavigationHeader from "./NavigationHeader.vue";
import { ROUTER_NAMES } from "@/shared/router/routes";

const router = useRouter();

onMounted(() => {
  router.push({ name: ROUTER_NAMES.VEHICLES });
});
</script>

<template>
  <div class="page">
    <NavigationMenu />
    <div class="main-block">
      <NavigationHeader />
      <div class="route-pages">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page {
  display: flex;
  height: 100vh;
}

.main-block {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: auto;
  width: 100%;
}

.route-pages {
  padding-bottom: auto;
  padding: 30px;
  height: 100%;
}
</style>
