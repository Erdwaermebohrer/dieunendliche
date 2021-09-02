<template>
  <div class="header__wrapper">
    <h1>Header</h1>
    {{ inputData }}
  </div>
</template>

<script>
export default {
  name: 'app-header',
  props: {
    inputData: {
      type: Array
    }
  }
}
</script>