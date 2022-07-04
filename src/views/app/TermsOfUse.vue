<template>
  <div class="tariff-description">
    <div class="title">NFT On Show {{ $t('termsOfUse') }}</div>
    <!-- 中文 -->
    <template v-if="i18n.locale.value === 'zh'">
      <div class="tariff-description-section">
        <div class="tariff-description-title">{{ $t('preface') }}</div>
        <div class="drsc">
          <div class="drsc-cont">
            NOS致力于为广大MetaID用户提供稳定、安全的交易环境和良好的买卖体验。NOS的可持续发展，有赖于每一位MetaID用户的共同维护与支持。真诚建议每位MetaID用户在铸造NFT、上架NFT前仔细<a
              class="underline"
              >阅读本规范</a
            >。请各位MetaID用户严格<a class="underline">遵守平台的铸造、上架NFT规范。</a>
            <div class="red mt30">
              如铸造、上架的NFT违反该规范，将会被系统作下架处理，违规情节严重的，将对NFT进行永久屏蔽。
            </div>
            <div class="red mt30">
              若MetaID用户想要对被下架或屏蔽的NFT进行申诉，可以通过添加官方小助手微信（show_app）进行沟通。
            </div>
          </div>
        </div>
      </div>

      <div class="tariff-description-section">
        <div class="tariff-description-title">{{ $t('termsOfUseTitle1') }}</div>
        <div class="drsc">
          <div class="drsc-cont">
            <div class="red">
              一、不允许违反法律法规和相关政策的行为及内容。包含但不限于以下场景：
            </div>
            <div class="mt30">
              1. 违反宪法确定的基本原则，煽动抗拒或者破坏宪法、法律、行政法规实施；<br />
              2.
              危害国家统一、主权和领土完整，泄露国家秘密，危害国家安全，损害国家尊严、荣誉和利益，宣扬恐怖主义、极端主义；<br />
              3.
              诋毁民族优秀文化传统，煽动民族仇恨、民族歧视，侵害民族风俗习惯、歪曲民族历史和民族历史人物，损害革命领袖、英雄烈士形象，伤害民族感情，破坏民族团结；
              <br />
              4.
              煽动破坏国家宗教政策，宣扬宗教狂热，危害宗教和睦，伤害信教公民宗教感情，破坏信教公民和不信教公民团结，宣扬邪教、封建迷信；
              <br />
              5.
              危害社会公德，扰乱社会秩序，破坏社会稳定，宣扬淫秽色情、赌博、吸毒，渲染暴力、恐怖，教唆犯罪或者传授犯罪方法；
              <br />
              6. 教唆、教授、组织他人进行违法乱纪活动，以非法民间组织名义活动的，宣传违法违规物品；
              <br />
              7. 侵害未成年人合法权益或者损害未成年人身心健康； <br />
              8. 侵犯他人隐私，侮辱或者诽谤他人，侵害他人合法权益； <br />
              9. 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利； <br />
              10. 含有法律、行政法规、规章、条例以及任何具有法律效力之规范所限制或禁止的其它内容。
            </div>

            <div class="red mt30">
              二、不允许宣扬不良价值观。包含但不限于以下场景：
            </div>
            <div class="mt30">
              1. 挑战公序良俗或游走在社会道德边缘的行为；<br />
              2. 展示违背伦理道德的糜烂生活；<br />
              3. 宣扬不良生活方式和不良流行文化，渲染消极情绪，宣扬颓废的人生观、世界观和价值观；<br />
              4. 宣扬拜金主义和享乐主义；<br />
              5. 宣传和宣扬丧文化、自杀游戏；<br />
              6. 发表偏见性、污辱性、歧视性的言论，或存在攻击、谩骂、羞辱、贬损类内容；<br />
              7. 恶意对比、引战行为。
            </div>

            <div class="red mt30">
              三、不允许发布谣言或不实内容。包含但不限于以下场景：
            </div>
            <div class="mt30">
              1.谣言或虚假：与事实相悖或违背科学常理，凭空杜撰、拼凑、编造或曲解事实，制造耸人听闻的谣言，影响较为恶劣；<br />
              2.疑似谣言：无可信来源，断章取义或以讹传讹，存在诋毁、人身攻击等负面影响的； <br />
              3.信息有误 ：发布内容与事实不一致、关键信息不准确，或歪曲事实等行为。<br />
            </div>

            <div class="red mt30">
              四、不允许诱导低俗。包含但不限于以下场景：
            </div>
            <div class="mt30">
              1. 对性部位和性行为进行展示、过度描述或内涵表述的；<br />
              2. 有性挑逗、性骚扰、性侮辱或类似效果的；<br />
              3. 内容包含成人电影、情色电影、三级片、偷拍、走光、露点及各种挑逗性的；<br />
              4. 创作和传播其他有伤社会风化的内容。
            </div>

            <div class="red mt30">
              五、不允许不文明用语。包含但不限于以下场景：
            </div>
            <div class="mt30">
              1. 骚扰辱骂：使用污言秽语、蔑称、外号、同音近音词等直接辱骂或言语骚扰他人；<br />
              2. 歧视恶搞：恶搞、歧视特定群体，或言论带有明显的性别歧视、种族歧视、地域歧视等；
              <br />
              3. 情绪宣泄：通过粗俗不堪的口头禅、网络用语等发泄情绪，表达不满的。
            </div>

            <div class="red mt30">
              六、不允许引人不适或反感。包含但不限于以下场景：
            </div>
            <div class="mt30">
              1. 血腥暴力：大量关于血腥暴力的内容，引起用户不适或有不良诱导； <br />
              2. 猎奇：以猎奇为目的，描述或展现异常事物，引起不适或有不良诱导； <br />
              3. 恶心：引起强烈刺激的事物，如排泄物，吃活物、体验恶心食物等； <br />
              4. 虐待动物：如摔打或使用其他工具伤害动物的内容，渲染虐待动物的快感。
            </div>
          </div>
        </div>
      </div>
    </template>
    <!-- 引文 -->
    <template v-else>
      <div class="tariff-description-section">
        <div class="tariff-description-title">{{ $t('preface') }}</div>
        <div class="drsc">
          <div class="drsc-cont">
            NOS is committed to providing a stable and secure trading environment and a good trading
            experience for the majority of MetaID users. The sustainable development of NOS depends
            on the joint maintenance and support of every MetaID user. We sincerely recommend that
            every MetaID user be careful before casting NFT and listing NFT<a class="underline"
              >Read this specification</a
            >. Please be strict with MetaID users<a class="underline"
              >Comply with the platform's casting and shelf NFT specifications.</a
            >
            <div class="red mt30">
              If the NFT that is cast or put on the shelf violates this specification, it will be
              removed by the system. If the violation is serious, the NFT will be permanently
              blocked.
            </div>
            <div class="red mt30">
              If MetaID users want to appeal a NFT that has been removed or blocked, they can
              communicate with it by adding the official assistant WeChat (show_app).
            </div>
          </div>
        </div>
      </div>

      <div class="tariff-description-section">
        <div class="tariff-description-title">{{ $t('termsOfUseTitle1') }}</div>
        <div class="drsc">
          <div class="drsc-cont">
            <div class="red">
              1. Acts and content that violate laws, regulations and related policies are not
              allowed. Including but not limited to the following scenarios:
            </div>
            <div class="mt30">
              1. Violating the basic principles established by the Constitution, inciting resistance
              or undermining the implementation of the Constitution, laws, and administrative
              regulations;<br />
              2. Endanger national unity, sovereignty and territorial integrity, leak state secrets,
              endanger national security, harm national dignity, honor and interests, and promote
              terrorism and extremism;<br />
              3. Defamation of national excellent cultural traditions, incitement of national
              hatred, national discrimination, infringement of national customs and habits,
              distortion of national history and national historical figures, damage to the image of
              revolutionary leaders, heroes and martyrs, harm national feelings, and undermine
              national unity;
              <br />
              4. Inciting to undermine national religious policies, promote religious fanaticism,
              endanger religious harmony, harm religious feelings of religious citizens, undermine
              the unity of religious and non-religious citizens, and promote cults and feudal
              superstitions;
              <br />
              5. Endanger social ethics, disrupt social order, undermine social stability, promote
              pornography, gambling, drug use, exaggerate violence, terror, abet crime or teach
              criminal methods;
              <br />
              6. Instigate, teach, organize others to conduct activities that violate laws and
              disciplines, and promote activities in the name of illegal non-governmental
              organizations;
              <br />
              7. Infringe on the lawful rights and interests of minors or harm the physical and
              mental health of minors; <br />
              8. Infringe on the privacy of others, insult or slander others, and infringe on the
              lawful rights and interests of others; <br />
              9. Infringe other legal rights such as reputation rights, portrait rights,
              intellectual property rights, and trade secrets; <br />
              10. Contains other content restricted or prohibited by laws, administrative
              regulations, rules, regulations, and any legally effective norms.
            </div>

            <div class="red mt30">
              2. It is not allowed to promote bad values. Including but not limited to the following
              scenarios:
            </div>
            <div class="mt30">
              1. Acts that challenge public order and good customs or walk on the edge of social
              morality;<br />
              2. Show a corrupt life that violates ethics and morals;<br />
              3. Promote unhealthy lifestyles and unhealthy pop culture, exaggerate negative
              emotions, and promote decadent outlook on life, world outlook and values;<br />
              4. Promote money worship and hedonism;<br />
              5. Promote funeral culture and suicide games;<br />
              6. Publish prejudicial, degrading, or discriminatory remarks, or have offensive,
              verbal, humiliating, or derogatory content;<br />
              7. Malicious comparison and clashing behavior.
            </div>

            <div class="red mt30">
              3. The publication of rumors or false content is not allowed. Including but not
              limited to the following scenarios:
            </div>
            <div class="mt30">
              1.Rumors or falsehoods: Contrary to facts or scientific common sense, fabricate, piece
              together, fabricate or misinterpret facts out of thin air, create sensational rumors,
              and have a bad influence;<br />
              2.Suspected rumors: There is no credible source, out of context or falsehood, and
              there are negative effects such as slander, personal attack, etc.; <br />
              3.Incorrect information: The content posted is inconsistent with the facts, the key
              information is inaccurate, or the facts are distorted.<br />
            </div>

            <div class="red mt30">
              4. it is not allowed to induce vulgarity. Including but not limited to the following
              scenarios:
            </div>
            <div class="mt30">
              1. Demonstration, excessive description or connotation of sexual parts and sexual
              behavior;<br />
              2. Have sexual provocation, sexual harassment, sexual insults or similar effects;<br />
              3. The content includes adult movies, erotic movies, tertiary movies, candid shots,
              leaks, dew points and all kinds of provocative;<br />
              4. Create and disseminate other content that harms social morals.
            </div>

            <div class="red mt30">
              5. Uncivilized language is not allowed. Including but not limited to the following
              scenarios:
            </div>
            <div class="mt30">
              1. Harassment and abuse: direct abuse or verbal harassment of others by using foul
              language, derogatory names, nicknames, homophones and similar words, etc.;<br />
              2. Discrimination spoof: spoofing, discriminating against specific groups, or remarks
              with obvious gender discrimination, racial discrimination, regional discrimination,
              etc.;
              <br />
              3. Emotional venting: expressing dissatisfaction through vulgar mantras and Internet
              language.
            </div>

            <div class="red mt30">
              6. It is not allowed to cause discomfort or disgust. Including but not limited to the
              following scenarios:
            </div>
            <div class="mt30">
              1. Bloody violence: a large amount of content about bloody violence, causing
              discomfort to users or bad inducement; <br />
              2. Curious: For the purpose of curious, describe or show abnormal things, cause
              discomfort or have bad induction; <br />
              3. Nausea: things that cause strong irritation, such as excrement, eating living
              things, experiencing nausea food, etc.; <br />
              4. Animal cruelty: content such as beating or using other tools to injure animals,
              rendering the pleasure of cruelty to animals.
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const i18n = useI18n()
</script>

<style lang="scss" scoped src="./TermsOfUse.scss"></style>
