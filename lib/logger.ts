type LogLevel = 'INFO' | 'ERROR' | 'WARN' | 'DEBUG';

function getTimestamp(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function formatMessage(level: LogLevel, message: string, data?: unknown): string {
  const timestamp = getTimestamp();
  const baseMessage = `[${timestamp}] [${level}] ${message}`;

  if (data) {
    return `${baseMessage}\n${JSON.stringify(data, null, 2)}`;
  }

  return baseMessage;
}

export const logger = {
  info: (message: string) => {
    console.log(formatMessage('INFO', message));
  },
  error: (message: string, error?: unknown) => {
    console.error(formatMessage('ERROR', message));
    if (error) {
      console.error(error);
    }
  },
  warn: (message: string) => {
    console.warn(formatMessage('WARN', message));
  },
  debug: (message: string, data?: unknown) => {
    if (process.env.NODE_ENV === 'development') {
      console.debug(formatMessage('DEBUG', message, data));
    }
  }
};
