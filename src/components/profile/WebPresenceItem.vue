<template>
    <a :href="href" :aria-label="ariaLabel" target="_blank" rel="noopener noreferrer">
        <slot></slot>
    </a>
</template>

<script>
export default {
  name: 'WebPresenceItem',
  props: {
    href: {
      type: String,
    },
    ariaLabel: {
      type: String,
    },
  },
};
</script>
