<p>
  <b>Vue3 Paginate</b> is a very simple Pagination component for Vue 3 and TailwindCSS.
</p>


## ⚙️ Installation

Make sure you have Vue 3 and TailwindCSS v2 or v3 installed in your project.

<p>Install the component by running the command below:</p>

```bash
npm i -S @brutforce/vue3-paginate
```

<p>Register the components locally</p>

```ts
  import { Paginate, NavButton } from '@brutforce/vue3-paginate'
```


### Example
```vue
  <template>
  <Paginate
    class="bg-white rounded-lg dark:bg-black dark:text-gray-300 dark:border-gray-950"
    :perPage="1"
    :totalPages="25"
    :currentPage="1"
    :maxPages="3"
    @input="paginate"
  >
    <template #first>
      <NavButton 
        :text="'First'"
        :page="'first'"
        :class="'rounded-l-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-gray-100'"
      />
    </template>
    <template #prev>
      <NavButton 
        :text="'Prev'"
        :page="'prev'"
        :class="'px-1 sm:px-2 py-2 flex focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-gray-100'"
      >
        <span class="text-indigo-600 my-auto relative top-0.2">
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
              </svg>
          </span>
          <span class="my-auto">
            Prev
          </span>
      </NavButton>
    </template>
    
    <template #next>
      <NavButton 
        :text="'Next'"
        :page="'next'"
        :class="'px-2 py-2 inline-flex focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-gray-100'"
      >
        <span class="my-auto">
          Next
        </span>
        <span class="text-indigo-600 my-auto relative top-0.2">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
            </svg>
        </span>
      </NavButton>
    </template>
    <template #last>
      <NavButton 
        :text="'Last'"
        :page="'last'"
        :class="'rounded-r-md px-2 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-gray-100 dark-hover:bg-gray-900'"
      />
    </template>
  </Paginate>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { Paginate, NavButton } from '@brutforce/vue3-paginate'

  export default defineComponent({
    name: 'App',
    components: {
      Paginate,
      NavButton
    },

    methods: {
      paginate(page: number): void{
        console.log(page)
      }
    }
  });
</script>

<style scoped>
</style>

```

## Components

  ### Paginate
  <p> The Paginate component is the main component whic handles all of the pagination logic </p>

### Paginate Component Props

Here is a list of all the props for the Paginate component.

|Name |    Type | Required | Description
--- | --- | --- | --- |
|maxPages | Number | false | The maximum number of pages to display at once. <strong> Default: 3</strong>|
|perPage  | Number | false | The number of items displayed per page. <strong> Default: 5</strong> |
|totalPages | Number | false | The total number of pages to paginate. <strong> Default: 10</strong> |
|currentPage | Number | false | The current page. <strong> Default: 1</strong> |
|showFirstLast | Boolean | false | Specifies is the 'First' and 'Last' buttons should be displayed. <strong> Default: true</strong> |
|wrapperClasses | String | false | A string of Tailwind classes for styling the component's main wrapper element. <strong> Default: </strong> `'shadow-md border-1 rounded-lg'` |
|dotClasses | String | false | A string of Tailwind classes for styling the dots ("...") before and after the allowed maxPages range. <strong>Default: </strong> `px-3 py-auto cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400'`|
|activePageClasses | String | false | A string of Tailwind classes for styling the active page button. <strong> Default: </strong> `'bg-indigo-500 hover:bg-indigo-600 text-white'` |
|pageClasses | String | false | A string of Tailwind classes for styling the page number buttons. <strong>Default: </strong> `'px-2 sm:px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 hover:bg-gray-100'` |