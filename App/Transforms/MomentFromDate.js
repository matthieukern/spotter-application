/**
 * Created by jazalizil on 16/03/2017.
 */
import moment from 'moment'

export default (date: String) => {
  return moment(date).format('[Le] L [à] HH:mm')
}
