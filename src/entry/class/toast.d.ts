export class Toast {
  warning(this: Toast, title: string, message: string, isNotAutoDispose?: boolean): void
  success(this: Toast, title: string, message: string, isNotAutoDispose?: boolean): void
  alert(this: Toast, title: string, message: string, isNotAutoDispose?: boolean): void

  isOpen(this: Toast, target: HTMLElement): boolean
}
