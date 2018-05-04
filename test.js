const lastDate = new Date('2018-05-04T11:19:28.739Z')
const maxTimeInHours = 1

const checkIt = (last, max) => {
  const now = new Date()
  const millis = Math.abs(new Date() - last)
  const minutes = Math.floor((millis/1000)/60)
  minutes
}

checkIt(lastDate, maxTimeInHours)
