/**
 * a function to obtain positions of an error details
 *
 * params:
 * - `stackObject`: string[]
 */
const getErrorPosition = (
  stackObject: string[],
): {
  readonly filename: string;
  readonly line: number;
  readonly row: number;
} => {
  let filename: string, line: number, row: number;

  try {
    const filteredStack = stackObject.filter(function (s) {
      return /\(.+?\)$/.test(s);
    });
    let splitLine: string[];
    // For current Node & Chromium Error stacks
    if (filteredStack.length > 0) {
      splitLine =
        filteredStack[0].match(/(?:\()(.+?)(?:\))$/)?.[1].split(':') || [];
      // For older, future, or otherwise unexpected stacks
    } else {
      splitLine = stackObject[0].split(':');
    }

    const splitLength = splitLine.length;
    filename = splitLine[splitLength - 3];
    line = Number(splitLine[splitLength - 2]);
    row = Number(splitLine[splitLength - 1]);
  } catch (err) {
    filename = '';
    line = 0;
    row = 0;
  }
  return {
    filename: filename,
    line: line,
    row: row,
  } as const;
};

/**
 * a function to parse an error object
 *
 * params:
 * - `err`: {@link Error}
 */
export const parseError = (
  err: Error,
): {
  readonly filename: string;
  readonly line: number;
  readonly row: number;
  readonly message: string;
  readonly name: any;
  readonly stack: string;
  readonly arguments: any;
} => {
  const stack = err.stack ? err.stack : '';
  const stackObject = stack.split('\n');
  const position = getErrorPosition(stackObject);
  const filename = position.filename;
  const line = position.line;
  const row = position.row;
  const splitMessage = err.message ? err.message.split('\n') : [''];
  const message = splitMessage[splitMessage.length - 1];
  const name = (err as any).type ? (err as any).type : err.name;
  return {
    filename: filename,
    line: line,
    row: row,
    message: message,
    name: name,
    stack: stack,
    arguments: (err as any).arguments,
  } as const;
};
