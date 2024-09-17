<script setup>
import PlusIcon from "@/assets/icons/PlusIcon.vue";
import AvatarIcon from "@/assets/icons/AvatarIcon.vue";
import FlagIcon from "@/assets/icons/FlagIcon.vue";
import { useRoute } from "vue-router";
import { useVehiclesStore } from "@/store/vehicles-store";
import { storeToRefs } from "pinia";

const vehiclesStore = useVehiclesStore();
const { totalVehiclesCount } = storeToRefs(vehiclesStore);

const route = useRoute();
</script>

<template>
  <div class="header">
    <div class="part">
      <span class="route-header"> {{ route?.meta?.title }} </span>
      <ElTag v-if="totalVehiclesCount" type="info">
        <span class="tag">{{ totalVehiclesCount }}</span>
      </ElTag>
    </div>
    <div class="part">
      <ElButton class="button-plus">
        <ElIcon color="#E86E84" :size="24"><PlusIcon /></ElIcon>
      </ElButton>
      <div class="part-inside">
        <ElAvatar :size="46">
          <AvatarIcon />
        </ElAvatar>
        <span>John Doe</span>
      </div>
      <div class="part-inside">
        <ElAvatar :size="24">
          <FlagIcon />
        </ElAvatar>
        <span>En</span>
        <ElIcon color="#29314899">
          <ArrowDownBold />
        </ElIcon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  padding: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e4e4e4;
}

.part {
  display: flex;
  gap: 30px;
  align-items: center;
}

.route-header {
  font-size: 32px;
  line-height: 38px;
  font-weight: 700;
}

.tag {
  font-size: 15px;
  line-height: 22px;
  font-weight: 700;
  color: #293148;
}

.button-plus {
  width: 42px;
  height: 42px;
  border-color: #e86e84;
  border-radius: 6px;
}

.el-button {
  padding: 0;
}

.part-inside {
  display: flex;
  gap: 15px;
  align-items: center;
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
}
</style>
