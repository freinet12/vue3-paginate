<template>
  <button
    @click="handleClick"
    :disabled="shouldDisable"
    :class="{'cursor-not-allowed': shouldDisable}"
    type="button">
    <slot>{{text}}</slot>
  </button>
</template>

<script>
export default {
  name: 'NavButton',
  props: {
    text: {
      type: String,
      required: false
    },
    page: {
      type: [String, Number],
      required: true
    },
    isFirst: {
      type: Boolean,
      required: false,
      default: false
    },
    isPrev: {
      type: Boolean,
      required: false,
      default: false
    },
    isNext: {
      type: Boolean,
      required: false,
      default: false
    },
    isLast: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data(){
    return {
      shouldDisable: true,
      totalPages: 0,
      currentPage: null
    }
  },
  mounted(){
    this.emitter.on('pageChanged', this.handlePageChange)
    this.emitter.on('gotTotalPages', this.setTotalPages)
    this.initShouldDisable()
  },

  methods: {
    setTotalPages(total){
      this.totalPages = total
    },
    handleClick(){
      this.emitter.emit('btnClicked', this.page)
    },
    handlePageChange(page){
      const first = ['first', 'First']
      const previous = ['prev', 'Prev', 'previous', 'Previous']
      const next = ['next', 'Next']
      const last = ['last', 'Last']
      

      if ((first.includes(this.page) && page == 1) || (this.isFirst && page == 1)){
        return this.shouldDisable = true
      }

      if ((previous.includes(this.page) && page == 1) || (this.isPrev && page == 1)){
        return this.shouldDisable = true
      }

      if ((next.includes(this.page) && ( (page/this.totalPages == 1))) || (this.isNext && (page/this.totalPages == 1)) ){
        return this.shouldDisable = true
      }
      if ((last.includes(this.page) && ( (page/this.totalPages == 1))) || (this.isLast && (page/this.totalPages == 1)) ){
        return this.shouldDisable = true
      }

      if (page == this.page){
        return this.shouldDisable = true
      }

      return this.shouldDisable = false
    },
    initShouldDisable(){
      this.handlePageChange(1)
    }
  }
}
</script>

<style>

</style>