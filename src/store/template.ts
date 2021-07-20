import { RootState } from 'store'
import { GetterTree } from 'vuex'

interface TemplateState {
  dropdownValues: { [key: string] : Array<{ [key: string] : string } | number> },
  colorHexValues: { [key: string] : string },
  mallName: string,
  mallAddress: string,
  mallContact: string,
  unsubscribeText: string,
  additionalText: string,
  snsActive: Array<string>,
  snsLink: { [key: string] : string }
}

export const state  = () : TemplateState => ({
  dropdownValues: { 
    fontStyle: [
      { label: 'Gothic', value: 'Gothic' },
      { label: 'Ming', value: 'Ming' }
    ],
    fontSize: [ 12, 14, 16, 18, 20, 26 ] 
  },
  colorHexValues: { 
    buttonText: '#FFFFFF',
    buttonBackground: '#000000',
    text: '#e3e3e3'
  },
  mallName: 'BTS 쇼핑몰',
  mallAddress: '서울특별시 동작구 보라매로5길 15',
  mallContact: '1588-3413',
  unsubscribeText: 'Unsubscribe',
  additionalText: '이 메일은 카페24 BTS를 통해 발송되었습니다.',
  snsActive: [],
  snsLink: {
    instagram: '',
    facebook: '',
    youtube: '',
    blog: '',
    plusFriend: '',
    kakaoStory: '',
    band: '',
    twitter: ''
  }
})

export const getters: GetterTree<TemplateState, RootState> = {
  getDropdownValues (state) : { [key: string] : any } {
    return state.dropdownValues
  },
  getColorValues (state) : { [key: string] : string } {
    return state.colorHexValues
  },
  getFooterInformation (state) : { [key: string] : string } {
    return {
      mallName: state.mallName,
      mallAddress: state.mallAddress,
      mallContact: state.mallContact,
      unsubscribeText: state.unsubscribeText,
      additionalText: state.additionalText
    }
  },
  getFooterLinks (state) : { [key: string] : Array<string> | { [key: string] : string } } {
    return {
      snsActive: state.snsActive,
      snsLink: state.snsLink
    }
  }
}
