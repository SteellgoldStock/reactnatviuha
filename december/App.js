import { Button, Text, View } from 'react-native'
import { useEffect, useState } from 'react'

export default function App() {
  const [colors, setColors] = useState(['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#000000' ])

  const [num, setNum] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setColors((prev) => {
        const newColors = [...prev]

        for (let i = newColors.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          ;[newColors[i], newColors[j]] = [newColors[j], newColors[i]]
        }

        return newColors
      })
    }, num)

    return () => clearInterval(interval)
  }, [num])

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 2, backgroundColor: colors[0] }} />
      <View style={{ flex: 2, backgroundColor: colors[1] }} />

      <View style={{ flex: 1, flexDirection: "row", gap: 30, justifyContent: "center", alignItems: 'center' }}>
        <Button title='-10' onPress={() => setNum(num - 10)} />
        <Button title='-1' onPress={() => setNum(num - 1)} />
        <Text style={{ fontSize: 32 }}>{num}</Text>
        <Button title='+1' onPress={() => setNum(num + 1)} />
        <Button title='+10' onPress={() => setNum(num + 10)} />
      </View>
      <View style={{ flex: 2, backgroundColor: colors[2] }} />
      <View style={{ flex: 2, backgroundColor: colors[3] }} />
    </View>
  )
}