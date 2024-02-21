import { useState } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../../@types/todo.type'
import styles from './taskInput.module.scss'
import { TodoTypes } from '../../PropTypes/todo.proptype'
import connect, { ExtraInfoType } from '../../HOC/connect'
import { debug, log } from '../../constrants'

interface TaskInputProps {
  addTodo: (name: string) => void
  currentTodo: Todo | null
  editTodo: (name: string) => void
  finishEditTodo: () => void
}

function TaskInput(props: TaskInputProps) {
  const { addTodo, currentTodo, editTodo, finishEditTodo } = props
  const [name, setName] = useState<string>('')

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentTodo) {
      editTodo(event.target.value)
    } else {
      setName(event.target.value)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTodo) {
      finishEditTodo()
      if (name) setName('')
    } else {
      if (name) {
        addTodo(name)
        setName('')
      } else {
        alert('Please input something')
      }
    }
  }

  return (
    <div className='mb-2'>
      <h1 className={styles.titles}>Bảng Kế Hoạch</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Caption goes here'
          value={currentTodo ? currentTodo.name : name}
          className={styles.input}
          onChange={handleInputChange}
        />
        <button type='submit' className={styles.button}>
          {currentTodo ? '✔️' : '➕'}
        </button>
      </form>
    </div>
  )
}

TaskInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
  currentTodo: PropTypes.oneOfType([TodoTypes, PropTypes.oneOf([null])]),
  editTodo: PropTypes.func.isRequired,
  finishEditTodo: PropTypes.func.isRequired
}

export default connect({ debug: debug, log: log })(TaskInput)
