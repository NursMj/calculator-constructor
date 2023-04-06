const sortWidgets = (a, b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
}

export default sortWidgets