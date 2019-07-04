<template lang="pug">
  q-page.flex.flex-center
    .row
      .column
        h3 {{ $t('Welcome') }}
    .row
      .column
        .q-btn-group
          q-btn(size="xl" push :label = "$t('Tutorial')" color="green")
          q-btn(size="xl" push :label = "$t('Play12')" color="blue")
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
