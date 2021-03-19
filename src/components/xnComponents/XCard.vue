<template>
  <a-card :bordered="false" :body-style="tstyle">
    <slot name="content"></slot>
  </a-card>
</template>

<script>
export default {
  name: 'XCard',
  data() {
    return {
      tstyle: { 'padding-bottom': '0px' },
    }
  },
}
</script>
