<template>
  <div class="container" v-html="intro[i18n.locale.value]"></div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
const intro = {
  zh: `<p style="margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 15pt; font-family: Arial; color: #000000;">NFTonShow版税说明</span></strong></p>
<p><br /><br /></p>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">NFT创作者将会在NFT作品每一次的销售过程中（首次销售除外）获得默认3.5%的版税收入，由买家支付。创作者可以在3.5%-10%之间自由设定版税比例。版税于NFTonShow 2.0上线后生效，适用于所有作品（以往作品的二次交易将同样产生版税）</span></p>
<p>&nbsp;</p>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">版税的设置可以让创作者在其作品产生二次交易时获得源源不断的收入，从而更加激励创作者和版权方在NFTonShow创作和发行优质NFT。</span></p>
<p>&nbsp;</p>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 13pt; font-family: Arial; color: #000000;">版税与平台费用的关系一览表：</span></strong></p>
<p>&nbsp;</p>
<div align="left">
<table style="border: none; width: 451.276pt;"><colgroup><col /><col /><col style="width: 134px;" /><col style="width: 164px;" /></colgroup>
<tbody>
<tr>
<td style="vertical-align: top; border: 1pt solid #000000;">&nbsp;</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">创作者版税</span></p>
</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">平台费</span></p>
</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">买家支付费率总计</span></p>
</td>
</tr>
<tr>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">首次销售</span></p>
</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">/</span></p>
</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">6%</span></p>
</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">6%</span></p>
</td>
</tr>
<tr>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">二次销售</span></p>
</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">3.5%</span></p>
</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">2.5%</span></p>
</td>
<td style="vertical-align: top; border: 1pt solid #000000;">
<p style="line-height: 1.2; margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">6%</span></p>
</td>
</tr>
</tbody>
</table>
</div>
<p>&nbsp;</p>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 13pt; font-family: Arial; color: #000000;">版税发放方式：</span></strong></p>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">版税将先由平台方代收，并于每日下午5点左右结算到创作者账户。</span></p>
<p>&nbsp;</p>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><strong><span style="font-size: 13pt; font-family: Arial; color: #000000;">版税计算示例：</span></strong></p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
<li style="font-size: 13pt; font-family: Arial; color: #000000;">
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">首次销售创作者收入：</span></p>
</li>
</ul>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">创作者所设定的价格，比如设定销售价格是1bsv，那么创作者在NFT成交后收入就是1bsv；&nbsp;</span></p>
<p>&nbsp;</p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
<li style="font-size: 13pt; font-family: Arial; color: #000000;">
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">二次销售创作者收入：</span></p>
</li>
</ul>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">卖方所设定的价格的3.5%（默认），比如设定销售价格是1bsv，那么创作者在NFT成交后收入就是0.035bsv；&nbsp;</span></p>
<p>&nbsp;</p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
<li style="font-size: 13pt; font-family: Arial; color: #000000;">
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">二次销售卖方收入：</span></p>
</li>
</ul>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">卖方所设定的价格，比如设定销售价格是1bsv，那么卖方在NFT成交后收入就是1bsv；&nbsp;</span></p>
<p>&nbsp;</p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
<li style="font-size: 13pt; font-family: Arial; color: #000000;">
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">首次销售买家支出：</span></p>
</li>
</ul>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">NFT销售价格+NOS平台费用+矿工手续费。比如NFT定价是1BSV，矿工手续费是 0.0002bsv，NOS平台费用 0.06，那么买家支出1.0602bsv。</span></p>
<p>&nbsp;</p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
<li style="font-size: 13pt; font-family: Arial; color: #000000;">
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">二次销售买家支出：</span></p>
</li>
</ul>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">NFT销售价格+NOS平台费用+版税费+矿工手续费。比如NFT定价是1BSV，矿工手续费是 0.0002bsv，NOS平台费用 0.025，版税费0.035，那么买家支出1.0602bsv。</span></p>
<p>&nbsp;</p>
<ul style="margin-top: 0px; margin-bottom: 0px; padding-inline-start: 48px;">
<li style="font-size: 13pt; font-family: Arial; color: #000000;">
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt;">NOS方平台收入：</span></p>
</li>
</ul>
<p style="margin-top: 0pt; margin-bottom: 0pt;"><span style="font-size: 13pt; font-family: Arial; color: #000000;">首次销售时为创作者设定价格的6%、二次销售时为卖方设定价格的2.5%。比如首次销售NFT设定的销售价格是1bsv，那么NOS方收入就是0.06bsv； 二次销售NFT设定的销售价格是1bsv，那么NOS方收入就是0.025bsv；</span></p>`,
  en: `<span id="docs-internal-guid-d32b5a4f-7fff-2c8c-9d4b-438c2a5528ee">
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:15pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
NFTonShow Royalty Instruction</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;" id="docs-internal-guid-c4676828-7fff-6d00-6046-73db529d5455">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The NFT creators will receive a default 3.5% royalty income on each sale of NFTs (expect the first sale). The buyers will pay the royalty. Creators can freely set the royalty ratio between 3.5% to 10%. The royalties will take effect after the launch of NFTonShow 2.0 and apply to all works (the second transaction of previous works will also generate royalties)</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The royalty allows creators to receive steady incomes when their works have a secondary transaction, further motivating creators and copyright owners to create and launch more high-quality NFTs on NFTonShow.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
List of the relationship between royalties and platform fees</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<div dir="ltr" style="margin-left:0pt;" align="left">
<table style="border:none;border-collapse:collapse;">
<colgroup><col width="152">
<col width="82">
<col width="196">
<col width="194">
</colgroup><tbody><tr style="height:0pt">
<td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<br></td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Royalty</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Platform Service Fees</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Buyer’s Total Pay Rate</span>
</p>
</td></tr><tr style="height:0pt">
<td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
First Sale</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
/</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
6%</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
6%</span>
</p>
</td></tr><tr style="height:0pt">
<td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Secondary Sale</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
3.5%</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
2.5%</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
6%</span>
</p>
</td></tr></tbody></table></div><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Royalties Distribution Method:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The royalties will be collected by platform and distributed to creators' accounts around UTC 9:00 am every day.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Examples of Royalty Calculation:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Creator's income in the first sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
&nbsp;</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The creator's income in the first sale is the sales price set by the creator.&nbsp;</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
For instance, the sales price of the NFT is 1 BSV, then the creator's income is 1 BSV after the NFT be sold.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Creator's income in the secondary sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The creator's income in the secondary sale is 3.5% of the sales price set by the seller (default). For instance, the sales price of the NFT is 1 BSV, then the creator's income is 0.035 BSV after the NFT be sold.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Seller's income in the secondary sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
&nbsp;</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The seller's income in the secondary sale is the sales price set by the seller. For instance, the sales price of the NFT is 1 BSV, then the seller's income is 1 BSV after the NFT be sold.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Buyer's expenditure in the first sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
NFT sales price + NOS service fees + miner's fee. For instance, the sales price of the NFT is 1 BSV, the miner's fee is 0.0002 BSV, and the NOS service fee is 0.06 BSV, then the buyer needs to pay 1.0602 BSV.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Buyer's expenditure in the secondary sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
NFT sales price + NOS service fee + royalty fee + miner's fee. For instance, the sales price of the NFT is 1 BSV, the miner's fee is 0.0002 BSV, the NOS service fee is 0.025 BSV, and the royalty fee is 0.035 BSV, then the buyer needs to pay 1.0602 BSV.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-The income of NOS:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The income of NOS is 6% of the sales price set by the creator in the first sale; 2.5% of the sales price set by the seller in the secondary sales. For instance, the sales price of the NFT is 1 BSV in the first sale, then the income of NOS is 0.06 BSV; The sales price of the NFT in the secondary sale is 1 BSV, then the income of NOS is 0.025 BSV.&nbsp;</span>
</p>
</span>`,
  jp: `<span id="docs-internal-guid-d32b5a4f-7fff-2c8c-9d4b-438c2a5528ee">
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:15pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
NFTonShow Royalty Instruction</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;" id="docs-internal-guid-c4676828-7fff-6d00-6046-73db529d5455">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The NFT creators will receive a default 3.5% royalty income on each sale of NFTs (expect the first sale). The buyers will pay the royalty. Creators can freely set the royalty ratio between 3.5% to 10%. The royalties will take effect after the launch of NFTonShow 2.0 and apply to all works (the second transaction of previous works will also generate royalties)</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The royalty allows creators to receive steady incomes when their works have a secondary transaction, further motivating creators and copyright owners to create and launch more high-quality NFTs on NFTonShow.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
List of the relationship between royalties and platform fees</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<div dir="ltr" style="margin-left:0pt;" align="left">
<table style="border:none;border-collapse:collapse;">
<colgroup><col width="152">
<col width="82">
<col width="196">
<col width="194">
</colgroup><tbody><tr style="height:0pt">
<td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<br></td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Royalty</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Platform Service Fees</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Buyer’s Total Pay Rate</span>
</p>
</td></tr><tr style="height:0pt">
<td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
First Sale</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
/</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
6%</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
6%</span>
</p>
</td></tr><tr style="height:0pt">
<td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Secondary Sale</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
3.5%</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
2.5%</span>
</p>
</td><td style="border-left:solid #000000 1pt;border-right:solid #000000 1pt;border-bottom:solid #000000 1pt;border-top:solid #000000 1pt;vertical-align:top;padding:5pt 5pt 5pt 5pt;overflow:hidden;overflow-wrap:break-word;">
<p dir="ltr" style="line-height:1.2;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
6%</span>
</p>
</td></tr></tbody></table></div><p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Royalties Distribution Method:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The royalties will be collected by platform and distributed to creators' accounts around UTC 9:00 am every day.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:700;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
Examples of Royalty Calculation:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Creator's income in the first sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
&nbsp;</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The creator's income in the first sale is the sales price set by the creator.&nbsp;</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
For instance, the sales price of the NFT is 1 BSV, then the creator's income is 1 BSV after the NFT be sold.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Creator's income in the secondary sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The creator's income in the secondary sale is 3.5% of the sales price set by the seller (default). For instance, the sales price of the NFT is 1 BSV, then the creator's income is 0.035 BSV after the NFT be sold.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Seller's income in the secondary sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
&nbsp;</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The seller's income in the secondary sale is the sales price set by the seller. For instance, the sales price of the NFT is 1 BSV, then the seller's income is 1 BSV after the NFT be sold.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br><br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Buyer's expenditure in the first sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
NFT sales price + NOS service fees + miner's fee. For instance, the sales price of the NFT is 1 BSV, the miner's fee is 0.0002 BSV, and the NOS service fee is 0.06 BSV, then the buyer needs to pay 1.0602 BSV.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-Buyer's expenditure in the secondary sale:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
NFT sales price + NOS service fee + royalty fee + miner's fee. For instance, the sales price of the NFT is 1 BSV, the miner's fee is 0.0002 BSV, the NOS service fee is 0.025 BSV, and the royalty fee is 0.035 BSV, then the buyer needs to pay 1.0602 BSV.</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<b style="font-weight:normal;">
<br></b>
</p>
<p dir="ltr" style="line-height:1.38;margin-left: 36pt;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
-The income of NOS:</span>
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
</p>
<p dir="ltr" style="line-height:1.38;margin-top:0pt;margin-bottom:0pt;">
<span style="font-size:13pt;font-family:Arial;color:#000000;background-color:transparent;font-weight:400;font-style:normal;font-variant:normal;text-decoration:none;vertical-align:baseline;white-space:pre;white-space:pre-wrap;">
The income of NOS is 6% of the sales price set by the creator in the first sale; 2.5% of the sales price set by the seller in the secondary sales. For instance, the sales price of the NFT is 1 BSV in the first sale, then the income of NOS is 0.06 BSV; The sales price of the NFT in the secondary sale is 1 BSV, then the income of NOS is 0.025 BSV.&nbsp;</span>
</p>
</span>`,
}
</script>

<style lang="scss" scoped>
.container {
  max-width: 780px;
  margin: 50px auto;
  padding: 0 30px;
}
</style>
