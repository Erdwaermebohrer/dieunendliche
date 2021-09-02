<template>
  <div class="footer__wrapper">
    <h1>Footer</h1>
    {{ inputData }}
  </div>
</template>

<script>
export default {
  name: 'app-footer',
  props: {
    inputData: {
      type: Object
    }
  }
}
</script>