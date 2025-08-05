// these APIs are auto-imported from @vueuse/core
// export const isDark = useDark()
// export const toggleDark = useToggle(isDark)
export const preferredDark = usePreferredDark()


/**
 * Credit to [@hooray](https://github.com/hooray)
 * @see https://github.com/vuejs/vitepress/pull/2347
 */
// export function toggleDark(event: MouseEvent) {
//   // @ts-expect-error experimental API
//   const isAppearanceTransition = document.startViewTransition
//     && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

//   if (!isAppearanceTransition) {
//     isDark.value = !isDark.value
//     return
//   }

//   const x = event.clientX
//   const y = event.clientY
//   const endRadius = Math.hypot(
//     Math.max(x, innerWidth - x),
//     Math.max(y, innerHeight - y),
//   )

//   const transition = document.startViewTransition(async () => {
//     isDark.value = !isDark.value
//     await nextTick()
//   })
//   transition.ready
//     .then(() => {
//       const clipPath = [
//         `circle(0px at ${x}px ${y}px)`,
//         `circle(${endRadius}px at ${x}px ${y}px)`,
//       ]
//       document.documentElement.animate(
//         {
//           clipPath: isDark.value
//             ? [...clipPath].reverse()
//             : clipPath,
//         },
//         {
//           duration: 400,
//           easing: 'ease-out',
//           pseudoElement: isDark.value
//             ? '::view-transition-old(root)'
//             : '::view-transition-new(root)',
//         },
//       )
//     })
// }


export const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: 'light',
})

export const toggleDark = useToggle(isDark)

export const toggleTheme = (event: MouseEvent) => {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )

  // 兼容性处理
  if (!document.startViewTransition) {
    toggleDark()
    return
  }
  const transition = document.startViewTransition(async () => {
    toggleDark()
  })
  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    console.log(isDark.value)
    document.documentElement.animate(
      {
        clipPath: isDark.value ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 400,
        easing: 'ease-in',
        pseudoElement: isDark.value
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
