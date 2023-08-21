export function fileNameFromFilePath(path) {
  return path.slice(path.lastIndexOf("\\") + 1);
}
