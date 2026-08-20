import {
  Braces,
  CircleDot,
  FileText,
  Folder,
  Repository,
} from 'lucide-react'

const ICONS = {
  repository: Repository,
  readme: FileText,
  directory: Folder,
  json: Braces,
  issue: CircleDot,
}

export default function GithubFileIcon({ kind }) {
  const Icon = ICONS[kind] || FileText
  return <Icon aria-hidden="true" />
}
