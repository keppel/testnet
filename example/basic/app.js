let lotion = require('lotion')

let app = lotion({
  initialState: { count: 0 }
})

app.use((state, tx) => {
  state.count += 1
})

app.listen(3000)
