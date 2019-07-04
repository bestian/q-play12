<template lang="pug">
  q-page(padding)
    q-toolbar
      q-toolbar-title
        | {{$t('use_all_four_cards_to_make_12')}}
    .q-pa-md
      .row
        .col.col-6.col-md-3(v-for = "c in cards")
          q-card.my-card
            q-card-section.bg-primary.text-white
              .text-h4 {{ c }}
</template>

<script>
export default {
  name: 'Play12',
  data () {
    return {
      lastWork: '',
      slow: true,
      win: false,
      wins: 0,
      maxWins: 0,
      myNum: 0,
      target: 12,
      max: 6,
      cards: [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]
    }
  }
}
</script>

<style>

.my-card {
  text-align: center;
}
</style>
