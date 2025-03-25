const { animate, inView } = Motion

inView(".box", (element) => {
  animate(element, { opacity: 1 })
})

//animate("", { rotate: 360 }, { duration: 1 })
