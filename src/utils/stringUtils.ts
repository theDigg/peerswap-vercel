export function insertMentionLinks(markdown: string) {
  return markdown.replace(
    /\B(@([a-zA-Z0-9](-?[a-zA-Z0-9_])+))/g,
    `**[$1](https://github.com/$2)**`
  )
}

export const formatDate = (timestamp: string | number | Date) =>
  `${new Date(timestamp).toLocaleDateString()}`

export const formatDateTime = (timestamp: string | number | Date) =>
  `${new Date(timestamp).toLocaleDateString()}` +
  ' ' +
  `${new Date(timestamp).toLocaleTimeString()}`

export function shorten(text = '', maxLength: number) {
  // Normalize newlines
  let cleanText = text.replace(/\\r\\n/g, '\n')

  // Return if short enough already
  if (cleanText.length <= maxLength) {
    return cleanText
  }

  const ellip = ' ...'

  // Return the 140 chars as-is if they end in a non-word char
  const oneTooLarge = cleanText.substr(0, maxLength)
  if (/\W$/.test(oneTooLarge)) {
    return oneTooLarge.substr(0, maxLength) + ellip
  }

  // Walk backwards to the nearest non-word character
  let i = oneTooLarge.length
  while (--i) {
    if (/\W/.test(oneTooLarge[i])) {
      return oneTooLarge.substr(0, i) + ellip
    }
  }

  return oneTooLarge.substr(0, maxLength) + ellip
}

export function shortenHex(address: string) {
  // Normalize newlines

  return address.substr(0, 4).toUpperCase() + 'x' + address.substr(address.length - 4).toUpperCase()
}

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name.toUpperCase()),
    },
    children: `${name[0].toUpperCase()}`,
  };
}