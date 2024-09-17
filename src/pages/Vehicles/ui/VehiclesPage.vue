<script setup>
import _ from "lodash";
import { onMounted, onUnmounted } from "vue";
import SearchIcon from "@/assets/icons/SearchIcon.vue";
import PlusIcon from "@/assets/icons/PlusIcon.vue";
import SuccessIcon from "@/assets/icons/SuccessIcon.vue"
import { useVehiclesStore } from "@/store/vehicles-store";
import { storeToRefs } from "pinia";

const vehiclesStore = useVehiclesStore();
const {
  vehicles,
  lastPage,
  isLoading,
  params,
  totalVehiclesCount,
  currentVehiclesCount,
} = storeToRefs(vehiclesStore);

const handleSearchVehicles = _.debounce(async () => {
  await vehiclesStore.fetchVehicles();
}, 500);

async function handleChangeParamsPerPage() {
  params.value.page = 1;
  await vehiclesStore.fetchVehicles();
}

function getVINText(vehicle) {
  if (!vehicle?.vin_postfix && !vehicle?.vin)
    return 'WDB 1400321A333419'

  if (vehicle?.vin_postfix && vehicle?.vin)
    return `${vehicle.vin_postfix} ${vehicle.vin}`
  else if (!vehicle?.vin_postfix && vehicle?.vin)
    return `${vehicle.vin}`
  else return `${vehicle.vin_postfix}`
}

onMounted(async () => {
  vehiclesStore.reset();
  await vehiclesStore.fetchVehicles();
});

onUnmounted(() => {
  vehiclesStore.reset();
})
</script>

<template>
  <div class="vehicles-page">
    <div class="page-space">
      <div class="part">
        <ElInput
          v-model="params.search"
          style="width: 354px; height: 42px"
          size="large"
          placeholder="Search VIN"
          :suffix-icon="SearchIcon"
          @input="handleSearchVehicles"
        />
        <div class="part-inside">
          <span>Select vehicles per page:</span>
          <ElSelect
            v-model="params.per_page"
            placeholder="Select"
            size="large"
            style="width: 85px; height: 42px"
            @change="handleChangeParamsPerPage"
          >
            <ElOption
              v-for="item in 20"
              :key="item"
              :label="item"
              :value="item"
            />
          </ElSelect>
        </div>
      </div>
      <ElButton color="#D90E32" class="button-add">
        <ElIcon color="#FFFFFF" :size="24">
          <PlusIcon />
        </ElIcon>
        <span>ADD VECHICLE</span>
      </ElButton>
    </div>
    <ElScrollbar style="padding-bottom: 30px">
      <ElSpace :loading="isLoading" wrap :size="30" class="space">
        <ElCard
          v-for="vehicle in vehicles"
          :key="vehicle.id"
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
                :src="vehicle?.photo?.url"
                class="image"
              >
                <template #error>
                  <ElIcon :size="30" color="#29314899"><Picture /></ElIcon>
                </template>
              </ElImage>
            </div>
            <p class="card-header">
              {{ vehicle?.vehicle_name ?? 'Mercedes-Benz C-Class' }}
            </p>
            <p class="card-description">
              {{ getVINText(vehicle) }}
            </p>
            <ElDivider />
            <div class="page-space">
              <ElTag v-if="vehicle?.angles_count === 30" color="#E4F5DD" type="info">
                <p class="tag-success">
                  <ElIcon :size="16"><SuccessIcon /></ElIcon>
                  <span>{{ vehicle?.angles_count }}/30</span>
                </p>
              </ElTag>
              <ElTag v-else color="#EDEDED" type="info">
                <span class="tag-info">{{ vehicle?.angles_count }}/30</span>
              </ElTag>
              <span class="card-footer-text">3 days left</span>
            </div>
          </div>
        </ElCard>
      </ElSpace>
    </ElScrollbar>
    <div>
      <div class="page-footer">
        <div class="page-space" style="width: 100%">
          <span class="footer-text">
            Showing {{ currentVehiclesCount }} out of {{ totalVehiclesCount }}
          </span>
          <div class="pagination-input">
            <ElIcon><ArrowLeftBold /></ElIcon>
            <ElInputNumber
              v-model="params.page"
              size="large"
              style="width: 32px; height: 32px"
              placeholder="1"
              :min="1"
              :max="lastPage"
              :controls="false"
              @input="handleSearchVehicles"
            />
            <span>of</span>
            <ElInputNumber
              v-model="lastPage"
              size="large"
              style="width: 32px; height: 32px"
              placeholder="1"
              disabled
              :controls="false"
            />
            <ElIcon><ArrowRightBold /></ElIcon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.vehicles-page {
  display: flex;
  flex-direction: column;
  gap: 30px;
  height: 100%;
  position: relative;
}

.page-space {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.button-add {
  width: 180px;
  height: 42px;
  border-radius: 6px;
  display: flex;
  justify-content: space-around;
}

.part {
  display: flex;
  gap: 30px;
  align-items: center;
}

.part-inside {
  display: flex;
  gap: 15px;
  align-items: center;
}

.el-button {
  padding: 0;
}

.more-icon {
  display: flex;
  justify-content: end;
}

.card-main-content {
  display: flex;
  flex-direction: column;
  gap: 15px;
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

.card-footer-text {
  color: #29314899;
  font-size: 15px;
  line-height: 16px;
  font-weight: 500;
}

.page-footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.footer-text {
  color: #293148cc;
}

.el-input--large .el-input__wrapper {
  font-size: 15px;
}

.pagination-input {
  display: flex;
  gap: 15px;
  align-items: center;

  .el-input--large .el-input__inner {
    display: flex;
    text-align: center;
  }

  .el-input--large .el-input__wrapper {
    padding: 0;
    background-color: white;
  }
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

.space {
  @media (319px<height<=650px) {
    height: 50vh;
  }

  @media (650px<height<=900px) {
    height: 60vh;
  }

  @media (height>900px) {
    height: 70vh;
  }
}

.image {
  width: 260px;
  height: 135px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
