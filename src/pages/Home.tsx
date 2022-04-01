import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([])

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    const updatedTask = updatedTasks.find(task => task.id === taskId)
    if (updatedTask) {
      updatedTask.title = taskNewTitle
    }

    setTasks(updatedTasks)
  }

  function handleAddTask(newTaskTitle: string) {
    // TODO - add new task
    const findTask = tasks.find(task => task.title === newTaskTitle)

    if (findTask) {
      Alert.alert('Você não pode cadastrar uma task com o mesmo nome')
      return
    }

    setTasks(oldState => [
      ...oldState,
      {
        done: false,
        title: newTaskTitle,
        id: new Date().getTime(),
      },
    ])
  }

  function handleToggleTaskDone(id: number) {
    // TODO - toggle task done if exists
    const updatedTasks = tasks.map(task => ({ ...task }))
    const updatedTask = updatedTasks.find(task => task.id === id)
    if (updatedTask) {
      updatedTask.done = !updatedTask.done
    }

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    // TODO - remove task from state
    Alert.alert('Remover item', 'tem certeza que deseja remover esse item?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: () => {
          const task = tasks.find(task => task.id)
          if (task) {
            setTasks(oldState => oldState.filter(task => task.id !== id))
          }
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
})
