<template lang="pug">
  q-page(padding)
    q-toolbar
      q-toolbar-title
        | {{$t('use_all_four_cards_to_make_12')}}
    q-toolbar
      q-chat-message(
        :name="$t('John')"
        avatar="../assets/john.png"
        :text="[$t(hints[step])]")
    q-toolbar(v-if = "lastWork")
      q-toolbar-title {{lastWork}}
    .q-pa-md
      .row
        .col.col-6.col-md-3(v-if = "myNum != 0")
          q-card.my-card
            q-card-section.bg-primary.text-white
              q-btn(@click = "makecard()")
                .text-h3 {{ myNum }}
        .col.col-6.col-md-3(v-for = "(c, idx) in cards" v-show = "c != 0")
          q-card.my-card
            q-card-section.bg-primary.text-white
              q-btn(v-if ="myNum == 0" @click = "myNum = c; use(idx)")
                .text-h3 {{ c }}
              span.text-h3(v-else) {{ c }}

            q-card-actions(v-if = "myNum != 0")
              q-btn-group
                q-btn(size = "lg" color ="green" @click = "count('+', c, idx)") +{{c}}
                q-btn(size = "lg" color ="teal" @click = "count('-', c, idx)") -{{c}}
                q-btn(size = "lg" color ="purple" @click = "count('*', c, idx)") ×{{c}}
                q-btn(size = "lg" color ="red" @click = "count('/', c, idx)") ÷{{c}}

    win(v-show="win")
</template>

<script>

import win from '../components/win'

export default {
  name: 'Tutorial',
  components: { win },
  props: ['maxWin12'],
  data () {
    return {
      lastWork: '',
      step: 0,
      hints: [
        'click_4', 'click_-3',
        'click_1', 'click_*2',
        'click_2', 'click_*6',
        'tutorial_end'],
      slow: true,
      win: false,
      wins: 0,
      maxWins: 0,
      myNum: 0,
      target: 12,
      max: 6,
      cards: [
        2,
        3,
        6,
        4
      ]
    }
  },
  methods: {
    use: function (idx) {
      this.cards[idx] = 0
      this.step++
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
      setTimeout(this.reset, 3000)
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
