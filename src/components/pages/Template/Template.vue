<template>
  <div class="template">
    <div class="template-sidebar">
      <div class="sidebar-header">
        <span>{{ $t('pages.template.title') }}</span>
      </div>
      <ul class="sidebar-content">
        <li>
          <nuxt-link to="/template/message">
            {{ $t('pages.template.items.messsageTheme.title') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/template/footer">
            {{ $t('pages.template.items.footerInformation.title') }}
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/template/variables">
            {{ $t('pages.template.items.messageVariables.title') }}
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="template-content">
      <div v-show="content === 'message'">
        <div class="content-header">
          <span class="text-panel-title">{{ $t('pages.template.items.messsageTheme.title') }}</span>
          <p class="text-xs">
            {{ $t('pages.template.items.messsageTheme.subTitle1') }}
          </p>
          <p class="text-xs">
            {{ $t('pages.template.items.messsageTheme.subTitle2') }}
          </p>
        </div>
        <div class="content-body">
          <div class="item-block">
            <label>{{ $t('pages.template.items.messsageTheme.inputLabel.logo') }}</label>
            <div class="image-container">
              <ImageUpload edit-text="Upload" remove-text="Remove" />
            </div>
          </div>
          <div class="item-inline">
            <div class="item-title">
              <span>{{ $t('pages.template.items.messsageTheme.inputLabel.fontStyle') }}</span>
            </div>
            <div class="item-input">
              <v-select :options="dropdownValues.fontStyle" placeholder="Select Font" label="label" />
            </div>
          </div>
          <div class="item-inline">
            <div class="item-title">
              <span>{{ $t('pages.template.items.messsageTheme.inputLabel.fontSize') }}</span>
            </div>
            <div class="item-input">
              <v-select :options="dropdownValues.fontSize" placeholder="Select Size" label="label" />
            </div>
          </div>
          <div class="item-inline">
            <div class="item-title">
              <span>{{ $t('pages.template.items.messsageTheme.inputLabel.textColor') }}</span>
            </div>
            <div class="item-input">
              <ColorPicker v-model="colorHex.text" />
            </div>
          </div>
          <div class="item-inline">
            <div class="item-title">
              <span>{{ $t('pages.template.items.messsageTheme.inputLabel.buttonBackground') }}</span>
            </div>
            <div class="item-input">
              <ColorPicker v-model="colorHex.buttonBackground" />
            </div>
          </div>
          <div class="item-inline">
            <div class="item-title">
              <span>{{ $t('pages.template.items.messsageTheme.inputLabel.buttonColor') }}</span>
            </div>
            <div class="item-input">
              <ColorPicker v-model="colorHex.buttonText" />
            </div>
          </div>
        </div>
        <div class="content-footer">
          <Button @click="confirmSave" class="btn-solid-primary">
            {{ $t('pages.template.items.messsageTheme.inputLabel.button.save') }}
          </Button>
        </div>
      </div>
      <div v-show="content === 'footer'">
        <div class="content-header">
          <span class="text-panel-title">{{ $t('pages.template.items.footerInformation.title') }}</span>
          <p class="text-xs">
            {{ $t('pages.template.items.footerInformation.subtitle1') }}
          </p>
          <p class="text-xs">
            {{ $t('pages.template.items.footerInformation.subtitle2') }}
          </p>
        </div>
        <div class="content-body">
          <div class="item-inline">
            <span class="item-title">{{ $t('pages.template.items.footerInformation.input.label.mallName') }}
              <b class="text-red-600">
                *
              </b>
            </span>
            <input v-model="footerInformation.mallName" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.mallName')" type="text" class="item-input">
          </div>
          <div class="item-inline">
            <span class="item-title">{{ $t('pages.template.items.footerInformation.input.label.mallAddress') }}
              <b class="text-red-600">
                *
              </b>
            </span>
            <input v-model="footerInformation.mallAddress" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.mallAddress')" type="text" class="item-input">
          </div>
          <div class="item-inline">
            <span class="item-title">{{ $t('pages.template.items.footerInformation.input.label.mallContact') }}
              <b class="text-red-600">
                *
              </b>
            </span>
            <input v-model="footerInformation.mallContact" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.mallContact')" type="text" class="item-input">
          </div>
          <div class="item-inline">
            <span class="item-title">{{ $t('pages.template.items.footerInformation.input.label.unsubscribeText') }}
              <b class="text-red-600">
                *
              </b>
            </span>
            <input v-model="footerInformation.unsubscribeText" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.unsubscribeText')" type="text" class="item-input">
          </div>
          <div class="item-inline">
            <span class="item-title">{{ $t('pages.template.items.footerInformation.input.label.additionalText') }}</span>
            <textarea v-model="footerInformation.additionalText" class="item-input" />
          </div>
          <div class="item-inline">
            <span class="item-title self-start">{{ $t('pages.template.items.footerInformation.input.label.snsLink') }}</span>
            <div class="item-block">
              <div class="group-inline">
                <div class="group-title">
                  <img src="/images/social-media-icons/instagram.png" width="40px">
                  <Checkbox v-model="footerLinks.snsActive" :label="$t('pages.template.items.footerInformation.socialMedia.instagram')" class="flex" option-value="instagram" />
                </div>
                <input :disabled="!footerLinks.snsActive.includes('instagram')" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.socialMedia')" v-model="footerLinks.snsLink.instagram" type="text" class="group-input">
              </div>
              <div class="group-inline">
                <div class="group-title">
                  <img src="/images/social-media-icons/facebook.png" width="40px">
                  <Checkbox v-model="footerLinks.snsActive" :label="$t('pages.template.items.footerInformation.socialMedia.facebook')" class="flex" option-value="facebook" />
                </div>
                <input :disabled="!footerLinks.snsActive.includes('facebook')" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.socialMedia')" v-model="footerLinks.snsLink.facebook" type="text" class="group-input">
              </div>
              <div class="group-inline">
                <div class="group-title">
                  <img src="/images/social-media-icons/youtube.png" width="40px">
                  <Checkbox v-model="footerLinks.snsActive" :label="$t('pages.template.items.footerInformation.socialMedia.youtube')" class="flex" option-value="youtube" />
                </div>
                <input :disabled="!footerLinks.snsActive.includes('youtube')" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.socialMedia')" v-model="footerLinks.snsLink.youtube" type="text" class="group-input">
              </div>
              <div class="group-inline">
                <div class="group-title">
                  <img src="/images/social-media-icons/blog.png" width="40px">
                  <Checkbox v-model="footerLinks.snsActive" :label="$t('pages.template.items.footerInformation.socialMedia.blog')" class="flex" option-value="blog" />
                </div>
                <input :disabled="!footerLinks.snsActive.includes('blog')" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.socialMedia')" v-model="footerLinks.snsLink.blog" type="text" class="group-input">
              </div>
              <div class="group-inline">
                <div class="group-title">
                  <img src="/images/social-media-icons/kakao-plusfriend.png" width="40px">
                  <Checkbox v-model="footerLinks.snsActive" :label="$t('pages.template.items.footerInformation.socialMedia.kakaoTalkPlusFriend')" class="flex" option-value="plusFriend" />
                </div>
                <input :disabled="!footerLinks.snsActive.includes('plusFriend')" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.socialMedia')" v-model="footerLinks.snsLink.plusFriend" type="text" class="group-input">
              </div>
              <div class="group-inline">
                <div class="group-title">
                  <img src="/images/social-media-icons/kakao-story.png" width="40px">
                  <Checkbox v-model="footerLinks.snsActive" :label="$t('pages.template.items.footerInformation.socialMedia.kakaoStory')" class="flex" option-value="kakaostory" />
                </div>
                <input :disabled="!footerLinks.snsActive.includes('kakaostory')" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.socialMedia')" v-model="footerLinks.snsLink.kakaoStory" type="text" class="group-input">
              </div>
              <div class="group-inline">
                <div class="group-title">
                  <img src="/images/social-media-icons/band.png" width="40px">
                  <Checkbox v-model="footerLinks.snsActive" :label="$t('pages.template.items.footerInformation.socialMedia.band')" class="flex" option-value="band" />
                </div>
                <input :disabled="!footerLinks.snsActive.includes('band')" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.socialMedia')" v-model="footerLinks.snsLink.band" type="text" class="group-input">
              </div>
              <div class="group-inline">
                <div class="group-title">
                  <img src="/images/social-media-icons/twitter.png" width="40px">
                  <Checkbox v-model="footerLinks.snsActive" :label="$t('pages.template.items.footerInformation.socialMedia.twitter')" class="flex" option-value="twitter" />
                </div>
                <input :disabled="!footerLinks.snsActive.includes('twitter')" :placeholder="$t('pages.template.items.footerInformation.input.placeholder.socialMedia')" v-model="footerLinks.snsLink.twitter" type="text" class="group-input">
              </div>
            </div>
          </div>
        </div>
        <div class="content-footer">
          <Button @click="confirmSave" class="btn-solid-primary">
            {{ $t('pages.template.items.footerInformation.button.save') }}
          </Button>
        </div>
      </div>
      <div v-show="content === 'variables'">
        <span class="text-xs">{{ $t('pages.template.items.messageVariables.subTitle') }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Template from './index'
export default Template
</script>

<style lang="postcss" scoped>
  @import './template.sss'
</style>
