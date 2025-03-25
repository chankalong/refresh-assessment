const { animate, scroll } = Motion

inView(".box", (element) => {
  animate(element, { opacity: 1 })
})

//animate("", { rotate: 360 }, { duration: 1 })
