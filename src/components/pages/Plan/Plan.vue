<template>
  <div class="ml-4 mt-5 mb-5">
    <div class="w-5/6 mb-5">
      <div class="planHeader mb-3">
        <span class="font-bold text-2xl">
          {{ $t('pages.Plan.pageHeader') }}
        </span>
        <Button
          :class="['duplicateBtn', 'mx-2']"
        >
          {{ $t('pages.Plan.duplicateBtn') }}
          <CopyIcon class="icon-lg" />
        </Button>
        <Button
          :class="['btn-solid', 'mx-2', 'float-right']"
          @click="goBack"
        >
          <ArrowLeftIcon class="icon-lg" />
          {{ $t('pages.Plan.backBtn') }}
        </Button>
      </div>
      <div class="text-xs mb-3">
        플랜을 통해 사전에 계산된 타겟에게 원하는 메시지를 발송할 수 있습니다.
        <br>타겟과 필터를 통해 잠재 고객을 예측하고 추천 컨텐츠를 만들어 보세요.
      </div>
      <div class="createPlan">
        <div>
          <label class="label">Plan Name</label>
          <input v-model="planName" type="text" placeholder="예) 신규 고객에게 베스트 상품 추천" class="input-plan-name">
        </div>
        <div class="flex items-center ml-auto">
          <div>
            <label class="label">Status</label>
            <ToggleSwitch
              :class="['success']"
              :value="isActive"
              v-model="isActive"
            />
          </div>
          <div class="flex items-center ml-4">
            <label class="label">Included</label>
            <select v-model="planCampaign" class="plan-campaign">
              <option v-for="( item, i ) in planOptions.campaigns" :key="i" :value="item.campaignNo">
                {{ item.campaignName }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="flex mt-5">
      <div class="w-5/6 flex">
        <div class="w-1/4 segmentFilters mr-3 rounded py-2">
          <div class="segmentFilter">
            <div class="label">
              <ChannelIcon class="icon-lg" />
              <div class="ml-2">
                Channels
              </div>
            </div>
            <div class="m-3">
              <Checkbox
                v-for="( item , index ) in getOptions('channels')"
                :class="['block']"
                :key="index"
                :label="getLabel(item.channelName)"
                :optionValue="item.channelNo"
                v-model="checkedChannels"
              />
            </div>
          </div>
          <div class="segmentFilter">
            <div class="label">
              <TargetIcon class="icon-lg" />
              <div class="ml-2">
                Target
              </div>
            </div>
            <div class="m-3">
              <SelectFilters :filter="'Target'" :resultSegment="resultSegment" :allOptions="getOptions('customers')" />
            </div>
          </div>
          <div class="segmentFilter">
            <div class="label">
              <FilterIcon class="icon-lg" />
              <div class="ml-2">
                Filters
              </div>
            </div>
            <div class="m-3">
              <SelectFilters :filter="'Filter'" :resultSegment="resultSegment" :allOptions="getOptions('filters')" />
            </div>
          </div>
          <div>
            <div class="label">
              <RecommendationIcon class="icon-lg" />
              <div class="ml-2">
                Recommendations
              </div>
            </div>
            <div class="m-3">
              <SelectFilters :filter="'Recommendations'" :resultSegment="resultSegment" :allOptions="getOptions('products')" />
            </div>
          </div>
        </div>
        <div class="planContents w-3/4 mr-3">
          <TabList tabs="top">
            <template v-slot:title>
              <Tab :active="true" title="Email" index="email" />
              <Tab title="SMS" index="sms" class="pointer-events-none" />
              <Tab title="Push" index="push" class="pointer-events-none" />
            </template>
            <template v-slot:content>
              <Tab :active="true" target="email">
                <div class="m-5">
                  <div class="flex mb-4">
                    <label class="contentsLabel mr-10">From</label>
                    <span class="text-xs">
                      <span class="font-semibold mr-5">MALL_NAME</span>
                      <span>bts_mall@gmail.com</span><br>
                      <span>발신자 정보는 <a class="cursor-pointer underline text-blue-700">설정</a>에서 변경할 수 있습니다.</span>
                    </span>
                  </div>
                  <div class="flex mb-4">
                    <label class="contentsLabel mr-10">To</label>
                    <div v-if="resultSegment" class="tagsSectionBox">
                      <span v-if="resultSegment.target.length <= 0" class="bg-yellow-500 tags">
                        Choose Target on the left section
                      </span>
                      <span v-if="resultSegment.filter.length > 0">
                        <span v-for="(item, index) in resultSegment.filter" :key="index">
                          <span class="bg-gray-500 tags">{{ item.label }} : {{ item.stringLabel }} </span>
                          <span v-if="!(index == resultSegment.filter.length-1)" class="bg-purple-600 text-white tags connect">AND</span>
                        </span>
                      </span>
                      <span v-if="resultSegment.target.length > 0 && resultSegment.filter.length <= 0" class="bg-yellow-500 tags">
                        And Choose Filters
                      </span>
                      <span v-if="resultSegment.filter.length > 0 && resultSegment.target.length > 0" class="bg-purple-600 text-white tags connect">
                        AMONG
                      </span>
                      <span v-if="resultSegment.target.length > 0">
                        <span v-for="(item, index) in resultSegment.target" :key="index">
                          <span class="bg-gray-500 tags targetToSection">{{ item.label }}</span>
                        </span>
                      </span>
                      <span v-if="resultSegment.filter.length > 0 && resultSegment.target.length > 0" class="bg-yellow-500 tags">
                        Add more Filters if you want
                      </span>
                    </div>
                  </div>
                  <div class="flex mb-4">
                    <label class="contentsLabel mr-10">Subject</label>
                    <input type="text" value="" class="PlanContentsInput">
                  </div>
                  <div class="flex mb-4">
                    <label class="contentsLabel mr-10">Promotion Texts</label>
                    <input type="text" value="" class="PlanContentsInput">
                  </div>
                  <div class="flex mb-4">
                    <label class="contentsLabel mr-10">Contents</label>
                    <div class="w-full recommendations">
                      <div class="flex mb-4">
                        <Radio
                          v-for="contentstype in contentsTypes"
                          :key="contentstype"
                          :class="['radio', 'mr-3']"
                          :label="getLabel(contentstype)"
                          :name="'contentstype'"
                        />
                      </div>
                      <div class="tagsSectionBox shadow border-2 rounded-lg bg-gray-100">
                        <div v-if="resultSegment.recommendations && resultSegment.recommendations.length > 0" class="inline-block">
                          <label class="m-2 text-sm">Contents Title</label>
                          <input type="text" class="contentsTitle m-2 p-1 shadow rounded-lg bg-gray-100 outline-none" value="" placeholder="">
                          <div class="flex m-2">
                            <div v-for="i in 4" :key="i" class="recommendedProduct">
                              Wool-blend Coat <br> $59.99
                            </div>
                          </div>
                          <Button
                            :key="'primary'"
                            :class="['btn-solid-secondary', 'm-2', 'float-right']"
                            @click="showEditModal()"
                          >
                            Edit List
                          </Button>
                        </div>
                        <div v-else class="p-2">
                          <span class="tags bg-yellow-500">
                            Choose Recommendation Contents on the left section
                          </span>
                          <span class="tags bg-gray-700 text-white">
                            OR
                          </span>
                          <span class="tags bg-yellow-500">
                            Upload a Pictures
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex mb-4">
                    <label class="contentsLabel mr-10">Button Text</label>
                    <input type="text" value="" class="PlanContentsInput">
                  </div>
                  <div class="flex mb-4">
                    <label class="contentsLabel mr-10">Link URL</label>
                    <input type="text" value="" class="PlanContentsInput">
                  </div>
                </div>
                <div class="flex mb-4 bottom-0 justify-center">
                  <Button
                    :class="['btn-solid-tertiary', 'mx-2']"
                  >
                    Preview
                  </Button>
                  <Button
                    :class="['btn-solid-secondary', 'mx-2']"
                    @click="savePlan"
                  >
                    Save Changes
                  </Button>
                </div>
              </Tab>
              <Tab :active="false" target="sms" />
              <Tab :active="false" target="push" />
            </template>
          </TabList>
          <Modal v-if="isActiveModal" :header="'Contents List Editor'">
            <template v-slot:modal-header>
              Contents List Editor
            </template>
            <template v-slot:modal-content>
              <div>
                <div class="modalTabs">
                  <TabList tabs="side" list="1">
                    <template v-slot:title>
                      <Tab :active="true" index="tab-1" title="contents layout" />
                      <Tab index="tab-2" title="product List" />
                    </template>
                    <template v-slot:content>
                      <Tab :active="true" target="tab-1">
                        <div class="m-2">
                          <div class="m-1 font-bold">
                            Content Layout
                          </div>
                          <hr class="border-b border-gray-400">
                          <div class="flex modalLayout">
                            <li class="modalLabel">
                              상품 개수
                            </li>
                            <span>
                              <select class="border-rounded p-1">
                                <option value="1">
                                  1개
                                </option>
                                <option value="2">
                                  2개
                                </option>
                              </select>
                            </span>
                          </div>
                          <div class="flex modalLayout">
                            <li class="modalLabel">
                              레이아웃
                            </li>
                            <span class="inline-flex">
                              <Radio
                                v-for="layoutType in layoutTypes"
                                :key="layoutType"
                                :class="['radio', 'mr-3']"
                                :label="getLabel(layoutType)"
                                :name="'layoutType'"
                                v-model="selectedLayoutType"
                              />
                            </span>
                          </div>
                          <div class="flex modalLayout">
                            <li class="modalLabel">
                              표시 상품 정보
                            </li>
                            <span>
                              <Checkbox
                                v-for="(productInfo, index) in productInfoList"
                                :class="['flex']"
                                :item="productInfo"
                                :key="index"
                                :label="getLabel(productInfo)"
                                :checkBoxType="'primary'"
                                :optionValue="productInfo"
                                v-model="productInfoList[index]"
                              />
                            </span>
                          </div>
                          <div class="modalLayout">
                            <li>
                              상품 URL 파라미터 추가
                            </li>
                            <div class="my-1">
                              필요한 경우 상품 컨텐츠의 링크 URL 맨 뒤에 파라미터를 추가할 수 있습니다.
                            </div>
                            <input type="text" class="productUrl select-text bg-gray-400 border-black" value="https://{$mall_domain}/product/detail.html?product_no={$product_no}&{$bts_param}">
                            <input type="text" value="" class="productUrlParameter border" placeholder="your_parameter">
                          </div>
                        </div>
                      </Tab>
                      <Tab target="tab-2">
                        <div class="m-2">
                          <div class="m-1 font-bold">
                            Product List
                          </div>
                          <hr class="border-b border-gray-400">
                          <div>
                            추천 상품 중 선택 한 항목이 레이아웃에 맞추어 순서대로 구성됩니다.
                          </div>
                          <div>
                            기본 추천 상품을 이미 구매한 타겟에게 대체 상품을 전달하려면, 예비 추천 상품 목록을 구성하세요.
                          </div>
                          <li>
                            예비 추천 상품
                          </li>
                          <Checkbox
                            :class="['flex']"
                            :label="'사용함'"
                          />
                          <v-select
                            v-model="sortBy"
                            :options="sortOptions"
                            :placeholder="'-상품 정렬 선택 기준-'"
                          />
                          <TabList tabs="top">
                            <template v-slot:title>
                              <Tab :active="true" index="basic" title="기본 추천 상품" />
                              <Tab index="replacable" title="예비 추천 상품" />
                            </template>
                            <template v-slot:content>
                              <Tab :active="true" target="basic">
                                뿅뿅..
                              </Tab>
                              <Tab target="replacable">
                                띵띵..
                              </Tab>
                            </template>
                          </TabList>
                        </div>
                      </Tab>
                    </template>
                  </TabList>
                </div>
              </div>
            </template>
            <template v-slot:modal-footer>
              <Button
                :class="['btn-outline-secondary', 'ml-1', 'float-right']"
                @click="closeEditModal"
              >
                close
              </Button>
              <Button
                :class="['btn-solid-secondary', 'ml-1', 'float-right']"
              >
                save changes
              </Button>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Plan from './index'
export default Plan
</script>

<style lang="postcss">
@import './Plan.sss';
</style>
