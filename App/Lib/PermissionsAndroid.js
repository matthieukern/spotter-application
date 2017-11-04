import { PermissionsAndroid } from 'react-native'

export default class AndroidPermissions {
  static async ask (permissionCode) {
    let permission = ''

    switch (permissionCode) {
      case 'Camera':
        permission = PermissionsAndroid.PERMISSIONS.CAMERA
        break
      case 'RecordAudio':
        permission = PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        break
      default:
        permission = ''
        break
    }

    if (permission !== '') {
      try {
        const granted = await PermissionsAndroid.request(
          permission,
          {
            'title': 'A title',
            'message': 'A message'
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      } catch (err) {
        console.warn(err)
      }
    }
  }
}
