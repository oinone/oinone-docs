<script setup lang="ts">
import { useData, useRoute } from 'vitepress';
import { computed, ref, watch } from 'vue';
import SidebarNode from './SidebarNode.vue';

const { theme } = useData();
const route = useRoute();

// Flatten sidebar recursively
const flattenSidebar = (items: any[], level = 0): any[] => {
  return items.reduce((acc, item) => {
    const flatItem = { ...item, level };
    acc.push(flatItem);
    if (item.items && item.items.length) {
      if (!item.collapsed || isPathActive(item, route.path)) {
        acc.push(...flattenSidebar(item.items, level + 1));
      }
    }
    return acc;
  }, []);
};

const isPathActive = (item: any, currentPath: string): boolean => {
  if (item.link && currentPath.includes(item.link)) return true;
  if (item.items) {
    return item.items.some(child => isPathActive(child, currentPath));
  }
  return false;
};

// State
const collapsedMap = ref<Record<string, boolean>>({});

// Initialize collapse state based on active path
const initCollapseState = (items: any[], level = 0) => {
  items.forEach(item => {
    if (item.items && item.items.length) {
      // Create a unique key for the item
      const key = item.text + (item.link || '');

      // If it has a link and is active, or if a child is active, it should be open
      if (isPathActive(item, route.path)) {
        collapsedMap.value[key] = false;
      } else if (item.collapsed !== undefined) {
        collapsedMap.value[key] = item.collapsed;
      } else {
        // Default: collapse anything beyond level 0 (so only top-level and its immediate children are shown)
        collapsedMap.value[key] = level > 0;
      }

      initCollapseState(item.items, level + 1);
    }
  });
};

const currentSidebar = computed(() => {
  const sidebars = theme.value.sidebar;
  console.log(sidebars);
  if (!sidebars) return [];


  // Find the matching sidebar based on the current path
  const path = route.path;
  let activeSidebar = [];

  // Handle array sidebar
  if (Array.isArray(sidebars)) {
    activeSidebar = sidebars;
  } else {
    // Handle object sidebar (multi-sidebar)
    for (const key in sidebars) {
      if (path.startsWith(key)) {
        activeSidebar = sidebars[key];
        break;
      }
    }
  }

  return activeSidebar;
});

// Watch for path changes to re-evaluate active states
// (Only initialize on mount to preserve user's collapsed state during navigation)
watch(() => route.path, () => {
  // Automatically open the parent group when a nested page is active
  const openActiveParents = (items: any[]) => {
    items.forEach(item => {
      if (item.items && item.items.length && isPathActive(item, route.path)) {
        const key = item.text + (item.link || '');
        collapsedMap.value[key] = false;
        openActiveParents(item.items);
      }
    });
  };
  openActiveParents(currentSidebar.value);
}, { immediate: false });

// Run once on mount
initCollapseState(currentSidebar.value);

const toggleCollapse = (item: any, e?: Event) => {
  // Only toggle collapse state if the item actually has children
  if (!item.items || !item.items.length) return;

  const key = item.text + (item.link || '');
  collapsedMap.value[key] = !collapsedMap.value[key];

  // If the user clicked the arrow/caret specifically, we prevent default so it doesn't trigger navigation
  if (e) {
    const target = e.target as HTMLElement;
    if (target.closest('.caret')) {
      e.preventDefault();
    }
  }
};

const isCollapsed = (item: any) => {
  const key = item.text + (item.link || '');
  return !!collapsedMap.value[key];
};

const isActive = (item: any) => {
  if (!item.link) return false;
  // Normalize paths for comparison
  const normalize = (p: string) => p.replace(/\/$/, '').replace(/\.html$/, '');
  return normalize(route.path) === normalize(item.link);
};

const onEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '0';
  element.style.overflow = 'hidden';
  element.style.willChange = 'height';

  // Force a reflow so the starting height is calculated
  void element.offsetHeight;

  requestAnimationFrame(() => {
    element.style.height = `${element.scrollHeight}px`;
  });
};

const onAfterEnter = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '';
  element.style.overflow = '';
  element.style.willChange = '';
};

const onLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = `${element.scrollHeight}px`;
  element.style.overflow = 'hidden';
  element.style.willChange = 'height';

  // Force a reflow so the starting height is calculated
  void element.offsetHeight;

  requestAnimationFrame(() => {
    element.style.height = '0';
  });
};

const onAfterLeave = (el: Element) => {
  const element = el as HTMLElement;
  element.style.height = '';
  element.style.overflow = '';
  element.style.willChange = '';
};
</script>

<template>
  <nav class="sidebar">
    <template v-for="item in currentSidebar" :key="item.text">
      <div class="sidebar-group">
        <SidebarNode
          :item="item"
          :level="0"
          :isActive="isActive"
          :isCollapsed="isCollapsed"
          :toggleCollapse="toggleCollapse"
          :onEnter="onEnter"
          :onAfterEnter="onAfterEnter"
          :onLeave="onLeave"
          :onAfterLeave="onAfterLeave"
        />
      </div>
    </template>
  </nav>
</template>

<style>
.sidebar {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-x: auto;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

.sidebar-group {
  margin-bottom: 8px;
}

.sidebar-item {
  position: relative;
  margin: 0;
  padding: 0;
}

.item-content {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  border-left: 3px solid transparent;
  border-radius: 4px;
  color: #45474D;
  transition: all 0.2s ease;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 2px;
  user-select: none;
}

.item-content:hover {
  background: #E6EAF0;
}

.text-link, .text-label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  text-decoration: none;
  color: inherit;
  display: block;
}

.text-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.text-link:hover {
  text-decoration: none;
}

/* Caret icon */
.caret {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  opacity: 0.6;
  transition: transform 0.2s ease;
}

.caret:hover {
  opacity: 1;
}

.caret.collapsed {
  transform: rotate(-90deg);
}

/* Active State Styles */
.sidebar-item.is-active > .item-content {
  color: #121317;
  background: rgba(3, 93, 255, 0.1);
  font-weight: 500;
  border-left-color: #035dff;
}

.sidebar-item.is-active > .item-content .active-link {
  color: #035dff;
}

.sidebar-item.is-active > .item-content:hover {
  background: rgba(50, 121, 249, 0.12);
}

.active-link {
  color: #121317;
}
</style>
