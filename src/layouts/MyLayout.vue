<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header(elevated='')
      q-toolbar
        q-btn(flat='', dense='', round='', @click='leftDrawerOpen = !leftDrawerOpen', aria-label='Menu')
          q-icon(name='menu')
        q-toolbar-title
          | {{ $t($route.path) }}
        .q-gutter-md
          q-select(v-model='$i18n.locale', :options='langs', :label="$t('lang')", emit-value='')
    q-drawer(v-model='leftDrawerOpen', bordered='', content-class='bg-grey-2')
      q-list
        q-item(clickable='', @click.native="$router.push('/')", v-ripple='')
          q-item-section(avatar='')
            q-icon(name='home')
          q-item-section
            | {{$t('home')}}
        q-item(clickable='', @click.native="$router.push('/tutorial')", v-ripple='')
          q-item-section(avatar='')
            q-icon(name='contact_support')
          q-item-section
            | {{$t('Tutorial')}}
        q-item-label(header='') {{$t('game')}}
        q-item(clickable='', @click.native="$router.push('/play12')", v-ripple='')
          q-item-section(avatar='')
            q-icon(name='autorenew')
          q-item-section
            | {{$t('play12')}}
        q-item(clickable='', @click.native="$router.push('/play24')", v-ripple='')
          q-item-section(avatar='')
            q-icon(name='cached')
          q-item-section
            | {{$t('play24')}}
    q-page-container
      router-view(:maxWin12="maxWin12", :maxWin24="maxWin24", @updateMaxWin12 = "updateMaxWin12", @updateMaxWin24 = "updateMaxWin24")
    q-footer(v-if = "maxWin12 || maxWin24")
      q-toolbar
        q-toolbar-title
          | {{$t('maxWinsRecord')}}
          | 12: {{maxWin12}}{{$t('maxWins')}}
          | &nbsp;&nbsp;&nbsp;
          | 24: {{maxWin24}}{{$t('maxWins')}}
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      langs: [
        { label: '繁體中文', value: 'zh-TW' },
        { label: '簡体中文', value: 'zh-CN' },
        { label: 'US English', value: 'en-us' }
      ],
      maxWin12: 0,
      maxWin24: 0
    }
  },
  methods: {
    openURL,
    updateMaxWin12: function (n) {
      this.maxWin12 = n
      this.setLocal('maxWin12')
    },
    updateMaxWin24: function (n) {
      this.maxWin24 = n
      this.setLocal('maxWin24')
    },
    getLocal: function (n) {
      console.log('get:' + n)
      this[n] = JSON.parse(this.$q.localStorage.getItem(n))
    },
    setLocal: function (n) {
      console.log('set:' + n)
      this.$q.localStorage.set(n, JSON.stringify(this[n]))
      // console.log(this.$q.localStorage.getItem(n))
    }
  },
  mounted () {
    // console.log(this.$q.localStorage.getItem(n))
    if (this.$q.localStorage.getItem('maxWin12')) {
      this.getLocal('maxWin12')
    }
    if (this.$q.localStorage.getItem('maxWin24')) {
      this.getLocal('maxWin24')
    }
  }
}
</script>

<style>

body {
  font-size: 22px;
}
</style>
