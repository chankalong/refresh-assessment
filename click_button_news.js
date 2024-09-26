  console.log('start')
  document.querySelectorAll('.btnExpend').forEach(function(e) {
    e.click()
    e.remove()
  })
  console.log('end')