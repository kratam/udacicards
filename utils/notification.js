import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATION_KEY = 'flashcards.notifications'
const notification = {
  title: 'Flashcards',
  body: "Let's play a quiz!",
  ios: {
    sound: true,
  },
  android: {
    sound: true,
    priority: 'high',
    sticky: false,
    vibrate: true,
  },
}

export const clearLocalNotification = async () => {
  await AsyncStorage.removeItem(NOTIFICATION_KEY)
  return await Notifications.cancelAllScheduledNotificationsAsync
}

export const setLocalNotification = async () => {
  const data = await AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
  if (!data) {
    const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    const { status } = permission
    if (status === 'granted') {
      Notifications.cancelAllScheduledNotificationsAsync()
      let tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      tomorrow.setHours(20)
      tomorrow.setMinutes(0)
      Notifications.scheduleLocalNotificationAsync(notification, {
        time: tomorrow,
        repeat: 'day',
      })

      AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
    }
  }
}
