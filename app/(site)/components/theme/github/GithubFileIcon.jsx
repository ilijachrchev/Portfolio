import {
  Braces,
  CircleDot,
  FileText,
  Folder,
  FolderGit2,
} from 'lucide-react'

const ICONS = {
  repository: FolderGit2,
  readme: FileText,
  directory: Folder,
  json: Braces,
  issue: CircleDot,
}

export default function GithubFileIcon({ kind }) {
  const Icon = ICONS[kind] || FileText
  return <Icon aria-hidden="true" />
}
