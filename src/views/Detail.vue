<template>
  <div class="nft-detail">
    <ElSkeleton :loading="isShowSkeleton" animated>
      <!-- 骨架屏 -->
      <template #template>
        <DetailSkeletonVue />
      </template>

      <!-- 默认内容 -->
      <template #default>
        <div class="top flex container">
          <!-- 封面图 -->
          <div class="cover">
            <NFTCover
              :needGizp="true"
              :cover="[
                $filters.metafile(nft.val.coverUrl,500),
                nft.val.nftBackIcon ? nft.val.nftBackIcon : undefined,
              ]"
              :is-show-prew="true"
              :is-lazy="false"
              :is-remint="nft.val.nftHasCompound"
              :isBlindBox="blindBoxPage"
              :blindBoxRest="nft.val.remain"
            />
          </div>

          <div class="cont flex1 flex flex-v">
            <div class="name flex flex-align-center">
              <ElPopover
                placement="bottom"
                :width="400"
                trigger="hover"
                popper-class="common-popover"
              >
                <template #reference>
                  <span class="text flex1">{{ nft.val.nftName }}</span>
                </template>
                {{ nft.val.nftName }}
              </ElPopover>
              <a class="like flex flex-align-center" @click="payLike">
                <!-- <span class="num">{{ nft.val.nftLikeCount }}</span> -->
                <img :src="LikedIcon" v-if="nft.val?.nftHasLike"/>
                <img :src="LikeIcon" v-else
              /></a>
              <img :src="ShareIcon" :alt="$t('share')" @click="share" />
            </div>
            <div
              class="series-cert flex flex-align-center"
              v-if="nft.val.nftGenesisCertificationType"
            >
              <img src="@/assets/images/icon_cer_nft.png" />
              {{ $t('beCertedSeries') }}：{{ $t(nft.val.nftGenesisCertificationName) }}
            </div>
            <div class="creater-msg">
              <!-- 铸造者 -->
              <div class="author flex flex-align-center">
                <UserAvatar
                  class="avatar"
                  :metaId="nft.val.foundryMetaId"
                  :type="nft.val.issueUserAvatarType"
                />
                <div class="author-msg flex1">
                  <div class="creater">{{ $t('creater') }}: {{ nft.val.foundryName }}</div>
                  <div class="metaid" v-if="nft.val.foundryMetaId">
                    MetaID:{{ nft.val.foundryMetaId.slice(0, 6) }}
                  </div>
                </div>
              </div>

              <!-- 认证信息 -->
              <CertTemp
                :metaId="nft.val.foundryMetaId"
                :certed="nft.val.nftCertificationType === 1"
              />
            </div>

            <!-- 描述 -->
            <div class="drsc flex1 flex flex-v">
              <div class="title flex flex-align-center">
                <template v-if="nft.val.putAway">
                  {{ $t('seller') }}
                  <UserAvatar :metaId="nft.val.ownerMetaId" :type="nft.val.ownerAvatarType" />
                  <span>{{ nft.val.ownerName }}</span>
                  {{ $t('theIntro') }}：
                </template>
                <template v-else>{{ $t('drsc') }}:</template>
              </div>
              <div class="cont">
                {{
                  NFTMainMsgDesc && NFTMainMsgDesc.length > 60
                    ? NFTMainMsgDesc.slice(0, 60)
                    : NFTMainMsgDesc
                }}
                <a v-if="NFTMainMsgDesc && NFTMainMsgDesc.length > 60">
                  ...
                  <span @click="isShowDrscDetail = true">{{ $t('getmore') }}</span>
                </a>
              </div>
            </div>

            <div class="putAway-msg flex flex-align-center">
              <div class="blindBoxRestWrap" v-if="blindBoxPage">
                <span
                  >{{ $t('blindBoxIssuerAmount') }}{{ nft.val.limited }}{{ $t('blindBoxNum') }}，{{
                    $t('num')
                  }}{{ nft.val.round }}{{ $t('numSale') }}{{ nft.val.total
                  }}{{ $t('blindBoxNum') }}，{{ $t('restBlindBox') }}</span
                >
                <span
                  >{{ format(nft.val.remain) }}{{ $t('blindBoxNum')
                  }}{{ nft.val.remain > 0 ? '' : $t('blindBoxSaleOff') }}</span
                >
              </div>

              <div class="timeleft flex1">
                <!-- {{ $t('timeleft') }}：<span>{{ day }}</span
                >{{ $t('day') }}<span>{{ hour }}</span
                >{{ $t('hour') }}<span>{{ minute }}</span
                >{{ $t('minu') }}<span>{{ second }}</span
                >{{ $t('second') }} -->
              </div>

              <!-- 当自己的 NFT 上架时也要显示价格 -->

              <div
                class="my-sell-price"
                v-if="
                  nft.val.putAway &&
                    store.state.userInfo &&
                    store.state.userInfo.metaId === nft.val.ownerMetaId
                "
              >
                {{ $t('sellingPrice') }}:
                {{ price }}
              </div>
            </div>

            <!-- 拍卖信息 -->
            <div class="auction-msg flex flex-align-center" v-if="nft.val.isAuction">
              <div class="auction-msg-item flex1">
                <div class="title">{{ $t('currentBid') }}：</div>
                <div class="cont" v-if="nft.val.currentPrice">
                  {{ $filters.bsv(nft.val.currentPrice) }} BSV
                </div>
              </div>
              <div class="auction-msg-item" v-if="nft.val.isAuction && nft.val.auctionStatus === 2">
                <div class="title">{{ $t('auctionEndTime') }}：</div>
                <div class="cont">
                  <VueCountdown
                    :time="nft.val.auctionTime"
                    :transform="transformSlotProps"
                    v-slot="{ days, hours, minutes, seconds }"
                    @end="auctionCountDownFinish"
                    class="count-down-warp"
                  >
                    <div class="count-down">
                      {{ days }}
                      <span>{{ $t('day') }}</span>
                      {{ hours }}
                      <span>{{ $t('hour') }}</span>
                      {{ minutes }}
                      <span>{{ $t('minu') }}</span>
                      {{ seconds }}
                      <span>{{ $t('second') }}</span>
                    </div>
                  </VueCountdown>
                </div>
              </div>
            </div>

            <!-- 操作 -->
            <div class="operate-warp flex flex-align-center">
              <template
                v-if="
                  nft.val.isAuction && nft.val.auctionStatus !== 0 && nft.val.auctionStatus !== 4
                "
              >
                <!-- 拍卖 -->
                <div class="flex1">
                  <div
                    class="btn btn-block flex1 flex flex-align-center flex-pack-center"
                    :class="{
                      'btn-gray': auctionBtnClassGray,
                    }"
                    @click="openAuctionModal"
                  >
                    {{
                      nft.val.auctionStatus === 1
                        ? $t('unStart')
                        : nft.val.auctionStatus === 2
                        ? $t('iWanToBid')
                        : nft.val.auctionStatus === 3 &&
                          store.state.userInfo &&
                          store.state.userInfo.metaId === nft.val.ownerMetaId
                        ? $t('confirmAuctionSend')
                        : $t('isBeBuyed')
                    }}
                  </div>
                  <div class="auctionFailTips">*{{ $t('auctionFailTips') }}</div>
                </div>
                <!-- 一口价购买 -->
                <!-- <div
                        class="btn btn-block btn-black flex1 flex-align-center flex-pack-center"
                        @click="buy"
                      >
                        <div>
                          <div class="title">一口价</div>
                          <div class="cont">4.55 BSV</div>
                        </div>
                </div>-->
              </template>
              <template v-else-if="nft.val.sellState === 3">
                <div class="btn btn-block btn-gray flex1 flex flex-align-center flex-pack-center">
                  {{ $t('comingSoon') }}
                </div>
              </template>
              <template v-else>
                <!-- 非自己的 -->
                <template
                  v-if="
                    !store.state.userInfo ||
                      (store.state.userInfo && store.state.userInfo.metaId !== nft.val.ownerMetaId)
                  "
                >
                  <!-- 购买 -->
                  <div
                    class="btn btn-block flex1 flex flex-align-center flex-pack-center"
                    :class="[
                      !nft.val?.putAway && !blindBoxPage
                        ? 'btn-gray'
                        : blindBoxPage
                        ? nft.val.remain > 0
                          ? ''
                          : 'btn-noColor'
                        : '',
                    ]"
                    @click="startBuy"
                  >
                    <template v-if="nft.val?.putAway && !nft.val?.uuid && !blindBoxPage">
                      {{
                        i18n.locale.value === 'zh' ? `以 ${price}  购买` : `Buy Now At ${price} `
                      }}
                    </template>
                    <template v-else-if="nft.val?.putAway && nft.val?.uuid && !blindBoxPage">
                      {{ i18n.locale.value === 'zh' ? `以 ${price} 购买` : `Buy Now At ${price}` }}
                    </template>
                    <!--盲盒购买状态-->
                    <template v-else-if="blindBoxPage">
                      {{
                        nft.val.remain > 0
                          ? `${$t('blindBoxSalePrice')} ${cnyMode ? '¥' : ''}${blindBoxPrice} ${
                              cnyMode ? '' : 'BSV'
                            }`
                          : store.state.blindboxLimitedTime
                          ? `${$t('buyblindboxTimeOver')}`
                          : `${$t('lookOther')}`
                      }}
                      <VueCountdown
                        v-if="store.state.blindboxLimitedTime"
                        class="countdown"
                        :time="store.state.blindboxLimitedTime - new Date().getTime()"
                        :transform="transformSlotProps"
                        v-slot="{ days, hours, minutes, seconds }"
                        @end="blindBoxCutDown"
                      >
                        <span class="dot"></span
                        ><span
                          >{{ parseInt(hours) + parseInt(days) * 24 }}:{{ minutes }}:{{
                            seconds
                          }}</span
                        >
                      </VueCountdown>
                    </template>

                    <template v-else>{{ $t('isBeBuyedOrCanceled') }}</template>
                  </div>
                </template>
                <!-- 自己的 -->
                <template
                  v-else-if="
                    store.state.userInfo && store.state.userInfo.metaId === nft.val.ownerMetaId
                  "
                >
                  <div class="flex flex-align-center putAway-warp flex1" v-if="nft.val.putAway">
                    <div
                      class="btn btn-block btn-plain flex1 flex flex-align-center flex-pack-center"
                      @click="offSale"
                    >
                      {{ $t('offsale') }}
                    </div>
                    <!-- <template v-if="now > nft.val.remainingTime">
                    <div class="btn btn-block flex1" @click="toSale">{{$t('saleAgain')}}</div>
                      </template>-->
                  </div>
                  <div
                    class="btn btn-block flex1 flex flex-align-center flex-pack-center"
                    v-else
                    @click="toSale"
                  >
                    {{ $t('sale') }}
                  </div>
                </template>
              </template>
            </div>

            <!-- buy-fee-tips 拍卖的时候不显示 -->
            <div
              class="buy-fee-tips"
              v-if="
                nft.val.putAway &&
                  !nft.val.isAuction &&
                  (!store.state.userInfo ||
                    (store.state.userInfo && store.state.userInfo.metaId !== nft.val.ownerMetaId))
              "
            ></div>
          </div>
        </div>
        <div class="partDetailContainer" v-if="blindBoxPage">
          <PartDetail :nft="nft.val"></PartDetail>
        </div>
        <div class="bottom" v-else>
          <div class="bottom-warp">
            <div class="tab">
              <a
                :class="{ active: index === tabIndex }"
                v-for="(tab, index) in tabs"
                :key="index"
                @click="changeTabIndex(index)"
                >{{ $t(tab.key) }}</a
              >
            </div>
            <div class="tab-cont">
              <!-- 作品细节 -->
              <div class="work-deail" v-if="tabIndex === 0">
                <div class="work-deail-section">
                  <div class="work-detail-item flex flex-align-center">
                    <div class="key">{{ $t('workname') }}：</div>
                    <div class="value flex1">{{ nft.val.nftName }}</div>
                  </div>
                  <div class="work-detail-item flex flex-align-center">
                    <div class="key">{{ $t('workclass') }}：</div>
                    <div class="value flex1">
                      <template v-if="nft.val.classify && nft.val.classify.length > 0">
                        <span v-for="item in nft.val.classify" :key="item">{{
                          item === 'avatar' ? $t('profilepic') : $t(item)
                        }}</span>
                      </template>
                      <template v-else>--</template>
                    </div>
                  </div>
                  <!-- 作品链接 -->
                  <div
                    class="work-detail-item flex flex-align-center"
                    v-if="
                      nft.val.classify.find(item => item === 'article') &&
                        nft.val.classify.find(item => item === 'rights')
                    "
                  >
                    <div class="key">{{ $t('worklink') }}：</div>
                    <div class="value flex1">
                      <a class="link" :href="nft.val.nftWebsite" target="_blank">{{
                        $t('workdetaillink')
                      }}</a>
                    </div>
                  </div>
                  <div class="work-detail-item flex flex-align-baseline">
                    <div class="key">{{ $t('workdrsc') }}：</div>
                    <div class="value flex1">
                      <pre>{{ nft.val.describe }}</pre>
                    </div>
                  </div>
                </div>
                <div class="work-deail-section">
                  <div class="work-detail-item flex flex-align-center">
                    <div class="key">{{ $t('createtime') }}：</div>
                    <div class="value flex1">{{ $filters.dateTimeFormat(nft.val.forgeTime) }}</div>
                  </div>
                  <div
                    class="work-detail-item flex flex flex-align-baseline"
                    v-if="nft.val.sellTxId !== '' && !nft.val?.uuid"
                  >
                    <div class="key">{{ $t('contractaddr') }}：</div>
                    <div class="value flex1 nowrap">
                      {{ nft.val.sellTxId }}
                      <a class="copy" @click="copy(nft.val.sellTxId)">{{ $t('copy') }}</a>
                      <a class="copy" @click="toWhatsonchain(nft.val.sellTxId)">{{ $t('look') }}</a>
                    </div>
                  </div>
                  <div class="work-detail-item flex flex-align-center">
                    <div class="key">TokenID：</div>
                    <div class="value flex1 nowrap">
                      {{ nft.val.tokenId }}
                      <a class="copy" @click="copy(nft.val.tokenId)">{{ $t('copy') }}</a>
                      <!-- <a class="copy" @click="toWhatsonchain(nft.val.tokenId)">{{ $t('look') }}</a> -->
                    </div>
                  </div>
                  <div class="work-detail-item flex flex-align-center">
                    <div class="key">{{ $t('issueMetaTxId') }}：</div>
                    <div class="value flex1 nowrap">
                      {{ nft.val.issueMetaTxId }}
                      <a class="copy" @click="copy(nft.val.issueMetaTxId)">{{ $t('copy') }}</a>
                      <a class="copy" @click="toWhatsonchain(nft.val.issueMetaTxId)">
                        {{ $t('look') }}
                      </a>
                    </div>
                  </div>
                </div>
                <div class="work-deail-section">
                  <div class="work-detail-item flex flex-align-center">
                    <div class="key">{{ $t('creater') }}：</div>
                    <div class="value flex1">
                      <div class="author flex flex-align-center">
                        <UserAvatar
                          class="avatar"
                          :metaId="nft.val.foundryMetaId"
                          :type="nft.val.issueUserAvatarType"
                        />
                        <div class="author-msg flex1">
                          <div class="creater">{{ nft.val.foundryName }}</div>
                          <div class="metaid" v-if="nft.val.foundryMetaId">
                            MetaID: {{ nft.val.foundryMetaId.slice(0, 6) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="work-detail-item flex flex-align-center">
                    <div class="key">{{ $t('haveder') }}：</div>
                    <div class="value flex1">
                      <div class="author flex flex-align-center">
                        <UserAvatar
                          class="avatar"
                          :metaId="nft.val.ownerMetaId"
                          :type="nft.val.ownerAvatarType"
                        />
                        <div class="author-msg flex1">
                          <div class="creater">
                            {{ nft.val.ownerName ? nft.val.ownerName : nft.val.ownerAddress }}
                          </div>
                          <div class="metaid" v-if="nft.val.ownerMetaId">
                            MetaID:{{ nft.val.ownerMetaId.slice(0, 6) }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="remark">
                  <div class="remark-item">
                    {{ $t('remark1') }}
                    <!-- <a @click="more">{{ $t('knowmore') }}</a> -->
                  </div>
                  <div class="remark-item">{{ $t('remark2') }}</div>
                  <div class="remark-item">{{ $t('remark3') }}</div>
                </div>
              </div>

              <!-- 拥有记录 -->
              <div class="haved-record" v-else-if="tabIndex === 1">
                <div class="tr th flex flex-align-center">
                  <span class="td flex1">{{ $t('owner') }}</span>
                  <span class="td flex1">{{ $t('role') }}</span>
                  <span class="td flex1">{{ $t('time') }}</span>
                  <span class="td  price flex1">{{ $t('price') }}</span>
                </div>

                <!-- 历史拥有者 -->
                <div
                  class="tr flex flex-align-center"
                  v-for="(record, index) in records"
                  :key="record.timestamp"
                >
                  <img class="tobe" :src="ListIcon" v-if="index !== 0" />
                  <span class="td flex1 user flex flex-align-center" @click="ToUser(record.metaId)">
                    <img :src="$filters.avatar(record.metaId)" :alt="record.name" />
                    <span class="name">{{ record.name }}</span>
                  </span>
                  <span class="td role flex1 flex flex-align-center">
                    <template v-if="index === records.length - 1">
                      <img :src="CastingIcon" />
                      {{ $t('creater') }}
                    </template>
                    <template v-else>{{
                      index === 0 ? $t('haveder') : $t('histsoryowner')
                    }}</template>
                  </span>
                  <span class="td time flex1">{{
                    $filters.dateTimeFormat(record.timestamp, 'YYYY-MM-DD HH:mm')
                  }}</span>
                  <span class="td price flex1"
                    >{{
                      record.satoshisPrice
                        ? $filters.bsv(record.satoshisPrice) + 'BSV'
                        : $t('noPaid')
                    }}
                  </span>
                  <a class="link" @click="store.state.sdk?.toTxLink(record.txId)"
                    ><img :src="LinkIcon"
                  /></a>
                </div>

                <LoadMore
                  :pagination="ownerHistoryPagination"
                  @getMore="getMoreRecords"
                  v-if="records.length > ownerHistoryPagination.pageSize"
                />
              </div>

              <!-- 历史出价 -->
              <div class="historical-bid" v-if="tabIndex === 2">
                <div
                  class="historical-bid-item flex flex-align-center"
                  v-for="(item, index) in auctionRecords"
                  :key="item.txId"
                >
                  <!-- 用户信息 -->
                  <div class="author flex1 flex flex-align-center">
                    <UserAvatar class="avatar" :metaId="item.metaId" />
                    <div class="author-msg flex1">
                      <div class="creater">{{ item.userName }}</div>
                      <div class="metaid" v-if="item.metaId">
                        MetaID:{{ item.metaId.slice(0, 6) }}
                      </div>
                    </div>
                  </div>
                  <!-- 出价信息 -->
                  <div class="auction-price">
                    <div class="price flex flex-align-center">
                      <a class="btn btn-min" v-if="index === 0 || auctionRecords.length === 1">
                        <!-- <template v-if="item.status === 2">{{ $t('sealTheDeal') }}</template>
                        <template v-else>{{ $t('latestBid') }}</template> -->
                        {{ $t('latestBid') }}
                      </a>
                      <span class="title">{{ $t('auctionBid') }}</span>
                      <span class="amount">{{ $filters.bsv(item.bidPrice) }} BSV</span>
                    </div>
                    <div class="time">
                      {{ $filters.dateTimeFormat(item.timestamp, 'MM 月 DD 日 HH:mm:ss') }}
                    </div>
                  </div>
                </div>

                <div class="historical-bid-item flex flex-align-center">
                  <!-- 用户信息 -->
                  <div class="author flex1 flex flex-align-center">
                    <UserAvatar
                      class="avatar"
                      :metaId="nft.val.auctionMetaId"
                      :type="nft.val.auctionAvatarType"
                    />
                    <div class="author-msg flex1">
                      <div class="creater">{{ nft.val.auctionUserName }}</div>
                      <div class="metaid" v-if="nft.val.auctionMetaId">
                        MetaID:{{ nft.val.auctionMetaId.slice(0, 6) }}
                      </div>
                    </div>
                  </div>
                  <!-- 出价信息 -->
                  <div class="auction-price">
                    <div class="price flex flex-align-center">
                      <span class="title">{{ $t('auctionBid') }}</span>
                      <span class="amount">{{ nft.val.startPrice }} BSV</span>
                    </div>
                    <!-- <div class="time">
                      {{ $filters.dateTimeFormat(nft.val.update_time, 'MM 月 DD 日 HH:mm:ss') }}
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ElSkeleton>
  </div>

  <!-- drsc detail -->
  <MoreContentModal
    :visible="isShowDrscDetail"
    :title="$t('seller') + $t('drsc')"
    @change="value => (isShowDrscDetail = value)"
  >
    {{ NFTMainMsgDesc }}
  </MoreContentModal>

  <!-- auction price -->
  <ElDialog v-model="isShowAuctionModal">
    <div class="auction-modal">
      <div class="title">{{ $t('iWanToBid') }}</div>
      <div class="msg-list">
        <div class="msg-item flex flex-align-center">
          <div class="key flex1">{{ $t('currentBid') }}</div>
          <div class="value" v-if="nft.val.currentPrice">
            {{ $filters.bsv(nft.val.currentPrice) }} BSV
          </div>
        </div>
        <div class="msg-item flex flex-align-center">
          <div class="key flex1">
            {{ $t('minimumMarkup') }}({{ nft.val?.nftMinBidIncreaseInt }}%)
          </div>
          <div class="value" v-if="nft.val.minGapPrice">
            {{ $filters.bsv(nft.val.minGapPrice) }} BSV
          </div>
        </div>
      </div>
      <div class="cont flex flex-align-center">
        <span>{{ $t('myBid') }}</span>
        <input
          type="number"
          v-model="auctionPrice"
          :min="new Decimal(minActionPrice).toNumber()"
          :setp="nft.val.minGapPrice ? new Decimal(nft.val.minGapPrice).toNumber() : 0.1"
          class="warp flex1"
          @change="onAuctionPriceChange"
        />
        <span>BSV</span>
      </div>
      <!-- <div class="equal">≈1036 CNY</div> -->
      <div class="msg-list haved-bsv">
        <div class="msg-item flex flex-align-center">
          <div class="key flex1">{{ $t('availableAssets') }}</div>
          <div class="value">{{ balance }} BSV</div>
        </div>
      </div>

      <div
        class="btn btn-block"
        v-loading="getBalanceLoading"
        v-if="new Decimal(nftExtraFee).plus(auctionPrice).toNumber() <= balance || true"
        @click="bid"
      >
        {{ $t('bid') }}
      </div>
      <div class="btn btn-block btn-gray" v-loading="getBalanceLoading" v-else @click="toWallet">
        {{ $t('insufficientBalanceToWallet') }}
        <img :src="CardIcon" />
      </div>
      <div class="auctionFailTips">*{{ nftAuctionExtraFeeText }}</div>
    </div>
  </ElDialog>

  <!-- pay confirm -->
  <PayConfirmVue
    :visible="isShowConfirm"
    :genesis="nft.val?.genesis"
    :codehash="nft.val?.codeHash"
    :token-index="nft.val?.tokenIndex"
    :isLegal="isLegal"
    :uuid="nft.val?.uuid"
    @close="isShowConfirm = false"
    @success="buySuccess"
    :price="price"
    :blindBoxPage="blindBoxPage"
  ></PayConfirmVue>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { toClipboard } from '@soerenmartius/vue3-clipboard'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { useRoute } from 'vue-router'
// @ts-ignore
import {
  GetFeeInfo,
  GetMyNftEligibility,
  GetNftAuctionDetail,
  GetNftAuctionHistory,
  GetNftHolderList,
  Langs,
  NftApiCode,
  TransactionRecord,
  GetLegalNftDetail,
  GetBlindBoxSaleDetail,
} from '@/api'
import { useStore, Mutation } from '@/store'
import { pagination, UnitName } from '@/config'
import { checkSdkStatus, confirmToSendMetaData, ToUser, format } from '@/utils/util'
import Decimal from 'decimal.js-light'
import { router } from '@/router'
import NftOffSale from '@/utils/offSale'
import NFTDetail from '@/utils/nftDetail'
import VueCountdown from '@chenfengyuan/vue-countdown'
import LoadMore from '@/components/LoadMore/LoadMore.vue'
import CertTemp from '@/components/Cert/Cert.vue'
import MoreContentModal from '@/components/Modal/MoreContentModal/MoreContentModal.vue'
import {
  bsv,
  bsvStr,
  satoshis,
  toCNY,
  converterPrice,
  legalNftConverterPrice,
} from '@/utils/filters'
import { auctionConfirmSend } from '@/utils/auction'
import DetailSkeletonVue from './DetailSkeleton.vue'
import NFTCover from '@/components/NFT/Cover.vue'
import ShareIcon from '@/assets/images/icon_share.svg?url'
import ListIcon from '@/assets/images/list_icon_ins.svg?url'
import LinkIcon from '@/assets/images/list_icon_link.svg?url'
import CastingIcon from '@/assets/images/icon_casting.svg?url'
import CardIcon from '@/assets/images/card_icon_ins.svg?url'
import LikedIcon from '@/assets/images/nft_icon_like_active.svg?url'
import LikeIcon from '@/assets/images/nft_icon_like.svg?url'
import PayConfirmVue from '@/components/PayConfirm/PayConfirm.vue'
import TransformPrice from '@/components/TransformPrice/transformPrice.vue'

import PartDetail from '@/components/BlindBox/partDetail.vue'
const i18n = useI18n()
const route = useRoute()
const store = useStore()
const now = new Date().getTime()
const tabs = [
  { name: i18n.t('workdetail'), key: 'workdetail' },
  { name: i18n.t('possessionrecord'), key: 'possessionrecord' },
]
const tabIndex = ref(0)
const isShowSkeleton = ref(true)
const isShowDrscDetail = ref(false)
const isShowAuctionModal = ref(false)
const isShowConfirm = ref(false)
const cnyMode = computed(() => {
  return store.state.currentPrice === UnitName.RMB
})

// const blindboxLimitedTime = ref(1650369600000)

// const isShowCountDown = ref(1650283200000 > new Date().getTime())
// const blindBoxTime = ref(1650283200000) //1650283200

// 手续费率 版税 + 平台手续费
const nftExtraFeePercent = ref(0)
// 版税费率
const nftRoyaltyPercent = ref(0)
// 平台手续费率
const nftPlatformPercent = ref(0)
// 版税费
const nftRoyaltyFee = computed(() => {
  let fee = 0
  if (nft.val) {
    if (auctionPrice.value) {
      fee = Math.ceil(
        new Decimal(satoshis(auctionPrice.value)).mul(nftRoyaltyPercent.value / 100).toNumber()
      )
    } else {
      fee = Math.ceil(new Decimal(nft.val.amount).mul(nftRoyaltyPercent.value / 100).toNumber())
    }
  }
  return bsv(fee)
})

const blindBoxPage = computed(() => {
  return route.name === 'blindBoxDetail'
})

const isLegal = computed(() => {
  return route.name === 'legaldetail'
})
const cnyPrice = computed(() => {
  console.log('xzzxzxxxxxxzxzxz', price.value)
  return toCNY(nft.val.nftPrice).toFixed(2)
})

const blindBoxPrice = computed(() => {
  if (cnyMode.value) {
    return new Decimal(nft.val.rmbPrice * 0.01).toFixed(2)
  } else {
    return new Decimal(nft.val.bsvPrice).div(Math.pow(10, 8)).toNumber()
  }
})

const nftExtraFee = computed(() => {
  let fee = 0
  if (nftExtraFeePercent.value && nft.val) {
    if (auctionPrice.value) {
      fee = Math.ceil(
        new Decimal(satoshis(auctionPrice.value)).mul(nftExtraFeePercent.value).toNumber()
      )
    } else {
      fee = Math.ceil(new Decimal(nft.val.amount).mul(nftExtraFeePercent.value).toNumber())
    }
  }
  return bsv(fee)
})

// 平台
const nftPlatformFee = computed(() => {
  let fee = 0
  if (nft.val) {
    if (auctionPrice.value) {
      fee = Math.ceil(
        new Decimal(satoshis(auctionPrice.value)).mul(nftPlatformPercent.value / 100).toNumber()
      )
    } else {
      fee = Math.ceil(new Decimal(nft.val.amount).mul(nftPlatformPercent.value / 100).toNumber())
    }
  }
  return bsv(fee)
})

const nftAuctionExtraFeeText = computed(() => {
  return `${i18n.t('buyFeeTips')}: ${i18n.t('buyFeeTips3')}(${nftPlatformPercent.value +
    nftRoyaltyPercent.value}%) = ${nftPlatformFee.value + nftRoyaltyFee.value} BSV ${
    auctionPrice.value ? i18n.t('auctionFeeTips') : ''
  }`
})

const auctionBtnClassGray = computed(() => {
  if (nft.val.auctionStatus === 2) {
    return false
  } else if (nft.val.auctionStatus === 3) {
    if (store.state.userInfo && store.state.userInfo.metaId === nft.val.ownerMetaId) {
      return false
    } else {
      return true
    }
  } else {
    return true
  }
})

const nftExtraFeeText = computed(() => {
  return `${i18n.t('buyFeeTips')}: ${
    nftRoyaltyPercent.value
      ? `${i18n.t('buyFeeTips2')}(${nftRoyaltyPercent.value}%) = ${nftRoyaltyFee.value} BSV;`
      : ''
  }  ${i18n.t('buyFeeTips3')}(${nftPlatformPercent.value}%) = ${nftPlatformFee.value} BSV ${
    auctionPrice.value ? i18n.t('auctionFeeTips') : ''
  }`
})

const balance = ref(0) // 用户余额
const getBalanceLoading = ref(true)

const auctionRecords = reactive<GetNftAuctionHistoryResItem[]>([]) // 最小叫价

const ownerHistoryPagination = reactive({
  ...pagination,
})

// @ts-ignore
const nft: { val: NftItemDetail | null } = reactive({
  val: null,
})

// 拍卖价
const auctionPrice = ref(0)
// 最小叫价
const minActionPrice = ref(0)

const price = ref('0')

watch(
  (): [string, NftItemDetail | null] => [store.state.currentPrice, nft.val],
  newVal => {
    if (newVal[0] && newVal[1]) {
      if (isLegal.value) {
        price.value = legalNftConverterPrice(newVal[1].nftPrice)
      } else {
        price.value = converterPrice(newVal[1].amount)
      }
    }
  },
  { immediate: true }
)

function getDetail() {
  return new Promise<void>(async resolve => {
    let _nft
    if (route.name === 'legaldetail') {
      const res: any = await GetLegalNftDetail({
        uuid: typeof route.params.uuid === 'string' ? route.params.uuid : '',
      }).catch(() => (isShowSkeleton.value = false))
      if (res?.code == 0) {
        _nft = res.data
      }
    } else if (blindBoxPage.value) {
      try {
        const blindBoxRes: BlindBoxSaleDetail = await GetBlindBoxSaleDetail()
        if (blindBoxRes.code == 0) {
          _nft = blindBoxRes.data
        }
      } catch {
        isShowSkeleton.value = false
      }
    } else {
      _nft = await NFTDetail(
        typeof route.params.genesisId === 'string' ? route.params.genesisId : '',
        typeof route.params.codehash === 'string' ? route.params.codehash : '',
        typeof route.params.tokenIndex === 'string' ? route.params.tokenIndex : ''
      ).catch(() => (isShowSkeleton.value = false))
    }

    if (_nft && typeof _nft !== 'boolean') {
      nft.val = _nft

      if (route.name === 'legaldetail') {
        nft.val.classify = _nft.nftClassifyList
        nft.val.foundryMetaId = _nft.nftIssueMetaId
        nft.val.issueUserAvatarType = _nft.nftIssueAvatarType
        nft.val.foundryName = _nft.nftIssuer
        nft.val.coverUrl = _nft.nftBackIcon || _nft.nftIcon
        nft.val.putAway = true
        nft.val.ownerMetaId = _nft.nftOwnerMetaId
        nft.val.ownerAvatarType = _nft.nftOwnerAvatarType
        nft.val.ownerName = _nft.nftOwnerName
        nft.val.describe = _nft.nftDesc
        nft.val.tokenId = _nft.nftTokenId
        nft.val.issueMetaTxId = _nft.nftIssueMetaTxId
        nft.val.genesis = _nft.nftGenesis
        nft.val.codeHash = _nft.nftCodehash
        nft.val.tokenIndex = _nft.nftTokenIndex
        nft.val.sellState = _nft.nftSellState
        nft.val.sellDesc = _nft.nftSellDesc
      }
      if (blindBoxPage.value) {
        nft.val.nftName = 'MetaBot形象盲盒'
        nft.val.classify = [`${i18n.t('fragment')}`]
        nft.val.describe = _nft.sellDesc
        nft.val.forgeTime = 0
        nft.val.tokenId = ''
        nft.val.sellTxId = ''
        nft.val.foundryName = 'ShowPayTeam'
        nft.val.nftIssuer = 'ShowPayTeam'
        nft.val.foundryMetaId = '974e2977d5c9446f7f48fd82c9ea51f82749b9ef7c00d26b73bc450d167d5f31'
        nft.val.issueUserAvatarType = 'MetaBotAvatar'
        nft.val.nftIssueAvatarType = 'MetaBotAvatar'
        nft.val.nftIssueMetaId = '974e2977d5c9446f7f48fd82c9ea51f82749b9ef7c00d26b73bc450d167d5f31'
        nft.val.nftOwnerAvatarType = 'MetaBotAvatar'
        nft.val.nftOwnerName = 'ShowPayTeam'
        nft.val.nftOwnerMetaId = '974e2977d5c9446f7f48fd82c9ea51f82749b9ef7c00d26b73bc450d167d5f31'
        nft.val.ownerMetaId = '974e2977d5c9446f7f48fd82c9ea51f82749b9ef7c00d26b73bc450d167d5f31'
        nft.val.ownerName = 'ShowPayTeam'
        nft.val.limited = 9560
        nft.val.round = _nft.round
        nft.val.total = _nft.total
        nft.val.remain = _nft.remain < 0 ? 0 : _nft.remain
        nft.val.sellState = _nft.remain > 0 ? 0 : 1
        nft.val.putAway = _nft.remain > 0
      }
      console.log('zxzxzx222asas', nft.val)
      // debugger
      // 拍卖
      if (
        nft.val.nftCurrentAuctionCreateTxId &&
        nft.val.nftCurrentAuctionCreateTxId !== '' &&
        !isLegal.value
      ) {
        nft.val.isAuction = true
        const _tabIndex = tabs.findIndex(item => item.key === 'historicalBid')
        if (_tabIndex === -1) {
          tabs.push({ name: i18n.t('historicalBid'), key: 'historicalBid' })
        }
        tabIndex.value = 2
        const res = await GetNftAuctionDetail(nft.val.nftCurrentAuctionCreateTxId)
        if (res.code === 0) {
          /* if (!res.data) {
            res.data = {
              bidPrice: '100000', // 竞价价格
              bidPriceInt: 100000, // 竞价价格
              chargeUnit: 'STAS', // 竞价单位
              codehash: 'string',
              genesis: 'string',
              genesisTxId: 'string',
              issuerMetaId: 'string',
              issuerMetaTxId: 'string',
              metaId: 'string',
              metanetId: 'string',
              nftAuctionId: 'string', // nft 拍卖创建 txId
              nftHash: 'string',
              tokenIndex: 'string',
              txId: 'string',
              currentAuctionState: 2,
              currentBidPrice: '1000',
              currentBidPriceInt: 1000,
              endTimeStamp: 1640673817000,
              userName: 'string',
              startingPrice: '1000',
              startingPriceInt: 1000,
              timestamp: 1640673817000,
            }
          } */
          nft.val.auctionMetaId = res.data.metaId
          nft.val.auctionUserName = res.data.userName
          nft.val.auctionAvatarType = res.data.avatarType
          nft.val.auctionId = res.data.nftAuctionId
          nft.val.startPrice = bsvStr(res.data.startingPrice)
          nft.val.amount = bsv(res.data.startingPriceInt)
          // 当前价
          nft.val.currentPrice =
            res.data.currentBidPrice === '' || res.data.currentBidPrice === '0'
              ? new Decimal(res.data.startingPrice).toNumber()
              : new Decimal(res.data.currentBidPrice).toNumber()
          // 最小出价
          nft.val.minGapPrice = Math.ceil(
            new Decimal(nft.val.currentPrice)
              .mul(new Decimal(nft.val.nftMinBidIncreaseInt).div(100).toNumber())
              .toNumber()
          )
          // nft.val.auctionDrsc = item.memo
          nft.val.auctionTime = res.data.endTimeStamp - new Date().getTime()
          nft.val.auctionStatus = res.data.currentAuctionState
          nft.val.update_time = res.data.timestamp
          auctionPrice.value = bsv(
            new Decimal(nft.val.currentPrice).plus(nft.val.minGapPrice).toNumber()
          )
          minActionPrice.value = auctionPrice.value
          // 获取拍卖记录
          getNftAuctionHistorys()
        }
      }
      // 获取 nft 费率
      if (route.name !== 'legaldetail') {
        await getNftFeePercent()
      } else {
        await getlegalFeePercent(_nft)
      }
      // countDownTimeLeft()
      isShowSkeleton.value = false
    }
    resolve()
  })
}

const records: GetNftHolderListResItem[] = reactive([])
const ownerRecord: { val: GetNftHolderListResItem | null } = reactive({
  val: null,
})
const issueRecord: { val: GetNftHolderListResItem | null } = reactive({
  val: null,
})

function auctionCountDownFinish() {
  if (nft.val.auctionStatus === 2) {
    nft.val.auctionStatus = 3
  }
}

// function strartBuyBlindBox() {
//   isShowCountDown.value = false
// }

function transformSlotProps(props: any) {
  const formattedProps = {}
  Object.entries(props).forEach(([key, value]) => {
    // @ts-ignore
    formattedProps[key] = value < 10 ? `0${value}` : String(value)
  })
  return formattedProps
}

function changeTabIndex(index: number) {
  if (tabIndex.value === index) {
    return
  }
  tabIndex.value = index
  // if (tabIndex.value == 1 && route.name === 'legaldetail') {
  //   getNftHolderList()
  // }
}

function copy(value: string) {
  toClipboard(value)
    .then(() => {
      ElMessage.success(i18n.t('copysuccess'))
    })
    .catch(() => {
      ElMessage.success(i18n.t('copyerror'))
    })
}

let interval: NodeJS.Timeout
const day = ref(0)
const hour = ref(0)
const minute = ref(0)
const second = ref(0)

// 详细页头部描述我位置的内容
const NFTMainMsgDesc = computed(() => {
  // 1. 是否拍卖 显示拍卖描述 2. 是否上架 显示上架描述 3.下架状态 显示 nft 的描述
  return nft.val.isAuction
    ? nft.val.describe
    : nft.val.putAway
    ? nft.val.sellDesc
    : nft.val.describe
})

function offSale() {
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  ElMessageBox.confirm(`${i18n.t('offsaleConfirm')} ${nft.val.nftName} ?`, i18n.t('niceWarning'), {
    confirmButtonText: i18n.t('confirm'),
    cancelButtonText: i18n.t('cancel'),
    closeOnClickModal: false,
  })
    .then(async () => {
      if (route.name === 'legaldetail') {
        loading.close()
      } else {
        NftOffSale(nft.val, loading)
          .then(() => {
            loading.close()
          })
          .catch(() => {
            loading.close()
          })
      }
    })
    .catch(() => loading.close())
}

function startBuy() {
  if (store.state.blindboxLimitedTime && blindBoxPage.value) {
    return ElMessage.error(`${i18n.t('blindboxOverTime')}`)
  }
  // if (isShowCountDown.value) {
  //   return ElMessage.error('未开售')
  // }
  if (nft.val.remain <= 0 && blindBoxPage.value) {
    router.push(
      '/collection/detail/MetaBotAvatar/974e2977d5c9446f7f48fd82c9ea51f82749b9ef7c00d26b73bc450d167d5f31'
    )
  }
  if (nft.val.sellState !== 0) return
  if (isLegal.value && !cnyMode.value) {
    return ElMessage.error(`${i18n.t('notSupportBsvBuyLegal')}`)
  }
  isShowConfirm.value = true
}

async function buySuccess(result: any) {
  console.log('xzx2222asa', result)

  nft.val.ownerMetaId = store.state.userInfo!.metaId
  nft.val.ownerName = store.state.userInfo!.name
  nft.val.putAway = false

  isShowConfirm.value = false
  router.replace({
    name: 'nftSuccess',
    params: {
      genesisId: nft.val.genesis,
      tokenIndex: nft.val.tokenIndex,
      codehash: nft.val.codeHash,
    },
    query: {
      type: result.uuid ? 'buylegal' : 'buyed',
      uuid: result.uuid ? result.uuid : '',
    },
  })
}

function toWhatsonchain(txId: string) {
  window.open(`https://whatsonchain.com/tx/${txId}`)
}

// 分享
function share() {
  const value = `${i18n.t('shareText1')}\r\n ${nft.val.nftName}：${window.location.href}`
  toClipboard(value)
    .then(() => {
      ElMessage.success(i18n.t('copyShareSuccess'))
    })
    .catch(() => {
      ElMessage.success(i18n.t('copyerror'))
    })
}

async function toSale() {
  // 檢查是否有權限

  const res = await GetMyNftEligibility({
    MetaId: store.state.userInfo!.metaId,
    IssueMetaId: nft.val.foundryMetaId,
    lang: i18n.locale.value === 'en' ? Langs.EN : Langs.CN,
  })
  if (res.code !== 0) {
    ElMessage.error(res.data)
    return
  }
  router.push({
    name: 'sale',
    params: {
      genesisId: nft.val.genesis,
      codehash: nft.val.codeHash,
      tokenIndex: nft.val.tokenIndex,
    },
  })
}

async function getBalance() {
  const res = await store.state.sdk?.getBalance()
  if (res?.code === 200) {
    balance.value = res.data.bsv
    getBalanceLoading.value = false
  }
}

// 更改竞拍价格
function onAuctionPriceChange() {
  if (new Decimal(auctionPrice.value).toNumber() < new Decimal(minActionPrice.value).toNumber()) {
    auctionPrice.value = minActionPrice.value
  }
}

function toWallet() {
  window.open(import.meta.env.VITE_AuthUrl)
}

async function openAuctionModal() {
  // 待发送
  if (
    nft.val.auctionStatus === 3 &&
    store.state.userInfo &&
    store.state.userInfo.metaId === nft.val.ownerMetaId
  ) {
    const loading = ElLoading.service({
      lock: true,
      text: 'Loading',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)',
      customClass: 'full-loading',
    })
    const params = {
      nft: {
        codehash: nft.val.codeHash,
        genesis: nft.val.genesis,
        genesisTxid: nft.val.genesisTxId,
        tokenIndex: nft.val.tokenIndex,
        sensibleId: nft.val.sensibleId,
      },
      issueAddress: nft.val.nftIssueAddress,
      issueMetaId: nft.val.nftIssueMetaId,
      nftAuctionId: nft.val.nftCurrentAuctionCreateTxId,
      amount: nft.val.currentPrice ? satoshis(nft.val.currentPrice) : satoshis(nft.val.startPrice),
      isFirstSell: nft.val.nftIsFirstSell,
    }
    const result = await await auctionConfirmSend(params).catch(error => {
      if (error) ElMessage.error(JSON.stringify(error))
      loading.close()
    })
    if (result) {
      setTimeout(() => {
        ElMessage.success(i18n.t('success'))
        loading.close()
        getDetail()
      }, 2000)
    }
  }

  if (nft.val.auctionStatus !== 2) return
  await checkSdkStatus()
  isShowAuctionModal.value = true
  getBalance()
}

// 出价
async function bid() {
  if (new Decimal(balance.value).toNumber() < new Decimal(auctionPrice.value).toNumber()) return
  const loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
    customClass: 'full-loading',
  })
  try {
    const params = {
      nft: {
        codehash: nft.val.codeHash,
        genesis: nft.val.genesis,
        genesisTxid: nft.val.genesisTxId,
        tokenIndex: nft.val.tokenIndex,
        sensibleId: nft.val.sensibleId,
      },
      lastBsvBidPrice: nft.val.currentPrice,
      bsvBidPrice: satoshis(auctionPrice.value),
      nftAuctionId: nft.val.nftCurrentAuctionCreateTxId,
    }
    const res = await store.state.sdk?.nftAuctionBid({
      ...params,
      checkOnly: true,
    })
    if (res?.code === 200) {
      const usedAmount = new Decimal(Math.abs(res.data.amount)).toNumber()
      const result = await confirmToSendMetaData(usedAmount)
      if (result) {
        // 确认支付
        const response = await store.state.sdk?.nftAuctionBid(params)
        if (response && response?.code === 200) {
          ElMessage.success(i18n.t('bidSuccess'))
          nft.val.currentPrice = satoshis(auctionPrice.value)
          nft.val.minGapPrice = Math.ceil(
            new Decimal(nft.val.currentPrice)
              .mul(new Decimal(nft.val.nftMinBidIncreaseInt).div(100).toNumber())
              .toNumber()
          )
          minActionPrice.value = new Decimal(nft.val.currentPrice)
            .plus(nft.val.minGapPrice)
            .toNumber()
          auctionPrice.value = bsv(minActionPrice.value)
          isShowAuctionModal.value = false
          // 插入拍卖记录
          auctionRecords.unshift({
            bidPrice: nft.val.currentPrice.toString(),
            bidPriceInt: nft.val.currentPrice,
            chargeUnit: 'bsv',
            codehash: nft.val.codeHash,
            genesis: nft.val.genesis,
            genesisTxId: nft.val.genesisTxId,
            issuerMetaId: nft.val.foundryMetaId,
            issuerMetaTxId: nft.val.issueMetaTxId,
            metaId: store.state.userInfo.metaId,
            metanetId: '',
            nftAuctionId: response.data.txId,
            nftHash: '',
            tokenIndex: nft.val.tokenIndex,
            txId: response.data.txId,
            zeroAddress: store.state.userInfo.address,
            timestamp: new Date().getTime(),
            userName: store.state.userInfo.name,
          })
          loading.close()
        }
      }
    }
  } catch (error) {
    getDetail()
    ElMessage.error(i18n.t('bidFail'))
    if (loading) loading.close()
  }

  /* const res = await CheckUserCanAuction({
    codehash: nft.val.codeHash,
    genesis: nft.val.genesis,
    token_index: parseInt(nft.val.tokenIndex),
    value: new Decimal(auctionPrice.value).toString(),
  }).catch(error => {
    ElMessage.error(error.response.data.data)
    getBalanceLoading.value = true
    isShowSkeleton.value = true
    isShowAuctionModal.value = false
    getDetail()
    loading.close()
  })
  if (res?.code === 0) {

  } */
}

async function getNftAuctionHistorys() {
  const res = await GetNftAuctionHistory({
    auctionTxId: nft.val.nftCurrentAuctionCreateTxId,
    page: 1,
    pageSize: 99,
  })
  if (res.code === 0) {
    auctionRecords.length = 0
    auctionRecords.push(...res.data.results.items)
  }
}

//  获取拥有记录
async function getNftHolderList(isCover = false) {
  return new Promise(async resolve => {
    let res
    if (route.name === 'legaldetail') {
      res = await GetNftHolderList({
        genesis: nft.val.nftGenesis ? nft.val.nftGenesis : '',
        codehash: nft.val.nftCodehash ? nft.val.nftCodehash : '',
        tokenIndex: nft.val.nftTokenIndex ? nft.val.nftTokenIndex : '',
        page: ownerHistoryPagination.page.toString(),
        pageSize: ownerHistoryPagination.pageSize.toString(),
      })
      console.log('x222xzxz', res)
    } else {
      res = await GetNftHolderList({
        genesis: typeof route.params.genesisId === 'string' ? route.params.genesisId : '',
        codehash: typeof route.params.codehash === 'string' ? route.params.codehash : '',
        tokenIndex: typeof route.params.tokenIndex === 'string' ? route.params.tokenIndex : '',
        page: ownerHistoryPagination.page.toString(),
        pageSize: ownerHistoryPagination.pageSize.toString(),
      })
    }

    if (res && res.code === NftApiCode.success) {
      if (isCover) {
        records.length = 0
      }
      records.push(...res.data.results.items.holderList)
      console.log('x222xxxxxxxxxxxzxz', records)
      ownerRecord.val = res.data.results.items.owner
      issueRecord.val = res.data.results.items.issuer
      const totalPages = Math.ceil(res.data.total / ownerHistoryPagination.pageSize)
      if (totalPages <= ownerHistoryPagination.page) {
        ownerHistoryPagination.nothing = true
      }
    }
  })
}

function getMoreRecords() {
  ownerHistoryPagination.loading = true
  ownerHistoryPagination.page++
  getNftHolderList().then(() => {
    ownerHistoryPagination.loading = false
  })
}

async function payLike() {
  if (nft.val.nftHasLike) return
  await checkSdkStatus()
  const res = await store.state.sdk.addPayLikeProtocol({
    receiveAddress: nft.val.ownerAddress,
    txId: nft.val.issueMetaTxId,
  })
  if (res.code === 200) {
    ElMessage.success(i18n.t('payLikeSuccess'))
    nft.val.nftHasLike = true
    nft.val.nftLikeCount++
  }
}

async function getlegalFeePercent(value: any) {
  return new Promise<void>(async resolve => {
    const res = await GetFeeInfo({
      codehash: value.nftCodehash,
      genesis: value.nftGenesis,
    })
    if (res.code === 0) {
      nftPlatformPercent.value = nft.val.nftIsFirstSell
        ? res.data.first_platform
        : res.data.other_platform
      nftRoyaltyPercent.value = nft.val.nftIsFirstSell
        ? res.data.first_royalty
        : res.data.other_royalty
    }
    resolve()
  })
}

async function getNftFeePercent() {
  return new Promise<void>(async resolve => {
    const res = await GetFeeInfo({
      codehash: route.params.codehash,
      genesis: route.params.genesisId,
    })
    if (res.code === 0) {
      nftPlatformPercent.value = nft.val.nftIsFirstSell
        ? res.data.first_platform
        : res.data.other_platform
      nftRoyaltyPercent.value = nft.val.nftIsFirstSell
        ? res.data.first_royalty
        : res.data.other_royalty
    }
    resolve()
  })
}

function blindBoxCutDown() {
  store.commit(Mutation.GetLimitedTime, 0)
}

onMounted(() => {
  if (route.params.genesisId && route.params.codehash && route.params.tokenIndex) {
    getDetail()
    getNftHolderList()
  }
  if (route.params?.uuid) {
    getDetail()
  }
  if (blindBoxPage.value) {
    getDetail()
  }
})
</script>
<style lang="scss" scoped src="./Detail.scss"></style>
