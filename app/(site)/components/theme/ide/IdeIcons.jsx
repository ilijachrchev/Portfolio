import Image from 'next/image'

const FOLDER_ICONS = {
  folder: {
    closed: '/themes/ide/icons/folders/folder.svg',
    open: '/themes/ide/icons/folders/folder-open.svg',
  },
  src: {
    closed: '/themes/ide/icons/folders/folder-src.svg',
    open: '/themes/ide/icons/folders/folder-src-open.svg',
  },
  root: {
    closed: '/themes/ide/icons/folders/folder-root.svg',
    open: '/themes/ide/icons/folders/folder-root-open.svg',
  },
}

export function IdeFileIcon({ file, className = '' }) {
  return (
    <Image
      src={file.icon}
      alt=""
      aria-hidden="true"
      width={18}
      height={18}
      className={className}
      draggable="false"
    />
  )
}

export function IdeFolderIcon({ kind = 'folder', open = false, className = '' }) {
  const icons = FOLDER_ICONS[kind] || FOLDER_ICONS.folder
  return (
    <Image
      src={open ? icons.open : icons.closed}
      alt=""
      aria-hidden="true"
      width={18}
      height={18}
      className={className}
      draggable="false"
    />
  )
}
