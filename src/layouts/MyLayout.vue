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
            q-icon(name='format_color_fill')
          q-item-section
            | {{$t('Tutorial')}}
        q-item-label(header='') {{$t('game')}}
        q-item(clickable='', @click.native="$router.push('/play12')", v-ripple='')
          q-item-section(avatar='')
            q-icon(name='format_color_fill')
          q-item-section
            | {{$t('play12')}}
        q-item(clickable='', @click.native="$router.push('/play24')", v-ripple='')
          q-item-section(avatar='')
            q-icon(name='format_color_fill')
          q-item-section
            | {{$t('play24')}}
    q-page-container
      router-view
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
      ]
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
