import { acceptHMRUpdate, defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  /**
   * Current name of the user.
   */
  const savedName = ref('')
  const previousNames = ref(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
   */
  function setNewName(name: string) {
    if (savedName.value) {
      previousNames.value.add(savedName.value)
    }

    savedName.value = name
  }

  return {
    setNewName,
    otherNames,
    savedName,
  }
})

// 在开发模式下，当用户Store发生变化时，自动更新
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
}
