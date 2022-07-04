<template>
  <ElSkeleton :loading="isSkeleton" animated>
    <template #template>
      <div class="nft-list-warp flex">
        <div class="screen" v-if="isShowScreen && isHasScreen">
          <ElSkeletonItem variant="rect" />
        </div>
        <div class="list-warp flex1">
          <div class="top flex flex-align-center">
            <div class="flex1 flex flex-align-center">
              <ElSkeletonItem variant="button" />
            </div>
            <div class="sort flex flex-align-center" v-if="isHasSort">
              <ElSkeletonItem variant="rect" />
            </div>
          </div>
          <div class="content-warp">
            <slot></slot>
          </div>
        </div>
      </div>
    </template>
    <template #default>
      <div class="nft-list-warp flex">
        <div class="screen" v-if="isShowScreen && isHasScreen">
          <div class="screen-switch flex flex-align-center">
            <div class="cont flex1 flex flex-align-center">
              <img :src="FillterIcon" />
              {{ $t('filtter') }}
            </div>
            <span class="flex flex-align-center switch" @click="isShowScreen = false"
              ><img :src="BackIcon" />{{ $t('putaway') }}</span
            >
          </div>
          <ElCollapse v-model="activeName" @change="activeNameChange">
            <!-- 默认筛选 -->
            <template v-for="(item, itemIndex) in defaultScreenList">
              <ElCollapseItem
                v-if="item.type === ScreenTypes.Price || (item.options && item.options.length > 0)"
                :title="item.label"
                :name="item.screenName"
              >
                <template #title>
                  <div class="collapseitem-header flex flex-align-center">
                    <div class="cont flex1 flex flex-align-center">
                      <img v-if="item.type === ScreenTypes.CheckboxList" :src="HamburgerIcon" />{{
                        item.label
                      }}
                    </div>
                    <span class="num" v-if="item.type === ScreenTypes.CheckboxList">{{
                      item.options.length
                    }}</span>
                  </div>
                </template>
                <!-- ButtonList -->
                <template v-if="item.type === ScreenTypes.ButtonList">
                  <div class="screen-button-list">
                    <ElButton
                      :type="option.val === item.val ? 'primary' : ''"
                      v-for="option in item.options"
                      @click="changeScreen(defaultScreenList, item.screenName, option.val)"
                      >{{ option.title }}</ElButton
                    >
                  </div>
                </template>
                <!-- Price -->
                <template v-else-if="item.type === ScreenTypes.Price">
                  <div class="screen-price">
                    <div class="screen-price-input flex flex-align-center">
                      <ElInput
                        type="number"
                        class="flex1"
                        v-model="item.val[0]"
                        :placeholder="$t('minPrice')"
                      />
                      <span>到</span>
                      <ElInput
                        type="number"
                        class="flex1"
                        v-model="item.val[1]"
                        :placeholder="$t('maxPrice')"
                      />
                    </div>
                    <div class="flex">
                      <ElButton
                        :type="item.val[0] !== '' && item.val[1] !== '' ? 'primary' : ''"
                        :disabled="item.val[0] === '' || item.val[1] === ''"
                        class="flex1"
                        @click="changeScreen(defaultScreenList, item.screenName, item.val)"
                        >{{ $t('confirm') }}</ElButton
                      >
                    </div>
                  </div>
                </template>
                <template v-else-if="item.type === ScreenTypes.CheckboxList">
                  <div class="screen-checkbox-list">
                    <ElCheckbox
                      class="flex flex-align-center"
                      v-for="option in item.options"
                      :key="option.val"
                      v-model="option.val"
                      :true-label="option.val"
                      @change="changeScreen(defaultScreenList, item.screenName, option.val)"
                    >
                      {{ option.title }}
                    </ElCheckbox>
                  </div>
                </template>
              </ElCollapseItem>
            </template>

            <!-- 其他筛选 -->
            <template v-for="(item, itemIndex) in screenList">
              <ElCollapseItem
                v-if="item.options && item.options.length > 0"
                :title="item.label"
                :name="item.screenName"
              >
                <template #title>
                  <div class="collapseitem-header flex flex-align-center">
                    <div class="cont flex1 flex flex-align-center">
                      <img v-if="item.type === ScreenTypes.CheckboxList" :src="HamburgerIcon" />{{
                        item.label
                      }}
                    </div>
                    <span class="num" v-if="item.type === ScreenTypes.CheckboxList">{{
                      item.options.length
                    }}</span>
                  </div>
                </template>
                <!-- ButtonList -->
                <template v-if="item.type === ScreenTypes.ButtonList">
                  <div class="screen-button-list">
                    <ElButton
                      :type="option.val === item.val ? 'primary' : ''"
                      v-for="option in item.options"
                      @click="changeScreen(screenList, item.screenName, option.val)"
                      >{{ option.title }}</ElButton
                    >
                  </div>
                </template>
                <!-- Price -->
                <template v-else-if="item.type === ScreenTypes.Price">
                  <div class="screen-price">
                    <div class="screen-price-input flex flex-align-center">
                      <ElInput
                        type="number"
                        class="flex1"
                        v-model="item.val[0]"
                        :placeholder="$t('minPrice')"
                      />
                      <span>到</span>
                      <ElInput
                        type="number"
                        class="flex1"
                        v-model="item.val[1]"
                        :placeholder="$t('maxPrice')"
                      />
                    </div>
                    <div class="flex">
                      <ElButton
                        :type="item.val[0] !== '' && item.val[1] !== '' ? 'primary' : ''"
                        :disabled="item.val[0] === '' || item.val[1] === ''"
                        class="flex1"
                        @click="changeScreen(screenList, item.screenName, item.val)"
                        >{{ $t('confirm') }}</ElButton
                      >
                    </div>
                  </div>
                </template>
                <template v-else-if="item.type === ScreenTypes.CheckboxList">
                  <div class="screen-checkbox-list">
                    <ElCheckbox
                      class="flex flex-align-center"
                      v-for="option in item.options"
                      :key="option.val"
                      v-model="item.val"
                      :true-label="option.val"
                      @change="changeScreen(screenList, item.screenName, option.val)"
                    >
                      {{
                        option.title instanceof Object
                          ? option.title[i18n.locale.value]
                          : option.title
                      }}
                    </ElCheckbox>
                  </div>
                </template>
              </ElCollapseItem>
            </template>
          </ElCollapse>
        </div>
        <div class="list-warp flex1">
          <div class="top flex flex-align-center">
            <div class="flex1 flex flex-align-center">
              <a class="open-screen-btn flex flex-align-center" v-if="!isShowScreen && isHasScreen"
                ><span>{{ $t('filtter') }}</span
                ><img class="switch" :src="BackIcon" @click="isShowScreen = true"
              /></a>
              <div class="all-screen">
                <template v-for="_item in defaultScreenList" :key="_item.screenName">
                  <template v-if="_item.val.constructor === Array">
                    <!-- array confirmVal -->
                    <template v-if="_item.confirmVal && _item.confirmVal.constructor === Array">
                      <template
                        v-if="
                          _item.confirmVal.filter(__item => __item !== '' && __item !== undefined)
                            .length > 0
                        "
                      >
                        <ElTag
                          :closable="_item.isNotClose ? false : true"
                          @close="changeScreen(defaultScreenList, _item.screenName, [])"
                        >
                          {{ _item.label }}:
                          <template v-for="(value, valueIndex) in _item.val">
                            {{ value
                            }}<template v-if="valueIndex !== _item.val.length - 1"
                              >&nbsp;-&nbsp;</template
                            >
                          </template>
                        </ElTag>
                      </template>
                    </template>
                    <!-- array val -->
                    <template v-else>
                      <template
                        v-if="
                          _item.val.filter(__item => __item !== '' && __item !== undefined).length >
                            0
                        "
                      >
                        <ElTag
                          :closable="_item.isNotClose ? false : true"
                          @close="changeScreen(defaultScreenList, _item.screenName, [])"
                        >
                          {{ _item.label }}:
                          <template v-for="(value, valueIndex) in _item.val">
                            {{ value
                            }}<template v-if="valueIndex !== _item.val.length - 1"
                              >&nbsp;-&nbsp;</template
                            >
                          </template>
                        </ElTag>
                      </template>
                    </template>
                  </template>

                  <template v-else>
                    <ElTag
                      :closable="_item.isNotClose ? false : true"
                      v-if="_item.val !== ''"
                      @close="changeScreen(defaultScreenList, _item.screenName, '')"
                    >
                      {{ _item.label }}:{{
                        _item.options
                          ? _item.options.find(__item => __item.val === _item.val).title
                          : _item.val
                      }}
                    </ElTag>
                  </template>
                </template>
              </div>
            </div>
            <div class="sort flex flex-align-center" v-if="isHasSort">
              <ElDropdown
                :placement="'bottom-end'"
                @visible-change="val => (isShowSortModal = val)"
              >
                <div class="sort-by flex flex-align-center">
                  {{ $t('order') }}: {{ sortList.find(item => item.val === sortVal)?.name() }}
                  <img :class="{ active: isShowSortModal }" :src="CardIcon" />
                </div>
                <template #dropdown>
                  <ElDropdownMenu>
                    <ElDropdownItem
                      v-for="sort in sortList"
                      :key="sort.val"
                      @click="changeSort(sort.val)"
                      >{{ sort.name() }}</ElDropdownItem
                    >
                  </ElDropdownMenu>
                </template>
              </ElDropdown>
            </div>
            <div class="cell-num">
              <a
                class="cell-num-item"
                v-for="cell in cells"
                :key="cell.val"
                :class="{ active: cellVal === cell.val }"
                @click="changeCell(cell.val)"
              >
                <img :src="cell.icon" />
              </a>
            </div>
          </div>
          <div class="content-warp">
            <slot></slot>
          </div>
        </div>
      </div>
    </template>
  </ElSkeleton>
</template>
<script setup lang="ts">
import {
  OrderType,
  ScreenTypes,
  SortType,
  legalOrderType,
  legalSortType,
  legalSellType,
} from '@/enum'
import { reactive, ref, nextTick, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import GroupIcon1 from '@/assets/images/icon_group_1.svg?url'
import GroupIcon2 from '@/assets/images/icon_group_2.svg?url'
import FillterIcon from '@/assets/images/icon_filter.svg?url'
import BackIcon from '@/assets/images/icon_back.svg?url'
import HamburgerIcon from '@/assets/images/icon_hamburger.svg?url'
import CardIcon from '@/assets/images/card_icon_ins.svg?url'

const i18n = useI18n()
const emit = defineEmits([
  'changeScreen',
  'changeSort',
  'changePrice',
  'changeCell',
  'load',
  'activeNameChange',
])

interface Props {
  screenList?: ScreenItem[]
  sort?: number
  defaultShowScreen?: boolean // 筛选栏默认显示还是隐藏
  isSelf?: boolean // 是否自己的个人中心
  isHasScreen?: boolean // 是否有筛选菜单
  isHasSort?: boolean // 是否有排序选择
  defaultSellType?: string // 默认SellType值
  isSellTypeNotClose?: boolean // SellType 是否可以不选择
  cellVal?: number // cellVal 默认值
  isSkeleton?: boolean //
  diySortList?: SortListItem[] // 自定义排序
  activeName?: string[]
  isLegal?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  sort: 5,
  defaultShowScreen: true,
  isSelf: false,
  isHasScreen: true,
  isHasSort: true,
  defaultSellType: '',
  isSellTypeNotClose: false,
  cellVal: 1,
  isSkeleton: false,
  isLegal: false,
})

const sortVal = ref(props.sort)
console.log('zxczxcza22asda', props.diySortList)
const isShowScreen = ref(document.body.clientWidth > 750 ? props.defaultShowScreen : false)
// @ts-ignore
const defaultScreenList: ScreenItem[] = reactive([
  {
    label: i18n.t('status'),
    screenName: 'sellType',
    type: ScreenTypes.ButtonList,
    options: [
      {
        title: i18n.t('saleing'),
        val: '1',
      },
      {
        title: i18n.t('auctioning'),
        val: '3',
      },
      {
        title: i18n.t('newSale'),
        val: '4',
      },
    ],
    val: props.defaultSellType,
    isNotClose: props.isSellTypeNotClose,
  },
  {
    label: i18n.t('price'),
    screenName: 'price',
    type: ScreenTypes.Price,
    val: ['', ''],
    confirmVal: ['', ''],
  },
  /* {
    label: i18n.t('serialNumber'),
    type: ScreenTypes.CheckboxList,
    options: [
      { title: '1-100', val: 1 },
      { title: '1-100', val: 2 },
    ],
    val: '',
  }, */
])
const isShowSortModal = ref(false)
const cells = [
  { icon: GroupIcon1, val: 1 },
  { icon: GroupIcon2, val: 2 },
]

const sortList: SortListItem[] = props.diySortList
  ? props.diySortList
  : props.isLegal
  ? [
      {
        name: () => i18n.t('DefaultOrder'),
        val: 6,
        // orderType: legalOrderType.PRICE,
        sortType: legalSortType.ASC,
      },
      {
        name: () => i18n.t('sortPriceDesc'),
        val: 2,
        orderType: legalOrderType.PRICE,
        sortType: legalSortType.DESC,
      },
      {
        name: () => i18n.t('sortPriceAsc'),
        val: 3,
        orderType: legalOrderType.PRICE,
        sortType: legalSortType.ASC,
      },
      {
        name: () => i18n.t('sortIndexDesc'),
        val: 4,
        orderType: legalOrderType.ID,
        sortType: legalSortType.DESC,
      },
      {
        name: () => i18n.t('sortIndexAsc'),
        val: 5,
        orderType: legalOrderType.ID,
        sortType: legalSortType.ASC,
      },
    ]
  : [
      // { name: i18n.t('sortTimeDesc'), val: 0, orderType: OrderType.DESC, sortType: SortType.Time },
      // { name: i18n.t('sortTimeAsc'), val: 1, orderType: OrderType.ASC, sortType: SortType.Time },
      {
        name: () => i18n.t('sortPriceDesc'),
        val: 2,
        orderType: OrderType.DESC,
        sortType: SortType.Price,
      },
      {
        name: () => i18n.t('sortPriceAsc'),
        val: 3,
        orderType: OrderType.ASC,
        sortType: SortType.Price,
      },
      {
        name: () => i18n.t('sortIndexDesc'),
        val: 4,
        orderType: OrderType.DESC,
        sortType: SortType.Index,
      },
      {
        name: () => i18n.t('sortIndexAsc'),
        val: 5,
        orderType: OrderType.ASC,
        sortType: SortType.Index,
      },
    ]

function changeScreen(targetList: ScreenItem[], screenName: string, val: any) {
  const index = targetList.findIndex(item => item.screenName === screenName)
  if (
    targetList[index].val === val &&
    targetList[index].val.constructor !== Array &&
    targetList[index].type !== ScreenTypes.CheckboxList
  )
    return
  if (targetList[index].confirmVal) {
    targetList[index].confirmVal = val
  } else {
    targetList[index].val = val
  }
  emit('changeScreen', screenName, val)
}

function checkboxChange(itemIndex: number, val: any) {
  emit('changeScreen', val)
}

function load() {
  emit('load')
}

function changeSort(val: number) {
  if (props.sort === val) return
  sortVal.value = val
  const sort = sortList.find(item => item.val === val)
  if (sort) {
    if (sort.orderType) {
      emit('changeSort', { orderType: sort.orderType, sortType: sort.sortType })
    } else {
      emit('changeSort', { sortType: sort.sortType })
    }
  }
}

function changeCell(val: number) {
  if (props.cellVal === val) return
  emit('changeCell', val)
}

function activeNameChange(activeNames: any) {
  emit('activeNameChange', activeNames)
}
</script>
<style lang="scss" scoped src="./ScreenWarp.scss"></style>
