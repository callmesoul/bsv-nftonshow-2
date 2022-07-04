<template>
  <div class="tariff-description">
    <div class="title">NFT On Show {{ $t('certSystemIntro') }}</div>

    <div class="tariff-description-ques">{{ $t('certSystemIntroCont1ques') }}</div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont1') }}</div>
    </div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont2') }}</div>
    </div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont3') }}</div>
    </div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">
        {{ $t('certSystemIntroCont4')
        }}<router-link :to="{ name: 'termsOfUse' }" class="underline blue">{{
          $t('certSystemIntroCont5')
        }}</router-link
        >{{ $t('certSystemIntroCont6') }}
      </div>
    </div>

    <div class="tariff-description-ques">{{ $t('certSystemIntroCont2ques') }}</div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont7') }}</div>
      <p>{{ $t('certSystemIntroCont8') }}</p>
      <p>{{ $t('certSystemIntroCont9') }}</p>
      <p>{{ $t('certSystemIntroCont10') }}</p>
    </div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont11') }}</div>
    </div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont12') }}</div>
      <p>{{ $t('certSystemIntroCont13') }}</p>
      <p>{{ $t('certSystemIntroCont14') }}</p>
      <p>{{ $t('certSystemIntroCont15') }}</p>
    </div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont16') }}</div>
    </div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont17') }}</div>
    </div>

    <div class="tariff-description-section">
      <div class="tariff-description-title">{{ $t('certSystemIntroCont18') }}</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped src="./CertSystemIntro.scss"></style>
