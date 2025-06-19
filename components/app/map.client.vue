<script setup lang="ts">
import type { LngLat } from "maplibre-gl";

import { ANKARA_COORDINATES } from "~/lib/constants";

const mapStore = useMapStore();
const colorMode = useColorMode();
const style = computed(() =>
  colorMode.value === "dark"
    ? "/styles/dark.json"
    : "https://tiles.openfreemap.org/styles/liberty");
const zoom = 4;

function updateAddedPoint(location: LngLat) {
  if (mapStore.addedPoint) {
    mapStore.addedPoint.lat = location.lat;
    mapStore.addedPoint.long = location.lng;
  }
};

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <MglMap
    :map-style="style"
    :center="ANKARA_COORDINATES"
    :zoom="zoom"
  >
    <MglNavigationControl />
    <MglMarker
      v-if="mapStore.addedPoint"
      draggable
      :coordinates="ANKARA_COORDINATES"
      @update:coordinates="updateAddedPoint"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top tooltip-open hover:cursor-pointer"
          data-tip="Drag to your desired location"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="35"
            class="text-warning"
          />
        </div>
      </template>
    </MglMarker>
    <MglMarker
      v-for="point in mapStore.mapPoints"
      :key="point.id"
      :coordinates="[point.long, point.lat]"
    >
      <template #marker>
        <div
          class="tooltip tooltip-top hover:cursor-pointer"
          :data-tip="point.name"
          :class="{
            'tooltip-open': mapStore.selectedPoint === point,
          }"
          @mouseenter="mapStore.selectedPoint = point"
          @mouseleave="mapStore.selectedPoint = null"
        >
          <Icon
            name="tabler:map-pin-filled"
            size="30"
            :class="mapStore.selectedPoint === point ? 'text-accent' : 'text-secondary'"
          />
        </div>
      </template>
      <MglPopup>
        <h3 class="text-xl">
          {{ point.name }}
        </h3>
        <p v-if="point.description">
          {{ point.description }}
        </p>
      </MglPopup>
    </MglMarker>
  </MglMap>
</template>
