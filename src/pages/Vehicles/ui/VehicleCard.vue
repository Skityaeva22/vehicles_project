<script setup>
import SuccessIcon from "@/assets/icons/SuccessIcon.vue"
import { defineProps } from "vue";

const props = defineProps({
  vehicle: Object
})

function getVINText(vehicle) {
  if (!vehicle?.vin_postfix && !vehicle?.vin)
    return 'WDB 1400321A333419'

  if (vehicle?.vin_postfix && vehicle?.vin)
    return `${vehicle.vin_postfix} ${vehicle.vin}`
  else if (!vehicle?.vin_postfix && vehicle?.vin)
    return `${vehicle.vin}`
  else return `${vehicle.vin_postfix}`
}
</script>

<template>
  <ElCard
    shadow="never"
    style="width: 354px; height: 335px"
  >
    <div class="more-icon">
      <ElIcon :size="24" color="#29314899">
        <MoreFilled />
      </ElIcon>
    </div>
    <div class="card-main-content">
      <div
        style="
          padding-bottom: 10px;
          display: flex;
          justify-content: center;
        "
      >
        <ElImage
          :src="props.vehicle?.photo?.url"
          class="image"
        >
          <template #error>
            <ElIcon :size="30" color="#29314899"><Picture /></ElIcon>
          </template>
        </ElImage>
      </div>
      <p class="card-header">
        {{ props.vehicle?.vehicle_name ?? 'Mercedes-Benz C-Class' }}
      </p>
      <p class="card-description">
        {{ getVINText(props.vehicle) }}
      </p>
      <ElDivider />
      <div class="card-space">
        <ElTag v-if="props.vehicle?.angles_count === 30" color="#E4F5DD" type="info">
          <p class="tag-success" type="success">
            <ElIcon :size="16"><SuccessIcon /></ElIcon>
            <span>{{ props.vehicle?.angles_count }}/30</span>
          </p>
        </ElTag>
        <ElTag v-else color="#EDEDED" type="info">
          <span class="tag-info">{{ props.vehicle?.angles_count }}/30</span>
        </ElTag>
        <span class="card-footer-text">3 days left</span>
      </div>
    </div>
  </ElCard>
</template>

<style lang="scss">
.more-icon {
  display: flex;
  justify-content: end;
}

.card-main-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.image {
  width: 260px;
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card-header {
  color: #293148;
  font-size: 20px;
  line-height: 22px;
  font-weight: 700;
}

.card-description {
  color: #29314899;
  font-size: 15px;
  line-height: 20px;
  font-weight: 500;
}

.card-space {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.tag-info {
  font-size: 15px;
  line-height: 22px;
  font-weight: 700;
  color: #293148cc;
}

.tag-success {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 15px;
  line-height: 22px;
  font-weight: 700;
  color: #7fc75e;
}

.card-footer-text {
  color: #29314899;
  font-size: 15px;
  line-height: 16px;
  font-weight: 500;
}
</style>
