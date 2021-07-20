<template>
  <div class="bg-white p-5">
    <div class="edit-panels animateable">
      <div class="my-5">
        <h3>Buttons</h3>
        <div class="w-full mt-3">
          <Button
            v-for="sColor in buttonColors"
            :key="sColor"
            :class="['btn-solid' + (sColor !== '' ? '-' + sColor : ''), 'mx-2']"
          >
            {{ getLabel(sColor) }}
          </Button>
          <Button :class="['btn-solid-disabled']" :disabled="true">
            Disabled
          </Button>
        </div>
        <div class="w-full mt-3">
          <Button
            v-for="sColor in buttonColors"
            :key="sColor"
            :class="['btn-outline' + (sColor !== '' ? '-' + sColor : ''), 'mx-2']"
          >
            {{ getLabel(sColor) }}
          </Button>
          <Button :class="['btn-outline-disabled']" :disabled="true">
            Disabled
          </Button>
        </div>
      </div>

      <div class="my-5">
        <h3>File Upload</h3>
        <div class="w-full mt-3 flex flex-row inse">
          <FileUpload
            v-for="(sColor, idx) in colors"
            :key="sColor"
            :class="['file-upload', 'mr-2', sColor]"
            :label="'Upload File'"
            v-model="files[idx]"
          />
          <FileUpload :label="'File (Disabled)'" :disabled="true" class="file-upload mr-2" />
        </div>
      </div>

      <div class="my-5">
        <h3>Toggle</h3>
        <div class="flex flex-col">
          <ToggleSwitch
            v-for="sColor in colors"
            :key="sColor"
            :class="['switch', sColor, 'my-1']"
            :label="getLabel(sColor)"
            :name="'switch'"
            v-model="toggleSwitch[getLabel(sColor)]"
          />
          <ToggleSwitch :label="'Disabled'" :name="'switch'" :value="true" :disabled="true" class="switch my-1" />
        </div>
      </div>

      <div class="my-5">
        <h3>Radio</h3>
        <Radio
          v-for="sColor in colors"
          :key="sColor"
          :class="['radio', sColor]"
          :label="getLabel(sColor)"
          :name="'sample'"
          v-model="radio"
        />
        <br>
        <Radio
          :class="'radio'"
          :label="'Disabled'"
          :name="'disabledRadio'"
          :optionValue="0"
          :disabled="true"
          :value="1"
        />
        <Radio
          :class="'radio'"
          :label="'Disabled (Selected)'"
          :name="'disabledRadio'"
          :disabled="true"
          :optionValue="1"
          :value="1"
        />
      </div>

      <div class="my-5">
        <h3>Checkbox</h3>
        <div class="flex flex-col">
          <Checkbox
            v-for="(sColor, idx) in colors"
            :key="sColor"
            :class="sColor"
            :label="getLabel(sColor)"
            :optionValue="idx"
            v-model="checkbox"
          />
        </div>
        <br>
        <div class="flex flex-col">
          <Checkbox :label="'Disabled'" :optionValue="0" :value="[1]" :disabled="true" />
        </div>
        <div class="flex flex-col">
          <Checkbox :label="'Disabled (Selected)'" :optionValue="1" :value="[1]" :disabled="true" class="success" />
        </div>
      </div>

      <div class="my-5">
        <h3>Textbox</h3>
        <Textbox
          v-model="name['first']"
          :label="'First Name (Disabled)'"
          :disabled="true"
          class="w-4/12 mt-5 primary"
          name="firstName"
        />
        <Textbox
          v-model="name['middle']"
          :label="'Middle Name (Read only)'"
          :readonly="true"
          class="w-4/12 mt-5 success"
          name="middleName"
        />
        <Textbox v-model="name['last']" :label="'Last Name'" :maxChars="50" class="w-4/12 mt-5 danger" name="lastName" />
        <Textbox :label="'Age (Disabled, Empty)'" :disabled="true" class="w-4/12 mt-5 warning" name="age" />
      </div>

      <div class="my-5">
        <h3>Select</h3>
        <div class="flex flex-row">
          <v-select
            v-model="selectMultiple"
            :options="sampleOptions"
            :clearable="true"
            :multiple="true"
            class="w-4/12 mr-3"
            dir="ltr"
          />
          <v-select v-model="selectSingle" :options="sampleOptions" :clearable="true" class="w-4/12" dir="ltr" />
        </div>
      </div>

      <client-only>
        <div class="my-5">
          <h3>Date Picker</h3>
          <v-date-picker :is-inline="true" v-model="selectedDate" show-caps />
        </div>
      </client-only>

      <div class="my-5">
        <h3>Slider</h3>
        <div class="flex flex-col">
          <Slider v-for="(sColor, idx) in colors" :key="sColor" :class="['w-4/12', sColor]" v-model="slider[idx]" type="range" />
          <br>
          <span>Disabled</span>
          <Slider :disabled="true" :value="50" class="w-4/12" type="range" />
        </div>
      </div>

      <client-only>
        <div class="my-5">
          <h3>WYSIWYG Editor</h3>
          <vue-editor id="vueEditor1" v-model="vueEditorContent" />
        </div>
      </client-only>

      <div class="my-5">
        <h3>Numeric Input</h3>
        <div class="flex flex-col">
          <span class="mb-2">Simple</span>
          <div class="w-1/6 mb-5">
            <NumericInput
              v-model="numericInputValue"
              text-align="center"
              placeholder="Enter a number..."
              class="border-gray-600 border"
            />
          </div>
          <span class="mb-2">Decimal point allowed</span>
          <div class="w-1/6 mb-5">
            <NumericInput
              v-model="fractional"
              :allow-fractional="true"
              text-align="center"
              placeholder="Enter a number..."
              class="border-gray-600 border"
            />
          </div>
          <span class="mb-2">With Stepper</span>
          <div class="w-1/6">
            <NumericInput
              v-model="withStepper"
              :stepper="true"
              text-align="center"
              placeholder="Numeric input with stepper"
              class
            />
          </div>
        </div>
      </div>

      <div class="my-5">
        <h3>Tabs</h3>
        <span>Top Tab (Default color)</span>
        <div class="my-4">
          <TabList tabs="top" list="1" height="10em">
            <template v-slot:title>
              <Tab :active="true" index="tab-1" title="First" />
              <Tab index="tab-2" title="Second" />
              <Tab index="tab-3" title="Third" />
            </template>
            <template v-slot:content>
              <Tab :active="true" target="tab-1">
                <div class="w-full">
                  <span class="font-bold">First tab</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </p>
                </div>
              </Tab>
              <Tab target="tab-2">
                <div class="w-full">
                  <span class="font-bold">Second tab</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </Tab>
              <Tab target="tab-3">
                <div class="w-full">
                  <span class="font-bold">Third tab</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </p>
                </div>
              </Tab>
            </template>
          </TabList>
        </div>
        <span>Side Tab (Primary color)</span>
        <div class="my-4">
          <TabList tabs="side" list="2" color="primary" height="10em">
            <template v-slot:title>
              <Tab :active="true" index="tab-1" title="First" />
              <Tab index="tab-2" title="Second" />
              <Tab index="tab-3" title="Third" />
            </template>
            <template v-slot:content>
              <Tab :active="true" target="tab-1">
                <div class="w-full">
                  <span class="font-bold">First tab</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </p>
                </div>
              </Tab>
              <Tab target="tab-2">
                <div class="w-full">
                  <span class="font-bold">Second tab</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                    ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                    laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
              </Tab>
              <Tab target="tab-3">
                <div class="w-full">
                  <span class="font-bold">Third tab</span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                  </p>
                </div>
              </Tab>
            </template>
          </TabList>
        </div>
      </div>

      <div class="my-5">
        <h3>Error Pages</h3>
        <div class="w-1/3">
          <div class="p-4 block">
            <nuxt-link to="inputs/error/0" class="bg-gray-500 p-2 rounded text-gray-900 font-medium">
              Error Default
            </nuxt-link>
            <span>Basic error page</span>
          </div>
          <div class="p-4 block">
            <nuxt-link to="inputs/error/404" class="bg-yellow-500 p-2 rounded text-yellow-900 font-medium">
              Error 404
            </nuxt-link>
            <span>Can't find page</span>
          </div>
          <div class="p-4 block">
            <nuxt-link to="inputs/error/403" class="bg-red-500 p-2 rounded text-red-900 font-medium">
              Error 403
            </nuxt-link>
            <span>Unauthorized access page</span>
          </div>
        </div>
      </div>

      <div class="my-5">
        <h3>Data Table Server Side</h3>
        <DataTable
          :allowSearch="true"
          :serverSideProcessing="true"
          :sortable="true"
          :columnDefinition="[
            {src: 'user_id', label: 'ID'},
            {src: 'username', label: 'User Name'},
            {src: 'first_name', label: 'First Name'},
            {src: 'last_name', label: 'Last Name'},
            {src: 'gender', label: 'Gender'},
            {src: 'password', label: 'Password'},
            {src: 'status', label: 'Status'}
          ]"
          :sortColumns="['user_id', 'username', 'first_name', 'last_name', 'gender', 'password', 'status']"
          :pagination="true"
          :searchColumn="['username', 'first_name', 'last_name', 'gender', 'password']"
          :selectRowCount="true"
          :advanced-filter="{date: date}"
          api-link="http://localhost:3001"
          loading-message="Loading, please wait for a while..."
        />
      </div>

      <div class="my-5">
        <h3>Data Table Client Side</h3>
        <DataTable
          :allowSearch="true"
          :tableData="tableData"
          :tableHeight="550"
          :sortable="true"
          :columnDefinition="[
            {src: 'date', label: 'Date'},
            {src: 'name', label: 'Name'},
            {src: 'address', label: 'Address'},
          ]"
          :sortColumns="['date', 'name', 'address']"
          :selectRowCount="true"
          :pagination="true"
          :advanced-filter="{date: date}"
          :advanced-filter-function="{date: filterByDate}"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import 'vue-select/dist/vue-select.css'

@Component
export default class Inputs extends Vue {
  /**
   * mock local data for dataTable component
   */
  tableData: Array<any> = [
    {
      date: '2016-05-03',
      name: 'John',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'George',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Anna',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Maria',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Nino',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Chippy',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'Chippy',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Maria',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Nino',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-02',
      name: 'George',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-04',
      name: 'Maria',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'George',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'John',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles'
    },
    {
      date: '2016-05-01',
      name: 'Maria',
      address: 'No. 189, Grove St, Los Angeles'
    }
  ]

  /**
   * Element color classes
   */
  colors: string[] = [ '', 'primary', 'success', 'warning', 'danger' ]

  buttonColors: string[] = [ '', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger' ]

  /**
   * Element color classes
   */
  newColors: string[] = [ '', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger' ]

  /**
   * Variable bound to dropdown element (single)
   */
  selectSingle: string | null = 'White'

  /**
   * Variable bound to dropdown element (multiple)
   */
  selectMultiple: string[] = [ 'Blue', 'Red', 'Yellow' ]

  /**
   * Options for dropdown elements
   */
  sampleOptions: string[] = [ 'White', 'Blue', 'Yellow', 'Green', 'Red', 'Black' ]

  /**
   * Variable bound to date picker element
   */
  selectedDate: Date = new Date(2019, 8, 24)

  /**
   * Variable bound to radio Buttons
   */
  radio: string = 'Default'

  /**
   * Variable bound to toggle switches
   */
  toggleSwitch: object = {
    Default: true,
    Primary: false,
    Success: true,
    Warning: false,
    Danger: true
  }

  /**
   * Variable bound to checkboxes
   */
  checkbox: number[] = [ 0, 2, 4 ]

  /**
   * Variable bound to checkboxes
   */
  name: object = { first: 'Franklin', middle: 'Delano', last: 'Roosevelt' }

  /**
   * Variable bound to sliders
   */
  slider: number[] = [ 20, 40, 60, 80, 100 ]

  /**
   * Variable bound to file upload Buttons
   */
  files: string[] = []

  /**
   * Variable bound to text editor
   */
  vueEditorContent: string = ''

  /**
   * Variable bound to numeric input
   */
  numericInputValue: number | null = 1

  /**
   * Variable bound to numeric input with stepper
   */
  withStepper: number | null = 1

  /**
   * Variable bound to numeric input
   */
  fractional: number = 0.9

  date: string = ''

  /**
   * Sets the first character of the argument to upper case
   * @param string sInput
   * @return string|boolean
   */
  capitalizeFirstLetter (input: string): string | boolean {
    if (input.length === 0) {
      return false
    }

    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  /**
   * Returns the label
   * @param string input
   * @return string|boolean
   */
  getLabel (input: string): string | boolean {
    return this.capitalizeFirstLetter(input) || 'Default'
  }

  filterByDate (rows: Array<{[key: string]: any}>, date: string) {
    return (date === '') ? rows : rows.filter(row => {
      return row.date === date
    })
  }
}
</script>

<style scoped>
@import '~/assets/sss/inputs.sss';
</style>
