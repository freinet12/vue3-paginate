<template>
    <div class="z-10 inline-flex">
        <nav class="" 
            :class="wrapperClasses"
            aria-label="Pagination">
            <ul class="flex justify-between items-center text-sm">
                <!-- First -->
                <li v-if="showFirstLast" class="border-r-1">
                    <slot name="first"></slot>
                </li>
                <!-- Previous -->
                <li class="border-r-1 relative dark:border-gray-850">
                    <slot name="prev"></slot>
                </li>
                <!-- First Dots -->
                <li class="border-r-1 hidden sm:block" v-if="showFirstDots">
                    <button
                        type="button"
                        class=""
                        :class="dotClasses"
                        :disabled="true"
                        >
                        <span class="inline-block align-middle">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </span>
                        
                    </button>
                </li>
                <!-- Range of Pages -->
                <li class="border-r-1" v-for="page in pages" :key="page.number">
                    <button
                        @click="onClickPage(page)"
                        type="button"
                        class=""
                        :disabled="page.isActive"
                        :class="[
                            pageClasses,
                            page.isActive ? `${activePageClasses}` : ''
                        ]">
                        {{ page.number }}
                    </button>
                </li>
                <!-- Last Dots -->
                <li class="border-r-1 hidden sm:block" v-if="showLastDots">
                    <button
                        type="button"
                        :class="dotClasses"
                        :disabled="true"
                        >
                        <span class="inline-block align-middle">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                                class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
                            </svg>
                        </span>
                    </button>
                </li>
                <!-- Next -->
                <li class="relative">
                    <slot name="next"></slot>
                </li>
                <!-- Last -->
                <li v-if="showFirstLast" class="border-l-1">
                    <slot name="last"></slot>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import { emitter } from '@/bus'
export default {
    name: 'Vue3Paginate',
    props: {
        maxPages: {
            type: Number,
            required: false,
            default: 3
        },
        perPage: {
           type: Number,
           required: false,
           default: 5
        },

        totalPages: {
            type: Number,
            required: false,
            default: 10
        },

        currentPage: {
            type: Number,
            required: false,
            default: 1
        },

        showFirstLast: {
            type: Boolean,
            default: true
        },

        wrapperClasses: {
            type: String,
            required: false,
            default: 'shadow-md border-1 rounded-lg'
        },
        
        dotClasses: {
            type: String,
            required: false,
            default: 'px-3 py-auto cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400'
        },
        activePageClasses: {
            type: String,
            required: false,
            default: 'bg-indigo-500 hover:bg-indigo-600 text-white'
        },
        pageClasses: {
            type: String,
            required: false,
            default: 'px-2 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-gray-100'
        },        
    },

    computed: {
        totalNumPages(){
            let total = this.totalPages
            if (total > this.perPage){
                return Math.round(total / this.perPage)
            } else {
                return 1
            }
            
        },
        maxVisiblePages(){
            if (this.totalNumPages > this.maxPages ){
                return this.maxPages - 1
            } else {
                return this.totalNumPages
            }
        },
        startPage(){
            if (this.theCurrentPage === 1) {
                return 1;
            }

            if (this.theCurrentPage === this.totalNumPages) {
                let start = this.totalNumPages - this.maxVisiblePages
                return start >= 1 ? start : 1
            }

            return this.theCurrentPage > 1 ? this.theCurrentPage - 1 : 1
        },

        pages(){
            const range = []
            
                for (let i = this.startPage; i <= Math.min(this.startPage + this.maxVisiblePages, this.totalNumPages); i++ ) {
                    if (i > 0){
                        range.push({
                            number: i,
                            isActive: i === this.theCurrentPage
                        });
                    }
                    
                }
            return range;
        },

        visiblePages(){
            return null
        },

        isOnFirstPage(){
            return this.theCurrentPage === 1
        },

        isOnLastPage(){
            return this.theCurrentPage === this.totalNumPages
        },

        showFirstDots(){
            return this.theCurrentPage > this.maxVisiblePages ? true : false
        },

        showLastDots(){
            return this.totalNumPages - this.theCurrentPage > 5 ? true : false
               
        },

    },

    data(){
        return {
            theCurrentPage: this.currentPage,
        }
    },

    mounted(){
        emitter.on('btnClicked', this.handleBtnClicked)
        emitter.emit('gotTotalPages', this.totalNumPages)
    },

    methods: {
        handleBtnClicked(page){
            const previousText = ['prev', 'Prev', 'previous', 'Previos']
            if (page === 'first' || page === 'First'){
                this.onClickFirstPage()
            }
            if (previousText.includes(page)){
                this.onClickPreviousPage()
            }

            if (page === 'next' || page === 'Next'){
                this.onClickNextPage()
            }
            if (page === 'last' || page === 'Last'){
                this.onClickLastPage()
            }
        },
        onClickFirstPage() {
            let page = 1
            this.theCurrentPage = page
            this.$emit('input', this.theCurrentPage)
            emitter.emit('pageChanged', this.theCurrentPage)
        },
        onClickPreviousPage() {
            let page = this.getPage(this.theCurrentPage - 1)
            if(page){
                page.isActive = true
                this.theCurrentPage = page.number
                this.$emit('input', this.theCurrentPage)
                emitter.emit('pageChanged', this.theCurrentPage)
            }
            
        },
        onClickPage(page) {
            this.theCurrentPage = page.number
            page.isActive = true
            this.$emit('input', this.theCurrentPage)
            emitter.emit('pageChanged', this.theCurrentPage)
        },
        onClickNextPage() {
            let page = this.getPage(this.theCurrentPage + 1)
            if(page){
                page.isActive = true
                this.theCurrentPage = page.number
                this.$emit('input', this.theCurrentPage)
                emitter.emit('pageChanged', this.theCurrentPage)
            }
        },
        onClickLastPage() {
            let page = this.totalNumPages
            this.theCurrentPage = page
            this.$emit('input', this.theCurrentPage)
            emitter.emit('pageChanged', this.theCurrentPage)
        },
        
        getPage(num){
            return this.pages.filter((page) => page.number == num)[0]
        }
    }

}
</script>

<style scoped>
</style>