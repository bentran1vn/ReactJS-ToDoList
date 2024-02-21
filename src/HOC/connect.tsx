import React from 'react'
import { debug, log } from '../constrants'

export interface ExtraInfoType {
  debug: boolean
  log: (value: any) => void
}

// export default function connect<T>(Component: React.ComponentType<T & ExtraInfoType>) {
//   return function NewComponent(props: Omit<T, keyof ExtraInfoType>) {
//     return <Component {...(props as T)} debug={debug} log={log} />
//   }
// }

export default function connect<P>(injectedProps: P) {
  return function <T>(Component: React.ComponentType<T & P>) {
    return function NewComponent(props: Omit<T, keyof P>) {
      return <Component {...(props as T & {})} {...injectedProps} />
    }
  }
}
