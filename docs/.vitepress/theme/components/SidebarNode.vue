<script setup lang="ts">
const props = defineProps<{
  item: any;
  level: number;
  isActive: (item: any) => boolean;
  isCollapsed: (item: any) => boolean;
  toggleCollapse: (item: any, e?: Event) => void;
  onEnter: (el: Element) => void;
  onAfterEnter: (el: Element) => void;
  onLeave: (el: Element) => void;
  onAfterLeave: (el: Element) => void;
}>();

const onClick = (item: any, e: MouseEvent) => {
  props.toggleCollapse(item, e);

  const target = e.currentTarget as HTMLElement;
  const sidebar = target.closest('.sidebar');
  if (sidebar) {
    const paddingLeft = 12 + props.level * 19;
    const scrollRightAlign = target.scrollWidth - sidebar.clientWidth;
    const targetScrollLeft = Math.max(0, Math.min(scrollRightAlign, paddingLeft));

    sidebar.scrollTo({
      left: targetScrollLeft,
      behavior: 'smooth'
    });
  }
};
</script>

<template>
  <div class="sidebar-item"
       :class="[`level-${level}`, { 'is-active': isActive(item), 'has-children': item.items?.length }]">
    <div class="item-content" :style="{ paddingLeft: 12 + level * 19 + 'px', width: 'max-content', minWidth: '100%' }"
         @click="onClick(item, $event)">
      <a v-if="item.link" :href="item.link" class="text-link" :class="{ 'active-link': isActive(item) }">
        {{ item.text }}
      </a>
      <span v-else class="text-label">{{ item.text }}</span>

      <span v-if="item.items?.length" class="caret" :class="{ collapsed: isCollapsed(item) }">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline
          points="6 9 12 15 18 9"></polyline></svg>
      </span>
    </div>
  </div>

  <Transition
    name="accordion"
    @enter="onEnter"
    @after-enter="onAfterEnter"
    @leave="onLeave"
    @after-leave="onAfterLeave"
  >
    <div v-if="item.items?.length" v-show="!isCollapsed(item)" class="nested-group"
         :class="[`level-${level + 1}-group`]">
      <SidebarNode
        v-for="child in item.items"
        :key="child.text"
        :item="child"
        :level="level + 1"
        :isActive="isActive"
        :isCollapsed="isCollapsed"
        :toggleCollapse="toggleCollapse"
        :onEnter="onEnter"
        :onAfterEnter="onAfterEnter"
        :onLeave="onLeave"
        :onAfterLeave="onAfterLeave"
      />
    </div>
  </Transition>
</template>
