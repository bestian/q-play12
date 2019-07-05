<template lang="pug">
  q-page(padding)
    q-toolbar
      q-toolbar-title
        | {{$t('use_all_four_cards_to_make_24')}}
    q-toolbar(v-if = "myNum == 0")
      q-toolbar-title {{$t('click_a_card')}}
    q-toolbar(v-if = "myNum !== 0")
      q-toolbar-title {{$t('click_an_operator')}}
    q-toolbar(v-if = "lastWork")
      q-toolbar-title {{lastWork}}
    .q-pa-md
      .row
        .col.col-6.col-md-3(v-if = "myNum != 0")
          q-card.my-card
            q-card-section.bg-primary.text-white
              q-btn(color = "green" @click = "makecard()")
                .text-h3 {{ myNum }}
        .col.col-6.col-md-3(v-for = "(c, idx) in cards" v-show = "c != 0")
          q-card.my-card
            q-card-section.bg-primary.text-white
              q-btn(color = "green" v-if ="myNum == 0" @click = "myNum = c; use(idx)")
                .text-h3 {{ c }}
              span.text-h3(v-else) {{ c }}

            q-card-actions(v-if = "myNum != 0")
              q-btn-group
                q-btn(size = "lg" color ="green" @click = "count('+', c, idx)") +{{c}}
                q-btn(size = "lg" color ="teal" @click = "count('-', c, idx)") -{{c}}
                q-btn(size = "lg" color ="purple" @click = "count('*', c, idx)") ×{{c}}
                q-btn(size = "lg" color ="red" @click = "count('/', c, idx)") ÷{{c}}

      .q-pa-md
        .row
          q-btn(size = "xl" color ="green" @click = "reset()") {{$t('reset')}}

    win(v-show="win")
</template>

<script>

import win from '../components/win'

export default {
  name: 'Play12',
  components: { win },
  props: ['maxWin24'],
  data () {
    return {
      lastWork: '',
      slow: true,
      win: false,
      wins: 0,
      maxWins: 0,
      myNum: 0,
      target: 24,
      max: 9,
      cards: [
        Math.floor(Math.random() * 9) + 1,
        Math.floor(Math.random() * 9) + 1,
        Math.floor(Math.random() * 9) + 1,
        Math.floor(Math.random() * 9) + 1
      ]
    }
  },
  methods: {
    use: function (idx) {
      this.cards[idx] = 0
    },
    isWin: function () {
      console.log(this.myNum)
      console.log(this.cards)
      var ans = true
      for (var i = 0; i < this.cards.length; ++i) {
        if (this.cards[i] !== 0) { ans = false }
      }
      if (this.myNum !== this.target) { ans = false }
      return ans
    },
    iWin: function () {
      this.win = true
      this.wins++
      if (this.wins > this.maxWin24) {
        this.$emit('updateMaxWin24', this.wins)
      }
      setTimeout(this.reset, 2000)
    },
    reset: function () {
      console.log('reset')
      for (var i = 0; i < 4; ++i) {
        this.cards[i] = Math.floor(Math.random() * this.max) + 1
      }
      console.log(this.cards)
      this.myNum = 0
      this.win = false
      this.lastWork = ''
      this.$forceUpdate()
    },
    makecard: function () {
      console.log('makecard')
      if (this.isWin()) {
        this.reset()
      }
      for (var i = 0; i < 4; ++i) {
        if (this.cards[i] === 0) {
          this.cards[i] = this.myNum
          this.myNum = 0
          break
        }
      }
    },
    count: function (o, item, index) {
      console.log('count')
      this.use(index)
      switch (o) {
        case '+':
          this.lastWork = this.myNum + '+' + item + '=' + (this.myNum + item)
          this.myNum += item
          break
        case '-':
          this.lastWork = this.myNum + '-' + item + '=' + (this.myNum - item)
          this.myNum -= item
          break
        case '*':
          this.lastWork = this.myNum + '×' + item + '=' + (this.myNum * item)
          this.myNum *= item
          break
        case '/':
          this.lastWork = this.myNum + '÷' + item + '=' + (this.myNum / item)
          this.myNum /= item
          break
        default:
          this.myNum = 0
      }
      if (this.isWin()) {
        this.iWin()
      } else {
        if (this.slow) {
          this.makecard()
        }
      }
    }
  }
}
</script>

<style>

.my-card {
  text-align: center;
}
</style>
