<script setup lang="ts">
defineProps<{ title: string, icon: string }>()
</script>

<template>
  <div class="glass card hud rounded-[14px] py-7 px-[18px] flex flex-col items-center gap-3.5 text-center">
    <UIcon
      :name="icon"
      class="size-[30px] text-[#89b4fa]"
    />
    <div class="display font-semibold text-[17px] text-[#cdd6f4]">
      {{ title }}
    </div>
  </div>
</template>
