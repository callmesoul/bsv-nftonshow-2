const getSrc = (part: string, index: number) => {
  let path
  if (part === 'Body') {
    path = `/metabot/${part}/MetaBot Avatar - Main Body.png`
  } else {
    path = `/metabot/${part}/MetaBot Avatar - ${part} ${index}.png`
  }
  return path
}

export default getSrc
