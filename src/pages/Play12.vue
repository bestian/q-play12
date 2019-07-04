<template lang="pug">
  q-page(padding)
    q-toolbar
      q-toolbar-title
        | {{$t('use_all_four_cards_to_make_12')}}
    .q-pa-md
      .row
        .col.col-6.col-sm-6(v-for = "c in cards")
          q-card.my-card
            q-card-section.bg-primary.text-white
              .text-h4 {{ c }}
</template>

<script>
export default {
  name: 'Play12',
  data () {
    return {
      cards: [3, 4, 2, 1]
    }
  }
}
</script>

<style>

.my-card {
  text-align: center;
}
</style>
