<template lang="pug">
  q-page
    .q-pa-md.doc-container
      .row.item-center
        .col.text-center
          h3 {{ $t('Welcome') }}
      .row.item-center
        .col.text-center
          q-btn(size="xl" push :label = "$t('Tutorial')" color="green" @click="$router.push('/tutorial')")
          q-btn(size="xl" push :label = "$t('Play12')" color="blue" @click="$router.push('/play12')")
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>

<style>
</style>
