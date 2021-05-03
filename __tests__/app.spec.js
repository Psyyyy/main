import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  const wrapper = shallowMount(App, { stubs: ['router-view', 'a-config-provider'] })
  console.log(wrapper)

  it('测试测试测试测试测试', () => {
    expect(typeof App.data).toBe('function')
  })
})
