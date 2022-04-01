import React, { useEffect, useRef, useState } from 'react'
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import trashIcon from '../assets/icons/trash/trash.png'
import pencilIcon from '../assets/icons/pencil/pencil.png'

export interface Task {
  id: number
  title: string
  done: boolean
}

interface Props {
  toggleTaskDone: (id: number) => void
  removeTask: (id: number) => void
  editTask: (taskId: number, taskNewTitle: string) => void
  task: Task
}

export function TaskItem({
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: Props) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleTask, setTitleText] = useState<string>(task.title)
  const textInputRef = useRef<TextInput>(null)

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }
  }, [isEditing])

  function handleStartEditing() {
    setIsEditing(true)
  }

  function handleCancelEditing() {
    setIsEditing(false)
    setTitleText(task.title)
  }

  function handleSubmitEditing() {
    editTask(task.id, titleTask)

    setIsEditing(false)
  }

  return (
    <>
      <View>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.taskButton}
          // TODO - use onPress (toggle task) prop
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            // TODO - use style prop
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={titleTask}
            onChangeText={setTitleText}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 24,
          paddingVertical: 15,
        }}
      >
        {isEditing ? (
          <TouchableOpacity
            // TODO - use onPress (remove task) prop
            onPress={handleCancelEditing}
          >
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={pencilIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.separator} />

        <TouchableOpacity
          disabled={isEditing}
          style={{ opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196,196,196, 0.24)',
    marginHorizontal: 12,
  },
})
