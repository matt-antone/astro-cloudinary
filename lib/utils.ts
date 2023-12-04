import type { ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const round = (num: number) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')

export const rem = (px: number) => `${round(px / 16)}rem`

export const slugify = (str: string) => str?.length > 0 ? str.toLowerCase().replace(/[\W_]+/g, '-') : str
