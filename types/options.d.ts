import { BeanifyOptions } from 'beanify'

export interface AutoloadOptions {
  dir: string
  dirAsScope?: boolean
}

export interface FastifyBeanifyOptions {
  beanify: BeanifyOptions
  autoload: AutoloadOptions[]
}
